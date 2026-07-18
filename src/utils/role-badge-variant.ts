import type { Role } from "@/types/employee-types";

export function roleBadgeVariant(
  role: Role,
): "warning" | "success" | "outline" {
  switch (role) {
    case "ADMIN":
      return "warning";
    case "STAFF":
      return "success";
    case "VIEWER":
    default:
      return "outline";
  }
}
