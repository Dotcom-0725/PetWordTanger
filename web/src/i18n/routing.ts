import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "ar", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/animals": { fr: "/animaux", ar: "/الحيوانات", en: "/animals" },
    "/animals/[slug]": { fr: "/animaux/[slug]", ar: "/الحيوانات/[slug]", en: "/animals/[slug]" },
    "/shop": { fr: "/boutique", ar: "/المتجر", en: "/shop" },
    "/shop/[slug]": { fr: "/boutique/[slug]", ar: "/المتجر/[slug]", en: "/shop/[slug]" },
    "/about": { fr: "/a-propos", ar: "/من-نحن", en: "/about" },
    "/contact": { fr: "/contact", ar: "/اتصل-بنا", en: "/contact" },
    "/blog": { fr: "/blog", ar: "/المدونة", en: "/blog" },
    "/blog/[slug]": { fr: "/blog/[slug]", ar: "/المدونة/[slug]", en: "/blog/[slug]" },
    "/cart": { fr: "/panier", ar: "/السلة", en: "/cart" },
    "/wishlist": { fr: "/favoris", ar: "/المفضلة", en: "/wishlist" },
    "/checkout": { fr: "/commande", ar: "/الدفع", en: "/checkout" },
    "/login": "/login",
    "/register": "/register",
    "/account": "/account",
    "/account/orders": "/account/orders",
    "/account/profile": "/account/profile",
    "/admin": "/admin",
    "/admin/animals": "/admin/animals",
    "/admin/orders": "/admin/orders",
    "/admin/wholesale": "/admin/wholesale",
    "/admin/blog": "/admin/blog",
    "/admin/media": "/admin/media",
  },
});

export type AppLocale = (typeof routing.locales)[number];
export const RTL_LOCALES: AppLocale[] = ["ar"];
