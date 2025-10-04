import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Voyager = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false); // checkbox state

  // Navigate to specific form
  const handleProgressBar = (name) => {
    navigate(`/${name}`);
  };

  const handleCheckbox = () => {
    setChecked(true);
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center relative"
      style={{
        background: 'linear-gradient(135deg, #0f172a, #1e293b, #0f172a)', // dark blue/black gradient
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl p-10 gap-10">
        {/* Left side: Welcome message */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center md:text-left text-white space-y-4 animate-fadeIn">
          {["Welcome", "to", "the", "Voyager", "Dashboard"].map((line, index) => (
            <div
              key={index}
              className="text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-lg"
              style={{ transition: 'all 0.3s ease' }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Right side: Existing forms */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 animate-slideUp">
          <div className="grid grid-cols-1 gap-6">
            {/* Card for each form */}
            {[
              { name: 'Catering Order', route: 'catering' },
              { name: 'Stationery Order', route: 'stationery' },
              { name: 'Beauty Salon', route: 'beauty' },
              { name: 'Party Hall', route: 'party' },
            ].map((form, idx) => (
              <div
                key={idx}
                onClick={() => handleProgressBar(form.route)}
                className="flex items-center space-x-4 p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer transition transform hover:scale-105 hover:bg-white/20 hover:shadow-lg"
              >
                <input
                  type="checkbox"
                  onChange={handleCheckbox}
                  className="w-5 h-5 accent-blue-400"
                />
                <span className="text-white font-semibold text-lg">{form.name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/summary')}
            className="mt-6 px-6 py-3 rounded-xl bg-blue-500 text-white font-bold text-lg shadow-lg hover:bg-blue-600 transition"
          >
            View Summary
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease forwards;
          }
          .animate-slideUp {
            animation: slideUp 0.8s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Voyager;
