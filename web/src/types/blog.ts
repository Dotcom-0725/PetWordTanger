export interface BlogPost {
  id: string;
  slug: string;
  title: Record<"fr" | "en" | "ar", string>;
  excerpt: Record<"fr" | "en" | "ar", string>;
  content: Record<"fr" | "en" | "ar", string>;
  category: string;
  coverImage: string;
  author: { name: string; avatar?: string };
  publishedAt: string;
  readingMinutes: number;
}
