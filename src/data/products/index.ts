export type { Product } from "./types";
export { butterChicken } from "./butter-chicken";
export { paneerTikkaMasala } from "./paneer-tikka-masala";
export { hyderabadiDumBiryani } from "./hyderabadi-dum-biryani";
export { gardenVegBiryani } from "./garden-veg-biryani";
export { tandooriNaan } from "./tandoori-naan";
export { chickenTikkaStarter } from "./chicken-tikka-starter";
export { dalMakhani } from "./dal-makhani";
export { masalaDosa } from "./masala-dosa";
export { mangolassi } from "./mango-lassi";
export { gulabjamun } from "./gulab-jamun";
export { vegThali } from "./veg-thali";
export { muttonRogan } from "./mutton-rogan-josh";

import type { Product } from "./types";
import { butterChicken } from "./butter-chicken";
import { paneerTikkaMasala } from "./paneer-tikka-masala";
import { hyderabadiDumBiryani } from "./hyderabadi-dum-biryani";
import { gardenVegBiryani } from "./garden-veg-biryani";
import { tandooriNaan } from "./tandoori-naan";
import { chickenTikkaStarter } from "./chicken-tikka-starter";
import { dalMakhani } from "./dal-makhani";
import { masalaDosa } from "./masala-dosa";
import { mangolassi } from "./mango-lassi";
import { gulabjamun } from "./gulab-jamun";
import { vegThali } from "./veg-thali";
import { muttonRogan } from "./mutton-rogan-josh";

export const allProducts: Product[] = [
  butterChicken,
  paneerTikkaMasala,
  hyderabadiDumBiryani,
  gardenVegBiryani,
  tandooriNaan,
  chickenTikkaStarter,
  dalMakhani,
  masalaDosa,
  mangolassi,
  gulabjamun,
  vegThali,
  muttonRogan,
];

export const featuredProducts = allProducts.filter((p) => p.featured);
export const popularProducts = allProducts.filter((p) => p.popular);

export const categories = [...new Set(allProducts.map((p) => p.category))];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((p) => p.category === category);
}
