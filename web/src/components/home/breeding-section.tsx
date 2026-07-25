import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function BreedingSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Notre Élevage</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">
            Un élevage local, visitable, encadré depuis 2015
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Nos oiseaux, chats et chiens naissent et grandissent dans des environnements propres, spacieux et
            surveillés — pas dans un entrepôt anonyme. Chaque reproduction suit un protocole de santé strict.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Vous êtes libre de visiter notre élevage sur rendez-vous avant toute décision — la transparence est au
            cœur de notre réputation depuis plus d&apos;une décennie.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <a href={buildWhatsAppLink("Bonjour, j'aimerais visiter votre élevage à Tanger.")} target="_blank" rel="noopener noreferrer">
                📅 Réserver une visite
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">En savoir plus</Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-[300px] gradient-primary shadow-glow md:h-[380px]" style={{ borderRadius: "38% 62% 55% 45% / 48% 42% 58% 52%" }} />
        </Reveal>
      </div>
    </section>
  );
}
