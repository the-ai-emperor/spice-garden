import type { CartItem } from "@/store/cartStore";
import { restaurant } from "@/data/restaurant";
import { encodeOrder } from "@/utils/orderCode";

export function generateWhatsAppOrderMessage(
  items: CartItem[],
  location: string,
  totalPrice: number
): string {
  const orderCode = encodeOrder(items);

  const orderLines = items
    .map(
      (item) =>
        `• ${item.shortName} ×${item.quantity} = ${restaurant.currency}${item.price * item.quantity}`
    )
    .join("\n");

  const deliveryCharge =
    totalPrice >= restaurant.freeDeliveryAbove
      ? "Free"
      : `${restaurant.currency}${restaurant.deliveryCharge}`;

  const grandTotal =
    totalPrice >= restaurant.freeDeliveryAbove
      ? totalPrice
      : totalPrice + restaurant.deliveryCharge;

  const message =
    `*${restaurant.name} — New Order*\n` +
    `\n` +
    `*Items:*\n` +
    `${orderLines}\n` +
    `\n` +
    `Subtotal: ${restaurant.currency}${totalPrice}\n` +
    `Delivery: ${deliveryCharge}\n` +
    `*Total: ${restaurant.currency}${grandTotal}*\n` +
    `\n` +
    `* Location:*\n` +
    `${location}\n` +
    `\n` +
    `${new Date().toLocaleString("en-IN")}\n` +
    `\n` +
    `${orderCode}`;

  return message;
}

export function generateWhatsAppUrl(
  items: CartItem[],
  location: string,
  totalPrice: number
): string {
  const message = generateWhatsAppOrderMessage(items, location, totalPrice);
  return `https://wa.me/${restaurant.whatsappPhone}?text=${encodeURIComponent(message)}`;
}
