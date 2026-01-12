import { useEffect, useState } from "react";
import api from "../api";

const Gallery = () => {
  const [timeline, setTimeline] = useState([]);

  // Fetch gallery data
  const fetchGallery = async () => {
    try {
      const res = await api.get("/gallery");
      setTimeline(res.data);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-14">
      <h1 className="text-4xl font-bold text-center text-amber-900 mb-16">
        Our Story
        <p className="text-lg text-amber-700 mt-2 max-w-2xl mx-auto">
          Raj’s Cafe began with more than just a love for coffee — it started
          with a dream, courage, and a journey across continents.
        </p>
      </h1>

      <div className="max-w-6xl mx-auto space-y-20">
        {timeline.map((item, index) => {
          const isReverse = index % 2 !== 0;

          return (
            <div
              key={item.id}
              className={`flex flex-col items-center gap-10 md:flex-row ${
                isReverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="h-72 md:h-110 w-full overflow-hidden rounded-2xl shadow-lg bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-amber-800">
                  {item.title}
                </h2>

                {item.year && (
                  <p className="text-sm text-gray-500 mt-1">{item.year}</p>
                )}

                <p className="mt-4 text-gray-700 leading-relaxed text-lg">
                  {item.description || "No description provided."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
