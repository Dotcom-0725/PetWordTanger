import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "À Propos — 11 Ans de Confiance à Tanger",
  description:
    "Depuis 2015, Tanger Animalerie accompagne les familles et les professionnels de Tanger : élevage local, santé garantie, et tout ce dont votre animal a besoin sous un même toit.",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="gradient-primary py-16 text-white md:py-20">
        <div className="container">
          <p className="text-xs text-primary-100"><Link href="/">Accueil</Link> / À propos</p>
          <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wide text-primary-100">Notre Histoire</span>
          <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
            11 ans de confiance, une famille qui grandit à Tanger
          </h1>
          <p className="mt-3 max-w-xl text-primary-100">
            D&apos;un simple comptoir de quartier à une référence digitale — sans jamais perdre ce qui a fait notre nom.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal className="space-y-4 text-muted-foreground">
            <p>
              Tout a commencé avec un simple comptoir, quelques cages, et une promesse : traiter chaque animal — et
              chaque propriétaire qui l&apos;aime — comme un membre de la famille.
            </p>
            <p>
              Depuis 2015, notre équipe a bâti l&apos;une des adresses les plus fiables de Tanger pour les amoureux
              des animaux. Des éleveurs de Tétouan à Assilah, des professionnels de Rabat et Casablanca — la
              réputation s&apos;est construite sur une chose simple : quand on veut que ce soit fait bien, on vient
              chez nous.
            </p>
            <h3 className="pt-4 font-display text-lg font-bold text-primary-700">D&apos;un comptoir local à une référence digitale</h3>
            <p>
              Le monde a changé, et nous aussi. La même expertise que vous trouviez à notre comptoir est aujourd&apos;hui
              disponible où que vous soyez — sur WhatsApp, sur ce site.
            </p>
            <h3 className="pt-4 font-display text-lg font-bold text-primary-700">Un seul toit. Tout ce dont ils ont besoin.</h3>
            <p>
              Nous ne sommes pas juste un magasin d&apos;accessoires qui vend quelques animaux. Nous ne sommes pas
              juste un éleveur qui vous laisse ensuite vous débrouiller. Nous sommes les deux, sous un même toit.
            </p>
            <blockquote className="border-s-4 border-accent-500 py-1 ps-5 font-display text-xl font-semibold text-primary-700">
              &laquo; La plupart des animaleries vous vendent la laisse. Nous, nous avons élevé le chien. &raquo;
            </blockquote>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { value: 11, suffix: "+", label: "Années d'expérience" },
                { value: 500, suffix: "+", label: "Professionnels approvisionnés" },
                { value: 860, suffix: "+", label: "Avis clients" },
                { value: 100, suffix: "%", label: "Santé garantie" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-primary-50 p-5">
                  <p className="font-display text-2xl font-extrabold text-primary-700">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>

            <Button className="mt-4" asChild>
              <a href={buildWhatsAppLink("Bonjour, j'aimerais en savoir plus sur votre élevage à Tanger.")} target="_blank" rel="noopener noreferrer">
                💬 Discuter avec l&apos;équipe
              </a>
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticky top-24 h-[420px] gradient-primary shadow-glow" style={{ borderRadius: "38% 62% 55% 45% / 48% 42% 58% 52%" }} />
          </Reveal>
        </div>
      </div>
    </>
  );
}
