import "server-only";
import type { Order } from "@/types/order";

/** Mock order store for the Admin > Orders screen and Customer > Orders screen.
 *  Replace with real persistence (Postgres table via Prisma/Drizzle) — the
 *  checkout API route below is the natural place to call `createOrder`. */
const ORDERS: Order[] = [
  {
    id: "o1",
    orderNumber: "TA-2026-0142",
    customerName: "Sara Bennani",
    customerPhone: "0612345678",
    deliveryAddress: "Malabata, Tanger",
    items: [{ productId: "p1", name: "Royal Canin Kitten 2kg", price: 185, quantity: 2 }],
    total: 370,
    paymentMethod: "cod",
    status: "shipped",
    tracking: [
      { status: "pending", label: "Commande reçue", timestamp: "2026-07-20T09:00:00Z" },
      { status: "confirmed", label: "Commande confirmée", timestamp: "2026-07-20T10:30:00Z" },
      { status: "shipped", label: "Expédiée", timestamp: "2026-07-21T08:00:00Z" },
    ],
    createdAt: "2026-07-20",
  },
  {
    id: "o2",
    orderNumber: "TA-2026-0143",
    customerName: "Amine Raji",
    customerPhone: "0698765432",
    deliveryAddress: "Centre-ville, Tanger",
    items: [{ productId: "p3", name: "Antiparasitaire Chien", price: 140, quantity: 1 }],
    total: 140,
    paymentMethod: "whatsapp",
    status: "pending",
    tracking: [{ status: "pending", label: "Commande reçue", timestamp: "2026-07-24T14:00:00Z" }],
    createdAt: "2026-07-24",
  },
];

export async function getAllOrdersForAdmin() {
  return ORDERS;
}

export async function getOrdersForCustomer(phone: string) {
  return ORDERS.filter((o) => o.customerPhone === phone);
}

export async function getOrderByNumber(orderNumber: string) {
  return ORDERS.find((o) => o.orderNumber === orderNumber) ?? null;
}
