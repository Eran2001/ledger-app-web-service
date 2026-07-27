import { StatusBadge } from "@/components/ui/status-badge";
import { Card } from "@/components/ui/card";

import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import type { SaleStatus } from "@/types/sale-types";

interface SaleSummaryCardProps {
  status: SaleStatus | "OVERDUE";
  productName: string;
  soldPrice: number;
  downPayment: number;
  monthlyAmount: number;
  totalMonths: number;
  totalPaid: number;
  outstanding: number;
  nextDue?: string;
  saleDate: string;
  border?: boolean;
  shadow?: boolean;
}

const KV = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div>
    <p className="t-label-sm-bold text-soft text-uppercase tracking-label mb-1">
      {label}
    </p>
    <p className={`t-body-md-bold ${highlight ? "text-brand" : "text-main"}`}>
      {value}
    </p>
  </div>
);

export const SaleSummaryCard = ({
  status,
  productName,
  soldPrice,
  downPayment,
  monthlyAmount,
  totalMonths,
  totalPaid,
  outstanding,
  nextDue,
  saleDate,
  border,
  shadow,
}: SaleSummaryCardProps) => {
  return (
    <Card className="overflow-hidden relative" border={border} shadow={shadow}>
      <div className="flex items-start justify-between">
        <p className="t-label-sm-bold text-soft text-uppercase tracking-label">
          Sale Summary
        </p>
        <StatusBadge status={status} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <KV label="Product" value={productName || "—"} />
        <KV label="Sold Price" value={formatCurrency(soldPrice)} />
        <KV label="Down Payment" value={formatCurrency(downPayment)} />
        <KV label="Monthly" value={formatCurrency(monthlyAmount)} />
        <KV label="Total Paid" value={formatCurrency(totalPaid)} />
        <KV label="Outstanding" value={formatCurrency(outstanding)} highlight />
        <KV label="Installments" value={`${totalMonths} months`} />
        <KV label="Next Due" value={nextDue ? formatDate(nextDue) : "—"} />
      </div>
      <p className="t-label-md text-faint italic">
        Sold on {formatDate(saleDate)}
      </p>
    </Card>
  );
};
