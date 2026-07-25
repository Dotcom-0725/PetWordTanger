export interface Review {
  id: string;
  targetId: string;
  targetType: "animal" | "product";
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}
