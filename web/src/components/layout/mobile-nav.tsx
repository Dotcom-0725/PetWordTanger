"use client";

import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navItems: readonly { href: "/" | "/animals" | "/shop" | "/about" | "/blog" | "/contact"; key: string }[];
}

export function MobileNav({ open, onOpenChange, navItems }: MobileNavProps) {
  const t = useTranslations("nav");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-4/5">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="border-b py-4 text-base font-semibold"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
