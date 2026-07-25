import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { Reveal } from "@/components/motion/reveal";
import { getFeaturedProducts } from "@/lib/data/products";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts(4);

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-accent-600">Essentiels</span>
              <h2 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">Accessoires &amp; Alimentation</h2>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/shop">Voir la boutique →</Link>
            </Button>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
