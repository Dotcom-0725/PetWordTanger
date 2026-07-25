"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as "fr" | "en" | "ar";
  const t = useTranslations("common");
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group flex flex-col gap-2.5 rounded-2xl border bg-card p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-primary-50">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name[locale]}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">🛍️</div>
        )}
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{product.subcategory}</p>
      <Link href={{ pathname: "/shop/[slug]", params: { slug: product.slug } } as never} className="text-sm font-bold hover:text-primary-700">
        {product.name[locale]}
      </Link>
      {product.benefit && <p className="-mt-1.5 text-[11px] text-muted-foreground">{product.benefit}</p>}
      <div className="mt-auto flex items-center justify-between">
        <span className="font-display text-base font-bold tabular-nums">{formatCurrency(product.price, locale)}</span>
        <button
          onClick={() => {
            addItem({ id: product.id, name: product.name[locale], price: product.price, image: product.images[0] });
            trackEvent("add_to_cart", { value: product.price, currency: "MAD", item_id: product.sku });
            toast.success(`${t("addToCart")}: ${product.name[locale]}`);
          }}
          aria-label={t("addToCart")}
          className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-white transition-transform hover:scale-110 hover:rotate-90"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
