import type { Product } from "./types";

export const mountainDew: Product = {
  slug: "mountain-dew",
  name: "Mountain Dew",
  shortName: "Mountain Dew",
  price: 40,
  thumbnail: "/drinks/dew-xl.jpeg",
  gallery: ["/drinks/dew-xl.jpeg", "/drinks/dew-md.jpeg", "/drinks/dew-sm.jpeg", "/drinks/dew-lg.jpeg"],
  description: "Delicious Mountain Dew from our Cold Drinks selection.",
  category: "Cold Drinks",
  tags: ["drink", "beverage", "cold", "citrus", "caffeine"],
  popular: false,
  featured: false
};
