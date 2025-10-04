import React, { useState } from "react";

const Manager = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Demo user (for display)
  const demoUser = {
    email: "demoUser@gmail.com",
    password: "demo123",
  };

  // Fetch all summaries from backend
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/summaryback");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        setError("Failed to fetch summaries");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Manager Dashboard – User Orders Summary
      </h1>

      {/* Demo user info */}
      <div className="bg-white rounded-xl shadow-lg p-5 max-w-sm mx-auto mb-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-3 text-center">Demo User</h2>
        <p>
          <span className="font-semibold">Email:</span> {demoUser.email}
        </p>
        <p>
          <span className="font-semibold">Password:</span> {demoUser.password}
        </p>
      </div>

      {/* Fetch Button */}
      <div className="text-center mb-6">
        <button
          onClick={fetchData}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Fetch All User Summaries"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-center mb-4">Error: {error}</p>
      )}

      {data.length === 0 && !loading ? (
        <p className="text-center text-gray-600">No summaries available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((user, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-3">
                {user.email}
              </h2>

              <div className="space-y-3">
                {/* ------------------ CATERING ORDERS ------------------ */}
                <div>
                  <h3 className="font-semibold">Catering Orders:</h3>
                  {user.cateringOrders?.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm">
                      {user.cateringOrders.map((order, i) => (
                        <li key={i}>
                          {order.cater1?.length > 0 &&
                            order.cater1.map((item, j) => (
                              <div key={j}>
                                {item.item} – ₹{item.price} ×{" "}
                                {order.quantity || 1}
                              </div>
                            ))}
                          {order.cater2?.length > 0 &&
                            order.cater2.map((cart, k) =>
                              cart.cart.map((c, l) => (
                                <div key={l}>
                                  {c.item} – ₹{c.price}
                                </div>
                              ))
                            )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No catering orders
                    </p>
                  )}
                </div>

                {/* ------------------ STATIONERY ORDERS ------------------ */}
                <div>
                  <h3 className="font-semibold">Stationery Orders:</h3>
                  {user.stationeryOrders?.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm">
                      {user.stationeryOrders.map((order, i) => (
                        <li key={i}>
                          {order.cart?.map((c, j) => (
                            <div key={j}>
                              {c.item} – ₹{c.price} × {c.quantity}
                            </div>
                          ))}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No stationery orders
                    </p>
                  )}
                </div>

                {/* ------------------ BEAUTY BOOKINGS ------------------ */}
                <div>
                  <h3 className="font-semibold">Beauty Bookings:</h3>
                  {user.beautyBookings?.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm">
                      {user.beautyBookings.map((booking, i) => (
                        <li key={i}>
                          {booking.services?.map((s, j) => (
                            <div key={j}>
                              {s.name} ({s.plan}) – ₹{s.price} × {s.quantity}
                            </div>
                          ))}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No beauty bookings
                    </p>
                  )}
                </div>

                {/* ------------------ PARTY BOOKINGS ------------------ */}
                <div>
                  <h3 className="font-semibold">Party Bookings:</h3>
                  {user.partyBookings?.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm">
                      {user.partyBookings.map((booking, i) => (
                        <li key={i}>
                          <div>
                            {booking.partyType} – {booking.date} at{" "}
                            {booking.time}
                          </div>
                          {booking.services?.length > 0 && (
                            <div>
                              Services: {booking.services.join(", ")}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No party bookings
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Manager;
