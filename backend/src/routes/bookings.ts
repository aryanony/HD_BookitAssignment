// backend/src/routes/bookings.ts
import { Router } from "express";
import Experience from "../models/Experience";
import Booking from "../models/Booking";
import { randomUUID } from "crypto";

const router = Router();

function usingFallback() {
  return (globalThis as any).USE_FALLBACK === true;
}

// POST /bookings
router.post("/", async (req, res) => {
  try {
    const { experienceId, slotId, name, email, phone, promoCode } = req.body;
    if (!experienceId || !slotId || !name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (usingFallback()) {
      const fb = (globalThis as any).FALLBACK;
      const exp = fb.experiences.find((x: any) => x._id === experienceId);
      if (!exp) return res.status(404).json({ error: "Experience not found" });
      const slot = exp.slots.find((s: any) => s.id === slotId);
      if (!slot) return res.status(404).json({ error: "Slot not found" });
      if (slot.capacity <= 0) return res.status(400).json({ error: "Slot sold out" });

      // decrement capacity
      slot.capacity = slot.capacity - 1;

      // create booking in-memory
      const bookingId = randomUUID();
      const booking = {
        _id: bookingId,
        experienceId,
        slotId,
        name,
        email,
        phone,
        pricePaid: exp.price,
        promoCode,
        createdAt: new Date()
      };
      fb.bookings.push(booking);
      return res.json({ success: true, bookingId });
    }

    // MongoDB path (atomic decrement)
    const updated = await Experience.updateOne(
      { _id: experienceId, "slots.id": slotId, "slots.capacity": { $gt: 0 } },
      { $inc: { "slots.$.capacity": -1 } }
    );
    if (updated.modifiedCount === 0) {
      return res.status(400).json({ error: "Slot sold out or not available" });
    }
    const exp = await Experience.findById(experienceId);
    if (!exp) return res.status(404).json({ error: "Experience not found" });

    const booking = await Booking.create({
      experienceId,
      slotId,
      name,
      email,
      phone,
      pricePaid: exp.price,
      promoCode
    });

    return res.json({ success: true, bookingId: booking._id });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
