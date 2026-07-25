import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const TESTIMONIALS = [
  {
    initial: "S",
    name: "Sara B.",
    role: "Cliente à Tanger",
    quote:
      "Mon perroquet est arrivé en parfaite santé, avec tout le suivi vétérinaire. L'équipe a répondu à toutes mes questions sur WhatsApp avant même l'achat.",
  },
  {
    initial: "K",
    name: "Karim M.",
    role: "Gérant, animalerie partenaire",
    quote:
      "Comme animalerie, on commande notre alimentation en gros ici depuis 3 ans. Prix corrects, livraison fiable, jamais de rupture.",
  },
  {
    initial: "A",
    name: "Amine R.",
    role: "Client à Tanger",
    quote: "Premier chat de ma vie et ils m'ont tout expliqué sans aucune pression. Le chaton est adorable et en pleine forme.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/40 py-16 md:py-20">
      <div className="container">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Témoignages</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Ce que disent nos clients</h2>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <RevealItem key={testimonial.name}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border bg-card p-7">
                <div className="flex gap-0.5 text-accent-600">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">&laquo; {testimonial.quote} &raquo;</p>
                <div className="mt-auto flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{testimonial.initial}</AvatarFallback>
                  </Avatar>
                  <div>
                    <b className="block text-sm">{testimonial.name}</b>
                    <span className="text-xs text-muted-foreground">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
