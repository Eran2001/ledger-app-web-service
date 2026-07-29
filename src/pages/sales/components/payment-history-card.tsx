import { Card } from "@/components/ui/card";

import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";
import type { InstallmentSchedule } from "@/types/installment-types";
import type { Payment } from "@/types/payment-types";

interface PaymentHistoryCardProps {
  history: Payment[];
  schedules: InstallmentSchedule[];
}

export function PaymentHistoryCard({
  history,
  schedules,
}: PaymentHistoryCardProps) {
  return (
    <Card border shadow className="p-6 gap-0">
      <h2 className="t-title-md text-main mb-6">Payment History</h2>
      {history.length === 0 ? (
        <p className="t-body-lg text-faint">No payments recorded yet.</p>
      ) : (
        <div className="relative pl-8">
          <div
            className="absolute left-2.5 top-1 bottom-1 w-px"
            style={{ backgroundColor: "var(--primary)" }}
            aria-hidden
          />
          <ul className="flex flex-col gap-6">
            {history.map((payment) => {
              const schedule = schedules.find(
                (item) => item.id === payment.installmentScheduleId,
              );

              return (
                <li key={payment.id} className="relative">
                  <span
                    className="absolute -left-6.5 top-1.5 h-3 w-3 global-rounded ring-4 ring-(--card-bg)"
                    style={{ backgroundColor: "var(--primary)" }}
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="t-body-md-bold text-main">
                      {formatDate(payment.paidDate)}
                    </span>
                    <span className="t-title-lg fw-black text-brand">
                      {formatCurrency(payment.paidAmount)}
                    </span>
                    {schedule && (
                      <span className="surface-brand-soft text-brand t-label-sm-bold text-uppercase tracking-label px-2 py-0.5 global-rounded">
                        Installment {schedule.installmentNumber}
                      </span>
                    )}
                  </div>
                  <p className="t-label-md text-soft">
                    Recorded by {payment.recordedBy}
                  </p>
                  {payment.notes && (
                    <p className="surface-page global-rounded p-3 t-label-md text-soft mt-2 border border-default">
                      {payment.notes}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Card>
  );
}
