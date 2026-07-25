import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const PILLARS = [
  { icon: "🩺", title: "Garantie Santé", desc: "Chaque animal vivant est vendu après un contrôle vétérinaire complet et des vaccins à jour, avec une période de garantie claire." },
  { icon: "🌱", title: "Standards d'Élevage", desc: "11 ans à perfectionner des environnements propres, spacieux et surveillés, avec des pratiques d'accouplement responsables." },
  { icon: "💬", title: "Suivi Après-Vente", desc: "Notre relation ne s'arrête pas à la caisse. Une vraie réponse, un vrai conseil, à un message WhatsApp de distance." },
];

export function HealthGuarantee() {
  return (
    <section id="confiance" className="bg-muted/40 py-16 md:py-20">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Confiance</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Votre tranquillité d&apos;esprit, garantie</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Nous savons que confier la santé d&apos;un animal, ou en accueillir un chez soi, demande de la confiance.
          </p>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <RevealItem key={pillar.title}>
              <div className="h-full rounded-xl border bg-card p-8 shadow-sm">
                <span className="mb-4 flex h-13 w-13 items-center justify-center rounded-xl bg-primary-50 text-2xl">{pillar.icon}</span>
                <h4 className="text-base font-bold">{pillar.title}</h4>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{pillar.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
