import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">BookIt</Link>
          <nav className="text-sm text-gray-600">Simple Booking App</nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>
    </div>
  );
}
