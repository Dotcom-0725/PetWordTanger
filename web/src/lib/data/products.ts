import "server-only";
import type { Product, ProductCategory } from "@/types/product";

const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "royal-canin-kitten-2kg",
    sku: "PR-001",
    name: { fr: "Royal Canin Kitten 2kg", en: "Royal Canin Kitten 2kg", ar: "رويال كانين كيتن 2 كغ" },
    description: {
      fr: "Riche en Oméga-3 pour un pelage brillant et une digestion saine dès les premiers mois.",
      en: "Rich in Omega-3 for a shiny coat and healthy digestion from the first months.",
      ar: "غني بأوميغا 3 لفرو لامع وهضم صحي منذ الأشهر الأولى.",
    },
    brand: "Royal Canin",
    category: "food",
    subcategory: "cat-food",
    targetSpecies: ["cat"],
    price: 185,
    stockQuantity: 42,
    images: ["/images/products/royal-canin-kitten.jpg"],
    benefit: "Riche en Oméga-3 · pelage brillant",
    featured: true,
    rating: 4.8,
    reviewCount: 34,
    createdAt: "2026-05-01",
  },
  {
    id: "p2",
    slug: "cage-perroquet-xl",
    sku: "PR-002",
    name: { fr: "Cage Perroquet XL", en: "XL Parrot Cage", ar: "قفص ببغاء كبير" },
    description: {
      fr: "80x80x100cm — assez d'espace pour que votre perroquet déploie ses ailes.",
      en: "80x80x100cm — enough room for your parrot to fully stretch its wings.",
      ar: "80×80×100 سم — مساحة كافية ليمد الببغاء جناحيه بالكامل.",
    },
    category: "accessory",
    subcategory: "habitat",
    targetSpecies: ["bird"],
    price: 920,
    stockQuantity: 8,
    images: ["/images/products/parrot-cage.jpg"],
    benefit: "80x80x100cm · espace pour voler",
    featured: true,
    rating: 4.6,
    reviewCount: 12,
    createdAt: "2026-05-03",
  },
  {
    id: "p3",
    slug: "antiparasitaire-chien",
    sku: "PR-003",
    name: { fr: "Antiparasitaire Chien", en: "Dog Flea & Tick Treatment", ar: "علاج طفيليات الكلاب" },
    description: {
      fr: "Protection 4 semaines contre puces et tiques, application simple en pipette.",
      en: "4-week protection against fleas and ticks, simple pipette application.",
      ar: "حماية لمدة 4 أسابيع من البراغيث والقراد، سهل الاستعمال.",
    },
    category: "healthcare",
    subcategory: "parasite-treatment",
    targetSpecies: ["dog"],
    price: 140,
    stockQuantity: 60,
    images: ["/images/products/flea-treatment.jpg"],
    benefit: "Protection 4 semaines",
    featured: true,
    rating: 4.7,
    reviewCount: 21,
    createdAt: "2026-05-05",
  },
  {
    id: "p4",
    slug: "jouet-interactif-chat",
    sku: "PR-004",
    name: { fr: "Jouet Interactif Chat", en: "Interactive Cat Toy", ar: "لعبة تفاعلية للقطط" },
    description: {
      fr: "Stimulation mentale quotidienne pour un chat plus calme et épanoui.",
      en: "Daily mental stimulation for a calmer, happier cat.",
      ar: "تحفيز ذهني يومي لقطة أكثر هدوءًا وسعادة.",
    },
    category: "accessory",
    subcategory: "enrichment",
    targetSpecies: ["cat"],
    price: 95,
    stockQuantity: 30,
    images: ["/images/products/cat-toy.jpg"],
    benefit: "Stimulation mentale quotidienne",
    featured: true,
    rating: 4.5,
    reviewCount: 18,
    createdAt: "2026-05-07",
  },
  {
    id: "p5",
    slug: "pedigree-adulte-3kg",
    sku: "PR-005",
    name: { fr: "Pedigree Adulte 3kg", en: "Pedigree Adult 3kg", ar: "بيدغري للكلاب البالغة 3 كغ" },
    description: {
      fr: "Protéines de qualité pour une énergie stable au quotidien.",
      en: "Quality protein for steady daily energy.",
      ar: "بروتين عالي الجودة لطاقة ثابتة يوميًا.",
    },
    category: "food",
    subcategory: "dog-food",
    targetSpecies: ["dog"],
    price: 210,
    stockQuantity: 25,
    images: ["/images/products/pedigree-adult.jpg"],
    benefit: "Protéines de qualité · énergie stable",
    createdAt: "2026-05-08",
  },
  {
    id: "p6",
    slug: "vitamines-oiseaux-30ml",
    sku: "PR-006",
    name: { fr: "Vitamines Oiseaux 30ml", en: "Bird Vitamins 30ml", ar: "فيتامينات الطيور 30 مل" },
    description: {
      fr: "Soutien immunitaire et aide à la mue, à ajouter à l'eau.",
      en: "Immune support and moulting aid, added to water.",
      ar: "دعم مناعي ومساعدة على الانسلاخ، يُضاف إلى الماء.",
    },
    category: "healthcare",
    subcategory: "vitamins",
    targetSpecies: ["bird"],
    price: 75,
    stockQuantity: 40,
    images: ["/images/products/bird-vitamins.jpg"],
    benefit: "Soutien immunitaire & mue",
    createdAt: "2026-05-09",
  },
];

export interface ProductFilters {
  category?: ProductCategory;
  species?: "bird" | "cat" | "dog";
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "rating";
  query?: string;
  page?: number;
  perPage?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
  const { category, species, minPrice, maxPrice, sort = "newest", query, page = 1, perPage = 12 } = filters;

  let results = [...PRODUCTS];
  if (category) results = results.filter((p) => p.category === category);
  if (species) results = results.filter((p) => p.targetSpecies.includes(species) || p.targetSpecies.includes("all"));
  if (minPrice !== undefined) results = results.filter((p) => p.price >= minPrice);
  if (maxPrice !== undefined) results = results.filter((p) => p.price <= maxPrice);
  if (query) {
    const q = query.toLowerCase();
    results = results.filter((p) => p.name.fr.toLowerCase().includes(q) || p.name.en.toLowerCase().includes(q));
  }

  results.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const total = results.length;
  const start = (page - 1) * perPage;
  const paged = results.slice(start, start + perPage);

  return { items: paged, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}

export async function getFeaturedProducts(limit = 4) {
  return PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export async function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function getAllProductSlugs() {
  return PRODUCTS.map((p) => p.slug);
}

export async function getAllProductsForAdmin() {
  return PRODUCTS;
}
