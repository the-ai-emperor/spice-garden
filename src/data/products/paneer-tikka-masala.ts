import type { Product } from "./types";

export const paneerTikkaMasala: Product = {
  slug: "paneer-tikka-masala",
  name: "Paneer Tikka Masala",
  shortName: "Pnr Tikka",
  price: 289,
  thumbnail: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900&q=80",
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=900&q=80",
  ],
  description:
    "Succulent grilled paneer cubes in a bold, smoky tomato-onion masala. The paneer is first marinated in yoghurt and spices, flame-grilled to perfection, then dunked in our delicious tikka masala gravy.",
  category: "Main Course",
  tags: ["popular", "veg", "paneer", "curry", "bestseller"],
  badge: "Bestseller",
  popular: true,
  featured: true,
};
