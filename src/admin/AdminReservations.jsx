import { useEffect, useState } from "react";
import api from "../api";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    const res = await api.get("/reservations");
    console.log("RES DATA:", res.data);
    setReservations(res.data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Delete reservation
  const handleDelete = async (id) => {
    await api.delete(`/reservations/${id}`);
    fetchReservations();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Reservations Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-black border-collapse text-center">
          <thead>
            <tr className="font-semibold">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Guests</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6">
                  No reservations found
                </td>
              </tr>
            ) : (
              reservations.map((r) => (
                <tr key={r.id}>
                  <td className="border px-4 py-2">{r.date}</td>
                  <td className="border px-4 py-2">{r.name}</td>
                  <td className="border px-4 py-2">{r.guests}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(r.id)}
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

export default AdminReservations;
