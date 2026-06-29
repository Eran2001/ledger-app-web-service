export type Role = "ADMIN" | "STAFF" | "VIEWER";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "inactive";
  lastLogin: string;
}
