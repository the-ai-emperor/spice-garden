"use client";

import { useState } from "react";
import { ShoppingCart, Zap, Plus, Minus, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/data/products";
import OrderModal from "@/components/shared/OrderModal";

interface Props {
  product: Product;
}

export default function AddToCartSection({ product }: Props) {
  const { addItem, increaseQuantity, decreaseQuantity, items } = useCartStore();
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const cartItem = items.find((i) => i.slug === product.slug);

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      shortName: product.shortName,
      price: product.price,
      thumbnail: product.thumbnail,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  return (
    <>
      <OrderModal isOpen={orderModalOpen} onClose={() => setOrderModalOpen(false)} />

      <div className="space-y-3 pt-2">
        {cartItem ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white/5 border border-orange-500/30 rounded-xl px-4 py-2.5">
              <button
                onClick={() => decreaseQuantity(product.slug)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-white font-bold text-base w-6 text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(product.slug)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-white/50 text-sm">
              ₹{product.price * cartItem.quantity} in cart
            </span>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all ${
              addedFeedback
                ? "bg-green-500 text-white"
                : "bg-white/10 hover:bg-white/15 text-white border border-white/15"
            }`}
          >
            {addedFeedback ? (
              <>
                <Check className="w-5 h-5" /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </>
            )}
          </button>
        )}

        <button
          onClick={() => {
            if (!cartItem) {
              addItem({
                slug: product.slug,
                name: product.name,
                shortName: product.shortName,
                price: product.price,
                thumbnail: product.thumbnail,
              });
            }
            setOrderModalOpen(true);
          }}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20"
        >
          <Zap className="w-5 h-5" /> Order Now via WhatsApp
        </button>
      </div>
    </>
  );
}
