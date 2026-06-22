import { useState } from "react";
import { useNavigate, useParams, Navigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { TabSelect, TabPanel } from "@/components/ui/tab-select";

import {
  customerById,
  customerStats,
  paymentsForSale,
  sales,
} from "@/lib/dummy-data";
import { TABS } from "@/constant/customer";

import { CustomerProfileHeader } from "../components/customer-profile-header";
import { SaleCard } from "../components/sale-card";
import { PaymentHistoryTable } from "../components/payment-history-table";

const CustomerDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
  const [tab, setTab] = useState("active");

  const customer = customerById(id ?? "");
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
    <div>
      <TopBar
        pageTitle={customer.fullName}
        pageSubtitle="Customer profile"
        primaryAction={{ to: "/sales/new", icon: Icon.Plus, label: "New Sale" }}
      />
      <div className="p-6 space-y-6 overflow-y-auto">
        <Button
          variant="link"
          size="sm"
          className="p-0 t-meta-bold group"
          onClick={() => navigate({ to: "/customers" })}
        >
          <Icon.ArrowLeft className="icon-back-hover" />
          Back to list
        </Button>

        <CustomerProfileHeader customer={customer} stats={stats} />

        <TabSelect tabs={TABS} value={tab} onValueChange={setTab}>
          <TabPanel value="active" active={tab} className="pt-6">
            {activeSales.length === 0 ? (
              <p className="t-body text-faint">No active sales.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeSales.map((sale) => (
                  <SaleCard key={sale.id} sale={sale} />
                ))}
              </div>
            )}
          </TabPanel>

          <TabPanel value="payments" active={tab} className="pt-6">
            <PaymentHistoryTable payments={allPayments} />
          </TabPanel>
        </TabSelect>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
