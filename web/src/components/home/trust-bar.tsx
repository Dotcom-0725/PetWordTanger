import { useTranslations } from "next-intl";

export function TrustBar() {
  const t = useTranslations("trust");
  const items = [
    { icon: "🏅", title: t("yearsTitle"), sub: t("yearsSub") },
    { icon: "🩺", title: t("healthTitle"), sub: t("healthSub") },
    { icon: "🌱", title: t("breedingTitle"), sub: t("breedingSub") },
    { icon: "🚚", title: t("deliveryTitle"), sub: t("deliverySub") },
  ];

  return (
    <div className="gradient-primary py-7 text-white">
      <div className="container flex flex-wrap justify-between gap-6">
        {items.map((item) => (
          <div key={item.title} className="flex min-w-[200px] flex-1 items-center gap-3">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <b className="block text-sm">{item.title}</b>
              <span className="text-xs text-primary-100">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
