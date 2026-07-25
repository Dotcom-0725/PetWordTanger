import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const POSTS = [
  { icon: "🦜", likes: 214 },
  { icon: "🐱", likes: 189 },
  { icon: "🐶", likes: 302 },
  { icon: "🐤", likes: 97 },
  { icon: "🐈", likes: 156 },
  { icon: "🐕", likes: 241 },
];

export function InstagramFeed() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-wide text-accent-600">@tanger.animalerie</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Suivez-nous sur Instagram</h2>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-6">
          {POSTS.map((post, i) => (
            <RevealItem key={i}>
              <div className="group relative flex aspect-square items-center justify-center rounded-xl gradient-accent text-2xl text-white transition-transform hover:scale-105">
                {post.icon}
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary-900/40 text-sm font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  ❤ {post.likes}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
