import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartSection from "./AddToCartSection";
import { allProducts, getProductBySlug } from "@/data/products";
import { ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — Spice Garden`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Gallery */}
          <ProductGallery
            images={product.gallery.length > 0 ? product.gallery : [product.thumbnail]}
            name={product.name}
          />

          {/* Info */}
          <div className="space-y-5">
            {/* Category + badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/8 border border-white/10 text-white/60 text-xs px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.badge && (
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              {product.popular && (
                <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                  ⭐ Popular
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-orange-400">₹{product.price}</span>
              <span className="text-white/30 text-sm">per serving</span>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-white/60 leading-relaxed">{product.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-white/5 border border-white/8 text-white/40 text-xs px-2.5 py-1 rounded-full"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Add to cart — client component */}
            <AddToCartSection product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
