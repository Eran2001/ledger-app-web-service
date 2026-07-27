import { subMonths, format } from "date-fns";

import type { Customer } from "@/types/customer-types";

import { saleStats, sales } from "./sale-data";

const today = new Date(2026, 4, 3);
const iso = (d: Date) => format(d, "yyyy-MM-dd");

export const TABS = [
  { value: "active", label: "Active Sales" },
  { value: "payments", label: "Payment History" },
];

export const customers: Customer[] = [
  {
    id: "c1",
    fullName: "Nimal Perera",
    primary_phone: "+94 77 123 4567",
    secondary_phone: "+94 77 123 4444",
    nic: "198512345678",
    address: "No 293, kariyawasampura, Govijanapadaya Tes Estate, Bandaragama.",
    city: "Colombo",
    createdAt: iso(subMonths(today, 8)),
    email: "nimal.p@gmail.com",
  },
  {
    id: "c2",
    fullName: "Sunethra De Silva",
    primary_phone: "+94 71 234 5678",
    secondary_phone: "+94 77 123 4444",
    nic: "197823456789",
    address: "12/A, Kandy Road, Kadawatha",
    city: "Kadawatha",
    createdAt: iso(subMonths(today, 6)),
  },
  {
    id: "c3",
    fullName: "Roshan Fernando",
    primary_phone: "+94 76 345 6789",
    nic: "199034567890",
    address: "88, Negombo Road, Wattala",
    city: "Wattala",
    createdAt: iso(subMonths(today, 5)),
    secondary_phone: "+94 77 123 4444",
    email: "roshan.f@gmail.com",
  },
  {
    id: "c4",
    fullName: "Dilini Jayawardena",
    primary_phone: "+94 70 456 7890",
    secondary_phone: "+94 77 123 4444",
    nic: "199245678901",
    address: "23, Lake Road, Nugegoda",
    city: "Nugegoda",
    createdAt: iso(subMonths(today, 4)),
  },
  {
    id: "c5",
    fullName: "Chamara Bandara",
    primary_phone: "+94 77 567 8901",
    secondary_phone: "+94 77 123 4444",
    nic: "198856789012",
    address: "67, Peradeniya Road, Kandy",
    city: "Kandy",
    createdAt: iso(subMonths(today, 3)),
    email: "chamara.b@hotmail.com",
  },
  {
    id: "c6",
    fullName: "Anura Kumara",
    primary_phone: "+94 71 678 9012",
    secondary_phone: "+94 77 123 4444",
    nic: "198067890123",
    address: "9, Main Street, Matara",
    city: "Matara",
    createdAt: iso(subMonths(today, 12)),
  },
  {
    id: "c7",
    fullName: "Priya Wickrama",
    primary_phone: "+94 76 789 0123",
    secondary_phone: "+94 77 123 4444",
    nic: "199578901234",
    address: "34, Temple Road, Galle",
    city: "Galle",
    createdAt: iso(subMonths(today, 2)),
    email: "priya.w@gmail.com",
  },
  {
    id: "c8",
    fullName: "Tharaka Samaratunge",
    primary_phone: "+94 70 890 1234",
    secondary_phone: "+94 77 123 4444",
    nic: "198689012345",
    address: "112, Park Avenue, Battaramulla",
    city: "Battaramulla",
    createdAt: iso(subMonths(today, 10)),
  },
];

export const customerById = (id: string) => customers.find((c) => c.id === id);

export const customerStats = (customerId: string) => {
  const customerSales = sales.filter((s) => s.customerId === customerId);
  let outstanding = 0;
  let totalPaid = 0;
  let activeSalesCount = 0;
  let hasOverdue = false;
  let nextDue: string | undefined = undefined;
  customerSales.forEach((s) => {
    const stat = saleStats(s.id);
    outstanding += stat.outstanding;
    totalPaid += stat.totalPaid;
    if (s.status === "ACTIVE") activeSalesCount++;
    if (stat.hasOverdue) hasOverdue = true;
    if (stat.nextDue) {
      if (!nextDue || new Date(stat.nextDue) < new Date(nextDue)) {
        nextDue = stat.nextDue;
      }
    }
  });
  return {
    outstanding,
    totalPaid,
    activeSalesCount,
    hasOverdue,
    totalSales: customerSales.length,
    nextDue,
  };
};
