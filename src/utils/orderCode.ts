/**
 * orderCode.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates and decodes encrypted order codes.
 *
 * A product gets a deterministic serial number based on its index in `allProducts`.
 * The order is encoded as { serialNo: quantity } e.g. { "1": 3, "2": 4 }.
 * This object is AES-encrypted using a build-time key (NEXT_PUBLIC_ORDER_SECRET)
 * and base64url-encoded into a compact printable string.
 *
 * The shopkeeper pastes this code into the Price Calculator → it is decrypted,
 * verified, and the full order details are reconstructed.
 */

import CryptoJS from "crypto-js";
import { allProducts } from "@/data/products";
import type { CartItem } from "@/store/cartStore";

// ─── Secret key from environment ─────────────────────────────────────────────
const SECRET =
  process.env.NEXT_PUBLIC_ORDER_SECRET ?? "SpiceGarden@DefaultKey#Fallback";

// ─── Serial number maps (1-indexed, deterministic) ───────────────────────────
/** slug → serial number */
export const slugToSerial: Record<string, number> = {};
/** serial number → slug */
export const serialToSlug: Record<number, string> = {};

allProducts.forEach((p, index) => {
  const serial = index + 1;
  slugToSerial[p.slug] = serial;
  serialToSlug[serial] = p.slug;
});

// ─── Types ────────────────────────────────────────────────────────────────────
/** Raw payload stored inside the encrypted code */
export interface OrderPayload {
  /** Total quantity ordered (for quick validation) */
  t: number;
  /** Order items: { "serialNo": quantity } */
  i: Record<string, number>;
  /** Unix timestamp (ms) when the code was generated */
  ts: number;
}

export interface DecodedOrderItem {
  serial: number;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  lineTotal: number;
  valid: boolean; // false if serial not found in current product list
}

export interface DecodedOrder {
  items: DecodedOrderItem[];
  subtotal: number;
  timestamp: Date;
  raw: OrderPayload;
}

// ─── Encode ───────────────────────────────────────────────────────────────────
/**
 * Takes cart items and returns a compact encrypted order code string.
 */
export function encodeOrder(cartItems: CartItem[]): string {
  const itemMap: Record<string, number> = {};
  let totalQty = 0;

  for (const item of cartItems) {
    const serial = slugToSerial[item.slug];
    if (serial === undefined) continue; // safety: skip unknown
    itemMap[String(serial)] = item.quantity;
    totalQty += item.quantity;
  }

  const payload: OrderPayload = {
    t: totalQty,
    i: itemMap,
    ts: Date.now(),
  };

  const json = JSON.stringify(payload);
  const encrypted = CryptoJS.AES.encrypt(json, SECRET).toString();

  // Convert to URL/message-safe base64url (no +/=)
  return encrypted
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// ─── Decode ───────────────────────────────────────────────────────────────────
/**
 * Decodes and verifies an order code.
 * Throws if the code is invalid or tampered.
 */
export function decodeOrder(code: string): DecodedOrder {
  // Restore standard base64
  let restored = code.trim().replace(/-/g, "+").replace(/_/g, "/");
  // Pad if needed
  while (restored.length % 4 !== 0) restored += "=";

  let json: string;
  try {
    const bytes = CryptoJS.AES.decrypt(restored, SECRET);
    json = bytes.toString(CryptoJS.enc.Utf8);
    if (!json) throw new Error("Empty decrypt result");
  } catch {
    throw new Error("Invalid order code — decryption failed. Code may be corrupted or key mismatch.");
  }

  let payload: OrderPayload;
  try {
    payload = JSON.parse(json) as OrderPayload;
  } catch {
    throw new Error("Invalid order code — could not parse payload.");
  }

  // Validate structure
  if (
    typeof payload.t !== "number" ||
    typeof payload.i !== "object" ||
    typeof payload.ts !== "number"
  ) {
    throw new Error("Invalid order code — unexpected payload structure.");
  }

  // Reconstruct items
  const items: DecodedOrderItem[] = Object.entries(payload.i).map(
    ([serialStr, qty]) => {
      const serial = Number(serialStr);
      const slug = serialToSlug[serial];
      const product = slug ? allProducts.find((p) => p.slug === slug) : undefined;

      if (product) {
        return {
          serial,
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity: qty,
          lineTotal: product.price * qty,
          valid: true,
        };
      }

      // Serial exists in code but not in current product list
      return {
        serial,
        slug: slug ?? "unknown",
        name: `Unknown Product (#${serial})`,
        price: 0,
        quantity: qty,
        lineTotal: 0,
        valid: false,
      };
    }
  );

  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);

  return {
    items,
    subtotal,
    timestamp: new Date(payload.ts),
    raw: payload,
  };
}
