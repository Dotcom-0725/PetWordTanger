"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Heart, PlayCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, cn } from "@/lib/utils";
import { buildReservationMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Animal } from "@/types/animal";

const SPECIES_ICON: Record<Animal["species"], string> = { bird: "🦜", cat: "🐱", dog: "🐶" };

export function AnimalCard({ animal }: { animal: Animal }) {
  const locale = useLocale() as "fr" | "en" | "ar";
  const t = useTranslations("common");
  const { toggle, has } = useWishlistStore();
  const isWished = has(animal.id);

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow">
      <div className="relative aspect-[4/3.1] gradient-primary">
        {animal.images[0] ? (
          <Image
            src={animal.images[0]}
            alt={animal.commonName[locale]}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl text-white/85">
            {SPECIES_ICON[animal.species]}
          </div>
        )}
        {animal.healthStatus.vaccinated && (
          <Badge className="absolute start-3 top-3 bg-white/95 text-primary-700">✓ Vacciné</Badge>
        )}
        <button
          onClick={() => toggle({ id: animal.id, type: "animal", name: animal.commonName[locale], price: animal.price, slug: animal.slug })}
          aria-label="Favoris"
          className={cn(
            "absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 backdrop-blur transition-transform hover:scale-110",
            isWished ? "text-accent-600" : "text-gray-400"
          )}
        >
          <Heart className="h-4 w-4" fill={isWished ? "currentColor" : "none"} />
        </button>
        {animal.videoUrl && (
          <span className="absolute bottom-3 end-3 flex items-center gap-1 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
            <PlayCircle className="h-3.5 w-3.5" /> Vidéo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <Link href={{ pathname: "/animals/[slug]", params: { slug: animal.slug } } as never} className="font-display text-base font-bold hover:text-primary-700">
          {animal.commonName[locale]}
        </Link>
        <div className="flex flex-wrap gap-1.5 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary-50 px-2.5 py-0.5">{animal.ageLabel}</span>
          {animal.temperamentTags.slice(0, 1).map((tag) => (
            <span key={tag} className="rounded-full bg-primary-50 px-2.5 py-0.5">{tag}</span>
          ))}
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">{animal.description[locale]}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div>
            <p className="font-display text-lg font-bold tabular-nums text-primary-700">
              {formatCurrency(animal.price, locale)}
            </p>
            <p className="text-[11px] text-muted-foreground">{t("healthGuaranteed")}</p>
          </div>
          <Button
            size="sm"
            asChild
            onClick={() => trackEvent("reserve", { value: animal.price, currency: "MAD", item_id: animal.sku })}
          >
            <a
              href={buildWhatsAppLink(buildReservationMessage(animal.commonName[locale], animal.sku))}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 {t("reserve")}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
