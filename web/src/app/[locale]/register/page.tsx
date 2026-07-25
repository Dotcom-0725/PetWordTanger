import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RegisterForm } from "@/components/auth/register-form";

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8">
        <h1 className="mb-1 font-display text-2xl font-extrabold">Créer un compte</h1>
        <p className="mb-6 text-sm text-muted-foreground">Suivez vos commandes et retrouvez vos favoris.</p>
        <RegisterForm />
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Déjà un compte ? <Link href="/login" className="font-semibold text-primary-700">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
