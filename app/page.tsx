"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Context-la irundhu global addToCart function-aiyum cart state-aiyum edukkurom
  const { addToCart, cart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Featured Products
          </h1>
          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Items in Cart: {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500 font-medium">Loading products...</p>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found. Add some using Postman!</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col justify-between"
            >
              {/* Product Image Link */}
              <Link href={`/products/${product._id}`} className="block h-48 bg-gray-100 overflow-hidden relative group">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Product Details & Action */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                  
                  {/* Product Title Link */}
                  <Link href={`/products/${product._id}`}>
                    <h2 className="text-lg font-bold text-gray-900 mt-1 hover:text-blue-600 transition-colors">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="text-xl font-extrabold text-gray-900">
                      ${product.price}
                    </p>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium px-4 py-2 rounded-xl text-sm transition-all shadow-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}