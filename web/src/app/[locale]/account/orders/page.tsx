import { auth } from "@/lib/auth";
import { getOrdersForCustomer } from "@/lib/data/orders";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export default async function OrdersPage() {
  const session = await auth();
  const orders = await getOrdersForCustomer(session?.user?.email ?? "");

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold">Mes commandes</h1>
      {orders.length === 0 ? (
        <p className="rounded-2xl border bg-muted/40 p-8 text-sm text-muted-foreground">Aucune commande pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <b>{order.orderNumber}</b>
                <Badge>{STATUS_LABEL[order.status]}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {order.items.length} article(s) · {formatCurrency(order.total, "fr")}
              </p>
              <div className="mt-4 space-y-2 border-t pt-4">
                {order.tracking.map((event, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                    {event.label} — {new Date(event.timestamp).toLocaleString("fr")}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
