export type Tab = "all" | "active" | "overdue";

export type Sale = {
  id: string;
  productId: string;
  soldPrice: number;
  downPayment: number;
  monthlyAmount: number;
};

export type Payment = {
  id: string;
  saleId: string;
  paidDate: string;
  paidAmount: number;
  recordedBy: string;
  notes?: string | null;
};

export type Props = {
  customer: {
    fullName: string;
    nic: string;
    phone: string;
    email?: string;
    address: string;
    createdAt: string;
  };
  stats: {
    activeSalesCount: number;
    outstanding: number;
  };
};
