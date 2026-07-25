import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/data/blog";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title.fr, description: post.excerpt.fr, openGraph: { images: [post.coverImage] } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();
  const loc = locale as "fr" | "en" | "ar";

  return (
    <article className="container max-w-3xl py-12">
      <span className="text-xs font-bold uppercase tracking-wide text-accent-600">{post.category}</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">{post.title[loc]}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {post.author.name} · {new Date(post.publishedAt).toLocaleDateString(locale)} · {post.readingMinutes} min de lecture
      </p>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-primary-50">
        <Image src={post.coverImage} alt={post.title[loc]} fill priority sizes="(max-width:1024px) 100vw, 768px" className="object-cover" />
      </div>
      <div className="mt-8 max-w-none space-y-4 text-[15px] leading-relaxed text-foreground">
        <p>{post.content[loc]}</p>
      </div>
    </article>
  );
}
