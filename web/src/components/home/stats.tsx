import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";

const STATS = [
  { value: 11, suffix: "+", label: "Années d'expérience" },
  { value: 860, suffix: "+", label: "Avis clients" },
  { value: 500, suffix: "+", label: "Professionnels approvisionnés" },
  { value: 100, suffix: "%", label: "Santé garantie" },
];

export function Stats() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <Reveal>
          <div className="grid grid-cols-2 gap-6 rounded-xl bg-muted/60 p-8 text-center md:grid-cols-4 md:p-12">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-extrabold text-primary-700 md:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <span className="text-xs text-muted-foreground md:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
