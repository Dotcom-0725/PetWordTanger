import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAllProductSlugs, getProductBySlug } from "@/lib/data/products";
import { getReviewsFor } from "@/lib/data/reviews";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "@/components/products/add-to-cart-button";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name.fr, description: product.description.fr, openGraph: { images: product.images } };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const reviews = await getReviewsFor(product.id);
  const loc = locale as "fr" | "en" | "ar";

  return (
    <div className="container py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Boutique", url: "/shop" },
              { name: product.name.fr, url: `/shop/${product.slug}` },
            ])
          ),
        }}
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-primary-50">
          {product.images[0] && (
            <Image src={product.images[0]} alt={product.name[loc]} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          )}
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {product.brand && <Badge variant="secondary">{product.brand}</Badge>}
            <Badge variant="outline">{product.subcategory}</Badge>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">{product.name[loc]}</h1>
          {product.rating && (
            <div className="mt-2 flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} avis)</span>
            </div>
          )}
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.description[loc]}</p>
          <p className="mt-6 font-display text-3xl font-extrabold tabular-nums">{formatCurrency(product.price, locale)}</p>

          <div className="mt-6">
            <AddToCartButton
              id={product.id}
              name={product.name[loc]}
              price={product.price}
              image={product.images[0]}
              inStock={product.stockQuantity > 0}
            />
          </div>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-5 font-display text-xl font-bold">Avis clients</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border bg-card p-5">
                <div className="text-accent-600">{"★".repeat(review.rating)}</div>
                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                <p className="mt-3 text-xs font-bold">{review.authorName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
