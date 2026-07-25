import { getAllAnimalsForAdmin } from "@/lib/data/animals";
import { getAllProductsForAdmin } from "@/lib/data/products";
import { getAllOrdersForAdmin } from "@/lib/data/orders";
import { getAllWholesaleInquiries } from "@/lib/data/wholesale";

export default async function AdminDashboardPage() {
  const [animals, products, orders, inquiries] = await Promise.all([
    getAllAnimalsForAdmin(),
    getAllProductsForAdmin(),
    getAllOrdersForAdmin(),
    getAllWholesaleInquiries(),
  ]);

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const lowStock = products.filter((p) => p.stockQuantity < 10).length;

  const cards = [
    { label: "Animaux en ligne", value: animals.length },
    { label: "Produits en catalogue", value: products.length },
    { label: "Commandes en attente", value: pendingOrders },
    { label: "Stock faible (<10)", value: lowStock },
    { label: "Demandes grossistes", value: inquiries.length },
  ];

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold">Tableau de bord</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border bg-card p-5">
            <p className="font-display text-2xl font-extrabold tabular-nums">{card.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border bg-muted/40 p-6 text-sm text-muted-foreground">
        Ces chiffres proviennent de la couche de données mock (<code>src/lib/data/*</code>). Branchez-les sur une
        vraie base de données pour un tableau de bord en production.
      </div>
    </div>
  );
}
