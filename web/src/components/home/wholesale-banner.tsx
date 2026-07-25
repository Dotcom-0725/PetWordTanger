import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const TIERS = [
  { name: "Starter", discount: "-5%", detail: "Dès 5 000 DH / commande", featured: false },
  { name: "Pro", discount: "-12%", detail: "Dès 15 000 DH / commande", featured: true },
  { name: "Enterprise", discount: "Sur devis", detail: "Volumes 30 000 DH+", featured: false },
];

export function WholesaleBanner() {
  return (
    <section className="py-16 md:py-20">
      <div className="container space-y-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl gradient-primary p-8 text-white md:p-14">
            <div className="absolute inset-0 gradient-mesh opacity-70" />
            <div className="relative grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-center">
              <div>
                <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide">
                  Professionnels
                </span>
                <h2 className="font-display text-2xl font-extrabold md:text-3xl">
                  Vous gérez une animalerie, une ferme ou un élevage ?
                </h2>
                <p className="mt-3 max-w-lg text-sm text-primary-100">
                  Bénéficiez de tarifs dégressifs, d&apos;un catalogue dédié et d&apos;un interlocuteur unique pour vos
                  commandes en gros.
                </p>
                <Button className="mt-6" asChild>
                  <a
                    href={buildWhatsAppLink("Bonjour, je représente une entreprise et je souhaite un devis grossiste.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demander un devis grossiste →
                  </a>
                </Button>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
                <b className="font-display text-2xl">500+</b>
                <p className="text-xs text-primary-100">Professionnels approvisionnés depuis 2015</p>
                <div className="my-3 h-px bg-white/15" />
                <b className="font-display text-2xl">48h</b>
                <p className="text-xs text-primary-100">Délai moyen de traitement des commandes B2B</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Formules Grossiste</span>
          <h3 className="mt-2 font-display text-xl font-extrabold md:text-2xl">Choisissez le volume qui vous convient</h3>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                tier.featured
                  ? "relative scale-[1.03] rounded-xl gradient-primary p-8 text-white shadow-glow"
                  : "rounded-xl border bg-card p-8"
              }
            >
              {tier.featured && (
                <span className="absolute -top-3 end-7 rounded-full gradient-accent px-3.5 py-1 text-xs font-extrabold text-white">
                  Populaire
                </span>
              )}
              <p className={tier.featured ? "text-xs font-bold uppercase text-primary-100" : "text-xs font-bold uppercase text-muted-foreground"}>
                {tier.name}
              </p>
              <p className="mt-2 font-display text-3xl font-extrabold">{tier.discount}</p>
              <p className={tier.featured ? "mt-1 text-sm text-primary-100" : "mt-1 text-sm text-muted-foreground"}>{tier.detail}</p>
              <Button className="mt-6 w-full" variant={tier.featured ? "default" : "outline"} asChild>
                <a
                  href={buildWhatsAppLink(`Bonjour, je souhaite un devis grossiste — formule ${tier.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Choisir {tier.name}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
