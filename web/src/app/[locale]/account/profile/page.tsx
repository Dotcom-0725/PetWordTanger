import { auth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold">Mon profil</h1>
      <div className="max-w-md space-y-4 rounded-2xl border bg-card p-6">
        <div className="space-y-1.5">
          <Label>Nom</Label>
          <Input defaultValue={session?.user?.name ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input defaultValue={session?.user?.email ?? ""} type="email" />
        </div>
        <Button>Enregistrer</Button>
      </div>
    </div>
  );
}
