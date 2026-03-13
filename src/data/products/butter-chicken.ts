import type { Product } from "./types";

export const butterChicken: Product = {
  slug: "butter-chicken",
  name: "Butter Chicken",
  shortName: "Butter Chkn",
  price: 329,
  thumbnail: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=900&q=80",
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=900&q=80",
    "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=900&q=80",
  ],
  description:
    "A rich, velvety tomato-based curry with tender chicken pieces simmered in a luscious blend of butter, cream, and aromatic spices. Our signature dish, perfected over 15 years. Served with two pieces of naan or steamed rice.",
  category: "Main Course",
  tags: ["popular", "non-veg", "curry", "chicken", "bestseller"],
  badge: "Bestseller",
  popular: true,
  featured: true,
};
