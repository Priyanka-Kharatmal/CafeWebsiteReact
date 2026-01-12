import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const AdminManageMenu = () => {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  // pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- FETCH DATA ---------------- */
  const fetchMenu = async () => {
    const res = await fetch("http://localhost:3001/menu");
    const data = await res.json();
    setMenu(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  /* ---------------- IMAGE RESOLVER ---------------- */
  const resolveImageSrc = (item) => {
    if (!item?.image) return "";
    if (item.image.startsWith("http")) return item.image;
    return `/menu_images/${item.image}`;
  };

  /* ---------------- FILTER + PAGINATION ---------------- */
  console.log("Selected category:", selectedCategory);
  console.log(
    "Menu categories:",
    menu.map((m) => m.category)
  );

  const filteredMenu =
    selectedCategory === "all"
      ? menu
      : menu.filter(
          (m) =>
            String(m.category) === selectedCategory ||
            String(categories.find((c) => c.name === m.category)?.id) ===
              selectedCategory
        );

  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

  const paginatedMenu = filteredMenu.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ---------------- MODAL HANDLERS ---------------- */
  const openAddModal = () => {
    setEditItem(null);
    setFormData({ name: "", category: "", price: "", image: "" });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editItem) {
      await fetch(`http://localhost:3001/menu/${editItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      const res = await fetch("http://localhost:3001/menu");
      const data = await res.json();
      const nextId =
        data.length > 0 ? Math.max(...data.map((i) => Number(i.id))) + 1 : 1;

      await fetch("http://localhost:3001/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: nextId }),
      });
    }

    setShowModal(false);
    fetchMenu();
  };

  const deleteMenu = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;

    await fetch(`http://localhost:3001/menu/${id}`, {
      method: "DELETE",
    });
    fetchMenu();
  };

  // ✅ FIXED CATEGORY DELETE HANDLER
  const deleteCategory = async (id) => {
    console.log("Deleting category:", id);

    if (!window.confirm("Delete this category?")) return;

    await fetch(`http://localhost:3001/categories/${id}`, {
      method: "DELETE",
    });

    // 🔥 IMPORTANT: update state immediately
    setCategories((prev) => prev.filter((c) => c.id !== id));

    // optional: reset filter if deleted category was selected
    if (selectedCategory !== "all") {
      setSelectedCategory("all");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl font-bold mb-6">Manage Menu</h1>

      <p className="font-semibold mb-4">Total no of Menu : {menu.length}</p>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md"
        >
          <FaPlus /> Add Menu
        </button>

        <button
          onClick={() => setShowCategoryModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md"
        >
          <FaPlus /> Categories
        </button>
      </div>

      {/* CATEGORY FILTER */}
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-gray-300 px-4 py-1 rounded"
        >
          <option value="all">All Categories</option>

          {categories.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full border border-black text-center">
          <thead>
            <tr className="border border-black">
              <th className="border px-3 py-2">id</th>
              <th className="border px-3 py-2">name</th>
              <th className="border px-3 py-2">category</th>
              <th className="border px-3 py-2">price</th>
              <th className="border px-3 py-2">img</th>
              <th className="border px-3 py-2">btns</th>
            </tr>
          </thead>

          <tbody>
            {paginatedMenu.map((item) => (
              <tr key={item.id} className="border h-12">
                <td className="border">{item.id}</td>
                <td className="border">{item.name}</td>
                <td className="border">{item.category}</td>
                <td className="border">{item.price}</td>
                <td className="border">
                  {resolveImageSrc(item) ? (
                    <img
                      src={resolveImageSrc(item)}
                      className="w-10 h-10 mx-auto object-cover"
                      alt={item.name}
                    />
                  ) : (
                    <span className="text-xs text-gray-500">no image</span>
                  )}
                </td>
                <td className="border space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="bg-green-500 text-white px-2 py-1 text-xs rounded"
                  >
                    Edit
                  </button>
                  <button
                    disabled={!item.id}
                    onClick={() => deleteMenu(item.id)}
                    className="bg-red-600 text-white px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {paginatedMenu.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4">
                  No menu items
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-gray-600 text-white" : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ---------------- ADD / EDIT MENU MODAL ---------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">
              {editItem ? "Edit Menu" : "Add Menu"}
            </h2>

            {/* NAME */}
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Menu Name"
              className="w-full border p-2 mb-3"
              required
            />

            {/* CATEGORY */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 mb-3"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* PRICE */}
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2 mb-3"
              required
            />

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 mb-3"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files[0]?.name || "",
                })
              }
            />

            {/* IMAGE PREVIEW */}
            {formData.image && (
              <img
                src={`/menu_images/${formData.image}`}
                alt="preview"
                className="w-20 h-20 object-cover mb-3"
              />
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- CATEGORIES MODAL ---------------- */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

            {/* List existing categories */}
            <ul className="mb-4 max-h-40 overflow-y-auto">
              {categories.map((c) => (
                <li
                  key={c.id}
                  className="flex justify-between items-center mb-2 border-b pb-1"
                >
                  <span>{c.name}</span>
                  <button
                    onClick={() => deleteCategory(c.id)}
                    className="bg-red-600 text-white px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                </li>
              ))}

              {categories.length === 0 && (
                <li className="text-gray-500 text-sm">No categories found</li>
              )}
            </ul>

            {/* Add new category */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="New Category"
                className="border p-2 flex-1 rounded"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                onClick={async () => {
                  if (!newCategory) return;
                  const newCat = { id: Date.now(), name: newCategory };
                  await fetch("http://localhost:3001/categories", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newCat),
                  });
                  setNewCategory("");
                  fetchCategories();
                }}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>

            <button
              onClick={() => setShowCategoryModal(false)}
              className="bg-gray-400 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageMenu;
