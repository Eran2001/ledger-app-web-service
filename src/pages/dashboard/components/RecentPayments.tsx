import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  installmentSchedules,
  payments,
  productById,
  customerById,
  sales,
} from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const recentPayments = [...payments]
  .sort((a, b) => new Date(b.paidDate).getTime() - new Date(a.paidDate).getTime())
  .slice(0, 5)
  .map((p) => {
    const sched = installmentSchedules.find((s) => s.id === p.installmentScheduleId);
    const sale = sched ? sales.find((s) => s.id === sched.saleId) : undefined;
    const customer = sale ? customerById(sale.customerId) : undefined;
    const product = sale ? productById(sale.productId) : undefined;
    const status = (sched?.status ?? "PAID") as "PAID" | "PARTIALLY_PAID" | "OVERDUE" | "PENDING";
    return {
      id: p.id,
      customer: customer?.fullName ?? "Unknown",
      product: product?.name ?? "—",
      amount: p.paidAmount,
      date: p.paidDate,
      status,
    };
  });

export default function RecentPayments() {
  return (
    <section className="surface-card card-rounded border border-default shadow-sm xl:col-span-3 overflow-hidden">
      <div className="flex items-center justify-between px-6 h-14 border-b border-default">
        <h2 className="t-title text-main">Recent Payments</h2>
        <Link to="/sales" className="t-meta-bold text-brand inline-flex items-center gap-1 link-hover">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="table-header">
              <th className="px-6 py-3 align-text-left">Customer</th>
              <th className="px-6 py-3 align-text-left">Product</th>
              <th className="px-6 py-3 align-text-right">Amount</th>
              <th className="px-6 py-3 align-text-left">Date</th>
              <th className="px-6 py-3 align-text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((p) => (
              <tr key={p.id} className="border-t border-default surface-hover">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={p.customer} size="sm" />
                    <span className="table-title-text">{p.customer}</span>
                  </div>
                </td>
                <td className="px-6 py-3 table-text">{p.product}</td>
                <td className="px-6 py-3 align-text-right t-meta-bold text-main fw-semibold">
                  {formatCurrency(p.amount)}
                </td>
                <td className="px-6 py-3 table-text">{formatDate(p.date)}</td>
                <td className="px-6 py-3">
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
