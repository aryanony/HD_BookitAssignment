import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../api/api";

type Exp = { _id: string; title: string; price: number };

export default function Checkout() {
  const { id } = useParams();
  const [q] = useSearchParams();
  const slot = q.get("slot") || "";
  const nav = useNavigate();

  const [exp, setExp] = useState<Exp | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", promo: "" });
  const [promoRes, setPromoRes] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/experiences/${id}`).then(r => setExp({ _id: r.data._id, title: r.data.title, price: r.data.price })).catch(() => alert("Failed"));
  }, [id]);

  const valid = () => /\S+@\S+\.\S+/.test(form.email) && form.name.length > 1;

  const applyPromo = async () => {
    if (!form.promo) return alert("Enter code");
    const res = await api.post("/promo/validate", { code: form.promo });
    setPromoRes(res.data);
  };

  const submit = async () => {
    if (!valid()) return alert("Invalid name or email");
    setLoading(true);
    try {
      const payload = { experienceId: id, slotId: slot, ...form };
      const r = await api.post("/bookings", payload);
      nav(`/result?success=1&bookingId=${r.data.bookingId}`);
    } catch (err: any) {
      const message = err?.response?.data?.error || "Booking failed";
      nav(`/result?success=0&msg=${encodeURIComponent(message)}`);
    } finally {
      setLoading(false);
    }
  };

  if (!exp) return <div>Loading...</div>;

  // price summary (simple)
  const base = exp.price;
  let final = base;
  if (promoRes && promoRes.valid) {
    if (promoRes.type === "percent") final = Math.round(base * (1 - promoRes.value / 100));
    else if (promoRes.type === "flat") final = Math.max(0, base - promoRes.value);
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold">Checkout — {exp.title}</h2>

      <div className="mt-4">
        <input placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-2 border rounded" />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-2 border rounded mt-2" />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full p-2 border rounded mt-2" />

        <div className="flex gap-2 mt-3">
          <input placeholder="Promo code" value={form.promo} onChange={e => setForm({ ...form, promo: e.target.value })} className="flex-1 p-2 border rounded" />
          <button onClick={applyPromo} className="btn">Apply</button>
        </div>
        {promoRes && <div className="mt-2 text-sm">{promoRes.valid ? "Promo applied" : "Invalid promo"}</div>}
      </div>

      <div className="mt-4 p-3 border rounded">
        <div className="flex justify-between"><span>Base price</span><span>₹{base}</span></div>
        {promoRes && promoRes.valid && <div className="flex justify-between text-green-700"><span>Discount</span><span>-</span></div>}
        <div className="mt-2 flex justify-between font-semibold">Total <span>₹{final}</span></div>
      </div>

      <div className="mt-4">
        <button disabled={loading} onClick={submit} className="btn-primary w-full">{loading ? "Processing..." : `Pay & Book ₹${final}`}</button>
      </div>
    </div>
  );
}
