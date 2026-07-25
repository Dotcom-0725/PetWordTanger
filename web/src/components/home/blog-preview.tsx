import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { getBlogPosts } from "@/lib/data/blog";

export async function BlogPreview() {
  const { items } = await getBlogPosts(1, 3);
  const locale = "fr" as const;

  return (
    <section className="bg-muted/40 py-16 md:py-20">
      <div className="container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Guide</span>
              <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Conseils &amp; actualités</h2>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog">Voir le blog →</Link>
            </Button>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <Link href={{ pathname: "/blog/[slug]", params: { slug: post.slug } } as never} className="block overflow-hidden rounded-2xl border bg-card transition-transform hover:-translate-y-1.5">
                <div className="relative aspect-[16/10] bg-primary-50">
                  <Image src={post.coverImage} alt={post.title[locale]} fill loading="lazy" sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-accent-600">{post.category}</span>
                  <h4 className="mt-2 text-sm font-bold leading-snug">{post.title[locale]}</h4>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
