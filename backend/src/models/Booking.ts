import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  experienceId: { type: String, required: true },
  slotId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  pricePaid: { type: Number, required: true },
  promoCode: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", BookingSchema);
