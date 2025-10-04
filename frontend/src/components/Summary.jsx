import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const [beautyData, setBeautyData] = useState([]);
  const [partyData, setPartyData] = useState([]);
  const [stationeryData, setStationeryData] = useState([]);
  const [cateringData, setCateringData] = useState([]);
  const [voyagerData, setVoyagerData] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail"); // logged-in user email

  const handleFetchData = async () => {
    setError("");
    setSuccess("");
    try {
      const res1 = await fetch("http://localhost:3000/api/bookings");
      const res2 = await fetch("http://localhost:3000/bookings");
      const res3 = await fetch("http://localhost:3000/stationeryback");
      const res4 = await fetch("http://localhost:3000/cateringback");
      const res5 = await fetch("http://localhost:3000/login");

      if (!res1.ok || !res2.ok || !res3.ok || !res4.ok || !res5.ok) {
        throw new Error("Failed to fetch some data");
      }

      const result1 = await res1.json();
      const result2 = await res2.json();
      const result3 = await res3.json();
      const result4 = await res4.json();
      const result5 = await res5.json();

      setBeautyData(result1.filter((b) => b.email === userEmail));
      setPartyData(result2.filter((p) => p.email === userEmail));
      setStationeryData(result3.filter((s) => s.email === userEmail));
      setCateringData(result4.filter((c) => c.email === userEmail));
      setVoyagerData(result5.filter((v) => v.email === userEmail));
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleSaveSummary = async () => {
    if (!userEmail) {
      setError("User email not found");
      return;
    }

    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:3000/summaryback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          cateringOrders: cateringData,
          stationeryOrders: stationeryData,
          beautyBookings: beautyData,
          partyBookings: partyData,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess("✅ Summary saved successfully!");
      } else {
        setError(result.message || "❌ Failed to save summary");
      }
    } catch (err) {
      setError(err.message || "Server error while saving summary");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("userEmail"); // clear user on logout
          navigate("/");
        }}
        className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold text-center mb-6">📊 My Orders Summary</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      {/* Fetch Data Button */}
      <div className="text-center mb-4">
        <button
          onClick={handleFetchData}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Fetch My Orders
        </button>
      </div>

      {/* Save Summary Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleSaveSummary}
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Save Summary
        </button>
      </div>

      {/* Summary Sections */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Beauty Bookings */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">💅 Beauty Bookings</h2>
          {beautyData.length === 0 ? (
            <p>No bookings found</p>
          ) : (
            <ul className="space-y-2">
              {beautyData.map((b, i) => (
                <li key={i} className="border p-2 rounded">
                  <p><strong>Email:</strong> {b.email}</p>
                  {b.services?.map((s, j) => (
                    <p key={j} className="text-sm text-gray-600">
                      {s.name} - {s.plan} | ₹{s.price} × {s.quantity}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Party Bookings */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">🎉 Party Bookings</h2>
          {partyData.length === 0 ? (
            <p>No bookings found</p>
          ) : (
            <ul className="space-y-2">
              {partyData.map((p, i) => (
                <li key={i} className="border p-2 rounded">
                  <p><strong>Email:</strong> {p.email}</p>
                  <p>{p.partyType} on {p.date} at {p.time}</p>
                  <p>Services: {p.services.join(", ")}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Stationery Orders */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">📒 Stationery Orders</h2>
          {stationeryData.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <ul className="space-y-2">
              {stationeryData.map((s, i) => (
                <li key={i} className="border p-2 rounded">
                  <p><strong>Email:</strong> {s.email}</p>
                  {s.cart?.map((c, j) => (
                    <p key={j} className="text-sm text-gray-600">
                      {c.item} - ₹{c.price} × {c.quantity}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Catering Orders */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">🍽 Catering Orders</h2>
          {cateringData.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <ul className="space-y-2">
              {cateringData.map((c, i) => (
                <li key={i} className="border p-2 rounded">
                  <p><strong>Email:</strong> {c.email}</p>
                  <p><strong>Quantity:</strong> {c.quantity}</p>
                  {c.cater1?.map((ci, j) => (
                    <p key={j} className="text-sm text-gray-600">
                      {ci.item} - ₹{ci.price}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Voyager / User Details */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">🧑‍✈️ My Profile</h2>
          {voyagerData.length === 0 ? (
            <p>No user details found</p>
          ) : (
            <ul className="space-y-2">
              {voyagerData.map((v, i) => (
                <li key={i} className="border p-2 rounded">
                  <p><strong>Email:</strong> {v.email}</p>
                  <p><strong>Role:</strong> {v.role}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
