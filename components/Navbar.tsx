"use client";

import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart, toggleCart } = useCart(); // Context-la irundhu cart & toggle function edukkurom
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Total items count calculate panrom


  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:opacity-90 transition">
          <div className="bg-blue-600 text-white p-2 rounded-xl">
            <Store className="w-5 h-5" />
          </div>
          <span>TechStore</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="#" className="hover:text-blue-600 transition">
            Categories
          </Link>
          <Link href="#" className="hover:text-blue-600 transition">
            Deals
          </Link>
        </nav>

        {/* Cart Button with Badge */}
<button 
  onClick={toggleCart} // 🆕 Cart Drawer open/close toggling
  className="relative p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition flex items-center justify-center"
>          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
}