import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "@tanstack/react-router";
import { ArrowLeft, Wallet } from "lucide-react";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  customerById,
  paymentsForSale,
  productById,
  saleById,
  saleStats,
  schedulesForSale,
} from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";

import { RecordPaymentModal } from "@/pages/sales/components/record-payment-modal";

export default function SaleDetailPage() {
  const { id } = useParams({ strict: false });
  const sale = saleById(id ?? "");
  const schedules = sale ? schedulesForSale(sale.id) : [];
  const firstUnpaid = useMemo(
    () => schedules.find((s) => s.status !== "PAID"),
    [schedules],
  );
  const [activeInstallmentId, setActiveInstallmentId] = useState<string | null>(
    null,
  );

  if (!sale) return <Navigate to="/sales" />;

  const customer = customerById(sale.customerId);
  const product = productById(sale.productId);
  const stat = saleStats(sale.id);
  const history = paymentsForSale(sale.id);

  function openPaymentModal(installmentId?: string) {
    setActiveInstallmentId(installmentId ?? firstUnpaid?.id ?? null);
  }

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Sale Details"
        pageSubtitle={product?.name ?? ""}
        primaryAction={
          firstUnpaid
            ? {
                onClick: () => openPaymentModal(),
                icon: Wallet,
                label: "Record Payment",
              }
            : undefined
        }
      />
      <div className="p-6 overflow-y-auto">
        <Link
          to="/sales"
          className="inline-flex items-center gap-2 t-meta-bold text-brand mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to list
        </Link>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* Customer */}
          <div className="surface-card card-rounded border border-default p-6 shadow-sm">
            <p className="t-micro-bold text-soft text-uppercase tracking-label mb-4">
              Customer
            </p>
            <div className="flex items-start gap-4">
              <InitialsAvatar name={customer?.fullName ?? ""} size="lg" />
              <div className="flex-1 min-w-0">
                <h3 className="t-section text-main mb-1">
                  {customer?.fullName}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 t-meta text-soft">
                  <span>
                    <span className="text-faint mr-1">NIC</span>
                    <span className="font-mono">{customer?.nic}</span>
                  </span>
                  <span>
                    <span className="text-faint mr-1">Phone</span>
                    {customer?.phone}
                  </span>
                </div>
                <p className="t-meta text-soft mt-1">{customer?.address}</p>
                {customer && (
                  <Link
                    to="/customers/$id"
                    params={{ id: customer.id }}
                    className="t-caption-bold text-brand inline-flex items-center gap-1 mt-3"
                  >
                    View Full Profile →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Sale summary */}
          <div className="surface-card card-rounded border border-default p-6 shadow-sm relative">
            <div className="flex items-start justify-between mb-4">
              <p className="t-micro-bold text-soft text-uppercase tracking-label">
                Sale Summary
              </p>
              <StatusBadge status={stat.hasOverdue ? "OVERDUE" : sale.status} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <KV label="Product" value={product?.name ?? "—"} />
              <KV label="Sold Price" value={formatCurrency(sale.soldPrice)} />
              <KV
                label="Down Payment"
                value={formatCurrency(sale.downPayment)}
              />
              <KV label="Monthly" value={formatCurrency(sale.monthlyAmount)} />
              <KV label="Total Paid" value={formatCurrency(stat.totalPaid)} />
              <KV
                label="Outstanding"
                value={formatCurrency(stat.outstanding)}
                highlight
              />
            </div>
            <p className="t-caption text-faint italic mt-4 pt-4 border-t border-default">
              Sold on {formatDate(sale.saleDate)}
            </p>
          </div>
        </div>

        {/* Installment Schedule */}
        <section className="surface-card modal-rounded border border-default shadow-sm mb-6 overflow-hidden">
          <div className="flex items-center justify-between px-6 h-14 border-b border-default">
            <h2 className="t-title text-main">Installment Schedule</h2>
            <span className="surface-brand-soft text-brand t-caption-bold px-3 py-1 circle-rounded">
              {stat.paidCount} of {stat.totalCount} paid ·{" "}
              {formatCurrency(stat.outstanding)} remaining
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Due Date</th>
                  <th className="px-6 py-3 text-right">Expected</th>
                  <th className="px-6 py-3 text-right">Paid</th>
                  <th className="px-6 py-3 text-right">Balance</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s) => {
                  const balance = s.expectedAmount - s.paidAmount;
                  const rowClass =
                    s.status === "PAID"
                      ? "surface-page"
                      : s.status === "PARTIALLY_PAID"
                        ? "surface-warning-soft"
                        : s.status === "OVERDUE"
                          ? "surface-overdue-row"
                          : "";
                  const isPaid = s.status === "PAID";
                  return (
                    <tr
                      key={s.id}
                      className={`border-t border-default ${rowClass}`}
                    >
                      <td
                        className={`px-6 py-3 t-meta-bold ${isPaid ? "text-faint" : "text-main"}`}
                      >
                        {s.installmentNumber}
                      </td>
                      <td
                        className={`px-6 py-3 table-text ${isPaid ? "line-through text-faint" : ""}`}
                      >
                        {formatDate(s.dueDate)}
                      </td>
                      <td className="px-6 py-3 text-right table-text">
                        {formatCurrency(s.expectedAmount)}
                      </td>
                      <td className="px-6 py-3 text-right table-text">
                        {formatCurrency(s.paidAmount)}
                      </td>
                      <td className="px-6 py-3 text-right t-meta-bold text-main">
                        {balance > 0 ? formatCurrency(balance) : "—"}
                      </td>
                      <td className="px-6 py-3">
                        <StatusBadge status={s.status} />
                      </td>
                      <td className="px-6 py-3 text-right">
                        {!isPaid ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openPaymentModal(s.id)}
                            className="t-caption-bold control-rounded border-brand-soft text-brand hover:bg-(--primary-light) bg-transparent"
                          >
                            Record Payment
                          </Button>
                        ) : (
                          <span className="t-caption text-faint">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment timeline */}
        <section className="surface-card modal-rounded border border-default p-8 shadow-sm">
          <h2 className="t-title text-main mb-6">Payment History</h2>
          {history.length === 0 ? (
            <p className="t-body text-faint">No payments recorded yet.</p>
          ) : (
            <div className="relative pl-8">
              <div
                className="absolute left-2.5 top-1 bottom-1 w-px"
                style={{ backgroundColor: "var(--primary)" }}
                aria-hidden
              />
              <ul className="flex flex-col gap-6">
                {history.map((p) => {
                  const sched = schedules.find(
                    (s) => s.id === p.installmentScheduleId,
                  );
                  return (
                    <li key={p.id} className="relative">
                      <span
                        className="absolute -left-6.5 top-1.5 h-3 w-3 circle-rounded ring-4 ring-(--card-bg)"
                        style={{ backgroundColor: "var(--primary)" }}
                        aria-hidden
                      />
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className="t-meta-bold text-main">
                          {formatDate(p.paidDate)}
                        </span>
                        <span className="t-display fw-black text-brand">
                          {formatCurrency(p.paidAmount)}
                        </span>
                        {sched && (
                          <span className="surface-brand-soft text-brand t-micro-bold text-uppercase tracking-label px-2 py-0.5 global-rounded">
                            Installment {sched.installmentNumber}
                          </span>
                        )}
                      </div>
                      <p className="t-caption text-soft">
                        Recorded by {p.recordedBy}
                      </p>
                      {p.notes && (
                        <p className="surface-page card-rounded p-3 t-caption text-soft mt-2 border border-default">
                          {p.notes}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      </div>

      <RecordPaymentModal
        open={!!activeInstallmentId}
        onClose={() => setActiveInstallmentId(null)}
        installmentId={activeInstallmentId}
        customerPhone={customer?.phone}
      />
    </div>
  );
}

function KV({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="t-micro-bold text-soft text-uppercase tracking-label mb-1">
        {label}
      </p>
      <p className={`t-meta-bold ${highlight ? "text-brand" : "text-main"}`}>
        {value}
      </p>
    </div>
  );
}
