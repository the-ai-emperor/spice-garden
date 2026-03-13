"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import OrderModal from "./OrderModal";

export default function CartPopup() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const [showPreview, setShowPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (count === 0) return null;

  return (
    <>
      <OrderModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Preview panel */}
      {showPreview && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40 w-80 bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-slide-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-white font-bold text-sm">Cart ({count} items)</span>
            <button onClick={() => setShowPreview(false)}>
              <X className="w-4 h-4 text-white/50 hover:text-white" />
            </button>
          </div>
          <div className="max-h-56 overflow-y-auto px-4 py-2 space-y-2">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{item.name}</p>
                  <p className="text-white/50 text-xs">× {item.quantity} = ₹{item.price * item.quantity}</p>
                </div>
                <button
                  onClick={() => removeItem(item.slug)}
                  className="text-white/30 hover:text-red-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-white/10 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Total</span>
              <span className="text-orange-400 font-bold">₹{totalPrice}</span>
            </div>
            <div className="flex gap-2">
              <Link
                href="/cart"
                className="flex-1 text-center text-xs bg-white/10 hover:bg-white/15 text-white py-2 rounded-lg transition-colors"
                onClick={() => setShowPreview(false)}
              >
                View Cart
              </Link>
              <button
                onClick={() => {
                  setShowPreview(false);
                  setShowModal(true);
                }}
                className="flex-1 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold transition-all"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="relative flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-5 py-3.5 rounded-full shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all hover:scale-105 active:scale-95"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-sm">₹{totalPrice}</span>
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-orange-500 rounded-full text-xs font-black flex items-center justify-center shadow-lg">
            {count}
          </span>
        </button>
      </div>
    </>
  );
}
