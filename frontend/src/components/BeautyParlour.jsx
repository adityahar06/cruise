import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const servicesList = [
  {
    id: 1,
    name: "Facial Glow",
    plan: "Premium",
    price: 1200,
    description: "Deep cleansing and glow-enhancing facial.",
    image: "https://images.unsplash.com/photo-1629380107393-523a2e0a5270?w=600",
  },
  {
    id: 2,
    name: "Hair Styling",
    plan: "Medium",
    price: 800,
    description: "Trendy hair cut and style for any event.",
    image: "https://plus.unsplash.com/premium_photo-1661668935701-2429eb4da878?w=600",
  },
  {
    id: 3,
    name: "Manicure",
    plan: "Regular",
    price: 500,
    description: "Complete hand & nail care.",
    image: "https://plus.unsplash.com/premium_photo-1661497566854-7a75d3e98996?w=600",
  },
];

const BeautyParlour = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const addToCart = (service) => {
    const exists = cart.find((s) => s.id === service.id);
    if (exists) {
      setCart(
        cart.map((s) =>
          s.id === service.id ? { ...s, quantity: s.quantity + 1 } : s
        )
      );
    } else {
      setCart([...cart, { ...service, quantity: 1 }]);
    }
  };

  const removeFromCart = (serviceId) => {
    setCart(cart.filter((s) => s.id !== serviceId));
  };

  const totalPrice = cart.reduce((sum, s) => sum + s.price * s.quantity, 0);

  const handleBooking = async () => {
    if (!email || cart.length === 0) {
      alert("Please add services to cart");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/bookings", {
        email,
        services: cart.map(({ id, ...rest }) => rest),
      });

      alert("Booking Successful!");
      setCart([]);
      
    } catch (err) {
      console.error(err);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen ml-30 w-full bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Our Beauty Parlour Services
      </h1>

      <div className="flex flex-wrap gap-6 justify-center w-full max-w-[1400px]">
        {servicesList.map((item) => (
          <div
            key={item.id}
            className="w-72 md:w-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 md:h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <p className="text-gray-800 mt-1 font-bold">Price: ₹{item.price}</p>
              <p className="text-gray-500">Plan: {item.plan}</p>

              <button
                onClick={() => addToCart(item)}
                className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-10 w-full max-w-3xl bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

          {cart.map((s) => (
            <div
              key={s.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  Quantity:
                  <button
                    onClick={() =>
                      setCart(
                        cart.map((item) =>
                          item.id === s.id
                            ? {
                                ...item,
                                quantity:
                                  item.quantity > 1 ? item.quantity - 1 : 1,
                              }
                            : item
                        )
                      )
                    }
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span>{s.quantity}</span>
                  <button
                    onClick={() =>
                      setCart(
                        cart.map((item) =>
                          item.id === s.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        )
                      )
                    }
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-bold">₹{s.price * s.quantity}</p>
                <button
                  onClick={() => removeFromCart(s.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <p className="text-xl font-bold mt-4">Total: ₹{totalPrice}</p>

          <div className="mt-4 text-gray-700">
            Booking for: <span className="font-semibold">{email}</span>
          </div>

          <button
            onClick={handleBooking}
            className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-bold transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BeautyParlour;
