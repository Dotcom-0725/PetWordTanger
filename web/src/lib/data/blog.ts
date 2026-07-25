import "server-only";
import type { BlogPost } from "@/types/blog";

const POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "guide-elevage-canaris-maroc",
    title: {
      fr: "Guide débutant : l'élevage de canaris au Maroc",
      en: "Beginner's guide: canary breeding in Morocco",
      ar: "دليل المبتدئين: تربية الكناري في المغرب",
    },
    excerpt: {
      fr: "Tout ce qu'il faut savoir avant de se lancer dans l'élevage de canaris, adapté au climat marocain.",
      en: "Everything to know before starting canary breeding, adapted to the Moroccan climate.",
      ar: "كل ما تحتاج معرفته قبل البدء في تربية الكناري، بما يتناسب مع المناخ المغربي.",
    },
    content: { fr: "Contenu complet à venir.", en: "Full content coming soon.", ar: "المحتوى الكامل قريبًا." },
    category: "Élevage",
    coverImage: "/images/blog/canary-breeding.jpg",
    author: { name: "Équipe Tanger Animalerie" },
    publishedAt: "2026-06-01",
    readingMinutes: 6,
  },
  {
    id: "b2",
    slug: "nourrir-chat-ete-tanger",
    title: {
      fr: "Bien nourrir son chat pendant l'été à Tanger",
      en: "Feeding your cat well during Tangier summers",
      ar: "تغذية قطتك جيدًا خلال صيف طنجة",
    },
    excerpt: {
      fr: "Conseils pratiques pour adapter l'alimentation de votre chat à la chaleur.",
      en: "Practical tips to adapt your cat's diet to the heat.",
      ar: "نصائح عملية لتكييف غذاء قطتك مع الحرارة.",
    },
    content: { fr: "Contenu complet à venir.", en: "Full content coming soon.", ar: "المحتوى الكامل قريبًا." },
    category: "Santé",
    coverImage: "/images/blog/cat-summer.jpg",
    author: { name: "Équipe Tanger Animalerie" },
    publishedAt: "2026-06-10",
    readingMinutes: 4,
  },
  {
    id: "b3",
    slug: "trouver-chiot-sante-tanger",
    title: {
      fr: "Où trouver un chiot en bonne santé à Tanger ?",
      en: "Where to find a healthy puppy in Tangier?",
      ar: "أين تجد جروًا بصحة جيدة في طنجة؟",
    },
    excerpt: {
      fr: "Les signes à vérifier avant d'adopter, et pourquoi la provenance compte.",
      en: "Signs to check before adopting, and why provenance matters.",
      ar: "علامات يجب التحقق منها قبل التبني، ولماذا يهم المصدر.",
    },
    content: { fr: "Contenu complet à venir.", en: "Full content coming soon.", ar: "المحتوى الكامل قريبًا." },
    category: "Achat",
    coverImage: "/images/blog/healthy-puppy.jpg",
    author: { name: "Équipe Tanger Animalerie" },
    publishedAt: "2026-06-18",
    readingMinutes: 5,
  },
];

export async function getBlogPosts(page = 1, perPage = 9) {
  const start = (page - 1) * perPage;
  const items = POSTS.slice(start, start + perPage);
  return { items, total: POSTS.length, page, perPage, totalPages: Math.ceil(POSTS.length / perPage) };
}

export async function getBlogPostBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getAllBlogSlugs() {
  return POSTS.map((p) => p.slug);
}

export async function getAllBlogPostsForAdmin() {
  return POSTS;
}
