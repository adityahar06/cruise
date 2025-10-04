import React, { useState } from "react";

const HeadCook = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Demo credentials
  const headCookEmail = "headcook@gmail.com";
  const headCookPassword = "headcook123";

  const handleFetchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/cateringback");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        throw new Error("Failed to fetch catering data");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 p-10 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          👨‍🍳 Head Cook Panel
        </h1>

        {/* Demo Credentials */}
        <form onSubmit={handleFetchData} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={headCookEmail}
              readOnly
              className="w-full px-3 py-2 rounded bg-gray-200 text-black border border-gray-300 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={headCookPassword}
              readOnly
              className="w-full px-3 py-2 rounded bg-gray-200 text-black border border-gray-300 cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            Fetch Catering Orders
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <p className="text-center text-lg text-yellow-600 font-semibold">
            Loading catering orders...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-lg text-red-600 font-semibold">
            {error}
          </p>
        )}

        {/* Data */}
        {data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((order, idx) => (
              <div
                key={idx}
                className="bg-green-50 border border-green-300 rounded-lg shadow p-5 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-green-700 mb-2">
                  Order #{idx + 1}
                </h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {order.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Total Quantity:</span>{" "}
                  {order.quantity}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-green-800">
                  Items:
                </h3>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-800">
                  {order.cater1.map((item, i) => (
                    <li key={i}>
                      {item.item} - ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* No Data */}
        {!loading && data.length === 0 && !error && (
          <p className="text-center text-gray-600 mt-6">
            No catering orders available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default HeadCook;
