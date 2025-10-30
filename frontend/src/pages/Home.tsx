import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

type Exp = {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
};

export default function Home() {
  const [items, setItems] = useState<Exp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/experiences")
      .then(r => { setItems(r.data); setError(null); })
      .catch(err => {
        console.error("API error:", err);
        setError("Unable to load experiences. Make sure backend is running at http://localhost:4000");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-center">Loading experiences…</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(x => (
        <Link to={`/details/${x._id}`} key={x._id} className="card hover:shadow-lg transition">
          <img src={x.image} alt={x.title} className="w-full h-40 object-cover rounded" />
          <h3 className="mt-2 font-semibold">{x.title}</h3>
          <p className="text-sm text-gray-600">{x.description.slice(0, 80)}...</p>
          <div className="mt-2 font-medium">₹{x.price}</div>
        </Link>
      ))}
    </div>
  );
}
