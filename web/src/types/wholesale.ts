export type WholesaleStatus = "new" | "contacted" | "quoted" | "closed";

export interface WholesaleInquiry {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  businessType: "pet_shop" | "farm" | "breeder" | "other";
  estimatedVolume: string;
  message: string;
  status: WholesaleStatus;
  createdAt: string;
}
