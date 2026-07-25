import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { Categories } from "@/components/home/categories";
import { FeaturedAnimals } from "@/components/home/featured-animals";
import { FeaturedProducts } from "@/components/home/featured-products";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { WholesaleBanner } from "@/components/home/wholesale-banner";
import { BreedingSection } from "@/components/home/breeding-section";
import { HealthGuarantee } from "@/components/home/health-guarantee";
import { DeliveryInfo } from "@/components/home/delivery-info";
import { BlogPreview } from "@/components/home/blog-preview";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { FaqSection } from "@/components/home/faq-section";
import { ContactCta } from "@/components/home/contact-cta";
import { Newsletter } from "@/components/home/newsletter";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

const HOME_FAQS = [
  {
    question: "Livrez-vous à Tanger ? En combien de temps ?",
    answer:
      "Oui — nous livrons à Tanger et dans les environs, généralement sous 24h pour la nourriture, les accessoires et les médicaments.",
  },
  {
    question: "Comment vous assurez-vous que les animaux sont en bonne santé ?",
    answer:
      "Chaque animal passe par un contrôle vétérinaire complet, une vaccination et un vermifuge avant d'être mis en vente.",
  },
  {
    question: "Proposez-vous des tarifs de gros pour les professionnels ?",
    answer: "Oui — nous travaillons avec des animaleries, fermes et éleveurs à travers le Maroc. Devis sous 48h.",
  },
];

export const metadata: Metadata = {
  title: "Tanger Animalerie — Animaux Vivants, Alimentation & Accessoires à Tanger",
  description:
    "Animalerie premium à Tanger depuis 2015 : oiseaux, chats et chiens élevés localement, alimentation, accessoires et santé animale. Santé garantie, WhatsApp direct.",
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(HOME_FAQS)) }}
      />
      <Hero />
      <TrustBar />
      <Categories />
      <FeaturedAnimals />
      <FeaturedProducts />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <WholesaleBanner />
      <BreedingSection />
      <HealthGuarantee />
      <DeliveryInfo />
      <BlogPreview />
      <InstagramFeed />
      <FaqSection />
      <ContactCta />
      <Newsletter />
    </>
  );
}
