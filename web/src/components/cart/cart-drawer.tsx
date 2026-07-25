"use client";

import { useTranslations } from "next-intl";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { Link } from "@/i18n/navigation";
import { formatCurrency } from "@/lib/utils";
import { useLocale } from "next-intl";

export function CartDrawer() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { items, updateQuantity, removeItem, total, count } = useCartStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t("title")} className="relative">
          <ShoppingCart className="h-4 w-4" />
          {count() > 0 && (
            <span className="absolute -top-1.5 -end-1.5 flex h-5 min-w-5 items-center justify-center rounded-full gradient-accent px-1 text-[10px] font-bold text-white">
              {count()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <p className="flex-1 py-16 text-center text-sm text-muted-foreground">{t("empty")}</p>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto py-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg">
                  🛍️
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full border"
                      aria-label="Réduire la quantité"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full border"
                      aria-label="Augmenter la quantité"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <span className="ms-2 text-xs text-muted-foreground">
                      {formatCurrency(item.price * item.quantity, locale)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Retirer du panier"
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Separator />
        <div className="flex items-center justify-between py-4 font-bold">
          <span>{t("total")}</span>
          <span className="tabular-nums">{formatCurrency(total(), locale)}</span>
        </div>
        <Button asChild size="lg" className="w-full" disabled={items.length === 0}>
          <Link href="/checkout">{t("checkout")}</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
