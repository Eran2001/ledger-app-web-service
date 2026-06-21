import { useNavigate } from "@tanstack/react-router";

import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { CardCaption } from "@/components/shared/card-caption";

import {
  installmentSchedules,
  productById,
  customerById,
  sales,
} from "@/lib/dummy-data";
import { formatCurrency, daysOverdue } from "@/lib/utils";

const overdueRows = installmentSchedules
  .filter((i) => i.status === "OVERDUE")
  .map((i) => {
    const sale = sales.find((s) => s.id === i.saleId);
    const customer = sale ? customerById(sale.customerId) : undefined;
    const product = sale ? productById(sale.productId) : undefined;
    return {
      id: i.id,
      customer: customer?.fullName ?? "Unknown",
      customerId: customer?.id ?? "",
      product: product?.name ?? "—",
      days: daysOverdue(i.dueDate),
      amount: i.expectedAmount - i.paidAmount,
    };
  })
  .sort((a, b) => b.days - a.days)
  .slice(0, 6);

export const OverdueList = () => {
  const navigate = useNavigate();

  return (
    <CardCaption
      title="Overdue Installments"
      className="xl:col-span-2"
      actionLabel="View All"
      actionTo="/overdue"
    >
      <ul className="flex-1 divide-y divide-border">
        {overdueRows.map((r) => (
          <li
            key={r.id}
            onClick={() =>
              r.customerId &&
              navigate({ to: "/customers/$id", params: { id: r.customerId } })
            }
            className="surface-hover cursor-pointer flex items-center justify-between gap-3 px-6 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <InitialsAvatar name={r.customer} size="sm" />
              <div className="min-w-0">
                <p className="t-meta-bold text-main truncate">{r.customer}</p>
                <p className="t-micro text-faint truncate">{r.product}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="t-micro-bold text-danger text-uppercase">
                {r.days} days late
              </p>
              <p className="t-meta-bold text-main">
                {formatCurrency(r.amount)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="surface-page px-6 py-3.5 text-center t-micro text-faint">
        Manual reminders recommended for 60+ days
      </div>
    </CardCaption>
  );
};
