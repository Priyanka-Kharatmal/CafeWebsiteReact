import { useCart } from "./CartContext";

const resolveImageSrc = (image) => {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  return `/menu_images/${image}`;
};

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition">
      <img
        src={resolveImageSrc(item.image)}
        alt={item.name}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={(e) => {
          e.target.src = "/menu_images/placeholder.png";
        }}
      />

      <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
      <p className="text-gray-600">${item.price}</p>

      <button
        // onClick={() => addToCart(item)}
        onClick={() =>
          addToCart({
            id: item.id,
            name: item.name,
            price: Number(item.price),
            image: item.image,
          })
        }
        className="bg-amber-700 text-white px-4 py-2 mt-2 rounded-xl hover:bg-amber-900"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuCard;
