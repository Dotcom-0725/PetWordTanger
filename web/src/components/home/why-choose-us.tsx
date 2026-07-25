import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const REASONS = [
  { icon: "🏅", title: "11+ Ans d'Expérience", desc: "Une expertise locale reconnue à Tanger depuis 2015." },
  { icon: "🩺", title: "Animaux en Bonne Santé", desc: "Contrôle vétérinaire, vaccins et vermifuge systématiques." },
  { icon: "🌱", title: "Élevage Local", desc: "Élevage visitable à Tanger, sur rendez-vous." },
  { icon: "🏠", title: "Solutions Complètes", desc: "Animal, alimentation, accessoires et soins sous un même toit." },
  { icon: "🎓", title: "Expertise de Confiance", desc: "Conseil réel par des passionnés, pas un script." },
  { icon: "🚚", title: "Livraison Rapide", desc: "Tanger et environs sous 24h." },
  { icon: "💬", title: "Support Premium", desc: "Une vraie réponse à un message WhatsApp de distance." },
  { icon: "🔁", title: "Clients Fidèles", desc: "860+ avis, une grande majorité de clients récurrents." },
];

export function WhyChooseUs() {
  return (
    <section className="bg-muted/40 py-16 md:py-20">
      <div className="container">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Pourquoi Nous Choisir</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Ce qui nous distingue depuis 11 ans</h2>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <RevealItem key={reason.title}>
              <div className="flex h-full gap-4 rounded-2xl border bg-card p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-xl">
                  {reason.icon}
                </span>
                <div>
                  <h4 className="text-sm font-bold">{reason.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{reason.desc}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
