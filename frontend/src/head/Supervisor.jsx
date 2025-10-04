import React, { useState } from "react";

const Supervisor = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Predefined credentials
    const supervisorEmail = "supervisor@gmail.com";
    const supervisorPassword = "supervisor123";

    const handleFetchData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:3000/stationeryback");
            if (!response.ok) {
                throw new Error("Failed to fetch stationery data");
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="w-screen h-screen bg-cover bg-center flex items-center justify-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

            <div className="relative z-10 backdrop-blur-md bg-white/20 text-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Supervisor Panel</h2>

                {/* Prefilled Credentials */}
                <form onSubmit={handleFetchData} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="text"
                            value={supervisorEmail}
                            readOnly
                            className="w-full px-3 py-2 rounded bg-gray-200 text-black border border-gray-300 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={supervisorPassword}
                            readOnly
                            className="w-full px-3 py-2 rounded bg-gray-200 text-black border border-gray-300 cursor-not-allowed"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Fetch Stationery Data
                    </button>
                </form>

                {/* Loading */}
                {loading && <p className="mt-4 text-yellow-300">Loading data...</p>}
                {/* Error */}
                {error && <p className="mt-4 text-red-400">{error}</p>}
                {/* Data */}
                {/* Data */}
                {data.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-3 text-white">Stationery Orders</h3>
                        <div className="max-h-64 overflow-y-auto space-y-4">
                            {data.map((order, idx) => (
                                <div key={idx} className="p-3 bg-white/20 rounded border border-white/30">
                                    <p className="font-bold text-black">Order Email: {order.email}</p>
                                    {order.cart.map((item, i) => (
                                        <div key={i} className="ml-4 mt-2">
                                            <p><span className="font-bold text-black">Item:</span> <span className="text-black">{item.item}</span></p>
                                            <p><span className="font-bold text-black">Quantity:</span> <span className="text-black">{item.quantity}</span></p>
                                            <p><span className="font-bold text-black">Price:</span> <span className="text-black">{item.price}</span></p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Supervisor;
