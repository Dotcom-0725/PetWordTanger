export type AnimalSpecies = "bird" | "cat" | "dog";
export type AnimalGender = "male" | "female" | "pair" | "unknown";
export type AnimalAvailability = "available" | "reserved" | "sold";

export interface VaccinationRecord {
  vaccine: string;
  dateGiven: string;
  nextDue?: string;
}

export interface Animal {
  id: string;
  slug: string;
  sku: string;
  species: AnimalSpecies;
  breed: string;
  commonName: Record<"fr" | "en" | "ar", string>;
  description: Record<"fr" | "en" | "ar", string>;
  ageLabel: string;
  gender: AnimalGender;
  colorMarkings?: string;
  price: number;
  quantityAvailable: number;
  healthStatus: {
    vetCheckedDate: string;
    vaccinated: boolean;
    dewormed: boolean;
    healthCertificateUrl?: string;
  };
  vaccinationRecords: VaccinationRecord[];
  origin: {
    bredInHouse: boolean;
    breederName?: string;
    region: string;
  };
  temperamentTags: string[];
  careLevel: "easy" | "moderate" | "advanced";
  availabilityStatus: AnimalAvailability;
  images: string[];
  videoUrl?: string;
  featured?: boolean;
  createdAt: string;
}
