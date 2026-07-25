"use client";

import { useLocale } from "next-intl";
import { Heart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export default function WishlistPage() {
  const locale = useLocale();
  const { items, remove } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  if (items.length === 0) {
    return (
      <div className="container flex flex-col items-center py-24 text-center">
        <Heart className="h-14 w-14 text-muted-foreground" />
        <h1 className="mt-6 font-display text-2xl font-extrabold">Vos favoris</h1>
        <p className="mt-2 text-muted-foreground">Vous n&apos;avez encore rien ajouté à vos favoris.</p>
        <Button className="mt-6" asChild>
          <Link href="/animals">Découvrir les animaux</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 font-display text-3xl font-extrabold">Vos favoris</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border bg-card p-5">
            <div className="mb-3 flex h-32 items-center justify-center rounded-xl bg-primary-50 text-3xl">
              {item.type === "animal" ? "🐾" : "🛍️"}
            </div>
            <p className="font-semibold">{item.name}</p>
            <p className="mt-1 font-bold tabular-nums text-primary-700">{formatCurrency(item.price, locale)}</p>
            <div className="mt-4 flex gap-2">
              {item.type === "product" && (
                <Button
                  size="sm"
                  onClick={() => {
                    addItem({ id: item.id, name: item.name, price: item.price });
                    toast.success("Ajouté au panier");
                  }}
                >
                  Ajouter au panier
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => remove(item.id)}>
                Retirer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
