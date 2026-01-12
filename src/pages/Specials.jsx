import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../components/CartContext";

const API = "http://localhost:3001";

const Specials = () => {
  const [specials, setSpecials] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${API}/specials`).then((res) => setSpecials(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🔥 Today’s Specials</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {specials.map((s) => (
          <div
            key={s.id}
            className="bg-white shadow-lg rounded-xl flex flex-col items-center p-4 hover:shadow-xl transition"
          >
            {/* Square Image */}
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={`/specials_images/${s.image}`}
                alt={s.name}
                className="w-40 h-40 object-contain"
                onError={(e) => {
                  e.target.src = "/specials_images/placeholder.jpg";
                }}
              />
            </div>

            {/* Name & Items */}
            <h2 className="font-bold text-lg mt-3 text-center">{s.name}</h2>
            <p className="text-sm text-gray-600 text-center mt-1">
              {s.items.join(" + ")}
            </p>

            {/* Price */}
            <div className="mt-3 flex items-center gap-2">
              <span className="line-through text-gray-400">
                ${s.originalPrice}
              </span>
              <span className="text-black-600 font-bold text-xl">
                ${s.price}
              </span>
            </div>

            <button
              onClick={() =>
                addToCart({
                  id: s.id,
                  name: s.name,
                  price: Number(s.price), // force number
                  image: s.image,
                })
              }
              className="bg-amber-700 text-white px-4 py-2 mt-2 rounded-xl hover:bg-amber-900"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specials;
