import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { StatPill } from "@/components/shared/stat-pill";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  customers,
  sales,
  installmentSchedules,
  products,
} from "@/constant/dummy";
import { formatCurrency, cn, formatDate } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export const CustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"sales" | "history">("sales");

  const customer = customers.find((c) => c.id === id);
  if (!customer) return <div>Customer not found</div>;

  const customerSales = sales.filter((s) => s.customerId === id);
  const activeSales = customerSales.filter((s) => s.status === "ACTIVE");

  const totalOutstanding = installmentSchedules
    .filter((is) => customerSales.map((s) => s.id).includes(is.saleId))
    .reduce((acc, curr) => acc + (curr.expectedAmount - curr.paidAmount), 0);

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle={customer.fullName}
        pageSubtitle="Customer Profile"
        primaryAction={
          <Button onClick={() => navigate("/sales/new")}>
            <Plus className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        }
      />

      <div className="p-6 overflow-y-auto">
        <button
          onClick={() => navigate("/customers")}
          className="mb-4 t-caption fw-bold text-brand flex items-center gap-1 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-3 h-3" /> Back to list
        </button>

        {/* Profile Header Card */}
        <div className="surface-card modal-rounded border border-border p-8 mb-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 surface-brand-soft brand-corner-accent z-0"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <InitialsAvatar
              name={customer.fullName}
              size="lg"
              className="shadow-xl shadow-brand-soft ring-4 ring-surface-card"
            />

            <div className="flex-1 align-text-center md:align-text-left">
              <h2 className="t-section text-main">{customer.fullName}</h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 mt-1 fw-medium">
                <span className="t-body mono-text text-soft">
                  NIC: {customer.nic}
                </span>
                <span className="t-body text-soft">
                  Phone: {customer.phone}
                </span>
              </div>
              <p className="t-body text-faint mt-2 max-w-md">
                {customer.address}
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <StatPill
                label={`${activeSales.length} Active Sales`}
                color="indigo"
                className="py-2"
              />
              <StatPill
                label={`${formatCurrency(totalOutstanding)} Outstanding`}
                color="amber"
                className="py-2"
              />
              <StatPill
                label={`Since ${formatDate(customer.createdAt)}`}
                color="gray"
                className="py-2"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6 flex gap-8 px-2">
          <button
            onClick={() => setActiveTab("sales")}
            className={cn(
              "pb-3 t-body fw-bold border-b-2 transition-all",
              activeTab === "sales"
                ? "border-brand text-brand"
                : "border-transparent text-faint hover:text-soft",
            )}
          >
            Active Sales
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "pb-3 t-body fw-bold border-b-2 transition-all",
              activeTab === "history"
                ? "border-brand text-brand"
                : "border-transparent text-faint hover:text-soft",
            )}
          >
            Payment History
          </button>
        </div>

        {activeTab === "sales" && (
          <div className="space-y-4">
            {activeSales.length > 0 ? (
              activeSales.map((sale) => {
                const product = products.find((p) => p.id === sale.productId);
                const schedules = installmentSchedules.filter(
                  (is) => is.saleId === sale.id,
                );
                const paidCount = schedules.filter(
                  (is) => is.status === "PAID",
                ).length;
                const totalAmount = schedules.reduce(
                  (acc, curr) => acc + curr.expectedAmount,
                  0,
                );
                const paidAmount = schedules.reduce(
                  (acc, curr) => acc + curr.paidAmount,
                  0,
                );
                const remaining = totalAmount - paidAmount;

                return (
                  <div
                    key={sale.id}
                    className="surface-card card-rounded border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="t-section text-main">{product?.name}</h4>
                        <StatPill
                          label={product?.category || ""}
                          color="gray"
                          className="mt-1"
                        />
                      </div>
                      <StatusBadge status={sale.status} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 t-body fw-medium mb-6">
                      <div className="flex flex-col">
                        <span className="t-micro text-faint case-upper tracking-label mb-0.5">
                          Sold Price
                        </span>
                        <span className="text-soft">
                          {formatCurrency(sale.soldPrice)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="t-micro text-faint case-upper tracking-label mb-0.5">
                          Down Payment
                        </span>
                        <span className="text-soft">
                          {formatCurrency(sale.downPayment)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="t-micro text-faint case-upper tracking-label mb-0.5">
                          Monthly Payment
                        </span>
                        <span className="text-soft">
                          {formatCurrency(sale.monthlyAmount)}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-center t-caption mb-2">
                        <span className="text-soft fw-semibold">
                          {paidCount} of {sale.totalMonths} installments paid
                        </span>
                        <span className="text-brand fw-bold">
                          {formatCurrency(remaining)} remaining
                        </span>
                      </div>
                      <Progress
                        value={(paidCount / sale.totalMonths) * 100}
                        className="h-2 surface-brand-soft"
                      />
                    </div>

                    <div className="pt-4 border-t border-border flex justify-between items-center">
                      <span className="t-micro text-faint flex items-center gap-1 fw-medium">
                        Next due:{" "}
                        <span className="text-soft fw-bold">18 May 2026</span> ·{" "}
                        {formatCurrency(sale.monthlyAmount)}
                      </span>
                      <button
                        onClick={() => navigate(`/sales/${sale.id}`)}
                        className="t-body fw-bold text-brand hover:underline"
                      >
                        View Full Details →
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="align-text-center py-10 surface-card card-rounded border border-dashed border-border">
                <p className="text-faint fw-medium t-body">
                  No active sales for this customer.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="surface-card card-rounded border border-border shadow-sm overflow-hidden">
            <table className="w-full align-text-left">
              <thead className="surface-page t-micro-bold text-soft case-upper tracking-label">
                <tr>
                  <th className="px-5 py-4 border-b">Date</th>
                  <th className="px-5 py-4 border-b">Product</th>
                  <th className="px-5 py-4 border-b">Amount</th>
                  <th className="px-5 py-4 border-b">Recorded By</th>
                  <th className="px-5 py-4 border-b">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="surface-hover">
                  <td className="px-5 py-4 t-body text-soft">18 Apr 2026</td>
                  <td className="px-5 py-4 t-body fw-semibold text-main">
                    Samsung TV 43"
                  </td>
                  <td className="px-5 py-4 t-body fw-bold text-brand">
                    LKR 3,500
                  </td>
                  <td className="px-5 py-4 t-body text-soft">Kamal Silva</td>
                  <td className="px-5 py-4 t-caption text-faint">
                    Customer paid partial
                  </td>
                </tr>
                <tr className="surface-hover">
                  <td className="px-5 py-4 t-body text-soft">12 Mar 2026</td>
                  <td className="px-5 py-4 t-body fw-semibold text-main">
                    Samsung TV 43"
                  </td>
                  <td className="px-5 py-4 t-body fw-bold text-brand">
                    LKR 5,000
                  </td>
                  <td className="px-5 py-4 t-body text-soft">Kamal Silva</td>
                  <td className="px-5 py-4 t-caption text-faint">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
