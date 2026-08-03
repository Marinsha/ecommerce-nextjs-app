"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
// 1. useMemo add panniyulloam
import { useEffect, useState, useMemo } from "react";
// 2. Search icon import panniyulloam
import { Search } from "lucide-react";

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

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

  // Dynamic Categories Extraction
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
    return ["All", ...unique];
  }, [products]);

  // Live Filtered Products Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Featured Products
          </h1>
          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Items in Cart: {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500 font-medium">Loading products...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium text-base mb-1">No products found</p>
            <p className="text-gray-400 text-xs">Try searching for something else or change category filter.</p>
          </div>
        )}

        {/* 3. products.map-ukku badhila filteredProducts.map use panroam */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                    {product.category || "General"}
                  </span>

                  {/* Title Link */}
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