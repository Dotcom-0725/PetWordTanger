import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { AnimalCard } from "@/components/animals/animal-card";
import { Reveal } from "@/components/motion/reveal";
import { getFeaturedAnimals } from "@/lib/data/animals";

export async function FeaturedAnimals() {
  const animals = await getFeaturedAnimals(4);

  return (
    <section className="bg-muted/40 py-16 md:py-20">
      <div className="container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Animaux Vivants</span>
              <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Disponibles cette semaine</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Chaque fiche inclut photos haute résolution, vidéo courte, âge, race et suivi santé.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/animals">Voir tous les animaux →</Link>
            </Button>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {animals.map((animal, i) => (
            <Reveal key={animal.id} delay={i * 0.06}>
              <AnimalCard animal={animal} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
