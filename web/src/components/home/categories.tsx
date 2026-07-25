import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";

const CATEGORIES = [
  { icon: "🦜", label: "Oiseaux", href: "/animals" },
  { icon: "🐱", label: "Chats", href: "/animals" },
  { icon: "🐶", label: "Chiens", href: "/animals" },
  { icon: "🎾", label: "Accessoires", href: "/shop" },
  { icon: "🍖", label: "Alimentation", href: "/shop" },
  { icon: "💊", label: "Santé", href: "/shop" },
] as const;

export function Categories() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Catégories</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Tout pour votre compagnon</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-3 gap-4 lg:grid-cols-6">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 0.05}>
              <Link
                href={cat.href}
                className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-2xl transition-colors group-hover:gradient-primary">
                  {cat.icon}
                </span>
                <b className="text-sm">{cat.label}</b>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
