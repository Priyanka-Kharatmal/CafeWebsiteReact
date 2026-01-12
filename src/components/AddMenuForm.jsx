import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddMenuForm = ({ onClose = () => {}, onItemAdded = () => {} }) => {
  const [menuName, setMenuName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null); 
  const [imageUrlInput, setImageUrlInput] = useState(""); 
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) {
      setImageFile(null);
      setPreviewUrl("");
      return;
    }
    setImageFile(f);
    const blob = URL.createObjectURL(f);
    setPreviewUrl(blob);
  };

  const clearForm = () => {
    setMenuName("");
    setCategory("");
    setPrice("");
    setImageFile(null);
    setImageUrlInput("");
    setPreviewUrl("");
  };

  const toNumberOrZero = (v) => {
    const n = Number(v);
    return Number.isNaN(n) ? 0 : n;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/menu");
    const data = await res.json();

    const lastId =
      data.length > 0 ? Math.max(...data.map((it) => Number(it.id) || 0)) : 0;
    const nextId = lastId + 1;

    const imageToSave = imageUrlInput
      ? imageUrlInput.trim()
      : imageFile
      ? imageFile.name
      : "";

    const newItem = {
      id: nextId,
      name: menuName.trim(),
      category: category,
      price: toNumberOrZero(price),
      image: imageToSave,
    };

    await fetch("http://localhost:3001/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    clearForm();

    onItemAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Add Menu Item</h2>
          <button
            onClick={() => {
              clearForm();
              onClose();
            }}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          <div className="mb-4">
            <label className="block font-medium mb-1">Menu Name</label>
            <input
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Americano"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              <option value="coffee">Coffee</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              type="number"
              step="0.01"
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. 4.50"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">
              Upload Image (will save filename)
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              After saving, place the uploaded file inside <code>/public/menu_images</code> so it can be shown on the site,
              or paste a full external URL below.
            </p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Image URL (optional)</label>
            <input
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="https://... (optional)"
              className="w-full border rounded px-3 py-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              If you paste an external URL it will be used directly instead of filename.
            </p>
          </div>

          {previewUrl && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Preview</label>
              <img
                src={previewUrl}
                alt="preview"
                className="w-40 h-40 object-cover rounded border"
              />
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                clearForm();
                onClose();
              }}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>

            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Add Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuForm;
