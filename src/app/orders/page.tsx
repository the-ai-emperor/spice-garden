"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Trash2, Clock, MapPin, RotateCcw, X, Send, Loader2 } from "lucide-react";
import { useOrderHistoryStore, type OrderHistoryItem } from "@/store/orderHistoryStore";
import { generateWhatsAppUrl } from "@/utils/whatsappOrder";
import { getLocationString } from "@/utils/location";
import { calculateGrandTotal } from "@/utils/priceCalculator";
import { useLocationStore } from "@/store/locationStore";
import { allProducts } from "@/data/products";
import type { CartItem } from "@/store/cartStore";
import { ArrowRight } from "lucide-react";

// ── Order Again Modal ────────────────────────────────────────────────────────
function OrderAgainModal({
  order,
  onClose,
}: {
  order: OrderHistoryItem;
  onClose: () => void;
}) {
  const { savedLocation } = useLocationStore();
  const { addOrder } = useOrderHistoryStore();
  const [location, setLocation] = useState(savedLocation || order.location || "");
  const [locLoading, setLocLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const grand = calculateGrandTotal(subtotal);

  const handleGetLocation = async () => {
    setLocLoading(true);
    setError("");
    try {
      const l = await getLocationString();
      setLocation(l);
    } catch {
      setError("Could not get location. Please type your address.");
    } finally {
      setLocLoading(false);
    }
  };

  const handleOrder = () => {
    if (!navigator.onLine) {
      setError("Please enable internet to order.");
      return;
    }
    if (location.trim().length < 8) {
      setError("Please provide a delivery location.");
      return;
    }

    // Build cart-compatible items from history (look up shortName from current products)
    const cartItems: CartItem[] = order.items.map((i) => {
      const product = allProducts.find((p) => p.slug === i.slug);
      return {
        slug: i.slug,
        name: i.name,
        shortName: product?.shortName ?? i.name,
        price: i.price,
        quantity: i.quantity,
        thumbnail: product?.thumbnail ?? "",
      };
    });

    addOrder({
      items: order.items,
      totalAmount: grand,
      location: location.trim(),
    });

    const url = generateWhatsAppUrl(cartItems, location.trim(), subtotal);
    onClose();
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-orange-400" />
            <h2 className="text-white font-bold text-sm">Order Again</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="px-5 py-3 border-b border-white/8 space-y-0.5 max-h-28 overflow-y-auto">
          {order.items.map((item) => (
            <div key={item.slug} className="flex justify-between text-xs text-white/60">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/8 mt-1">
            <span>Total</span>
            <span className="text-orange-400">₹{grand}</span>
          </div>
        </div>

        <div className="px-5 py-4 space-y-3">
          <label className="text-white/60 text-xs font-medium flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-400" /> Delivery Location
          </label>
          <textarea
            rows={3}
            className="w-full bg-white/5 border border-white/10 focus:border-orange-500 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none resize-none"
            placeholder="Your delivery address…"
            value={location}
            onChange={(e) => { setLocation(e.target.value); setError(""); }}
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            onClick={handleGetLocation}
            disabled={locLoading}
            className="w-full flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white py-2.5 rounded-xl text-sm transition-all disabled:opacity-50"
          >
            {locLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
            Use My Location
          </button>

          <button
            onClick={handleOrder}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-orange-500/20"
          >
            <Send className="w-4 h-4" /> Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Orders Page ──────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const { orders, clearHistory } = useOrderHistoryStore();
  const [reorderTarget, setReorderTarget] = useState<OrderHistoryItem | null>(null);

  if (orders.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-6">📋</div>
        <h1 className="text-3xl font-black text-white mb-3">No Orders Yet</h1>
        <p className="text-white/50 mb-8">Your order history will appear here after you place your first order.</p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-7 py-3.5 rounded-xl">
          Start Ordering <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <>
      {reorderTarget && (
        <OrderAgainModal order={reorderTarget} onClose={() => setReorderTarget(null)} />
      )}

      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-white">Order History</h1>
              <p className="text-white/40 text-sm mt-1">{orders.length} past order{orders.length !== 1 ? "s" : ""}</p>
            </div>
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-white/30 hover:text-red-400 text-xs transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Clear history
            </button>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-[#111] border border-white/8 hover:border-white/15 rounded-2xl p-5 space-y-4 transition-colors">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Order #{order.id.split("-")[1]}</p>
                      <p className="flex items-center gap-1 text-white/40 text-xs mt-0.5">
                        <Clock className="w-3 h-3" />
                        {new Date(order.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-orange-400 font-black text-xl">₹{order.totalAmount}</p>
                    <button
                      onClick={() => setReorderTarget(order)}
                      className="flex items-center gap-1.5 bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Order Again
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="bg-white/3 rounded-xl p-3 space-y-1.5">
                  {order.items.map((item) => (
                    <div key={item.slug} className="flex justify-between text-sm">
                      <span className="text-white/70">{item.name} × {item.quantity}</span>
                      <span className="text-white/50">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Location */}
                <div className="flex gap-2 text-xs text-white/40">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{order.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
