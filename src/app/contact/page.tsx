"use client";

import { useState } from "react";
import { Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    const msg = `Hello! I'm ${form.name}${form.phone ? ` (${form.phone})` : ""}.\n\n${form.message}`;
    window.open(
      `https://wa.me/${restaurant.whatsappPhone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Get in Touch
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            We&apos;d Love to Hear from You
          </h1>
          <p className="text-white/50 mt-3 text-base max-w-lg mx-auto">
            Have a question, feedback, or need to place a bulk order? Reach out and we&apos;ll get back to you fast.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-4">
            <div className="bg-[#111] border border-white/8 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Phone & WhatsApp</h3>
                <a href={`tel:${restaurant.phone}`} className="text-white/60 hover:text-orange-400 transition-colors text-sm mt-0.5 block">
                  {restaurant.phone}
                </a>
                <a
                  href={`https://wa.me/${restaurant.whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-green-400 hover:text-green-300 text-xs font-medium transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-[#111] border border-white/8 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Address</h3>
                <p className="text-white/60 text-sm mt-0.5">{restaurant.address}</p>
              </div>
            </div>

            <div className="bg-[#111] border border-white/8 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Opening Hours</h3>
                <p className="text-white/60 text-sm mt-0.5">Mon–Fri: {restaurant.openingHours.weekdays}</p>
                <p className="text-white/60 text-sm">Sat–Sun: {restaurant.openingHours.weekends}</p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/8 h-48">
              <iframe
                src={restaurant.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                title="Spice Garden Location"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#111] border border-white/8 rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-bold text-base">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Rajesh Kumar"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Phone (optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help or share your feedback…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all ${
                  sent
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/20"
                }`}
              >
                {sent ? (
                  "✓ Opening WhatsApp…"
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send via WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
