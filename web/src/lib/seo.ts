const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tanger-animalerie.ma";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: "Tanger Animalerie",
    url: SITE_URL,
    telephone: "+212600000000",
    priceRange: "$$",
    image: `${SITE_URL}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Route de Rabat",
      addressLocality: "Tanger",
      addressCountry: "MA",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:30",
    },
    sameAs: ["https://www.instagram.com/tanger.animalerie"],
  };
}

export function animalProductJsonLd(params: {
  name: string;
  description: string;
  image: string;
  price: number;
  sku: string;
  availability: "InStock" | "OutOfStock" | "Reserved";
  slug: string;
}) {
  const availabilityMap: Record<string, string> = {
    InStock: "https://schema.org/InStock",
    OutOfStock: "https://schema.org/OutOfStock",
    Reserved: "https://schema.org/LimitedAvailability",
  };
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: params.name,
    description: params.description,
    image: params.image,
    sku: params.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: params.price,
      availability: availabilityMap[params.availability],
      url: `${SITE_URL}/animals/${params.slug}`,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export { SITE_URL };
