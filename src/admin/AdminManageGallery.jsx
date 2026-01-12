import { useEffect, useState } from "react";
import api from "../api";

const AdminManageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    id: null,
    title: "",
    image: "", // stores image PATH
    description: "",
  });

  const fetchGallery = async () => {
    try {
      const res = await api.get("/gallery");
      setGallery(res.data);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      if (!files[0]) return;

      // IMPORTANT: image must exist in public/gallery
      setForm({ ...form, image: `/gallery_images/${files[0].name}` });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.image || !form.description) {
      alert("Please fill all fields and add image to public/gallery");
      return;
    }

    const payload = {
      title: form.title,
      image: form.image,
      description: form.description,
    };

    try {
      if (editing) {
        await api.put(`/gallery/${form.id}`, payload);
        setEditing(false);
      } else {
        await api.post("/gallery", payload);
      }

      setForm({ id: null, title: "", image: "", description: "" });
      fetchGallery();
    } catch (err) {
      console.error("Failed to save gallery item:", err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      title: item.title,
      image: item.image,
      description: item.description,
    });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await api.delete(`/gallery/${id}`);
      fetchGallery();
    } catch (err) {
      console.error("Failed to delete gallery item:", err);
    }
  };

  return (
    <div className="flex-1 px-8 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Gallery</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 bg-white shadow rounded-lg flex flex-col md:flex-row gap-4 items-center"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded px-3 py-2 flex-1"
        />

        <button
          type="submit"
          className={`px-4 py-2 rounded text-white font-semibold ${
            editing
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {editing ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {gallery.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-36 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {gallery.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No gallery items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageGallery;

