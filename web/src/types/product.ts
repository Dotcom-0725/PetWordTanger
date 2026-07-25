export type ProductCategory = "food" | "accessory" | "healthcare";

export interface ProductVariant {
  id: string;
  label: string;
  priceOverride?: number;
  stockQuantity: number;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: Record<"fr" | "en" | "ar", string>;
  description: Record<"fr" | "en" | "ar", string>;
  brand?: string;
  category: ProductCategory;
  subcategory: string;
  targetSpecies: Array<"bird" | "cat" | "dog" | "all">;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  variants?: ProductVariant[];
  images: string[];
  benefit?: string;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
}
