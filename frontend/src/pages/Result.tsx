import React from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Result() {
  const [q] = useSearchParams();
  const success = q.get("success") === "1";
  const bookingId = q.get("bookingId");
  const msg = q.get("msg");
  return (
    <div className="max-w-lg mx-auto text-center">
      {success ? (
        <>
          <h2 className="text-2xl font-semibold text-green-700">Booking Confirmed</h2>
          <p className="mt-2">Booking ID: <span className="font-mono">{bookingId}</span></p>
          <Link to="/" className="inline-block mt-4 btn">Back to Home</Link>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-red-600">Booking Failed</h2>
          <p className="mt-2 text-gray-700">{msg || "Something went wrong."}</p>
          <Link to="/" className="inline-block mt-4 btn">Back to Home</Link>
        </>
      )}
    </div>
  );
}
