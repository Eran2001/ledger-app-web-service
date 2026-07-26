import { useMemo, useState } from "react";
import { useParams, Navigate } from "@tanstack/react-router";

import { TabSelect, TabPanel } from "@/components/ui/tab-select";

import { CustomerProfileHeader } from "../components/customer-profile-header";
import { AccountSummaryCard } from "../components/account-summary-card";
import { SaleCard } from "../components/sale-card";
import { PaymentHistoryTable } from "../components/payment-history-table";

import { customerById, customerStats, TABS } from "@/constant/customer-data";
import { paymentsForSale, sales } from "@/constant/sale-data";
import { useTopBarOverride } from "@/hooks/use-top-bar-override";

const CustomerDetail = () => {
  const { id } = useParams({ strict: false });
  const [tab, setTab] = useState("active");

  const customer = customerById(id ?? "");
  const topBarOverride = useMemo(
    () => (customer ? { pageTitle: customer.fullName } : null),
    [customer],
  );

  useTopBarOverride(topBarOverride);

  if (!customer) return <Navigate to="/customers" />;

  const stats = customerStats(customer.id);
  const customerSales = sales.filter((s) => s.customerId === customer.id);
  const activeSales = customerSales.filter((s) => s.status === "ACTIVE");
  const allPayments = customerSales
    .flatMap((s) => paymentsForSale(s.id).map((p) => ({ ...p, saleId: s.id })))
    .sort(
      (a, b) => new Date(b.paidDate).getTime() - new Date(a.paidDate).getTime(),
    );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CustomerProfileHeader customer={customer} />
        <AccountSummaryCard
          outstanding={stats.outstanding}
          totalPaid={stats.totalPaid}
          activeSalesCount={stats.activeSalesCount}
          nextDue={stats.nextDue}
          customerSince={customer.createdAt}
        />
      </div>

      <TabSelect tabs={TABS} value={tab} onValueChange={setTab}>
        <TabPanel value="active" active={tab}>
          {activeSales.length === 0 ? (
            <p className="t-body-lg text-faint">No active sales.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {activeSales.map((sale) => (
                <SaleCard key={sale.id} sale={sale} border shadow />
              ))}
            </div>
          )}
        </TabPanel>

        <TabPanel value="payments" active={tab}>
          <PaymentHistoryTable payments={allPayments} />
        </TabPanel>
      </TabSelect>
    </div>
  );
};

export default CustomerDetail;
