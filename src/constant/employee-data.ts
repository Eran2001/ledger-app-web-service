import { subDays, format } from "date-fns";

import type { Employee } from "@/types/employee-types";
import type { PendingRegistration } from "@/types/onboarding-types";

const today = new Date(2026, 4, 3);
const iso = (d: Date) => format(d, "yyyy-MM-dd");

export const employees: Employee[] = [
  {
    id: "u1",
    name: "Kamal Silva",
    email: "kamal@silvatraders.lk",
    role: "ADMIN",
    status: "active",
    lastLogin: iso(subDays(today, 0)),
  },
  {
    id: "u2",
    name: "Nirosha Perera",
    email: "nirosha@silvatraders.lk",
    role: "STAFF",
    status: "active",
    lastLogin: iso(subDays(today, 1)),
  },
  {
    id: "u3",
    name: "Asanka De Silva",
    email: "asanka@silvatraders.lk",
    role: "VIEWER",
    status: "active",
    lastLogin: iso(subDays(today, 5)),
  },
];

export const pendingRegistrations: PendingRegistration[] = [
  {
    id: "pr1",
    name: "Sahan Wijesinghe",
    email: "sahan.w@gmail.com",
    phone: "+94 77 234 5678",
    requestedRole: "STAFF",
    message:
      "I have 3 years experience in retail collection management at Abans.",
    requestedAt: iso(subDays(today, 2)),
  },
  {
    id: "pr2",
    name: "Madhavi Senanayake",
    email: "madhavi.s@yahoo.com",
    phone: "+94 71 998 7654",
    requestedRole: "VIEWER",
    message:
      "Auditor for the Silva Traders accounts. Need read-only access for monthly reports.",
    requestedAt: iso(subDays(today, 6)),
  },
];

export const userById = (id: string) => employees.find((u) => u.id === id);
