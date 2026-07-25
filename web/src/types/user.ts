export type UserRole = "customer" | "admin";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  createdAt: string;
}
