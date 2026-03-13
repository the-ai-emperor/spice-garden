"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { calculateDelivery, calculateGrandTotal } from "@/utils/priceCalculator";
import { restaurant } from "@/data/restaurant";
import OrderModal from "@/components/shared/OrderModal";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const delivery = calculateDelivery(subtotal);
  const grand = calculateGrandTotal(subtotal);

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="text-3xl font-black text-white mb-3">Your Cart is Empty</h1>
        <p className="text-white/50 mb-8">
          Looks like you haven&apos;t added any delicious items yet!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-7 py-3.5 rounded-xl"
        >
          Browse Menu <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <OrderModal isOpen={orderModalOpen} onClose={() => setOrderModalOpen(false)} />

      <div className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-white">Your Cart</h1>
              <p className="text-white/40 text-sm mt-1">
                {items.reduce((s, i) => s + i.quantity, 0)} items · ₹{subtotal}
              </p>
            </div>
            <button
              onClick={() => setOrderModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-orange-500/20 hover:scale-105 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              Order Now
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="bg-[#111] border border-white/8 rounded-2xl p-4 flex gap-4 items-center"
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm leading-tight mb-0.5 truncate">
                      {item.name}
                    </h3>
                    <p className="text-white/40 text-xs">₹{item.price} each</p>
                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.slug)}
                        className="w-7 h-7 rounded-lg bg-white/8 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white font-bold text-sm w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.slug)}
                        className="w-7 h-7 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-orange-400 font-black text-base">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item.slug)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <button
                  onClick={() => clearCart()}
                  className="text-white/30 hover:text-red-400 text-xs transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear cart
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#111] border border-white/8 rounded-2xl p-5 sticky top-24 space-y-4">
                <h2 className="text-white font-bold text-base">Order Summary</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>
                      Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)
                    </span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? "text-green-400" : ""}>
                      {delivery === 0 ? "Free 🎉" : `₹${delivery}`}
                    </span>
                  </div>
                  {subtotal < restaurant.freeDeliveryAbove && (
                    <p className="text-orange-400/70 text-xs">
                      Add ₹{restaurant.freeDeliveryAbove - subtotal} more for free delivery!
                    </p>
                  )}
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-orange-400 font-black text-xl">₹{grand}</span>
                </div>

                <button
                  onClick={() => setOrderModalOpen(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20"
                >
                  Proceed to Order
                </button>

                <Link
                  href="/products"
                  className="block text-center text-white/40 hover:text-white text-xs transition-colors"
                >
                  + Add more items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
