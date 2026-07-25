import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

const FAQS = [
  {
    q: "Livrez-vous à Tanger ? En combien de temps ?",
    a: "Oui — nous livrons à Tanger et dans les environs, généralement sous 24h pour la nourriture, les accessoires et les médicaments. Pour les animaux vivants, la livraison est organisée directement avec notre équipe via WhatsApp.",
  },
  {
    q: "Comment vous assurez-vous que les animaux sont en bonne santé ?",
    a: "Chaque animal passe par un contrôle vétérinaire complet, une vaccination et un vermifuge avant d'être mis en vente. Vous recevez un certificat de santé à l'achat.",
  },
  {
    q: "Puis-je retourner un animal ou un produit ?",
    a: "La nourriture, les accessoires et les médicaments non ouverts peuvent être échangés ou remboursés sous 7 jours. Pour les animaux vivants, contactez-nous dans la période de Garantie Santé.",
  },
  {
    q: "Proposez-vous des tarifs de gros pour les professionnels ?",
    a: "Oui — nous travaillons avec des animaleries, fermes et éleveurs à travers le Maroc, avec des tarifs dégressifs. Devis sous 48h.",
  },
  {
    q: "C'est ma première fois — pouvez-vous m'aider à choisir ?",
    a: "Bien sûr — écrivez-nous sur WhatsApp ou passez en boutique, et nous vous guiderons sans aucune pression.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-muted/40 py-16 md:py-20">
      <div className="container">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Questions Fréquentes</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Vous vous posez des questions ?</h2>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-8 max-w-3xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
