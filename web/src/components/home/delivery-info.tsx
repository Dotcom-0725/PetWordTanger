import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const DELIVERY = [
  { icon: "🚚", title: "Livraison à Tanger", desc: "Sous 24h pour l'alimentation, les accessoires et les médicaments." },
  { icon: "📦", title: "Livraison Nationale", desc: "2 à 4 jours ouvrés vers les autres villes, paiement à la livraison disponible." },
  { icon: "🏬", title: "Retrait en Boutique", desc: "Bni Makada, Tanger 90060 — Lun-Sam, 9h à 19h30." },
];

export function DeliveryInfo() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Livraison</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Comment vous recevez votre commande</h2>
        </Reveal>
        <RevealGroup className="mt-8 grid gap-5 md:grid-cols-3">
          {DELIVERY.map((item) => (
            <RevealItem key={item.title}>
              <div className="flex h-full items-start gap-4 rounded-2xl border bg-card p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-lg">
                  {item.icon}
                </span>
                <div>
                  <h4 className="text-sm font-bold">{item.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
