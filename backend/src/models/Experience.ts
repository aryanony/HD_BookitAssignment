import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  id: { type: String, required: true },      // unique slot id
  date: { type: String, required: true },    // ISO date or friendly string
  time: { type: String, required: true },
  capacity: { type: Number, required: true } // seats left
});

const ExperienceSchema = new mongoose.Schema({
  title: String,
  slug: String,
  price: Number,
  image: String,
  description: String,
  slots: [SlotSchema]
});

export default mongoose.model("Experience", ExperienceSchema);
