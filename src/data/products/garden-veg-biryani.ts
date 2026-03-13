import type { Product } from "./types";

export const gardenVegBiryani: Product = {
  slug: "garden-veg-biryani",
  name: "Garden Veg Biryani",
  shortName: "Veg Biryani",
  price: 259,
  thumbnail: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=80",
  ],
  description:
    "A fragrant vegetable biryani packed with seasonal vegetables, warm spices, and fluffy basmati rice. Layered with fried onions, fresh mint, and saffron-infused milk for a rich aroma. Served with cooling boondi raita.",
  category: "Biryani",
  tags: ["veg", "biryani", "rice", "vegetables", "healthy"],
  badge: "Vegan Friendly",
  popular: false,
  featured: false,
};
