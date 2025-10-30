import mongoose from "mongoose";

const PromoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["percent", "flat"], required: true },
  value: { type: Number, required: true },
  expiresAt: { type: Date, required: false }
});

export default mongoose.model("Promo", PromoSchema);
