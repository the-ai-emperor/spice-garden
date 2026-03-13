"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
}

export default function ProductCard({ product, showBadge = true }: ProductCardProps) {
  const { addItem, items } = useCartStore();

  const inCart = items.find((i) => i.slug === product.slug);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      slug: product.slug,
      name: product.name,
      shortName: product.shortName,
      price: product.price,
      thumbnail: product.thumbnail,
    });
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {showBadge && product.badge && (
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                {product.badge}
              </span>
            )}
            {product.popular && (
              <span className="bg-yellow-500/90 text-black text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-black" /> Popular
              </span>
            )}
          </div>
          {/* Category */}
          <div className="absolute top-3 right-3">
            <span className="bg-black/60 backdrop-blur-sm text-white/70 text-[10px] px-2.5 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm leading-snug mb-1 group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-white/40 text-xs line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-orange-400 font-black text-base">
              ₹{product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all ${
                inCart
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                  : "bg-white/8 hover:bg-orange-500 text-white hover:text-white border border-white/10 hover:border-orange-500"
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {inCart ? `In Cart (${inCart.quantity})` : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
