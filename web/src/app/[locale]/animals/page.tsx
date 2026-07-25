import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AnimalCard } from "@/components/animals/animal-card";
import { AnimalFilters } from "@/components/catalog/animal-filters";
import { PaginationBar } from "@/components/catalog/pagination-bar";
import { getAnimals } from "@/lib/data/animals";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { AnimalSpecies } from "@/types/animal";

export const metadata: Metadata = {
  title: "Animaux Vivants — Oiseaux, Chats, Chiens à Tanger",
  description:
    "Découvrez nos oiseaux, chats et chiens élevés localement à Tanger : santé garantie, vaccins à jour, vidéos disponibles.",
};

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ species?: string; sort?: string; page?: string }>;
}

export default async function AnimalsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const page = Number(sp.page ?? "1");
  const { items, totalPages, total } = await getAnimals({
    species: sp.species as AnimalSpecies | undefined,
    sort: sp.sort as "newest" | "price-asc" | "price-desc" | undefined,
    page,
  });

  return (
    <div className="container py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Animaux Vivants", url: "/animals" },
            ])
          ),
        }}
      />
      <div className="mb-8">
        <p className="text-xs text-muted-foreground">
          <Link href="/">Accueil</Link> / Animaux Vivants
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Trouvez votre nouveau compagnon</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Chaque animal est vacciné, vermifugé et vendu avec une Garantie Santé. {total} résultats.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <AnimalFilters />
        </aside>
        <div>
          {items.length === 0 ? (
            <p className="rounded-2xl border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
              Aucun animal ne correspond à ces filtres pour le moment — écrivez-nous sur WhatsApp, de nouveaux
              arrivages ont lieu chaque semaine.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          )}
          <PaginationBar totalPages={totalPages} currentPage={page} />
        </div>
      </div>
    </div>
  );
}
