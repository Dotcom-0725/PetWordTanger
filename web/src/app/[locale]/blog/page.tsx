import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog — Conseils & actualités",
  description: "Conseils d'élevage, de santé et guides d'achat pour vos animaux, par l'équipe Tanger Animalerie.",
};

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { items } = await getBlogPosts();
  const loc = locale as "fr" | "en" | "ar";

  return (
    <div className="container py-12">
      <h1 className="mb-8 font-display text-3xl font-extrabold md:text-4xl">Conseils &amp; actualités</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((post) => (
          <Link
            key={post.id}
            href={{ pathname: "/blog/[slug]", params: { slug: post.slug } } as never}
            className="block overflow-hidden rounded-2xl border bg-card transition-transform hover:-translate-y-1.5"
          >
            <div className="relative aspect-[16/10] bg-primary-50">
              <Image src={post.coverImage} alt={post.title[loc]} fill loading="lazy" sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="p-5">
              <span className="text-[11px] font-bold uppercase tracking-wide text-accent-600">{post.category}</span>
              <h2 className="mt-2 text-base font-bold leading-snug">{post.title[loc]}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt[loc]}</p>
              <p className="mt-3 text-xs text-muted-foreground">{post.readingMinutes} min de lecture</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
