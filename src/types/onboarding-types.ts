import type { Role } from "@/types/employee-types";

export interface PendingRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  requestedRole: Role;
  message: string;
  requestedAt: string;
}
