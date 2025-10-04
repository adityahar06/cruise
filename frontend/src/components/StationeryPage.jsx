import React, { useState } from 'react';

const stationeryItems = [
  {
    id: 1,
    name: "Notebook",
    description: "Hardcover ruled notebook",
    price: 70,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Pen Set",
    description: "Pack of 5 ballpoint pens",
    price: 40,
    image: "https://plus.unsplash.com/premium_photo-1664105111034-33e24dc90a78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVuc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Books",
    description: "Good author books",
    price: 150,
    image: "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
];

const StationeryPage = () => {
  const [cart, setCart] = useState([]);

  const addCart = (item) => {
    const exists = cart.find((ci) => ci.id === item.id);
    if (exists) {
      setCart(cart.map((ci) => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (item) => {
    setCart((prevItems) => prevItems.filter((ci) => ci.id !== item.id));
  };

  const handleIncVal = (item) => {
    setCart(cart.map((ci) => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci));
  };

  const handleDecVal = (item) => {
    if (item.quantity === 1) {
      removeItem(item);
    } else {
      setCart(cart.map((ci) => ci.id === item.id ? { ...ci, quantity: ci.quantity - 1 } : ci));
    }
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

const handlePlaceOrder = async () => {
  try {
    const email=localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:3000/stationeryback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email, // replace with logged-in user's email
        cart: cart,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("✅ Stationery order placed successfully!");
      setCart([]); // clear cart after order
    } else {
      alert(result.message || "❌ Failed to place order");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("⚠️ Server error. Try again later.");
  }
};


  return (
    <div className=" ml-30 min-h-screen w-full bg-white p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">📚 Stationery Order</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {stationeryItems.map((item) => (
          <div key={item.id} className="bg-gray-100 rounded-xl shadow hover:shadow-xl transition overflow-hidden">
            <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              <p className="text-lg font-bold text-green-700 mt-2">₹{item.price}</p>
              <button
                onClick={() => addCart(item)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Cart Summary</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex flex-col md:flex-row justify-between items-center border-b pb-3">
                <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                  <span className="flex-1 font-medium text-gray-700">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecVal(item)}
                      className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 border border-red-300 rounded-full hover:bg-red-200 hover:scale-110 transition"
                      title="Decrease"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 bg-gray-100 border border-gray-300 rounded-md text-gray-800 font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncVal(item)}
                      className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 border border-green-300 rounded-full hover:bg-green-200 hover:scale-110 transition"
                      title="Increase"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 md:mt-0">
                  <span className="font-semibold text-gray-800">₹{item.price * item.quantity}</span>
                  <button
                    onClick={() => removeItem(item)}
                    className="text-sm text-white bg-red-500 px-3 py-1 rounded-md shadow hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xl font-semibold text-gray-800">Total: ₹{getTotal()}</p>
            <button
              onClick={handlePlaceOrder}
              className="mt-4 md:mt-0 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationeryPage;
