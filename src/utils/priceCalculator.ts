import { allProducts } from "@/data/products";
import { restaurant } from "@/data/restaurant";

export function calculateProductTotal(slug: string, quantity: number): number {
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return 0;
  return product.price * quantity;
}

export function calculateDelivery(subtotal: number): number {
  return subtotal >= restaurant.freeDeliveryAbove ? 0 : restaurant.deliveryCharge;
}

export function calculateGrandTotal(subtotal: number): number {
  return subtotal + calculateDelivery(subtotal);
}

export function formatPrice(amount: number): string {
  return `${restaurant.currency}${amount.toLocaleString("en-IN")}`;
}
