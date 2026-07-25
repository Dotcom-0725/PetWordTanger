import { z } from "zod";

/** Used by the admin Animal Management form (create/edit). */
export const animalFormSchema = z.object({
  species: z.enum(["bird", "cat", "dog"]),
  breed: z.string().min(2).max(100),
  commonNameFr: z.string().min(2).max(150),
  ageLabel: z.string().min(1).max(50),
  gender: z.enum(["male", "female", "pair", "unknown"]),
  price: z.coerce.number().positive("Le prix doit être positif"),
  quantityAvailable: z.coerce.number().int().min(0),
  vaccinated: z.boolean(),
  dewormed: z.boolean(),
  careLevel: z.enum(["easy", "moderate", "advanced"]),
  availabilityStatus: z.enum(["available", "reserved", "sold"]),
});
export type AnimalFormInput = z.infer<typeof animalFormSchema>;
