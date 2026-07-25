import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function ContactCta() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl gradient-accent p-10 text-center text-white md:p-16">
            <h2 className="font-display text-2xl font-extrabold md:text-3xl">Une question ? Parlons-en maintenant.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90">
              Notre équipe répond généralement en moins d&apos;une heure pendant les heures d&apos;ouverture — par
              WhatsApp, téléphone, ou en boutique.
            </p>
            <Button size="lg" className="mt-7 bg-white text-accent-600 hover:bg-white/90" asChild>
              <a href={buildWhatsAppLink("Bonjour, j'ai une question.")} target="_blank" rel="noopener noreferrer">
                💬 Discuter sur WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
