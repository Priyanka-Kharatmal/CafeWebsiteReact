import { useCart } from "./CartContext";

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useCart();

  return (
    <div className="grid grid-cols-12 gap-4 items-center bg-white shadow-sm rounded-xl p-4">
      {/* Item Name */}
      <div className="col-span-5 font-medium">{item.name}</div>

      {/* Quantity Controls */}
      <div className="col-span-3 flex justify-center items-center gap-3">
        <button
          onClick={() => updateQty(item.id, item.qty - 1)}
          className="w-8 h-8 rounded-full border hover:bg-gray-100"
        >
          −
        </button>

        <span className="font-semibold">{item.qty}</span>

        <button
          onClick={() => updateQty(item.id, item.qty + 1)}
          className="w-8 h-8 rounded-full border hover:bg-gray-100"
        >
          +
        </button>
      </div>

      {/* Price */}
      <div className="col-span-2 text-right">
        ${Number(item.price).toFixed(2)}
      </div>

      {/* Item Total + Remove */}
      <div className="col-span-2 text-right flex justify-end gap-3 items-center">
        <span className="font-semibold">
          ${(item.price * item.qty).toFixed(2)}
        </span>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;
