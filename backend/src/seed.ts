import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Experience from "./models/Experience";
import Promo from "./models/Promo";

const MONGO = process.env.MONGO_URI || "";

async function seed() {
  await mongoose.connect(MONGO);
  console.log("Connected to Mongo");

  // Clear existing (optional)
  await Experience.deleteMany({});
  await Promo.deleteMany({});

  // Helper to create slot ids
  let slotCounter = 1;
  function makeSlot(date: string, time: string, cap = 5) {
    return { id: `s${slotCounter++}`, date, time, capacity: cap };
  }

  const experiences = [
    {
      title: "Mountain Sunrise Hike",
      slug: "mountain-sunrise-hike",
      price: 799,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
      description: "Early morning hike to view a breathtaking sunrise.",
      slots: [
        makeSlot("2025-11-05", "05:00", 6),
        makeSlot("2025-11-06", "05:00", 4),
        makeSlot("2025-11-07", "05:00", 5)
      ]
    },
    {
      title: "City Food Walk",
      slug: "city-food-walk",
      price: 499,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
      description: "Taste local favourites with a friendly guide.",
      slots: [
        makeSlot("2025-11-08", "10:00", 8),
        makeSlot("2025-11-09", "10:00", 6)
      ]
    },
    {
      title: "Kayaking River Trip",
      slug: "kayak-river-trip",
      price: 1299,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      description: "Guided kayaking with safety gear included.",
      slots: [
        makeSlot("2025-11-10", "08:00", 5),
        makeSlot("2025-11-12", "08:00", 5)
      ]
    },
    {
      title: "Heritage Walk & Stories",
      slug: "heritage-walk",
      price: 399,
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80",
      description: "Explore the old town with local stories.",
      slots: [
        makeSlot("2025-11-11", "16:00", 10),
        makeSlot("2025-11-13", "16:00", 7)
      ]
    },
    {
      title: "Photography Workshop",
      slug: "photography-workshop",
      price: 1499,
      image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&q=80",
      description: "Hands-on workshop for beginners.",
      slots: [
        makeSlot("2025-11-14", "09:00", 6),
        makeSlot("2025-11-15", "09:00", 6)
      ]
    },
    {
      title: "Stargazing Night",
      slug: "stargazing-night",
      price: 999,
      image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1200&q=80",
      description: "Night under the stars with a telescope.",
      slots: [
        makeSlot("2025-11-16", "20:00", 8),
        makeSlot("2025-11-17", "20:00", 8)
      ]
    }
  ];

  await Experience.insertMany(experiences);

  const promos = [
    { code: "SAVE10", type: "percent", value: 10 },
    { code: "FLAT100", type: "flat", value: 100 }
  ];
  await Promo.insertMany(promos);

  console.log("Seed completed");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
