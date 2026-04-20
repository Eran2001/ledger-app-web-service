import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, FileDown, FileX } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  customers,
  sales,
  products,
  installmentSchedules,
} from "@/constant/dummy";
import { formatCurrency, cn, formatDate } from "@/lib/utils";

export const SalesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<
    "all" | "ACTIVE" | "OVERDUE" | "COMPLETED" | "WRITTEN_OFF"
  >("all");
  const navigate = useNavigate();

  const enrichedSales = sales.map((s) => {
    const customer = customers.find((c) => c.id === s.customerId);
    const product = products.find((p) => p.id === s.productId);
    const schedules = installmentSchedules.filter((is) => is.saleId === s.id);
    const outstanding = schedules.reduce(
      (acc, curr) => acc + (curr.expectedAmount - curr.paidAmount),
      0,
    );
    const nextDueSchedule = schedules.find(
      (is) =>
        is.status === "PENDING" ||
        is.status === "PARTIALLY_PAID" ||
        is.status === "OVERDUE",
    );

    const isActuallyOverdue = schedules.some((is) => is.status === "OVERDUE");

    return {
      ...s,
      customerName: customer?.fullName || "Unknown",
      productName: product?.name || "Unknown",
      category: product?.category || "Other",
      outstanding,
      nextDueDate: nextDueSchedule?.dueDate,
      isActuallyOverdue,
      computedStatus: isActuallyOverdue ? "OVERDUE" : s.status,
    };
  });

  const filteredSales = enrichedSales.filter((s) => {
    const matchesSearch =
      s.customerName.toLowerCase().includes(search.toLowerCase()) ||
      s.productName.toLowerCase().includes(search.toLowerCase());

    const matchesTab = activeTab === "all" || s.computedStatus === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col h-full bg-surface">
      <Topbar
        pageTitle="Sales"
        pageSubtitle="All installment sales"
        primaryAction={
          <Button onClick={() => navigate("/sales/new")}>
            <Plus className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        }
      />

      <div className="p-6 overflow-y-auto">
        {/* Filter Tabs */}
        <div className="mb-6 flex gap-1 bg-muted/50 p-1 global-rounded w-max">
          {(
            ["all", "ACTIVE", "OVERDUE", "COMPLETED", "WRITTEN_OFF"] as const
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 global-rounded t-caption-bold transition-all capitalize",
                activeTab === tab
                  ? "bg-card text-heading shadow-sm"
                  : "text-body hover:text-heading",
              )}
            >
              {tab === "all"
                ? "All Sales"
                : tab.toLowerCase().replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hint" />
            <Input
              placeholder="Search by customer or product..."
              className="pl-10 h-10 border-border bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <DatePickerInput
              placeholder="From date"
              value={dateFrom}
              onChange={setDateFrom}
              className="w-44"
            />
            <span className="t-body text-hint">to</span>
            <DatePickerInput
              placeholder="To date"
              value={dateTo}
              onChange={setDateTo}
              className="w-44"
            />
          </div>
          <Button
            variant="outline"
            className="ml-auto h-10 gap-2 border-border shadow-sm"
          >
            <FileDown className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Table Content */}
        <div className="bg-card card-rounded border border-border shadow-sm overflow-hidden">
          {filteredSales.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface t-micro-bold text-body uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-4 border-b">Customer</th>
                    <th className="px-5 py-4 border-b">Product</th>
                    <th className="px-5 py-4 border-b">Sold Price</th>
                    <th className="px-5 py-4 border-b">Outstanding</th>
                    <th className="px-5 py-4 border-b">Monthly</th>
                    <th className="px-5 py-4 border-b">Next Due</th>
                    <th className="px-5 py-4 border-b">Status</th>
                    <th className="px-5 py-4 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredSales.map((s) => (
                    <tr
                      key={s.id}
                      className={cn(
                        "hover:bg-surface transition-colors group cursor-pointer",
                        s.computedStatus === "OVERDUE" &&
                          "bg-overdue-row border-l-2 border-l-destructive",
                      )}
                      onClick={() => navigate(`/sales/${s.id}`)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={s.customerName} size="sm" />
                          <span className="t-body fw-semibold text-heading group-hover:text-primary">
                            {s.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="t-body fw-semibold text-body">
                            {s.productName}
                          </span>
                          <span
                            className={cn(
                              "t-micro fw-bold uppercase tracking-wider mt-0.5",
                              s.category === "Electronics"
                                ? "text-primary"
                                : s.category === "Appliances"
                                  ? "text-cat-teal"
                                  : s.category === "Furniture"
                                    ? "text-warning"
                                    : "text-hint",
                            )}
                          >
                            {s.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 t-body text-body">
                        {formatCurrency(s.soldPrice)}
                      </td>
                      <td className="px-5 py-4 t-body fw-bold text-heading">
                        {formatCurrency(s.outstanding)}
                      </td>
                      <td className="px-5 py-4 t-body text-body fw-medium">
                        {formatCurrency(s.monthlyAmount)}
                      </td>
                      <td className="px-5 py-4 t-body text-body whitespace-nowrap">
                        {s.nextDueDate ? formatDate(s.nextDueDate) : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={s.computedStatus} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="t-caption h-8 border-border"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={FileX}
              title={search ? "No matches found" : "No sales recorded"}
              subtitle={
                search
                  ? "Try adjusting your search or filters."
                  : "Create a new sale to generate an installment schedule."
              }
              actionLabel={search ? "Clear Search" : "New Sale"}
              onAction={() => (search ? setSearch("") : navigate("/sales/new"))}
            />
          )}
        </div>
      </div>
    </div>
  );
};
