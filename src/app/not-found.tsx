import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
      <div className="text-8xl mb-6 animate-float">🍽️</div>
      <h1 className="text-5xl font-black text-white mb-3">404</h1>
      <p className="text-2xl font-bold text-white/70 mb-2">Page Not Found</p>
      <p className="text-white/40 text-base mb-8 max-w-sm">
        Looks like this page has gone missing — just like the last piece of Butter Chicken.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:scale-105 transition-all"
        >
          <ChefHat className="w-4 h-4" /> Back to Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold px-7 py-3.5 rounded-xl transition-all"
        >
          Browse Menu
        </Link>
      </div>
    </div>
  );
}
