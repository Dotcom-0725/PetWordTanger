import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nom trop court").max(100),
  phone: z.string().min(9, "Numéro invalide").max(20),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  subject: z.enum(["animal", "product", "wholesale", "other"]),
  message: z.string().min(10, "Message trop court").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Email invalide"),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const wholesaleSchema = z.object({
  companyName: z.string().min(2).max(150),
  contactName: z.string().min(2).max(100),
  phone: z.string().min(9).max(20),
  email: z.string().email(),
  businessType: z.enum(["pet_shop", "farm", "breeder", "other"]),
  estimatedVolume: z.string().min(1),
  message: z.string().min(10).max(2000),
});
export type WholesaleInput = z.infer<typeof wholesaleSchema>;

export const checkoutSchema = z.object({
  name: z.string().min(2, "Nom requis").max(100),
  phone: z.string().min(9, "Téléphone invalide").max(20),
  address: z.string().min(10, "Adresse trop courte").max(500),
  city: z.string().min(2).max(100),
  paymentMethod: z.enum(["cod", "bank_transfer", "whatsapp"]),
  notes: z.string().max(500).optional(),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;
