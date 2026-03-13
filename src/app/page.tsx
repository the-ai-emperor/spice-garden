import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Clock, Truck, Shield } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import PincodeChecker from "@/components/shared/PincodeChecker";
import { featuredProducts, popularProducts } from "@/data/products";
import { restaurant } from "@/data/restaurant";
import { services } from "@/data/services";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Koregaon Park",
    text: "The Butter Chicken is absolutely divine! I've tried many restaurants but nothing compares to Spice Garden. The delivery is always on time and the food arrives hot.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Rahul Mehta",
    location: "Baner",
    text: "Best biryani in Pune, period. The dum biryani has that perfect smoky flavour you only get from slow cooking. I order at least twice a week!",
    rating: 5,
    avatar: "RM",
  },
  {
    name: "Meera Nair",
    location: "Aundh",
    text: "I ordered the Veg Thali for a family gathering and everyone was impressed. The portions are generous and every dish is full of authentic flavours.",
    rating: 5,
    avatar: "MN",
  },
];

const highlights = [
  { icon: <Clock className="w-5 h-5" />, label: "45 Min Delivery", desc: "Fast & reliable" },
  { icon: <Truck className="w-5 h-5" />, label: "Free Delivery", desc: "On orders above ₹499" },
  { icon: <Shield className="w-5 h-5" />, label: "100% Hygienic", desc: "FSSAI Certified" },
  { icon: <Star className="w-5 h-5" />, label: "4.9 Rating", desc: "1200+ happy customers" },
];

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=80"
            alt="Spice Garden — Indian cuisine"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-400 text-sm font-medium">Now Delivering in Pune</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Authentic Flavours,{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Delivered Fresh
              </span>
            </h1>

            <p className="text-white/60 text-lg sm:text-xl mb-8 leading-relaxed">
              {restaurant.description.split(".")[0]}. Order in seconds via WhatsApp — no app needed.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-2xl shadow-orange-500/30 transition-all hover:scale-105"
              >
                Browse Menu <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/15 transition-all"
              >
                Our Story
              </Link>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 mt-10">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
                    {h.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{h.label}</p>
                    <p className="text-white/40 text-xs">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Dishes ─── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-1">
              Chef&apos;s Selection
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Featured Dishes</h2>
          </div>
          <Link href="/products" className="text-orange-400 hover:text-orange-300 text-sm font-medium flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* ─── Services strip ─── */}
      <section className="bg-[#111] border-y border-white/8 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((s) => (
              <div key={s.id} className="text-center group cursor-default">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform inline-block">
                  {s.icon}
                </div>
                <p className="text-white text-xs font-semibold">{s.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Popular Items ─── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-1">
            Customer Favourites
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Most Popular</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-16 bg-[#111] border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-1">
              What Customers Say
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Loved by Food Lovers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#0d0d0d] border border-white/8 rounded-2xl p-6 space-y-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xs font-black">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pincode Checker ─── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-1">
              Delivery Zone
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Do We Deliver to You?
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              We currently deliver across 30+ locations in Pune. Check if your pincode is serviceable — and if not, we&apos;re expanding soon. Stay tuned!
            </p>
          </div>
          <PincodeChecker />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-gradient-to-br from-orange-600/10 via-red-600/5 to-transparent border-t border-white/8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Order?
          </h2>
          <p className="text-white/50 text-base mb-8">
            Browse our full menu, add your favourites to cart, and order directly via WhatsApp in seconds. No account needed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 text-base"
            >
              View Full Menu <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl border border-white/15"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
