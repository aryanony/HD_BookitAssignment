// backend/src/data/fallbackSeed.ts
export const experiences = [
  {
    _id: "e1",
    title: "Mountain Sunrise Hike",
    slug: "mountain-sunrise-hike",
    price: 799,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    description: "Early morning hike to view a breathtaking sunrise.",
    slots: [
      { id: "s1", date: "2025-11-05", time: "05:00", capacity: 6 },
      { id: "s2", date: "2025-11-06", time: "05:00", capacity: 4 },
      { id: "s3", date: "2025-11-07", time: "05:00", capacity: 5 }
    ]
  },
  {
    _id: "e2",
    title: "City Food Walk",
    slug: "city-food-walk",
    price: 499,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    description: "Taste local favourites with a friendly guide.",
    slots: [
      { id: "s4", date: "2025-11-08", time: "10:00", capacity: 8 },
      { id: "s5", date: "2025-11-09", time: "10:00", capacity: 6 }
    ]
  },
  {
    _id: "e3",
    title: "Kayaking River Trip",
    slug: "kayak-river-trip",
    price: 1299,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    description: "Guided kayaking with safety gear included.",
    slots: [
      { id: "s6", date: "2025-11-10", time: "08:00", capacity: 5 },
      { id: "s7", date: "2025-11-12", time: "08:00", capacity: 5 }
    ]
  }
];

export const promos = [
  { code: "SAVE10", type: "percent", value: 10 },
  { code: "FLAT100", type: "flat", value: 100 }
];

export const bookings: any[] = []; // push booking objects here during fallback mode
