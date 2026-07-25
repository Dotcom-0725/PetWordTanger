"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function PaginationBar({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}` as never);
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => goTo(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-full border px-4 py-2 text-sm font-semibold disabled:opacity-40"
      >
        ← Précédent
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
            p === currentPage ? "gradient-primary text-white" : "border text-muted-foreground hover:border-primary"
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => goTo(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-full border px-4 py-2 text-sm font-semibold disabled:opacity-40"
      >
        Suivant →
      </button>
    </div>
  );
}
