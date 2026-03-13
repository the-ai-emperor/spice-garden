"use client";

import { useState } from "react";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { isPincodeServiceable } from "@/data/serviceablePincodes";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<"available" | "unavailable" | null>(null);

  const handleCheck = () => {
    if (pincode.trim().length !== 6) return;
    const available = isPincodeServiceable(pincode.trim());
    setResult(available ? "available" : "unavailable");
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-white/10 rounded-2xl p-6 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
        Check Delivery Availability
      </h3>
      <p className="text-white/50 text-sm mb-5">
        Enter your pincode to check if we deliver to your area.
      </p>

      <div className="flex gap-3">
        <input
          type="text"
          maxLength={6}
          pattern="[0-9]*"
          inputMode="numeric"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ""));
            setResult(null);
          }}
          placeholder="Enter 6-digit pincode"
          className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 text-sm"
        />
        <button
          onClick={handleCheck}
          disabled={pincode.length !== 6}
          className="px-5 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold text-sm disabled:opacity-40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Check
        </button>
      </div>

      {result === "available" && (
        <div className="mt-4 flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
          <div>
            <p className="text-green-400 font-semibold text-sm">Delivery Available! 🎉</p>
            <p className="text-green-400/70 text-xs">We deliver to {pincode}. Order now!</p>
          </div>
        </div>
      )}

      {result === "unavailable" && (
        <div className="mt-4 flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 animate-fade-in">
          <XCircle className="w-5 h-5 text-red-400 shrink-0" />
          <div>
            <p className="text-red-400 font-semibold text-sm">Not Available Yet</p>
            <p className="text-red-400/70 text-xs">We don&apos;t deliver to {pincode} yet. Contact us for updates.</p>
          </div>
        </div>
      )}
    </div>
  );
}
