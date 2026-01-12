import { useCart } from "../components/CartContext";
import CartItem from "../components/CartItem";
import { placeOrder } from "../api.js";
import { useState } from "react";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const [status, setStatus] = useState("");

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  const handleCheckout = async () => {
    try {
      const order = {
        items: cart,
        total,
        date: new Date().toISOString(),
      };

      await placeOrder(order);
      setStatus("✅ Order placed successfully!");
      clearCart();
    } catch (error) {
      setStatus("❌ Failed to place order. Check server.");
    }
  };

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-xl text-gray-500">Your cart is empty ☕</p>
        </div>
      ) : (
        <>
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 font-semibold text-gray-600 border-b pb-3 mb-4">
            <div className="col-span-5">Item</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <CartItem key={idx} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 flex justify-between items-center border-t pt-6">
            <button
              onClick={clearCart}
              className="text-red-600 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-50"
            >
              Empty Cart
            </button>

            <div className="text-right">
              <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
              <button
                onClick={handleCheckout}
                className="mt-3 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {status && (
        <p className="mt-6 text-center font-semibold text-green-700">
          {status}
        </p>
      )}
    </section>
  );
};

export default Cart;
