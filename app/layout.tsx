import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // <-- Import Navbar
import { CartProvider } from "@/context/CartContext"; // 🆕 Import CartProvider
import CartDrawer from "@/components/CartDrawer";     // 🆕 Import CartDrawer

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechStore - E-Commerce",
  description: "Buy best tech products online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={`${geist.className} antialiased`}>
        {/* Whole App-ukku Context Provider wrap panrom */}
        <CartProvider>
          <Navbar />
          {children}
          <CartDrawer /> {/* 🆕 Global Cart Drawer */}
        </CartProvider>
      </body>
    </html>
  );
}