import { auth } from "@/lib/auth";

export default async function AccountOverviewPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold">Bonjour, {session?.user?.name ?? "Client"}</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6">
          <p className="text-xs text-muted-foreground">Commandes</p>
          <p className="font-display text-2xl font-extrabold">0</p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <p className="text-xs text-muted-foreground">Favoris</p>
          <p className="font-display text-2xl font-extrabold">—</p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <p className="text-xs text-muted-foreground">Statut</p>
          <p className="font-display text-2xl font-extrabold">Actif</p>
        </div>
      </div>
    </div>
  );
}
