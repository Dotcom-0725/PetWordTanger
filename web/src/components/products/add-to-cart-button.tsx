"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { Minus, Plus } from "lucide-react";

export function AddToCartButton({
  id,
  name,
  price,
  image,
  inStock,
}: {
  id: string;
  name: string;
  price: number;
  image?: string;
  inStock: boolean;
}) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-3 rounded-full border px-3 py-2">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Réduire" className="flex h-6 w-6 items-center justify-center">
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-bold tabular-nums">{qty}</span>
        <button onClick={() => setQty((q) => q + 1)} aria-label="Augmenter" className="flex h-6 w-6 items-center justify-center">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <Button
        size="lg"
        disabled={!inStock}
        onClick={() => {
          addItem({ id, name, price, image }, qty);
          toast.success(`${qty}x ${name} ajouté au panier`);
        }}
      >
        {inStock ? "Ajouter au panier" : "Rupture de stock"}
      </Button>
    </div>
  );
}
