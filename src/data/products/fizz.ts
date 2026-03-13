import type { Product } from "./types";

export const fizz: Product = {
  slug: "fizz",
  name: "Fizz",
  shortName: "Fizz",
  price: 40,
  thumbnail: "/drinks/fizz-xl.jpeg",
  gallery: ["/drinks/fizz-xl.jpeg", "/drinks/fizz-md.jpeg", "/drinks/fizz-sm.jpeg"],
  description: "Delicious Fizz from our Cold Drinks selection.",
  category: "Cold Drinks",
  tags: ["drink", "beverage", "cold", "apple", "soda"],
  popular: false,
  featured: true
};
