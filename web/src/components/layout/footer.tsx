import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PawPrint } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="mt-24 bg-primary-900 text-primary-100">
      <div className="container grid grid-cols-1 gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2.5 font-display text-lg font-extrabold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
              <PawPrint className="h-5 w-5" />
            </span>
            Tanger Animalerie
          </div>
          <p className="max-w-xs text-sm leading-relaxed">{t("description")}</p>
        </div>
        <div>
          <h5 className="mb-4 text-sm font-bold text-white">{t("shop")}</h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/animals">{tNav("animals")}</Link></li>
            <li><Link href="/shop">{tNav("shop")}</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 text-sm font-bold text-white">{t("company")}</h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about">{tNav("about")}</Link></li>
            <li><Link href="/blog">{tNav("blog")}</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 text-sm font-bold text-white">{t("contact")}</h5>
          <ul className="space-y-2.5 text-sm">
            <li>📍 Route de Rabat, Tanger</li>
            <li>☎ +212 6XX-XXXXXX</li>
            <li><Link href="/contact">{tNav("contact")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-wrap justify-between gap-2 text-xs">
          <span>© 2026 Tanger Animalerie. {t("rights")}</span>
        </div>
      </div>
    </footer>
  );
}
