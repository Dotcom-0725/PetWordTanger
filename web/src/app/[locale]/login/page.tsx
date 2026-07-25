import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8">
        <h1 className="mb-1 font-display text-2xl font-extrabold">Connexion</h1>
        <p className="mb-6 text-sm text-muted-foreground">Accédez à vos commandes et vos favoris.</p>
        <LoginForm />
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Pas encore de compte ? <Link href="/register" className="font-semibold text-primary-700">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}
