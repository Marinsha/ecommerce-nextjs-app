import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db"; // Path sariyaa irukkaa nu paarthukonga
import Product from "@/models/Products";

// 1. GET ALL PRODUCTS
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

// 2. CREATE A NEW PRODUCT
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 400 });
  }
}