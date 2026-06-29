import { addMonths, format, subDays, subMonths } from "date-fns";

import type { Sale } from "@/types/sale-types";
import {
  InstallmentSchedule,
  InstallmentStatus,
} from "@/types/installment-types";
import { Payment } from "@/types/payment-types";

const today = new Date(2026, 4, 3);
const iso = (d: Date) => format(d, "yyyy-MM-dd");

interface SaleSpec {
  id: string;
  customerId: string;
  productId: string;
  soldPrice: number;
  downPayment: number;
  totalMonths: number;
  monthsAgo: number;
  paidUpTo: number;
  partialOnNext?: number;
  status: "ACTIVE" | "COMPLETED";
  notes?: string;
}

const saleSpecs: SaleSpec[] = [
  {
    id: "s1",
    customerId: "c1",
    productId: "p1",
    soldPrice: 92000,
    downPayment: 20000,
    totalMonths: 12,
    monthsAgo: 5,
    paidUpTo: 5,
    status: "ACTIVE",
    notes: "Customer prefers WhatsApp reminders.",
  },
  {
    id: "s2",
    customerId: "c2",
    productId: "p2",
    soldPrice: 130000,
    downPayment: 30000,
    totalMonths: 10,
    monthsAgo: 6,
    paidUpTo: 3,
    status: "ACTIVE",
    notes: "Late on payment - call before reminder.",
  },
  {
    id: "s3",
    customerId: "c3",
    productId: "p3",
    soldPrice: 100000,
    downPayment: 20000,
    totalMonths: 12,
    monthsAgo: 4,
    paidUpTo: 3,
    partialOnNext: 3000,
    status: "ACTIVE",
  },
  {
    id: "s4",
    customerId: "c6",
    productId: "p4",
    soldPrice: 70000,
    downPayment: 15000,
    totalMonths: 8,
    monthsAgo: 10,
    paidUpTo: 8,
    status: "COMPLETED",
    notes: "Repeat customer.",
  },
  {
    id: "s5",
    customerId: "c5",
    productId: "p6",
    soldPrice: 48000,
    downPayment: 10000,
    totalMonths: 6,
    monthsAgo: 2,
    paidUpTo: 2,
    status: "ACTIVE",
  },
  {
    id: "s6",
    customerId: "c4",
    productId: "p9",
    soldPrice: 35000,
    downPayment: 8000,
    totalMonths: 6,
    monthsAgo: 5,
    paidUpTo: 1,
    status: "ACTIVE",
    notes: "Two reminders sent. No response.",
  },
  {
    id: "s7",
    customerId: "c7",
    productId: "p8",
    soldPrice: 30000,
    downPayment: 5000,
    totalMonths: 5,
    monthsAgo: 3,
    paidUpTo: 3,
    status: "ACTIVE",
  },
  {
    id: "s8",
    customerId: "c8",
    productId: "p1",
    soldPrice: 88000,
    downPayment: 20000,
    totalMonths: 10,
    monthsAgo: 4,
    paidUpTo: 1,
    status: "ACTIVE",
  },
];

const buildSalesAndSchedules = () => {
  const sales: Sale[] = [];
  const schedules: InstallmentSchedule[] = [];
  const payments: Payment[] = [];

  saleSpecs.forEach((spec) => {
    const remaining = spec.soldPrice - spec.downPayment;
    const monthlyAmount = Math.ceil(remaining / spec.totalMonths);
    const saleDate = subMonths(today, spec.monthsAgo);

    sales.push({
      id: spec.id,
      customerId: spec.customerId,
      productId: spec.productId,
      soldPrice: spec.soldPrice,
      downPayment: spec.downPayment,
      monthlyAmount,
      totalMonths: spec.totalMonths,
      saleDate: iso(saleDate),
      status: spec.status,
      notes: spec.notes,
    });

    for (let i = 1; i <= spec.totalMonths; i++) {
      const dueDate = addMonths(saleDate, i);
      const isPaid = i <= spec.paidUpTo;
      const isPartial = i === spec.paidUpTo + 1 && spec.partialOnNext;
      const isOverdue = !isPaid && !isPartial && dueDate < today;

      let status: InstallmentStatus = "PENDING";
      let paidAmount = 0;

      if (isPaid) {
        status = "PAID";
        paidAmount = monthlyAmount;
      } else if (isPartial) {
        status = "PARTIALLY_PAID";
        paidAmount = spec.partialOnNext as number;
      } else if (isOverdue) {
        status = "OVERDUE";
      }

      const schedId = `${spec.id}-i${i}`;
      schedules.push({
        id: schedId,
        saleId: spec.id,
        installmentNumber: i,
        dueDate: iso(dueDate),
        expectedAmount: monthlyAmount,
        paidAmount,
        status,
      });

      if (paidAmount > 0) {
        const paidDate = isPaid
          ? iso(addMonths(saleDate, i))
          : iso(subDays(today, 8));
        payments.push({
          id: `pay-${spec.id}-${i}`,
          installmentScheduleId: schedId,
          paidAmount,
          paidDate,
          recordedBy: i % 2 === 0 ? "Nirosha Perera" : "Kamal Silva",
          notes: isPartial
            ? "Customer requested 5-day extension for the balance."
            : undefined,
        });
      }
    }
  });

  return { sales, schedules, payments };
};

const built = buildSalesAndSchedules();

export const sales: Sale[] = built.sales;
export const installmentSchedules: InstallmentSchedule[] = built.schedules;
export const payments: Payment[] = built.payments;

export const saleById = (id: string) => sales.find((s) => s.id === id);

export const schedulesForSale = (saleId: string) =>
  installmentSchedules
    .filter((s) => s.saleId === saleId)
    .sort((a, b) => a.installmentNumber - b.installmentNumber);

export const paymentsForSale = (saleId: string) => {
  const ids = new Set(
    installmentSchedules.filter((s) => s.saleId === saleId).map((s) => s.id),
  );
  return payments
    .filter((p) => ids.has(p.installmentScheduleId))
    .sort(
      (a, b) => new Date(b.paidDate).getTime() - new Date(a.paidDate).getTime(),
    );
};

export const saleStats = (saleId: string) => {
  const scheds = schedulesForSale(saleId);
  const sale = saleById(saleId);
  if (!sale)
    return {
      totalPaid: 0,
      outstanding: 0,
      paidCount: 0,
      totalCount: 0,
      nextDue: undefined as string | undefined,
      hasOverdue: false,
    };
  const totalPaid =
    sale.downPayment + scheds.reduce((sum, s) => sum + s.paidAmount, 0);
  const outstanding = Math.max(0, sale.soldPrice - totalPaid);
  const paidCount = scheds.filter((s) => s.status === "PAID").length;
  const next = scheds.find((s) => s.status !== "PAID");
  const hasOverdue = scheds.some((s) => s.status === "OVERDUE");
  return {
    totalPaid,
    outstanding,
    paidCount,
    totalCount: scheds.length,
    nextDue: next?.dueDate,
    hasOverdue,
  };
};
