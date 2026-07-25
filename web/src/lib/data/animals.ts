import "server-only";
import type { Animal, AnimalSpecies } from "@/types/animal";

/**
 * Mock repository. Swap the body of each function for real queries
 * (Prisma/Drizzle against Postgres, or a headless CMS client) without
 * changing any call sites — every page imports from this module only.
 */
const ANIMALS: Animal[] = [
  {
    id: "a1",
    slug: "perroquet-gris-du-gabon",
    sku: "AN-101",
    species: "bird",
    breed: "African Grey",
    commonName: { fr: "Perroquet Gris du Gabon", en: "African Grey Parrot", ar: "ببغاء رمادي أفريقي" },
    description: {
      fr: "Intelligent et affectueux — un vrai compagnon de conversation, élevage local à Tanger.",
      en: "Intelligent and affectionate — a true conversational companion, locally bred in Tangier.",
      ar: "ذكي وودود — رفيق حقيقي للمحادثة، تربية محلية في طنجة.",
    },
    ageLabel: "8 mois",
    gender: "unknown",
    price: 4800,
    quantityAvailable: 1,
    healthStatus: { vetCheckedDate: "2026-07-01", vaccinated: true, dewormed: true },
    vaccinationRecords: [{ vaccine: "Polyomavirus", dateGiven: "2026-06-15" }],
    origin: { bredInHouse: true, breederName: "Élevage Tanger Animalerie", region: "Tanger" },
    temperamentTags: ["Sociable", "Bavard", "Curieux"],
    careLevel: "advanced",
    availabilityStatus: "available",
    images: ["/images/animals/parrot-1.jpg"],
    videoUrl: "/videos/parrot-1.mp4",
    featured: true,
    createdAt: "2026-07-10",
  },
  {
    id: "a2",
    slug: "chaton-persan-blanc",
    sku: "AN-102",
    species: "cat",
    breed: "Persan",
    commonName: { fr: "Chaton Persan Blanc", en: "White Persian Kitten", ar: "قط شيرازي أبيض" },
    description: {
      fr: "Calme et câline — idéale pour un foyer en appartement.",
      en: "Calm and cuddly — ideal for an apartment home.",
      ar: "هادئة ومحبة للعناق — مثالية لمنزل شقة.",
    },
    ageLabel: "10 semaines",
    gender: "female",
    price: 3200,
    quantityAvailable: 2,
    healthStatus: { vetCheckedDate: "2026-07-05", vaccinated: true, dewormed: true },
    vaccinationRecords: [{ vaccine: "Typhus/Coryza", dateGiven: "2026-06-20" }],
    origin: { bredInHouse: true, region: "Tanger" },
    temperamentTags: ["Calme", "Câline"],
    careLevel: "moderate",
    availabilityStatus: "available",
    images: ["/images/animals/persian-kitten.jpg"],
    featured: true,
    createdAt: "2026-07-08",
  },
  {
    id: "a3",
    slug: "berger-allemand",
    sku: "AN-103",
    species: "dog",
    breed: "Berger Allemand",
    commonName: { fr: "Berger Allemand", en: "German Shepherd", ar: "الراعي الألماني" },
    description: {
      fr: "Loyal et énergique — a besoin d'exercice quotidien et de dressage.",
      en: "Loyal and energetic — needs daily exercise and training.",
      ar: "وفي ونشيط — يحتاج إلى تمرين يومي وتدريب.",
    },
    ageLabel: "3 mois",
    gender: "male",
    price: 5500,
    quantityAvailable: 1,
    healthStatus: { vetCheckedDate: "2026-07-02", vaccinated: true, dewormed: true },
    vaccinationRecords: [{ vaccine: "DHPPi", dateGiven: "2026-06-25" }],
    origin: { bredInHouse: true, region: "Tanger" },
    temperamentTags: ["Loyal", "Énergique"],
    careLevel: "advanced",
    availabilityStatus: "available",
    images: ["/images/animals/german-shepherd.jpg"],
    featured: true,
    createdAt: "2026-07-01",
  },
  {
    id: "a4",
    slug: "couple-de-perruches",
    sku: "AN-104",
    species: "bird",
    breed: "Perruche ondulée",
    commonName: { fr: "Couple de Perruches", en: "Budgie Pair", ar: "زوج من الببغاء الأسترالي" },
    description: {
      fr: "Vives et colorées — parfaites pour débuter en aviculture.",
      en: "Lively and colorful — perfect for starting out with birds.",
      ar: "نشيطة وملونة — مثالية لبدء تربية الطيور.",
    },
    ageLabel: "6 mois",
    gender: "pair",
    price: 650,
    quantityAvailable: 4,
    healthStatus: { vetCheckedDate: "2026-06-28", vaccinated: true, dewormed: true },
    vaccinationRecords: [],
    origin: { bredInHouse: true, region: "Tanger" },
    temperamentTags: ["Vif", "Coloré"],
    careLevel: "easy",
    availabilityStatus: "available",
    images: ["/images/animals/budgies.jpg"],
    featured: true,
    createdAt: "2026-06-28",
  },
  {
    id: "a5",
    slug: "chaton-maine-coon",
    sku: "AN-106",
    species: "cat",
    breed: "Maine Coon",
    commonName: { fr: "Chaton Maine Coon", en: "Maine Coon Kitten", ar: "قط ماين كون" },
    description: {
      fr: "Grand gabarit, tempérament doux — excellent avec les enfants.",
      en: "Large build, gentle temperament — excellent with children.",
      ar: "حجم كبير وطبع لطيف — ممتاز مع الأطفال.",
    },
    ageLabel: "12 semaines",
    gender: "male",
    price: 4500,
    quantityAvailable: 1,
    healthStatus: { vetCheckedDate: "2026-06-30", vaccinated: true, dewormed: true },
    vaccinationRecords: [],
    origin: { bredInHouse: true, region: "Tanger" },
    temperamentTags: ["Doux", "Familial"],
    careLevel: "moderate",
    availabilityStatus: "available",
    images: ["/images/animals/maine-coon.jpg"],
    createdAt: "2026-06-30",
  },
  {
    id: "a6",
    slug: "golden-retriever",
    sku: "AN-107",
    species: "dog",
    breed: "Golden Retriever",
    commonName: { fr: "Golden Retriever", en: "Golden Retriever", ar: "غولدن ريتريفر" },
    description: {
      fr: "Douce et familiale — s'entend très bien avec les autres animaux.",
      en: "Gentle and family-friendly — gets along very well with other pets.",
      ar: "لطيفة وعائلية — تتفق جيدًا مع الحيوانات الأخرى.",
    },
    ageLabel: "10 semaines",
    gender: "female",
    price: 6200,
    quantityAvailable: 1,
    healthStatus: { vetCheckedDate: "2026-06-27", vaccinated: true, dewormed: true },
    vaccinationRecords: [],
    origin: { bredInHouse: true, region: "Tanger" },
    temperamentTags: ["Douce", "Familiale"],
    careLevel: "moderate",
    availabilityStatus: "available",
    images: ["/images/animals/golden-retriever.jpg"],
    createdAt: "2026-06-27",
  },
];

export interface AnimalFilters {
  species?: AnimalSpecies;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc";
  page?: number;
  perPage?: number;
}

export async function getAnimals(filters: AnimalFilters = {}) {
  const { species, minPrice, maxPrice, sort = "newest", page = 1, perPage = 12 } = filters;

  let results = ANIMALS.filter((a) => a.availabilityStatus !== "sold");
  if (species) results = results.filter((a) => a.species === species);
  if (minPrice !== undefined) results = results.filter((a) => a.price >= minPrice);
  if (maxPrice !== undefined) results = results.filter((a) => a.price <= maxPrice);

  results = [...results].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const total = results.length;
  const start = (page - 1) * perPage;
  const paged = results.slice(start, start + perPage);

  return { items: paged, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}

export async function getFeaturedAnimals(limit = 4) {
  return ANIMALS.filter((a) => a.featured).slice(0, limit);
}

export async function getAnimalBySlug(slug: string) {
  return ANIMALS.find((a) => a.slug === slug) ?? null;
}

export async function getAllAnimalSlugs() {
  return ANIMALS.map((a) => a.slug);
}

export async function getRelatedAnimals(animal: Animal, limit = 4) {
  return ANIMALS.filter((a) => a.species === animal.species && a.id !== animal.id).slice(0, limit);
}

/** Used by the Admin > Animals data table (mock; swap for a paginated DB query). */
export async function getAllAnimalsForAdmin() {
  return ANIMALS;
}
