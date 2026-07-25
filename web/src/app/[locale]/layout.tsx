import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Cairo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, RTL_LOCALES, type AppLocale } from "@/i18n/routing";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingButtons } from "@/components/layout/floating-buttons";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const cairo = Cairo({ subsets: ["arabic"], weight: ["500", "600", "700"], variable: "--font-arabic", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tanger-animalerie.ma";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Tanger Animalerie — Animaux Vivants, Alimentation & Accessoires",
      template: "%s | Tanger Animalerie",
    },
    description:
      "Animalerie premium à Tanger depuis 2015 : oiseaux, chats et chiens élevés localement, alimentation, accessoires et santé animale.",
    alternates: {
      canonical: "/",
      languages: { fr: "/fr", ar: "/ar", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale,
      siteName: "Tanger Animalerie",
      images: ["/og-image.jpg"],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = RTL_LOCALES.includes(locale as AppLocale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} ${cairo.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
            <FloatingButtons />
            <CookieConsentBanner />
          </Providers>
          <AnalyticsScripts />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
