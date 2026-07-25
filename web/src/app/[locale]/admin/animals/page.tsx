import { getAllAnimalsForAdmin } from "@/lib/data/animals";
import { AnimalsTable } from "@/components/admin/animals-table";

export default async function AdminAnimalsPage() {
  const animals = await getAllAnimalsForAdmin();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold">Gestion des Animaux</h1>
      <AnimalsTable data={animals} />
    </div>
  );
}
