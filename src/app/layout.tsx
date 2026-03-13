import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartPopup from "@/components/shared/CartPopup";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spice Garden — Authentic Indian Cuisine",
  description:
    "Order authentic Indian cuisine online from Spice Garden, Pune. Fresh, flavourful meals delivered to your door. Browse our full menu and order via WhatsApp.",
  keywords: "Indian restaurant, food delivery, Pune, biryani, butter chicken, paneer, order online",
  openGraph: {
    title: "Spice Garden — Authentic Indian Cuisine",
    description: "Premium Indian dining delivered to your door. Order via WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} antialiased bg-[#0d0d0d] text-white`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartPopup />
      </body>
    </html>
  );
}
