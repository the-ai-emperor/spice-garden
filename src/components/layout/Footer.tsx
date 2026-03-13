"use client";

import Link from "next/link";
import { IconChefHat, IconCalculator } from "@tabler/icons-react";
import { restaurant } from "@/data/restaurant";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              {restaurant.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={restaurant.logoUrl} alt={restaurant.name} className="w-9 h-9 rounded-xl object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <IconChefHat size={20} className="text-white" />
                </div>
              )}
              <span className="text-white font-bold text-lg">
                {restaurant.name.split(" ")[0]}{" "}
                <span className="text-orange-400">{restaurant.name.split(" ").slice(1).join(" ")}</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">{restaurant.tagline}.</p>

            {/* Socials */}
            <div className="flex gap-2">
              {restaurant.socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <Icon size={18} className="text-white/60" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/products", label: "Full Menu" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "Our Story" },
                { href: "/contact", label: "Contact" },
                { href: "/orders", label: "My Orders" },
                { href: "/cart", label: "Cart" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/40 hover:text-orange-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Contact Us</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <a href={`tel:${restaurant.phone}`} className="hover:text-white transition-colors">
                  📞 {restaurant.phone}
                </a>
              </li>
              <li>📍 {restaurant.address}</li>
              <li>🕐 Mon–Fri: {restaurant.openingHours.weekdays}</li>
              <li>🕐 Sat–Sun: {restaurant.openingHours.weekends}</li>
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Tools</h4>
            <Link
              href="/price-calculator"
              className="flex items-start gap-3 bg-white/5 border border-white/10 hover:border-orange-500/30 rounded-xl p-4 group transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0 group-hover:bg-orange-500/25 transition-colors">
                <IconCalculator size={18} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold group-hover:text-orange-400 transition-colors">
                  Price Calculator
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  Paste an order text to calculate totals — for shopkeepers
                </p>
              </div>
            </Link>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} {restaurant.name}. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">Made with ❤️ for food lovers</p>
        </div>
      </div>
    </footer>
  );
}
