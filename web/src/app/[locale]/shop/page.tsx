import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/products/product-card";
import { ProductFiltersBar } from "@/components/catalog/product-filters";
import { PaginationBar } from "@/components/catalog/pagination-bar";
import { getProducts } from "@/lib/data/products";
import type { ProductCategory } from "@/types/product";

export const metadata: Metadata = {
  title: "Boutique — Alimentation, Accessoires & Santé",
  description: "Alimentation, accessoires et produits de santé pour chats, chiens et oiseaux — livraison rapide à Tanger.",
};

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
}

export default async function ShopPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const page = Number(sp.page ?? "1");
  const { items, totalPages, total } = await getProducts({
    category: sp.category as ProductCategory | undefined,
    sort: sp.sort as "newest" | "price-asc" | "price-desc" | "rating" | undefined,
    page,
  });

  return (
    <div className="container py-12">
      <div className="mb-8">
        <p className="text-xs text-muted-foreground">
          <Link href="/">Accueil</Link> / Boutique
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Tout ce dont votre compagnon a besoin</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{total} produits disponibles.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <ProductFiltersBar />
        </aside>
        <div>
          {items.length === 0 ? (
            <p className="rounded-2xl border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
              Aucun produit ne correspond à ces filtres.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <PaginationBar totalPages={totalPages} currentPage={page} />
        </div>
      </div>
    </div>
  );
}
