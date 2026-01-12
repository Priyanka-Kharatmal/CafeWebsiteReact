import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3001";

const emptyForm = {
  name: "",
  items: "",
  price: "",
  originalPrice: "",
  image: "",
};

const AdminManageSpecials = () => {
  const [specials, setSpecials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchSpecials();
  }, []);

  const fetchSpecials = async () => {
    const res = await axios.get(`${API}/specials`);
    setSpecials(res.data);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setShowModal(true);
  };

  const openEdit = (s) => {
    setEditingId(s.id);
    setForm({
      name: s.name,
      items: s.items.join(", "),
      price: s.price,
      originalPrice: s.originalPrice,
      image: s.image,
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      image: imageFile ? imageFile.name : form.image,
      items: form.items.split(",").map((i) => i.trim()),
    };

    if (editingId) {
      await axios.put(`${API}/specials/${editingId}`, payload);
    } else {
      await axios.post(`${API}/specials`, payload);
    }

    fetchSpecials();
    setShowModal(false);
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
  };

  const deleteSpecial = async (id) => {
    if (!window.confirm("Delete this special?")) return;
    await axios.delete(`${API}/specials/${id}`);
    fetchSpecials();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Specials</h1>
        <button
          onClick={openAdd}
          className="bg-brown-700 text-black px-4 py-2 rounded"
        >
          + Add Special
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-hidden">
        <div className="grid grid-cols-[80px_2fr_3fr_1fr_1fr] bg-gray-100 font-semibold text-sm">
          <div className="p-3">Image</div>
          <div className="p-3">Name</div>
          <div className="p-3">Items</div>
          <div className="p-3 text-center">Price</div>
          <div className="p-3 text-center">Actions</div>
        </div>

        {specials.map((s) => (
          <div
            key={s.id}
            className="grid grid-cols-[80px_2fr_3fr_1fr_1fr] border-t items-center text-sm"
          >
            <div className="p-2">
              <img
                src={`/specials_images/${s.image}`}
                alt={s.name}
                className="h-12 w-12 object-cover rounded"
              />
            </div>

            <div className="p-3 font-medium">{s.name}</div>
            <div className="p-3">{s.items.join(", ")}</div>
            <div className="p-3 text-center font-semibold">${s.price}</div>

            <div className="p-3 flex justify-center gap-3">
              <button
                onClick={() => openEdit(s)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteSpecial(s.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded w-[420px] space-y-4"
          >
            <h2 className="font-bold text-lg">
              {editingId ? "Edit Special" : "Add Special"}
            </h2>

            <input
              placeholder="Special Name"
              className="border p-2 w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              placeholder="Items (comma separated)"
              className="border p-2 w-full"
              value={form.items}
              onChange={(e) => setForm({ ...form, items: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Original Price"
                className="border p-2"
                value={form.originalPrice}
                onChange={(e) =>
                  setForm({ ...form, originalPrice: e.target.value })
                }
                required
              />

              <input
                placeholder="Special Price"
                className="border p-2"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>

            {/* Image upload */}
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            {/* Image Preview */}
            {(imageFile || form.image) && (
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : `/specials_images/${form.image}`
                }
                alt="preview"
                className="h-24 rounded object-cover"
              />
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2"
              >
                Cancel
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminManageSpecials;
