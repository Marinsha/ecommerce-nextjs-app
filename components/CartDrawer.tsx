"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { cart, isOpen, toggleCart, removeFromCart, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={toggleCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
            </div>
            <button
              onClick={toggleCart}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 flex-1 overflow-y-auto divide-y divide-gray-100">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 my-12">
                Your cart is empty.
              </p>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl bg-gray-50"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer / Total Price */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Total:</span>
                <span className="text-xl font-extrabold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              {/* Old Button-ukku badhila indha Link wrapper add pannunga */}
<Link
  href="/checkout"
  onClick={toggleCart} // Drawer-a close panni checkout page-ukku pooga
  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-sm"
>
  Proceed to Checkout
</Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}