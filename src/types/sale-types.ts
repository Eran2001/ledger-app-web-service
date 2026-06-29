import type { saleStats } from "@/constant/sale-data";
import type { customerById } from "@/constant/customer-data";
import type { productById } from "@/constant/product-data";

export type SaleStatus = "ACTIVE" | "COMPLETED" | "WRITTEN_OFF";

export type SaleTab = "all" | "active" | "overdue" | "completed" | "writtenoff";

export interface SaleSpec {
  id: string;
  customerId: string;
  productId: string;
  soldPrice: number;
  downPayment: number;
  totalMonths: number;
  monthsAgo: number;
  paidUpTo: number; // installments paid (PAID status)
  partialOnNext?: number; // partial amount paid on the next installment
  status: "ACTIVE" | "COMPLETED" | "WRITTEN_OFF";
  notes?: string;
}

export interface Sale {
  id: string;
  customerId: string;
  productId: string;
  soldPrice: number;
  downPayment: number;
  monthlyAmount: number;
  totalMonths: number;
  saleDate: string;
  status: SaleStatus;
  notes?: string;
}

export type EnrichedSale = {
  sale: Sale;
  stat: ReturnType<typeof saleStats>;
  customer: ReturnType<typeof customerById>;
  product: ReturnType<typeof productById>;
};

export interface SalesTableProps {
  rows: EnrichedSale[];
}
