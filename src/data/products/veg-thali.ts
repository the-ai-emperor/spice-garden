import type { Product } from "./types";

export const vegThali: Product = {
  slug: "veg-thali",
  name: "Royal Veg Thali",
  shortName: "Veg Thali",
  price: 349,
  thumbnail: "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=900&q=80",
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=900&q=80",
  ],
  description:
    "A royal spread on a single thali: Dal Makhani, Paneer Sabzi, two rotis, steamed rice, raita, pickle, papad, and a sweet. A complete, satisfying Indian meal in one perfect, value-packed platter.",
  category: "Combos",
  tags: ["veg", "thali", "combo", "complete-meal", "value"],
  badge: "Best Value",
  popular: true,
  featured: true,
};
