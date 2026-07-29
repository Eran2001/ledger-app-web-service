import { useCallback, useMemo, useState } from "react";
import { useParams, Navigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { CustomerInfoCard } from "@/components/shared/customer-info-card";

import { customerById } from "@/constant/customer-data";
import { productById } from "@/constant/product-data";
import {
  paymentsForSale,
  saleById,
  saleStats,
  schedulesForSale,
} from "@/constant/sale-data";
import { formatCurrency } from "@/utils/format-currency";
import { useTopBarOverride } from "@/hooks/use-top-bar-override";

import { InstallmentScheduleTable } from "../components/installment-schedule-table";
import { PaymentDetailsCard } from "../components/payment-details-card";
import { PaymentHistoryCard } from "../components/payment-history-card";
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

      <div className="mb-6">
        <InstallmentScheduleTable
          schedules={schedules}
          statLabel={`${stat.paidCount} of ${stat.totalCount} paid · ${formatCurrency(stat.outstanding)} remaining`}
          onRecordPayment={openPaymentModal}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 items-start">
        <PaymentHistoryCard history={history} schedules={schedules} />
        <PaymentDetailsCard
          history={history}
          paidCount={stat.paidCount}
          totalCount={stat.totalCount}
          outstanding={stat.outstanding}
          nextDue={stat.nextDue}
        />
      </div>

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
