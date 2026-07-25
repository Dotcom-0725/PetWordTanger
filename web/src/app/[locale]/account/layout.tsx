import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Link } from "@/i18n/navigation";

const NAV = [
  { href: "/account", label: "Aperçu" },
  { href: "/account/orders", label: "Mes commandes" },
  { href: "/wishlist", label: "Mes favoris" },
  { href: "/account/profile", label: "Profil" },
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  // NOTE: sign-in is intentionally non-functional until `authorize()` in
  // src/lib/auth.ts is wired to a real database — this redirect demonstrates
  // the correct protected-route pattern for when it is.
  if (!session) redirect("/login");

  return (
    <div className="container grid gap-8 py-12 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-1">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href as never} className="block rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-primary-50">
            {item.label}
          </Link>
        ))}
      </aside>
      <div>{children}</div>
    </div>
  );
}
