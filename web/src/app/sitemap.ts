import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllAnimalSlugs } from "@/lib/data/animals";
import { getAllProductSlugs } from "@/lib/data/products";
import { getAllBlogSlugs } from "@/lib/data/blog";
import { SITE_URL } from "@/lib/seo";

const STATIC_PATHS = ["", "/animals", "/shop", "/about", "/contact", "/blog", "/cart", "/wishlist"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [animalSlugs, productSlugs, blogSlugs] = await Promise.all([
    getAllAnimalSlugs(),
    getAllProductSlugs(),
    getAllBlogSlugs(),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({ url: `${SITE_URL}/${locale}${path}`, lastModified: new Date(), priority: path === "" ? 1 : 0.8 });
    }
    for (const slug of animalSlugs) {
      entries.push({ url: `${SITE_URL}/${locale}/animals/${slug}`, lastModified: new Date(), priority: 0.7 });
    }
    for (const slug of productSlugs) {
      entries.push({ url: `${SITE_URL}/${locale}/shop/${slug}`, lastModified: new Date(), priority: 0.7 });
    }
    for (const slug of blogSlugs) {
      entries.push({ url: `${SITE_URL}/${locale}/blog/${slug}`, lastModified: new Date(), priority: 0.6 });
    }
  }

  return entries;
}
