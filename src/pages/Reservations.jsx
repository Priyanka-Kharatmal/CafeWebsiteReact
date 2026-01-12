import { useState } from "react";
import { makeReservations } from "../api.js";



const Reservations = () => {
  const [form, setForm] = useState({ name: "", date: "", guests: 1 });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await makeReservations(form);
    alert("Reservation successful!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="w-full p-2 mb-3 border rounded" />
      <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
      <input type="number" name="guests" value={form.guests} onChange={handleChange} min="1" className="w-full p-2 mb-3 border rounded" />
      <button type="submit" className="bg-amber-700 text-white px-4 py-2 rounded-xl w-full">Reserve</button>
    </form>
  );
};

export default Reservations;
