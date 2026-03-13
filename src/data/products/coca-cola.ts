import type { Product } from "./types";

export const cocaCola: Product = {
  slug: "coca-cola",
  name: "Coca-cola",
  shortName: "Coca-cola",
  price: 40,
  thumbnail: "/drinks/coke-lg.jpeg",
  gallery: ["/drinks/coke-lg.jpeg", "/drinks/coke-md.jpeg", "/drinks/coke-sm.jpeg", "/drinks/coke-xl.jpeg"],

  description: "Delicious Coca-cola from our Cold Drinks selection.",
  category: "Cold Drinks",
  tags: ["drink", "beverage", "cold", "cola", "soda"],
  popular: false,
  featured: false
};
