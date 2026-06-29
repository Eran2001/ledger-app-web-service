import type { UseFormRegister, Control, FieldErrors } from "react-hook-form";

import type { NewCustomerFormValues } from "@/schemas/customer-schema";

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

export interface Customer {
  id: string;
  fullName: string;
  primary_phone: string;
  secondary_phone: string;
  nic: string;
  address: string;
  city: string;
  createdAt: string;
  email?: string;
}

export type SummaryProps = {
  outstanding: number;
  totalPaid: number;
  activeSalesCount: number;
  nextDue?: string;
  customerSince: string;
};

export type ProfileProps = {
  customer: {
    fullName: string;
    nic: string;
    primary_phone: string;
    secondary_phone?: string;
    email?: string;
    address: string;
    city: string;
    createdAt: string;
  };
};

export interface NewCustomerFormFieldsProps {
  register: UseFormRegister<NewCustomerFormValues>;
  control: Control<NewCustomerFormValues>;
  errors: FieldErrors<NewCustomerFormValues>;
}
