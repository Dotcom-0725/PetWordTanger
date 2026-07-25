import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="container flex flex-col items-center py-28 text-center">
      <span className="font-display text-7xl font-extrabold text-primary-50">404</span>
      <h1 className="mt-4 font-display text-2xl font-extrabold">{t("title")}</h1>
      <p className="mt-2 max-w-md text-muted-foreground">{t("description")}</p>
      <Button className="mt-8" asChild>
        <Link href="/">{t("cta")}</Link>
      </Button>
    </div>
  );
}
