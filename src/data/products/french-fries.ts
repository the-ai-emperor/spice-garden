import type { Product } from "./types";

export const frenchFries: Product = {
  slug: "french-fries",
  name: "French-fries",
  shortName: "French-fries",
  price: 70,
  thumbnail: "/fast-food/french-fries-3.jpeg",
  gallery: ["/fast-food/french-fries-3.jpeg", "/fast-food/french-fries-2.jpeg", "/fast-food/french-fries-1.jpeg"],
  description: "Delicious French-fries from our Fast Food selection.",
  category: "Fast Food",
  tags: ["fastfood", "snack", "potato", "crispy", "salted"],
  popular: false,
  featured: false
};
