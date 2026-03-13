"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { allProducts, categories } from "@/data/products";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const allCategories = ["All", ...categories];

  const filtered = allProducts.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Our Menu
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Every Dish, Crafted with Passion
          </h1>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            From hearty mains to refreshing drinks — browse our full menu and add your favourites to cart.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search dishes, ingredients, or categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 text-sm"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-thin">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20"
                  : "bg-[#111] border border-white/10 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-white/40 text-sm mb-5">
          {filtered.length} {filtered.length === 1 ? "dish" : "dishes"} found
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-white/50 text-lg font-semibold">No dishes found</p>
            <p className="text-white/30 text-sm mt-1">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
