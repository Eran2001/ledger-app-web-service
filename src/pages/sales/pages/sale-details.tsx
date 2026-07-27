import { useCallback, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { CustomerInfoCard } from "@/components/shared/customer-info-card";

import { customerById } from "@/constant/customer-data";
import { productById } from "@/constant/product-data";
import {
  paymentsForSale,
  saleById,
  saleStats,
  schedulesForSale,
} from "@/constant/sale-data";
import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";
import { useTopBarOverride } from "@/hooks/use-top-bar-override";

import { RecordPaymentModal } from "../components/record-payment-modal";
import { SaleSummaryCard } from "../components/sale-summary-card";

function SaleDetail() {
  const { id } = useParams({ strict: false });
  const sale = saleById(id ?? "");
  const schedules = sale ? schedulesForSale(sale.id) : [];
  const product = sale ? productById(sale.productId) : undefined;
  const firstUnpaid = useMemo(
    () => schedules.find((s) => s.status !== "PAID"),
    [schedules],
  );
  const [activeInstallmentId, setActiveInstallmentId] = useState<string | null>(
    null,
  );

  const openPaymentModal = useCallback(
    (installmentId?: string) => {
      setActiveInstallmentId(installmentId ?? firstUnpaid?.id ?? null);
    },
    [firstUnpaid?.id],
  );

  const topBarOverride = useMemo(
    () =>
      sale
        ? {
            pageSubtitle: product?.name ?? "",
            primaryAction: firstUnpaid
              ? {
                  onClick: () => openPaymentModal(),
                  icon: Icon.Wallet,
                  label: "Record Payment",
                }
              : undefined,
          }
        : null,
    [firstUnpaid, openPaymentModal, product?.name, sale],
  );

  useTopBarOverride(topBarOverride);

  if (!sale) return <Navigate to="/sales" />;

  const customer = customerById(sale.customerId);
  const stat = saleStats(sale.id);
  const history = paymentsForSale(sale.id);

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {customer && (
          <CustomerInfoCard
            border
            shadow
            customer={customer}
            backTo="/sales"
            onNavigate={`/customers/${customer.id}`}
          />
        )}

        <SaleSummaryCard
          status={stat.hasOverdue ? "OVERDUE" : sale.status}
          productName={product?.name ?? "—"}
          soldPrice={sale.soldPrice}
          downPayment={sale.downPayment}
          monthlyAmount={sale.monthlyAmount}
          totalMonths={sale.totalMonths}
          totalPaid={stat.totalPaid}
          outstanding={stat.outstanding}
          nextDue={stat.nextDue}
          saleDate={sale.saleDate}
          border
          shadow
        />
      </div>

      <section className="surface-card modal-rounded border border-default shadow-sm mb-6 overflow-hidden">
        <div className="flex items-center justify-between px-6 h-14 border-b border-default">
          <h2 className="t-title-md text-main">Installment Schedule</h2>
          <span className="surface-brand-soft text-brand t-label-md-bold px-3 py-1 circle-rounded">
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
                      className={`px-6 py-3 t-body-md-bold ${isPaid ? "text-faint" : "text-main"}`}
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
                    <td className="px-6 py-3 text-right t-body-md-bold text-main">
                      {balance > 0 ? formatCurrency(balance) : "—"}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-6 py-3 text-right">
                      {!isPaid ? (
                        <Button
                          variant="outline"
                          onClick={() => openPaymentModal(s.id)}
                          className="t-label-md-bold control-rounded border-brand-soft text-brand hover:bg-(--primary-light) bg-transparent"
                        >
                          Record Payment
                        </Button>
                      ) : (
                        <span className="t-label-md text-faint">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="surface-card modal-rounded border border-default p-8 shadow-sm">
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
                      <span className="t-body-md-bold text-main">
                        {formatDate(p.paidDate)}
                      </span>
                      <span className="t-title-lg fw-black text-brand">
                        {formatCurrency(p.paidAmount)}
                      </span>
                      {sched && (
                        <span className="surface-brand-soft text-brand t-label-sm-bold text-uppercase tracking-label px-2 py-0.5 global-rounded">
                          Installment {sched.installmentNumber}
                        </span>
                      )}
                    </div>
                    <p className="t-label-md text-soft">
                      Recorded by {p.recordedBy}
                    </p>
                    {p.notes && (
                      <p className="surface-page global-rounded p-3 t-label-md text-soft mt-2 border border-default">
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

      <RecordPaymentModal
        open={!!activeInstallmentId}
        onClose={() => setActiveInstallmentId(null)}
        installmentId={activeInstallmentId}
        customerPhone={customer?.primary_phone}
      />
    </div>
  );
}

export default SaleDetail;
