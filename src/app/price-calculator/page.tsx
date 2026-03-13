"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconLock,
  IconLockOpen,
  IconShieldCheck,
  IconShieldX,
  IconCopy,
  IconCheck,
  IconClockHour4,
  IconAlertTriangle,
  IconPackage,
} from "@tabler/icons-react";
import { decodeOrder, type DecodedOrder } from "@/utils/orderCode";
import { restaurant } from "@/data/restaurant";
import { calculateDelivery, calculateGrandTotal } from "@/utils/priceCalculator";

export default function PriceCalculatorPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<DecodedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const delivery = result ? calculateDelivery(result.subtotal) : 0;
  const grand = result ? calculateGrandTotal(result.subtotal) : 0;
  const hasInvalid = result?.items.some((i) => !i.valid);

  const handleDecode = () => {
    setError(null);
    setResult(null);
    setLoading(true);
    setTimeout(() => {
      try {
        setResult(decodeOrder(code));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to decode order code.");
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const handleCopySummary = () => {
    if (!result) return;
    const lines = result.items
      .filter((i) => i.valid)
      .map((i) => `${i.name} × ${i.quantity} = ${restaurant.currency}${i.lineTotal}`);
    const text = [
      `📋 Order Summary`,
      ...lines,
      ``,
      `Subtotal: ${restaurant.currency}${result.subtotal}`,
      `Delivery: ${delivery === 0 ? "Free" : `${restaurant.currency}${delivery}`}`,
      `Grand Total: ${restaurant.currency}${grand}`,
      `Order Time: ${result.timestamp.toLocaleString("en-IN")}`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-6 transition-colors">
          <IconArrowLeft size={15} /> Back
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
            <IconLock size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">Order Code Decoder</h1>
              <span className="text-[10px] bg-orange-500/15 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full font-semibold">
                Shopkeeper
              </span>
            </div>
            <p className="text-white/35 text-xs mt-0.5">Paste the order code from a WhatsApp message to decode and verify the order.</p>
          </div>
        </div>

        {/* ─ Input ─ */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-4 mb-4 space-y-3">
          <textarea
            className="w-full bg-[#0d0d0d] border border-white/10 hover:border-white/20 focus:border-orange-500 rounded-xl px-4 py-3 text-white placeholder-white/20 text-xs font-mono leading-relaxed focus:outline-none resize-none scrollbar-thin transition-colors"
            rows={3}
            placeholder="Paste encrypted order code here…"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(null); setResult(null); }}
          />
          <button
            onClick={handleDecode}
            disabled={!code.trim() || loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-lg shadow-orange-500/15"
          >
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Decoding…</>
              : <><IconLockOpen size={16} />Decode & Verify</>
            }
          </button>
        </div>

        {/* ─ Error ─ */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3 animate-fade-in mb-4">
            <IconShieldX size={18} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-bold text-sm">Verification Failed</p>
              <p className="text-red-400/70 text-xs mt-0.5 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* ─ Results ─ */}
        {result && (
          <div className="space-y-3 animate-slide-up">

            {/* 1. Verified banner */}
            <div className={`rounded-2xl p-4 flex items-center gap-3 ${hasInvalid ? "bg-yellow-500/10 border border-yellow-500/20" : "bg-green-500/10 border border-green-500/20"}`}>
              {hasInvalid
                ? <IconAlertTriangle size={18} className="text-yellow-400 shrink-0" />
                : <IconShieldCheck size={18} className="text-green-400 shrink-0" />
              }
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm ${hasInvalid ? "text-yellow-400" : "text-green-400"}`}>
                  {hasInvalid ? "Verified — check flagged items" : "Order Verified ✓"}
                </p>
                <p className={`text-xs mt-0.5 ${hasInvalid ? "text-yellow-400/60" : "text-green-400/60"}`}>
                  {hasInvalid ? "Some products no longer exist in the menu." : "Signature valid. Order has not been tampered with."}
                </p>
              </div>
              <div className="flex items-center gap-1 text-white/30 text-[11px] shrink-0">
                <IconClockHour4 size={12} />
                {result.timestamp.toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })}
              </div>
            </div>

            {/* 2. Bill Summary — at top so shopkeeper sees total immediately */}
            <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/8 flex items-center justify-between">
                <p className="text-white font-bold text-sm">Bill Summary</p>
                <button
                  onClick={handleCopySummary}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${copied ? "bg-green-500/20 text-green-400" : "bg-white/8 hover:bg-white/12 text-white/50 hover:text-white"}`}
                >
                  {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="px-5 py-4 space-y-2">
                <div className="flex justify-between text-sm text-white/50">
                  <span>Subtotal ({result.items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>{restaurant.currency}{result.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-white/50">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? "text-green-400 font-medium" : ""}>{delivery === 0 ? "Free 🎉" : `${restaurant.currency}${delivery}`}</span>
                </div>
                {result.subtotal < restaurant.freeDeliveryAbove && (
                  <p className="text-orange-400/50 text-xs">{restaurant.currency}{restaurant.freeDeliveryAbove - result.subtotal} more for free delivery</p>
                )}
                <div className="border-t border-white/10 pt-2.5 flex justify-between items-center">
                  <span className="text-white font-bold">Grand Total</span>
                  <span className="text-orange-400 font-black text-2xl">{restaurant.currency}{grand}</span>
                </div>
              </div>
            </div>

            {/* 3. Items table */}
            <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8">
                <IconPackage size={15} className="text-orange-400" />
                <span className="text-white font-bold text-sm">Items ({result.items.length})</span>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-3 px-5 py-2 border-b border-white/5 text-[10px] font-semibold text-white/25 uppercase tracking-widest">
                <span>#</span>
                <span>Product</span>
                <span className="text-right">Qty</span>
                <span className="text-right">Unit</span>
                <span className="text-right">Total</span>
              </div>

              {result.items.map((item, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-3 px-5 py-3 border-b border-white/5 last:border-0 items-center ${!item.valid ? "bg-red-500/5" : "hover:bg-white/2 transition-colors"}`}
                >
                  <span className={`text-xs font-mono font-bold w-5 text-center ${item.valid ? "text-orange-400/60" : "text-red-400/60"}`}>
                    {item.serial}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium truncate ${item.valid ? "text-white" : "text-red-400"}`}>{item.name}</p>
                    {!item.valid && <p className="text-red-400/50 text-[10px]">⚠ Not in menu</p>}
                  </div>
                  <span className="text-white/50 text-sm text-right">×{item.quantity}</span>
                  <span className="text-white/40 text-sm text-right">{item.valid ? `${restaurant.currency}${item.price}` : "—"}</span>
                  <span className={`font-bold text-sm text-right ${item.valid ? "text-orange-400" : "text-red-400/50"}`}>
                    {item.valid ? `${restaurant.currency}${item.lineTotal}` : "—"}
                  </span>
                </div>
              ))}
            </div>

            {/* 4. Debug — collapsed by default */}
            <details className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
              <summary className="px-5 py-3 cursor-pointer text-white/25 hover:text-white/40 text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 select-none">
                <IconLock size={12} /> Raw payload
              </summary>
              <pre className="px-5 py-4 text-white/25 text-[11px] font-mono leading-relaxed border-t border-white/8 overflow-x-auto scrollbar-thin">
                {JSON.stringify(result.raw, null, 2)}
              </pre>
            </details>

          </div>
        )}
      </div>
    </div>
  );
}
