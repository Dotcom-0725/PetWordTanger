import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Tanger Animalerie : adresse, horaires, WhatsApp direct et formulaire de contact.",
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container py-12">
      <h1 className="mb-2 font-display text-3xl font-extrabold md:text-4xl">Une question ? Parlons-en.</h1>
      <p className="mb-10 text-muted-foreground">Par WhatsApp, par téléphone, ou en boutique — choisissez ce qui vous convient.</p>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-7">
          <h2 className="mb-5 font-display text-lg font-bold">Envoyez-nous un message</h2>
          <ContactForm />
        </div>

        <div className="space-y-6">
          <div className="space-y-5">
            {[
              { icon: "📍", label: "Adresse", value: "Bni Makada, Tanger 90060, Maroc" },
              { icon: "🕐", label: "Horaires", value: "Lun–Sam · 9h00–19h30 · Dimanche fermé" },
              { icon: "☎", label: "Téléphone", value: "+212 644-498909" },
            ].map((info) => (
              <div key={info.label} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg">{info.icon}</span>
                <div>
                  <b className="block text-sm">{info.label}</b>
                  <span className="text-sm text-muted-foreground">{info.value}</span>
                </div>
              </div>
            ))}
            <a
              href={buildWhatsAppLink("Bonjour, j'ai une question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg">💬</span>
              <div>
                <b className="block text-sm">WhatsApp</b>
                <span className="text-sm font-semibold text-primary-700">Discuter maintenant</span>
              </div>
            </a>
          </div>
          <div className="h-64 overflow-hidden rounded-2xl border">
            <iframe
              title="Localisation Tanger Animalerie"
              className="h-full w-full border-0"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-5.860%2C35.750%2C-5.780%2C35.790&layer=mapnik&marker=35.770%2C-5.820"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
