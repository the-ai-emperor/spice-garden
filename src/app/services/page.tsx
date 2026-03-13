import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — Spice Garden",
  description: "From home delivery to bulk catering — explore everything Spice Garden offers.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-2">
            What We Offer
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            More Than Just Delivery
          </h1>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            From your daily lunch to your biggest celebration, Spice Garden is here with a full range of food services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-[#111] border border-white/8 hover:border-orange-500/30 rounded-2xl p-6 group transition-all hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-0.5"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {s.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/15 rounded-3xl p-10">
          <h2 className="text-2xl font-black text-white mb-3">Need a Customised Service?</h2>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Whether it&apos;s a wedding banquet, a corporate event, or a special dietary requirement — we&apos;re here to make it happen.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:scale-105 transition-all"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
