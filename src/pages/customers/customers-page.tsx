import React, { useState } from "react";
import * as Icon from "@/components/icons";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { customers, sales, installmentSchedules } from "@/constant/dummy";
import { formatCurrency, cn } from "@/lib/utils";

export const CustomersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "overdue">(
    "all",
  );
  const navigate = useNavigate();

  const enrichedCustomers = customers.map((c) => {
    const customerSales = sales.filter((s) => s.customerId === c.id);
    const activeSalesCount = customerSales.filter(
      (s) => s.status === "ACTIVE",
    ).length;

    const customerSaleIds = customerSales.map((s) => s.id);
    const schedules = installmentSchedules.filter((is) =>
      customerSaleIds.includes(is.saleId),
    );
    const outstanding = schedules.reduce(
      (acc, curr) => acc + (curr.expectedAmount - curr.paidAmount),
      0,
    );
    const hasOverdue = schedules.some((is) => is.status === "OVERDUE");

    return {
      ...c,
      activeSalesCount,
      outstanding,
      hasOverdue,
      status:
        outstanding > 0 ? (hasOverdue ? "OVERDUE" : "ACTIVE") : "COMPLETED",
    };
  });

  const filteredCustomers = enrichedCustomers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.nic.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && c.outstanding > 0) ||
      (activeTab === "overdue" && c.hasOverdue);

    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Customers"
        pageSubtitle="Manage customer records"
        primaryAction={
          <Button>
            <Icon.Plus className="w-4 h-4 mr-2" />
            New Customer
          </Button>
        }
      />

      <div className="p-6 overflow-y-auto">
        {/* Filters Row */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Icon.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
            <Input
              placeholder="Search by name, NIC or phone..."
              className="pl-10 h-10 border-border surface-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-1 surface-muted-half p-1 global-rounded">
            {(["all", "active", "overdue"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 global-rounded t-caption-bold transition-all case-title",
                  activeTab === tab
                    ? "surface-card text-main shadow-sm"
                    : "text-soft hover:text-main",
                )}
              >
                {tab === "active"
                  ? "Active Sales"
                  : tab === "overdue"
                    ? "Has Overdue"
                    : "All Customers"}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            className="ml-auto h-10 gap-2 border-border shadow-sm"
          >
            <Icon.FileDown className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Table Content */}
        <div className="surface-card card-rounded border border-border shadow-sm overflow-hidden">
          {filteredCustomers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full align-text-left">
                <thead className="surface-page t-micro-bold text-soft case-upper tracking-label">
                  <tr>
                    <th className="px-5 py-4 border-b">Customer</th>
                    <th className="px-5 py-4 border-b">NIC Number</th>
                    <th className="px-5 py-4 border-b">Phone</th>
                    <th className="px-5 py-4 border-b">Active Sales</th>
                    <th className="px-5 py-4 border-b">Outstanding</th>
                    <th className="px-5 py-4 border-b">Status</th>
                    <th className="px-5 py-4 border-b align-text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCustomers.map((c) => (
                    <tr
                      key={c.id}
                      className={cn(
                        "surface-hover transition-colors group cursor-pointer",
                        c.hasOverdue && "border-l-4 border-start-danger",
                      )}
                      onClick={() => navigate(`/customers/${c.id}`)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={c.fullName} size="sm" />
                          <div className="flex flex-col">
                            <span className="t-body fw-semibold text-main group-hover:text-brand">
                              {c.fullName}
                            </span>
                            <span className="t-micro text-faint case-title">
                              {c.address.split(",")[1]?.trim() || "Colombo"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 t-body text-soft mono-text">
                        {c.nic}
                      </td>
                      <td className="px-5 py-4 t-body text-soft">{c.phone}</td>
                      <td className="px-5 py-4 t-body fw-medium align-text-center">
                        <span
                          className={cn(
                            c.activeSalesCount > 0 ? "text-main" : "text-faint",
                          )}
                        >
                          {c.activeSalesCount}
                        </span>
                      </td>
                      <td className="px-5 py-4 t-body fw-bold text-main">
                        {c.outstanding > 0 ? (
                          formatCurrency(c.outstanding)
                        ) : (
                          <span className="text-faint">Paid</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-5 py-4 align-text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="t-caption h-8 border-border fw-semibold surface-hover hover:text-brand"
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={Icon.UserX}
              title={search ? "No matches found" : "No customers yet"}
              subtitle={
                search
                  ? "We couldn't find any customers matching your search query."
                  : "Add your first customer to start tracking installment sales."
              }
              actionLabel={search ? "Clear Filters" : "Add New Customer"}
              onAction={() => (search ? setSearch("") : {})}
            />
          )}
        </div>
      </div>
    </div>
  );
};
