"use client";

import { useLocale, useTranslations } from "next-intl";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { items, updateQuantity, removeItem, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container flex flex-col items-center py-24 text-center">
        <ShoppingBag className="h-14 w-14 text-muted-foreground" />
        <h1 className="mt-6 font-display text-2xl font-extrabold">{t("empty")}</h1>
        <Button className="mt-6" asChild>
          <Link href="/shop">{t("continueShopping")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 font-display text-3xl font-extrabold">{t("title")}</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-2xl border bg-card p-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-2xl">🛍️</div>
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{formatCurrency(item.price, locale)}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border px-2 py-1">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center" aria-label="Réduire">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center" aria-label="Augmenter">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="w-24 text-end font-bold tabular-nums">{formatCurrency(item.price * item.quantity, locale)}</p>
              <button onClick={() => removeItem(item.id)} aria-label="Retirer" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-bold">Résumé</h2>
          <div className="flex justify-between border-t pt-4 font-bold">
            <span>{t("total")}</span>
            <span className="tabular-nums">{formatCurrency(total(), locale)}</span>
          </div>
          <Button size="lg" className="mt-6 w-full" asChild>
            <Link href="/checkout">{t("checkout")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
