// backend/src/routes/experiences.ts
import { Router } from "express";
import Experience from "../models/Experience"; // used when mongoose connected

const router = Router();

function usingFallback() {
  return (globalThis as any).USE_FALLBACK === true;
}

// GET /experiences
router.get("/", async (req, res) => {
  try {
    if (usingFallback()) {
      const fb = (globalThis as any).FALLBACK;
      return res.json(fb.experiences);
    }
    const list = await Experience.find();
    return res.json(list);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /experiences/:id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (usingFallback()) {
      const fb = (globalThis as any).FALLBACK;
      const e = fb.experiences.find((x: any) => x._id === id || x._id === id.toString());
      if (!e) return res.status(404).json({ error: "Not found" });
      return res.json(e);
    }
    const e = await Experience.findById(id);
    if (!e) return res.status(404).json({ error: "Not found" });
    return res.json(e);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
