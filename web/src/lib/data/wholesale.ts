import "server-only";
import type { WholesaleInquiry } from "@/types/wholesale";

const INQUIRIES: WholesaleInquiry[] = [
  {
    id: "w1",
    companyName: "Animalerie Atlas",
    contactName: "Karim Moussaoui",
    phone: "0661112233",
    email: "karim@animalerie-atlas.ma",
    businessType: "pet_shop",
    estimatedVolume: "15 000 - 30 000 DH / mois",
    message: "Recherche fournisseur régulier pour alimentation chat et chien.",
    status: "quoted",
    createdAt: "2026-07-05",
  },
];

/** Backing store for the Admin > Wholesale Requests screen; the API route
 *  `app/api/wholesale/route.ts` should append here (or to a real DB table). */
export async function getAllWholesaleInquiries() {
  return INQUIRIES;
}
