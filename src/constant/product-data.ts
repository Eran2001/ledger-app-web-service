import { subMonths, format } from "date-fns";

import type { Product } from "@/types/product-types";

const today = new Date(2026, 4, 3);
const iso = (d: Date) => format(d, "yyyy-MM-dd");

export const products: Product[] = [
  {
    id: "p1",
    name: 'Samsung TV 43"',
    category: "Electronics",
    basePrice: 85000,
    activeSales: 2,
    createdAt: iso(subMonths(today, 14)),
    updatedAt: iso(subMonths(today, 14)),
  },
  {
    id: "p2",
    name: "LG Fridge 250L",
    category: "Appliances",
    basePrice: 120000,
    activeSales: 1,
    createdAt: iso(subMonths(today, 12)),
    updatedAt: iso(subMonths(today, 12)),
  },
  {
    id: "p3",
    name: "Washing Machine",
    category: "Appliances",
    basePrice: 95000,
    activeSales: 1,
    createdAt: iso(subMonths(today, 10)),
    updatedAt: iso(subMonths(today, 10)),
  },
  {
    id: "p4",
    name: "Sofa Set 3+1",
    category: "Furniture",
    basePrice: 65000,
    activeSales: 1,
    createdAt: iso(subMonths(today, 9)),
    updatedAt: iso(subMonths(today, 9)),
  },
  {
    id: "p5",
    name: "Air Cooler",
    category: "Electronics",
    basePrice: 35000,
    activeSales: 0,
    createdAt: iso(subMonths(today, 8)),
    updatedAt: iso(subMonths(today, 8)),
  },
  {
    id: "p6",
    name: "Sony Speaker",
    category: "Electronics",
    basePrice: 45000,
    activeSales: 1,
    createdAt: iso(subMonths(today, 7)),
    updatedAt: iso(subMonths(today, 7)),
  },
  {
    id: "p7",
    name: "Dining Table",
    category: "Furniture",
    basePrice: 55000,
    activeSales: 0,
    createdAt: iso(subMonths(today, 6)),
    updatedAt: iso(subMonths(today, 6)),
  },
  {
    id: "p8",
    name: "Water Pump",
    category: "Hardware",
    basePrice: 28000,
    activeSales: 1,
    createdAt: iso(subMonths(today, 5)),
    updatedAt: iso(subMonths(today, 5)),
  },
  {
    id: "p9",
    name: "Gas Cooker",
    category: "Appliances",
    basePrice: 32000,
    activeSales: 1,
    createdAt: iso(subMonths(today, 4)),
    updatedAt: iso(subMonths(today, 4)),
  },
  {
    id: "p10",
    name: "Rice Cooker",
    category: "Appliances",
    basePrice: 18000,
    activeSales: 0,
    createdAt: iso(subMonths(today, 3)),
    updatedAt: iso(subMonths(today, 3)),
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);

export const CATEGORIES: Product["category"][] = [
  "Electronics",
  "Appliances",
  "Furniture",
  "Hardware",
  "Other",
];
