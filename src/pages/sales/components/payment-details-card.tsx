import { Card } from "@/components/ui/card";

import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import type { Payment } from "@/types/payment-types";

interface PaymentDetailsCardProps {
  history: Payment[];
  paidCount: number;
  totalCount: number;
  outstanding: number;
  nextDue?: string;
}

const Detail = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div>
    <p className="t-label-sm-bold text-soft text-uppercase tracking-label mb-1">
      {label}
    </p>
    <p
      className={`t-body-md-bold ${highlight ? "text-destructive" : "text-main"}`}
    >
      {value}
    </p>
  </div>
);

export function PaymentDetailsCard({
  history,
  paidCount,
  totalCount,
  outstanding,
  nextDue,
}: PaymentDetailsCardProps) {
  const latestPayment = history[0];
  const totalCollected = history.reduce(
    (sum, payment) => sum + payment.paidAmount,
    0,
  );

  return (
    <Card border shadow className="h-fit">
      <p className="t-label-sm-bold text-soft text-uppercase tracking-label">
        Payment Details
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Detail label="Payments" value={`${history.length}`} />
        <Detail label="Paid Terms" value={`${paidCount} / ${totalCount}`} />
        <Detail label="Collected" value={formatCurrency(totalCollected)} />
        <Detail
          label="Outstanding"
          value={formatCurrency(outstanding)}
          highlight
        />
        <Detail
          label="Last Payment"
          value={latestPayment ? formatDate(latestPayment.paidDate) : "—"}
        />
        <Detail
          label="Last Amount"
          value={latestPayment ? formatCurrency(latestPayment.paidAmount) : "—"}
        />
        <Detail label="Recorded By" value={latestPayment?.recordedBy ?? "—"} />
        <Detail label="Next Due" value={nextDue ? formatDate(nextDue) : "—"} />
      </div>
    </Card>
  );
}
