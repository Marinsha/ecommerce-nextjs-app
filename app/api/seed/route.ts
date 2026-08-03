import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Products";

const sampleProducts = [
    {
        name: "Wireless Noise Canceling Headphones",
        description: "High quality audio with active noise cancellation and 30-hour battery life.",
        price: 199,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        stock: 15,
    },
    {
        name: "Smart Fitness Watch",
        description: "Tracks heart rate, sleep, steps, and sports activities with AMOLED display.",
        price: 149,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        stock: 25,
    },
    {
        name: "Classic Denim Jacket",
        description: "Stylish and durable denim jacket suitable for all casual outings.",
        price: 79,
        category: "Fashion",
        imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
        stock: 20,
    },
    {
        name: "Cotton Casual T-Shirt",
        description: "100% pure breathable cotton t-shirt designed for everyday comfort.",
        price: 25,
        category: "Fashion",
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
        stock: 40,
    },
    {
        name: "Running Sports Shoes",
        description: "Lightweight and flexible running shoes with high traction sole.",
        price: 120,
        category: "Footwear",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        stock: 12,
    },
    {
        name: "Leather Minimalist Wallet",
        description: "Genuine slim leather wallet with RFID blocking protection.",
        price: 35,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
        stock: 30,
    },
];

export async function GET() {
    try {
        await connectToDatabase();

        // Pazhaiya dummy data-va clear panni, array-la irukra multi-category data-va insert panradhu
        await Product.deleteMany({});
        const insertedProducts = await Product.insertMany(sampleProducts);

        return NextResponse.json({
            success: true,
            message: "Database seeded successfully!",
            count: insertedProducts.length,
            data: insertedProducts,
        });
    } catch (error) {
        console.error("Seeding Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to seed database" },
            { status: 500 }
        );
    }
}