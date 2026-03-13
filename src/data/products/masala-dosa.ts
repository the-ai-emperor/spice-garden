import type { Product } from "./types";

export const masalaDosa: Product = {
  slug: "masala-dosa",
  name: "Masala Dosa",
  shortName: "Msla Dosa",
  price: 149,
  thumbnail: "https://images.unsplash.com/photo-1630851840633-f96999247032?w=600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1630851840633-f96999247032?w=900&q=80",
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=900&q=80",
  ],
  description:
    "A golden crispy dosa made from fermented rice-lentil batter, filled with a spiced potato masala tempered with mustard seeds and curry leaves. Served with coconut chutney and hot sambar.",
  category: "South Indian",
  tags: ["veg", "south-indian", "dosa", "breakfast", "crispy"],
  popular: false,
  featured: false,
};
