import { useState } from "react";
import { Link, useParams, Navigate } from "@tanstack/react-router";
import { ArrowLeft, Plus } from "lucide-react";
import { TopBar } from "@/components/shared/top-bar";
import { TabSelect, TabPanel } from "@/components/ui/tab-select";
import {
  customerById,
  customerStats,
  paymentsForSale,
  sales,
} from "@/lib/dummy-data";
import CustomerProfileHeader from "../components/CustomerProfileHeader";
import SaleCard from "../components/SaleCard";
import PaymentHistoryTable from "../components/PaymentHistoryTable";

const TABS = [
  { value: "active", label: "Active Sales" },
  { value: "payments", label: "Payment History" },
];

export default function CustomerDetailPage() {
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
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle={customer.fullName}
        pageSubtitle="Customer profile"
        primaryAction={{ to: "/sales/new", icon: Plus, label: "New Sale" }}
      />
      <div className="p-6 overflow-y-auto">
        <Link
          to="/customers"
          className="inline-flex items-center gap-2 t-meta-bold text-brand mb-6 link-hover group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to list
        </Link>

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
}
