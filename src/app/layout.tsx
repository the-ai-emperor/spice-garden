import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartPopup from "@/components/shared/CartPopup";
import PWAInstallPrompt from "@/components/shared/PWAInstallPrompt";

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
  icons: {
    icon: [
      { url: "/logo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/logo/favicon.ico",
    apple: [
      { url: "/logo/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/logo/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/logo/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/logo/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/logo/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/logo/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/logo/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/logo/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/logo/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/logo/apple-icon-precomposed.png",
      },
      { rel: "msvalidate.01", url: "/browserconfig.xml" }
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Spice Garden",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
