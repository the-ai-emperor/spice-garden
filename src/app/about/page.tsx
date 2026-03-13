import Image from "next/image";
import type { Metadata } from "next";
import { ChefHat, Heart, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Spice Garden",
  description: "The story of Spice Garden — authentic Indian cuisine crafted with love since 2010.",
};

const milestones = [
  { year: "2010", event: "Founded in Koregaon Park, Pune" },
  { year: "2013", event: "Expanded delivery to 10 zones across Pune" },
  { year: "2016", event: "Launched Catering & Bulk Order service" },
  { year: "2019", event: "Served our 100,000th customer" },
  { year: "2022", event: "Introduced WhatsApp ordering for instant service" },
  { year: "2024", event: "Serving 30+ pincodes across Pune" },
];

const stats = [
  { icon: <Users className="w-6 h-6" />, label: "Happy Customers", value: "50K+" },
  { icon: <ChefHat className="w-6 h-6" />, label: "Expert Chefs", value: "8" },
  { icon: <Award className="w-6 h-6" />, label: "Years of Excellence", value: "15" },
  { icon: <Heart className="w-6 h-6" />, label: "Dishes on Menu", value: "80+" },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-2">
              Our Story
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              Cooking with Passion Since{" "}
              <span className="text-orange-400">2010</span>
            </h1>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Spice Garden was born out of a simple dream: to bring the warmth and richness of authentic Indian home cooking to every table in Pune. Founded by Chef Rajesh Kumar in a modest kitchen in Koregaon Park, we started with just five dishes and a handful of loyal customers.
              </p>
              <p>
                Today, we serve thousands of happy customers across 30+ pincodes, with a menu that celebrates the breathtaking diversity of Indian cuisine — from Kashmiri Rogan Josh to Hyderabadi Biryani, from crispy South Indian Dosas to rich Punjabi curries.
              </p>
              <p>
                Our secret? We never compromise on freshness. Every day begins with sourcing the finest ingredients, grinding whole spices fresh, and cooking each dish with the love and intention of a home kitchen.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Spice Garden kitchen"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center space-y-2">
              <div className="text-orange-400 flex justify-center">{s.icon}</div>
              <p className="text-3xl font-black text-white">{s.value}</p>
              <p className="text-white/40 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-1">
              Our Journey
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Milestones That Made Us</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={i} className={`flex gap-6 items-start ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <div className="bg-[#111] border border-white/8 hover:border-orange-500/30 rounded-2xl p-4 transition-colors inline-block max-w-xs">
                      <span className="text-orange-400 font-black text-lg">{m.year}</span>
                      <p className="text-white/70 text-sm mt-0.5">{m.event}</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-orange-500 border-4 border-[#0d0d0d] shrink-0 mt-4 hidden sm:block" />
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/10 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Our Values</h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed">
            Freshness first. Authenticity always. We believe that food cooked with intention becomes nourishment. Every dish we serve carries the legacy of traditional recipes, refined through years of craft, and delivered with pride.
          </p>
        </div>
      </div>
    </div>
  );
}
