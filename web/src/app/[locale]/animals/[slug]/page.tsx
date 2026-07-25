import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimalCard } from "@/components/animals/animal-card";
import { getAllAnimalSlugs, getAnimalBySlug, getRelatedAnimals } from "@/lib/data/animals";
import { getReviewsFor } from "@/lib/data/reviews";
import { animalProductJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { buildReservationMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getAllAnimalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const animal = await getAnimalBySlug(slug);
  if (!animal) return {};
  return {
    title: animal.commonName.fr,
    description: animal.description.fr,
    openGraph: { images: animal.images },
  };
}

const AVAILABILITY_MAP = { available: "InStock", reserved: "Reserved", sold: "OutOfStock" } as const;

export default async function AnimalDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const animal = await getAnimalBySlug(slug);
  if (!animal) notFound();

  const [related, reviews] = await Promise.all([getRelatedAnimals(animal), getReviewsFor(animal.id)]);
  const loc = locale as "fr" | "en" | "ar";

  return (
    <div className="container py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            animalProductJsonLd({
              name: animal.commonName.fr,
              description: animal.description.fr,
              image: animal.images[0] ?? "",
              price: animal.price,
              sku: animal.sku,
              availability: AVAILABILITY_MAP[animal.availabilityStatus],
              slug: animal.slug,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Animaux Vivants", url: "/animals" },
              { name: animal.commonName.fr, url: `/animals/${animal.slug}` },
            ])
          ),
        }}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl gradient-primary">
          {animal.images[0] && (
            <Image src={animal.images[0]} alt={animal.commonName[loc]} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          )}
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{animal.breed}</Badge>
            <Badge variant="secondary">{animal.ageLabel}</Badge>
            {animal.temperamentTags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">{animal.commonName[loc]}</h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">{animal.description[loc]}</p>

          <div className="mt-6 flex items-center gap-4">
            <span className="font-display text-3xl font-extrabold text-primary-700 tabular-nums">
              {formatCurrency(animal.price, locale)}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-primary-700">
              <ShieldCheck className="h-4 w-4" /> Santé garantie
            </span>
          </div>

          <Button size="lg" className="mt-6 w-full sm:w-auto" asChild>
            <a
              href={buildWhatsAppLink(buildReservationMessage(animal.commonName[loc], animal.sku))}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Réserver sur WhatsApp
            </a>
          </Button>

          <div className="mt-8 rounded-2xl border bg-muted/40 p-5">
            <h3 className="mb-3 text-sm font-bold">Suivi santé</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-700" /> Contrôle vétérinaire le{" "}
                {new Date(animal.healthStatus.vetCheckedDate).toLocaleDateString(locale)}
              </li>
              {animal.healthStatus.vaccinated && (
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-700" /> Vacciné
                </li>
              )}
              {animal.healthStatus.dewormed && (
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-700" /> Vermifugé
                </li>
              )}
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-700" /> Élevage {animal.origin.bredInHouse ? "local" : "partenaire"} — {animal.origin.region}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-5 font-display text-xl font-bold">Avis clients</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border bg-card p-5">
                <div className="text-accent-600">{"★".repeat(review.rating)}</div>
                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                <p className="mt-3 text-xs font-bold">{review.authorName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-5 font-display text-xl font-bold">Vous pourriez aussi aimer</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((a) => (
              <AnimalCard key={a.id} animal={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
