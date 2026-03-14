import type { Product } from "./types";

export const pepsi: Product = {
  slug: "pepsi",
  name: "Pepsi",
  shortName: "Pepsi",
  price: 40,
  thumbnail: "/drinks/pepsi-sm.jpeg",
  gallery: ["/drinks/pepsi-sm.jpeg", "/drinks/pepsi-lg.jpeg", "/drinks/pepsi-xl.jpeg"],
  description: "Delicious Pepsi from our Cold Drinks selection.",
  category: "Cold Drinks",
  tags: ["drink", "beverage", "cold", "cola", "soda"],
  popular: false,
  featured: false
};
