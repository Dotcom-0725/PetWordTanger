"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "food", label: "🍖 Alimentation" },
  { value: "accessory", label: "🎾 Accessoires" },
  { value: "healthcare", label: "💊 Santé" },
] as const;

export function ProductFiltersBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const sort = searchParams.get("sort") ?? "newest";

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}` as never);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 lg:hidden">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => updateParam("category", activeCategory === c.value ? null : c.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              activeCategory === c.value ? "gradient-primary text-white" : "text-muted-foreground"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="hidden rounded-2xl border bg-card p-6 lg:block">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Catégorie</h4>
        <div className="space-y-2.5">
          {CATEGORIES.map((c) => (
            <label key={c.value} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <Checkbox
                checked={activeCategory === c.value}
                onCheckedChange={(checked) => updateParam("category", checked ? c.value : null)}
              />
              {c.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 lg:block">
        <span className="hidden text-xs font-bold uppercase tracking-wide text-muted-foreground lg:mb-3 lg:block">
          Trier par
        </span>
        <Select value={sort} onValueChange={(v) => updateParam("sort", v)}>
          <SelectTrigger className="w-full lg:w-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Plus récent</SelectItem>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
            <SelectItem value="rating">Mieux notés</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
