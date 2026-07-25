import "server-only";
import type { Review } from "@/types/review";

const REVIEWS: Review[] = [
  {
    id: "r1",
    targetId: "a1",
    targetType: "animal",
    authorName: "Sara B.",
    rating: 5,
    comment: "Mon perroquet est arrivé en parfaite santé, avec tout le suivi vétérinaire. Réponses rapides sur WhatsApp.",
    createdAt: "2026-06-20",
    verifiedPurchase: true,
  },
  {
    id: "r2",
    targetId: "p1",
    targetType: "product",
    authorName: "Karim M.",
    rating: 5,
    comment: "On commande notre alimentation en gros ici depuis 3 ans. Prix corrects, livraison fiable.",
    createdAt: "2026-06-15",
    verifiedPurchase: true,
  },
  {
    id: "r3",
    targetId: "a2",
    targetType: "animal",
    authorName: "Amine R.",
    rating: 5,
    comment: "Premier chat de ma vie et ils m'ont tout expliqué sans aucune pression.",
    createdAt: "2026-06-22",
    verifiedPurchase: true,
  },
];

export async function getReviewsFor(targetId: string) {
  return REVIEWS.filter((r) => r.targetId === targetId);
}

export async function getAllReviews() {
  return REVIEWS;
}
