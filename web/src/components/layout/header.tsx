"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Heart, Menu, PawPrint, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useWishlistStore } from "@/store/wishlist-store";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/animals", key: "animals" },
  { href: "/shop", key: "shop" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 glass transition-shadow duration-300",
          scrolled ? "shadow-soft" : "border-transparent"
        )}
      >
        <div className="container flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-extrabold">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-white">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="hidden sm:block">
              {t("home") === "Home" ? "Tanger Animalerie" : "Tanger Animalerie"}
              <small className="block text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                Depuis 2015
              </small>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-semibold text-muted-foreground lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 transition-colors hover:bg-primary-50 hover:text-primary-700"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="relative hidden max-w-xs flex-1 xl:block">
            <Search className="absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder={t("search")} className="ps-11" />
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LocaleSwitcher />
            <Button variant="outline" size="icon" className="relative" asChild aria-label={t("wishlist")}>
              <Link href="/wishlist">
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -end-1.5 flex h-5 min-w-5 items-center justify-center rounded-full gradient-accent px-1 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>
            <CartDrawer />
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="https://wa.me/212644498909" target="_blank" rel="noopener noreferrer">
                💬 WhatsApp
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} navItems={NAV_ITEMS} />
    </>
  );
}
