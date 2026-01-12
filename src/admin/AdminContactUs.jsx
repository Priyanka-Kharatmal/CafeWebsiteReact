import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import api from "../api";

const AdminContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch contacts
  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete contact
  const handleDelete = async (id) => {
    await api.delete(`/contacts/${id}`);
    fetchContacts();
  };

  // Filter by date
  const filteredContacts = selectedDate
    ? contacts.filter((c) => c.date === selectedDate)
    : contacts;

  // Today count
  const today = new Date().toISOString().split("T")[0];
  const todayCount = contacts.filter((c) => c.date === today).length;

  return (
    <div className="flex-1 px-8 py-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      {/* Counts + Date Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <p className="font-semibold">
            Total no of Contacts :
            <span className="font-normal ml-2">{contacts.length}</span>
          </p>

          <p className="font-semibold">
            Today’s Contacts :
            <span className="font-normal ml-2">{todayCount}</span>
          </p>
        </div>

        <div className="flex justify-end">
          <div className="relative w-60">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-gray-300 px-4 py-2 rounded-lg"
            />
            <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-700 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-black border-collapse text-center">
          <thead>
            <tr className="font-semibold text-lg">
              <th className="border px-4 py-2">date</th>
              <th className="border px-4 py-2">name</th>
              <th className="border px-4 py-2">email</th>
              <th className="border px-4 py-2">phoneno</th>
              <th className="border px-4 py-2">message</th>
              <th className="border px-4 py-2">btns</th>
            </tr>
          </thead>

          <tbody>
            {filteredContacts.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6">
                  No contacts found
                </td>
              </tr>
            ) : (
              filteredContacts.map((c) => (
                <tr key={c.id}>
                  <td className="border px-4 py-2">{c.date}</td>
                  <td className="border px-4 py-2">{c.name}</td>
                  <td className="border px-4 py-2">{c.email}</td>
                  <td className="border px-4 py-2">{c.phoneno}</td>
                  <td className="border px-4 py-2">{c.message}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContactUs;
