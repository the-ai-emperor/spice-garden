import type { Product } from "./types";

export const fanta: Product = {
  slug: "fanta",
  name: "Fanta",
  shortName: "Fanta",
  price: 40,
  thumbnail: "/drinks/fanta-xl.jpeg",
  gallery: ["/drinks/fanta-lg.jpeg", "/drinks/fanta-md.jpeg", "/drinks/fanta-sm.jpeg", "/drinks/fanta-xl.jpeg"],
  description: "Delicious Fanta from our Cold Drinks selection.",
  category: "Cold Drinks",
  tags: ["drink", "beverage", "cold", "orange", "soda"],
  popular: false,
  featured: false
};
