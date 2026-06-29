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
