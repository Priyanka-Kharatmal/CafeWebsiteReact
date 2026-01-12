import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { useSearch } from "../components/SearchContext"; // assume exists

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const { query } = useSearch(); // may be "" if no search

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((r) => r.json())
      .then((data) => setMenu(data))
      .catch(console.error);
  }, []);

    // 🔑 IMAGE RESOLVER
  const resolveImageSrc = (item) => {
    if (!item?.image) return "";
    if (item.image.startsWith("http")) return item.image;
    return `/menu_images/${item.image}`;
  };

  const filteredMenu = menu.filter((item) =>
    (item.name || "").toLowerCase().includes((query || "").toLowerCase())
  );

  return (
    <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {filteredMenu.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </section>
  );
};

export default Menu;
