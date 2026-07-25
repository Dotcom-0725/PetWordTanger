import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Link } from "@/i18n/navigation";
import {
  LayoutDashboard,
  PawPrint,
  ShoppingBag,
  Building2,
  Newspaper,
  Image as ImageIcon,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/animals", label: "Animaux", icon: PawPrint },
  { href: "/admin/orders", label: "Commandes", icon: ShoppingBag },
  { href: "/admin/wholesale", label: "Demandes Grossistes", icon: Building2 },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/media", label: "Médiathèque", icon: ImageIcon },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  // NOTE: same as the customer dashboard — this correctly blocks access,
  // but sign-in itself is only wired once src/lib/auth.ts hits a real DB.
  if (!session || (session.user as { role?: string })?.role !== "admin") redirect("/login");

  return (
    <div className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-[240px_1fr]">
      <aside className="border-e bg-muted/30 p-5">
        <div className="mb-6 px-2 font-display text-lg font-extrabold">Admin</div>
        <nav className="space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href as never}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-primary-50 hover:text-primary-700"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="p-6 lg:p-10">{children}</div>
    </div>
  );
}
