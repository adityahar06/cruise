import React, { useState } from 'react';

const PartyPage = () => {
  const [partyType, setPartyType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const services = ['DJ', 'Catering', 'Decoration', 'Photography'];

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleBooking = async () => {
    if (!partyType || !date || !time || selectedServices.length === 0) {
      alert("❗ Please fill in all fields and select at least one service.");
      return;
    }

    try {
      const email = localStorage.getItem("userEmail");
      const response = await fetch("http://localhost:3000/partybooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          partyType,
          date,
          time,
          services: selectedServices,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Party booked successfully!");
        setSelectedServices([]);
        setPartyType('');
        setDate('');
        setTime('');
      } else {
        alert(result.message || "❌ Failed to book party");
      }
    } catch (error) {
      console.error("Error booking party:", error);
      alert("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className=" ml-80 min-h-screen w-full bg-white flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🎊 Plan Your Party</h2>

        {/* Party Type */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600 font-semibold">Party Type</label>
          <select
            className="w-full px-4 py-2 border rounded-md text-gray-700"
            value={partyType}
            onChange={(e) => setPartyType(e.target.value)}
          >
            <option value="">-- Choose Type --</option>
            <option value="Birthday">Birthday</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate">Corporate</option>
          </select>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600 font-semibold">Select Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-md text-gray-700"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Time */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600 font-semibold">Select Time Slot</label>
          <select
            className="w-full px-4 py-2 border rounded-md text-gray-700"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">-- Choose Time --</option>
            <option value="10am - 1pm">10am - 1pm</option>
            <option value="2pm - 5pm">2pm - 5pm</option>
            <option value="6pm - 10pm">6pm - 10pm</option>
          </select>
        </div>

        {/* Services with checkboxes */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600 font-semibold">Select Services</label>
          <div className="flex flex-col gap-2">
            {services.map((service) => (
              <label key={service} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => toggleService(service)}
                  className="h-4 w-4 accent-blue-500"
                />
                <span className="text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleBooking}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md mt-4 transition"
        >
          ✅ Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default PartyPage;
