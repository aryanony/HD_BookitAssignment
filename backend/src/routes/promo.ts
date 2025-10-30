// backend/src/routes/promo.ts
import { Router } from "express";
import Promo from "../models/Promo";

const router = Router();

function usingFallback() {
  return (globalThis as any).USE_FALLBACK === true;
}

router.post("/validate", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.json({ valid: false });

    if (usingFallback()) {
      const fb = (globalThis as any).FALLBACK;
      const p = fb.promos.find((x: any) => x.code === code.toUpperCase());
      if (!p) return res.json({ valid: false });
      return res.json({ valid: true, type: p.type, value: p.value });
    }

    const p = await Promo.findOne({ code: code.toUpperCase() });
    if (!p) return res.json({ valid: false });
    const now = new Date();
    if (p.expiresAt && p.expiresAt < now) return res.json({ valid: false });
    return res.json({ valid: true, type: p.type, value: p.value });
  } catch (err) {
    return res.status(500).json({ valid: false });
  }
});

export default router;
