import type { Product } from "./types";

export const burger: Product = {
  slug: "burger",
  name: "Burger",
  shortName: "Burger",
  price: 60,
  thumbnail: "/fast-food/burger-1.jpeg",
  gallery: ["/fast-food/burger-1.jpeg", "/fast-food/burger-2.jpeg", "/fast-food/burger-3.jpeg"],
  description: "Delicious Burger from our Fast Food selection.",
  category: "Fast Food",
  tags: ["fastfood", "snack", "american", "bun", "patty"],
  popular: false,
  featured: true
};
