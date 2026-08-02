export type Role = "ADMIN" | "STAFF" | "VIEWER";

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  status: "active" | "inactive";
  lastLogin: string;
}
