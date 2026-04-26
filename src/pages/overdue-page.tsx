import React, { useState } from "react";
import * as Icon from "@/components/icons";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  customers,
  sales,
  products,
  installmentSchedules,
} from "@/constant/dummy";
import { formatCurrency, cn, formatDate } from "@/lib/utils";
import { differenceInDays } from "date-fns";

export const OverduePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "1-30" | "31-60" | "60+">(
    "all",
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const enrichedOverdue = installmentSchedules
    .filter((is) => is.status === "OVERDUE")
    .map((is) => {
      const sale = sales.find((s) => s.id === is.saleId);
      const customer = customers.find((c) => c.id === sale?.customerId);
      const product = products.find((p) => p.id === sale?.productId);
      const daysOverdue = differenceInDays(new Date(), new Date(is.dueDate));

      return {
        ...is,
        customerName: customer?.fullName || "Unknown",
        phone: customer?.phone || "Unknown",
        productName: product?.name || "Unknown",
        daysOverdue,
      };
    });

  const filteredOverdue = enrichedOverdue.filter((is) => {
    const matchesSearch =
      is.customerName.toLowerCase().includes(search.toLowerCase()) ||
      is.productName.toLowerCase().includes(search.toLowerCase());

    let matchesTab = true;
    if (activeTab === "1-30")
      matchesTab = is.daysOverdue >= 1 && is.daysOverdue <= 30;
    else if (activeTab === "31-60")
      matchesTab = is.daysOverdue >= 31 && is.daysOverdue <= 60;
    else if (activeTab === "60+") matchesTab = is.daysOverdue > 60;

    return matchesSearch && matchesTab;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOverdue.length) setSelectedIds([]);
    else setSelectedIds(filteredOverdue.map((is) => is.id));
  };

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Overdue Installments"
        pageSubtitle="Requires attention"
        primaryAction={
          <div className="flex gap-2">
            <Button variant="outline" className="h-10 border-border">
              <Icon.FileDown className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="surface-brand surface-brand-strong-hover">
              <Icon.MessageSquare className="w-4 h-4 mr-2" />
              Send All Reminders
            </Button>
          </div>
        }
      />

      <div className="p-6 overflow-y-auto">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="surface-card card-rounded border border-border border-l-4 border-start-danger p-5 shadow-sm">
            <p className="t-micro-bold text-soft case-upper tracking-label mb-1">
              Overdue Customers
            </p>
            <div className="t-kpi-lg fw-black text-main">
              {enrichedOverdue.length}
            </div>
          </div>
          <div className="surface-card card-rounded border border-border border-l-4 border-start-danger p-5 shadow-sm">
            <p className="t-micro-bold text-soft case-upper tracking-label mb-1">
              Total Overdue Amount
            </p>
            <div className="t-kpi-lg fw-black text-danger">
              {formatCurrency(
                enrichedOverdue.reduce(
                  (acc, curr) => acc + (curr.expectedAmount - curr.paidAmount),
                  0,
                ),
              )}
            </div>
          </div>
          <div className="surface-card card-rounded border border-border border-l-4 border-start-danger p-5 shadow-sm">
            <p className="t-micro-bold text-soft case-upper tracking-label mb-1">
              Longest Overdue
            </p>
            <div className="t-kpi-lg fw-black text-main">
              {Math.max(...enrichedOverdue.map((is) => is.daysOverdue), 0)} Days
            </div>
            <p className="t-micro-bold text-faint mt-1">
              {
                enrichedOverdue.filter(
                  (is) =>
                    is.daysOverdue ===
                    Math.max(...enrichedOverdue.map((x) => x.daysOverdue), 0),
                )[0]?.customerName
              }
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-1 surface-muted-half p-1 global-rounded w-max">
            {(["all", "1-30", "31-60", "60+"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-1.5 global-rounded t-caption-bold transition-all case-title",
                  activeTab === tab
                    ? "surface-card text-main shadow-sm"
                    : "text-soft hover:text-main",
                )}
              >
                {tab === "all" ? "All" : `${tab} days`}
              </button>
            ))}
          </div>

          <div className="relative max-w-sm">
            <Icon.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
            <Input
              placeholder="Search by name or product..."
              className="pl-10 h-10 border-border surface-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="surface-card card-rounded border border-border shadow-sm overflow-hidden mb-20">
          <div className="overflow-x-auto">
            <table className="w-full align-text-left">
              <thead className="surface-page t-micro-bold text-soft case-upper tracking-label">
                <tr>
                  <th className="px-5 py-4 border-b w-10">
                    <Checkbox
                      checked={
                        selectedIds.length === filteredOverdue.length &&
                        filteredOverdue.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-5 py-4 border-b">Customer</th>
                  <th className="px-5 py-4 border-b">Product</th>
                  <th className="px-5 py-4 border-b">Due Date</th>
                  <th className="px-5 py-4 border-b">Days Overdue</th>
                  <th className="px-5 py-4 border-b">Expected</th>
                  <th className="px-5 py-4 border-b align-text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOverdue.map((is) => (
                  <tr
                    key={is.id}
                    className={cn(
                      "transition-colors group",
                      is.daysOverdue > 60 ? "bg-overdue-row" : "surface-hover",
                    )}
                  >
                    <td className="px-5 py-4">
                      <Checkbox
                        checked={selectedIds.includes(is.id)}
                        onCheckedChange={() => toggleSelect(is.id)}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <InitialsAvatar name={is.customerName} size="sm" />
                        <div className="flex flex-col">
                          <span className="t-body fw-semibold text-main">
                            {is.customerName}
                          </span>
                          <span className="t-micro text-faint">{is.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 t-body text-soft">
                      {is.productName}
                    </td>
                    <td className="px-5 py-4 t-body text-soft">
                      {formatDate(is.dueDate)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "t-caption fw-black case-upper tracking-label",
                          is.daysOverdue > 60
                            ? "text-danger"
                            : is.daysOverdue > 30
                              ? "text-warning"
                              : "text-warning",
                        )}
                      >
                        {is.daysOverdue} Days
                      </span>
                    </td>
                    <td className="px-5 py-4 t-body fw-bold text-main">
                      {formatCurrency(is.expectedAmount - is.paidAmount)}
                    </td>
                    <td className="px-5 py-4 align-text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="t-caption h-8 border-border text-success-role surface-success-soft-hover"
                        >
                          <Icon.MessageSquare className="w-3.5 h-3.5 mr-1" />
                          Remind
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="t-caption h-8"
                          onClick={() => navigate(`/sales/${is.saleId}`)}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sticky Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="fixed bottom-6 left-62.5 right-6 z-50 animate-in slide-in-from-bottom duration-300">
            <div className="bg-sidebar text-inverse p-4 modal-rounded shadow-2xl flex items-center justify-between border border-sidebar-border">
              <div className="flex items-center gap-4 px-2">
                <div className="w-8 h-8 circle-rounded surface-brand flex items-center justify-center t-body fw-bold">
                  {selectedIds.length}
                </div>
                <span className="t-body fw-semibold">
                  Customers selected for reminders
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="text-inverse hover:bg-sidebar-accent"
                  onClick={() => setSelectedIds([])}
                >
                  Cancel
                </Button>
                <Button className="surface-brand surface-brand-strong-hover">
                  Send WhatsApp Reminders
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
