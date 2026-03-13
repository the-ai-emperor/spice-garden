import type { Product } from "./types";

export const chickenTikkaStarter: Product = {
  slug: "chicken-tikka-starter",
  name: "Chicken Tikka Starter",
  shortName: "Chkn Tikka",
  price: 279,
  thumbnail: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=900&q=80",
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=900&q=80",
  ],
  description:
    "Juicy chicken pieces marinated overnight in spiced yoghurt and cooked in a roaring tandoor until smoky and slightly charred. Served with mint chutney, lemon wedges, and sliced onions. A crowd favourite.",
  category: "Starters",
  tags: ["non-veg", "starter", "chicken", "tandoor", "popular"],
  badge: "Fan Favourite",
  popular: true,
  featured: false,
};
