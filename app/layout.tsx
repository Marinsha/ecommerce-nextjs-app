import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // <-- Import Navbar

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
        <Navbar cartCount={0} /> {/* <-- Add Navbar here */}
        {children}
      </body>
    </html>
  );
}