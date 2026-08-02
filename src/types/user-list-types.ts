import type { Role } from "@/types/employee-types";

export type UserStatusTab = "all" | "active" | "inactive" | "pending";

export interface UserListRow {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "inactive" | "pending";
  phone?: string;
  date: string;
}

export interface UserListProps {
  rows: UserListRow[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onOpen: (user: UserListRow) => void;
}

export function rolePillClass(role: Role): string {
  switch (role) {
    case "ADMIN":
      return "pill-indigo";
    case "STAFF":
      return "pill-teal";
    case "VIEWER":
    default:
      return "pill-gray";
  }
}
