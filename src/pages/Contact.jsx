import { useState } from "react";
import api from "../api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneno: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      date: new Date().toISOString().split("T")[0], // yyyy-mm-dd
    };

    try {
      await api.post("/contacts", payload);
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", phoneno: "", message: "" });
    } catch (error) {
      setStatus("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <section className="p-8 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-amber-900 mb-6 text-center">
        Contact Us
      </h2>

      <p className="text-center text-gray-700 mb-8">
        Have questions, feedback, or just want to say hi? Fill out the form
        below and we’ll get back to you soon.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          required
        />

        <input
          type="tel"
          name="phoneno"
          value={form.phoneno}
          onChange={handleChange}
          placeholder="Your Phone Number"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          required
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="4"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-amber-700 text-white px-4 py-3 rounded-lg hover:bg-amber-900"
        >
          Send Message
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center font-semibold text-green-700">
          {status}
        </p>
      )}

      <div className="mt-10 text-center text-gray-700">
        <p>📍 123 Coffee Street, JavaTown</p>
        <p>☎️ (123) 456-7890</p>
        <p>📧 contact@raj'scafe.com</p>
      </div>
    </section>
  );
};

export default Contact;
