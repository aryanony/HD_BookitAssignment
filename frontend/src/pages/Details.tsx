import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

type Slot = { id: string; date: string; time: string; capacity: number };
type Exp = { _id: string; title: string; image: string; description: string; price: number; slots: Slot[] };

export default function Details() {
  const { id } = useParams();
  const nav = useNavigate();
  const [exp, setExp] = useState<Exp | null>(null);
  const [selSlot, setSelSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/experiences/${id}`)
      .then(r => setExp(r.data))
      .catch(() => alert("Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!exp) return <div>Not found</div>;

  return (
    <div>
      <img src={exp.image} alt={exp.title} className="w-full h-64 object-cover rounded" />
      <h1 className="text-2xl mt-4">{exp.title}</h1>
      <p className="text-gray-700 mt-2">{exp.description}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Available slots</h3>
        <div className="flex gap-2 flex-wrap mt-2">
          {exp.slots.map(s => (
            <button
              key={s.id}
              disabled={s.capacity <= 0}
              onClick={() => setSelSlot(s.id)}
              className={`px-3 py-2 rounded border ${selSlot === s.id ? "bg-gray-200" : ""} ${s.capacity <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="text-sm">{s.date} · {s.time}</div>
              <div className="text-xs text-gray-600">{s.capacity <= 0 ? "Sold out" : `${s.capacity} seats`}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          disabled={!selSlot}
          onClick={() => nav(`/checkout/${exp._id}?slot=${selSlot}`)}
          className={`btn-primary ${!selSlot ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          Book Now — ₹{exp.price}
        </button>
      </div>
    </div>
  );
}
