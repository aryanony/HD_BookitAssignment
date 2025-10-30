// backend/src/index.ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import experiencesRouter from "./routes/experiences";
import bookingsRouter from "./routes/bookings";
import promoRouter from "./routes/promo";

// fallback data (loaded if Mongo fails)
import { experiences as FB_EXPERIENCES, promos as FB_PROMOS, bookings as FB_BOOKINGS } from "./data/fallbackSeed";

const app = express();
app.use(cors());
app.use(express.json());

// attach routers
app.use("/experiences", experiencesRouter);
app.use("/bookings", bookingsRouter);
app.use("/promo", promoRouter);

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || "";

async function startServer(useFallback = false) {
  // Attach fallback data to global if requested
  if (useFallback) {
    (globalThis as any).USE_FALLBACK = true;
    (globalThis as any).FALLBACK = {
      experiences: FB_EXPERIENCES,
      promos: FB_PROMOS,
      bookings: FB_BOOKINGS
    };
    console.warn("⚠️ Running with FALLBACK data (MongoDB unavailable).");
  } else {
    (globalThis as any).USE_FALLBACK = false;
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (fallback=${(globalThis as any).USE_FALLBACK})`);
  });
}

(async () => {
  if (!MONGO) {
    console.warn("No MONGO_URI provided — starting server with fallback data.");
    await startServer(true);
    return;
  }

  try {
    await mongoose.connect(MONGO);
    console.log("Connected to MongoDB");
    await startServer(false);
  } catch (err: any) {
    console.error("MongoDB connection error:", err.message || err);
    // Start server anyway with fallback data
    await startServer(true);
  }
})();
