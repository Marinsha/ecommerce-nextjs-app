"use client";

import { use, useState, useEffect } from "react";
import { useCart, Product } from "@/context/CartContext";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15+ Params Promise Unwrap
    const resolvedParams = use(params);
    const productId = resolvedParams.id;

    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products`);
                const json = await res.json();

                // 🟢 FIX: json.data-la dhaan Product Array irukku!
                if (json.success && Array.isArray(json.data)) {
                    const found = json.data.find((p: Product) => p._id === productId);
                    setProduct(found || null);
                } else if (Array.isArray(json)) {
                    // Fallback: direct array-ah vandhaa
                    const found = json.find((p: Product) => p._id === productId);
                    setProduct(found || null);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <p className="text-gray-500 font-medium">Loading product details...</p>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
                <p className="text-gray-500 text-sm mb-6">The item you are looking for does not exist.</p>
                <Link
                    href="/"
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition"
                >
                    Back to Shop
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">

                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-8 transition font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Products
                </Link>

                {/* Detail Card */}
                <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* Image */}
                    <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
                        <img
                            src={product.imageUrl || "https://via.placeholder.com/400"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between h-full py-2">
                        <div>
                            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                                {product.category || "General"}
                            </span>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                            <p className="text-2xl font-black text-gray-900 mb-6">${product.price}</p>

                            <div className="border-t border-b border-gray-100 py-4 mb-6">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={handleAddToCart}
                            className={`w-full py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-sm ${added
                                    ? "bg-green-600 text-white"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                        >
                            {added ? (
                                <>
                                    <Check className="w-5 h-5" /> Added to Cart!
                                </>
                            ) : (
                                <>
                                    <ShoppingBag className="w-5 h-5" /> Add to Cart
                                </>
                            )}
                        </button>
                    </div>

                </div>

            </div>
        </main>
    );
}