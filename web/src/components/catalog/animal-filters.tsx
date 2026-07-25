"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const SPECIES = [
  { value: "bird", label: "🦜 Oiseaux" },
  { value: "cat", label: "🐱 Chats" },
  { value: "dog", label: "🐶 Chiens" },
] as const;

export function AnimalFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSpecies = searchParams.get("species");
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
        {SPECIES.map((s) => (
          <button
            key={s.value}
            onClick={() => updateParam("species", activeSpecies === s.value ? null : s.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              activeSpecies === s.value ? "gradient-primary text-white" : "text-muted-foreground"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="hidden rounded-2xl border bg-card p-6 lg:block">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Espèce</h4>
        <div className="space-y-2.5">
          {SPECIES.map((s) => (
            <label key={s.value} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <Checkbox
                checked={activeSpecies === s.value}
                onCheckedChange={(checked) => updateParam("species", checked ? s.value : null)}
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 lg:block">
        <span className="hidden text-xs font-bold uppercase tracking-wide text-muted-foreground lg:block lg:mb-3">
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
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
