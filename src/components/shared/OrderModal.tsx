"use client";

import { useState } from "react";
import { X, MapPin, Loader2, ExternalLink, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useLocationStore } from "@/store/locationStore";
import { useOrderHistoryStore } from "@/store/orderHistoryStore";
import { generateWhatsAppUrl } from "@/utils/whatsappOrder";
import { getLocationString } from "@/utils/location";
import { calculateDelivery, calculateGrandTotal } from "@/utils/priceCalculator";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const { savedLocation, setSavedLocation } = useLocationStore();
  const { addOrder } = useOrderHistoryStore();

  const [location, setLocation] = useState(savedLocation || "");
  const [locError, setLocError] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const delivery = calculateDelivery(subtotal);
  const grand = calculateGrandTotal(subtotal);

  if (!isOpen) return null;

  const handleGetLocation = async () => {
    setLocLoading(true);
    setLocError("");
    try {
      const locStr = await getLocationString();
      setLocation(locStr);
    } catch {
      setLocError("Could not access your location. Please enter it manually.");
    } finally {
      setLocLoading(false);
    }
  };

  const handleSaveLocation = () => {
    if (location.trim().length < 10) {
      setLocError("Please enter a more detailed location (min 10 characters).");
      return;
    }
    setSavedLocation(location.trim());
    setSaved(true);
    setLocError("");
    setTimeout(() => setSaved(false), 2000);
  };

  const handleOrder = () => {
    if (location.trim().length < 10) {
      setLocError("Please provide a delivery location (min 10 characters).");
      return;
    }
    addOrder({
      items: items.map((i) => ({
        slug: i.slug,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      totalAmount: grand,
      location: location.trim(),
    });
    const url = generateWhatsAppUrl(items, location.trim(), subtotal);
    clearCart();
    onClose();
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold text-white">Confirm Order</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Order summary */}
        <div className="px-5 pt-4 space-y-1 max-h-36 overflow-y-auto scrollbar-thin">
          {items.map((item) => (
            <div key={item.slug} className="flex justify-between text-sm text-white/70">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="px-5 pb-2 pt-2 border-b border-white/10 space-y-1">
          <div className="flex justify-between text-sm text-white/60">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-white/60">
            <span>Delivery</span>
            <span>{delivery === 0 ? "🎉 Free" : `₹${delivery}`}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-white">
            <span>Total</span>
            <span className="text-orange-400">₹{grand}</span>
          </div>
        </div>

        {/* Location */}
        <div className="p-5 space-y-3">
          <label className="block text-sm font-semibold text-white/80">
            <MapPin className="w-4 h-4 inline mr-1 text-orange-400" />
            Delivery Location
          </label>
          <textarea
            className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500 resize-none"
            rows={3}
            placeholder="Enter your full delivery address…"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setLocError("");
            }}
          />
          {locError && (
            <p className="text-red-400 text-xs">{locError}</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleGetLocation}
              disabled={locLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-sm font-medium py-2.5 rounded-xl transition-all disabled:opacity-50"
            >
              {locLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4" />
              )}
              Use My Location
            </button>
            <button
              onClick={handleSaveLocation}
              className={`flex-1 text-sm font-medium py-2.5 rounded-xl transition-all ${
                saved
                  ? "bg-green-600 text-white"
                  : "bg-white/10 hover:bg-white/15 text-white"
              }`}
            >
              {saved ? "✓ Saved!" : "Save Location"}
            </button>
          </div>

          <button
            onClick={handleOrder}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
