import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { differenceInDays } from "date-fns";
import { Bell, Download, Eye, Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Notification } from "@/components/ui/custom-toast";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { customerById, customers } from "@/constant/customer-data";
import { productById } from "@/constant/product-data";
import { installmentSchedules, saleById } from "@/constant/sale-data";
import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";

const TABS = ["All", "1-30 days", "31-60 days", "60+ days"] as const;
type Tab = (typeof TABS)[number];

interface OverdueRow {
  scheduleId: string;
  saleId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  dueDate: string;
  daysOverdue: number;
  expectedAmount: number;
}

function buildOverdueRows(): OverdueRow[] {
  const today = new Date();
  return installmentSchedules
    .filter((s) => s.status === "OVERDUE")
    .map((s) => {
      const sale = saleById(s.saleId);
      const customer = sale ? customerById(sale.customerId) : undefined;
      const product = sale ? productById(sale.productId) : undefined;
      return {
        scheduleId: s.id,
        saleId: s.saleId,
        customerId: customer?.id ?? "",
        customerName: customer?.fullName ?? "Unknown",
        customerPhone: customer?.primary_phone ?? "",
        productName: product?.name ?? "Unknown",
        dueDate: s.dueDate,
        daysOverdue: differenceInDays(today, new Date(s.dueDate)),
        expectedAmount: s.expectedAmount - s.paidAmount,
      };
    })
    .sort((a, b) => b.daysOverdue - a.daysOverdue);
}

function severityFor(days: number) {
  if (days > 60) return { text: "text-danger", row: "bg-overdue-row" };
  if (days > 30) return { text: "text-warning-role", row: "" };
  return { text: "text-warning-role", row: "" };
}

export default function OverduePage() {
  const allRows = useMemo(buildOverdueRows, []);
  const [tab, setTab] = useState<Tab>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return allRows.filter((r) => {
      if (tab === "1-30 days" && (r.daysOverdue < 1 || r.daysOverdue > 30))
        return false;
      if (tab === "31-60 days" && (r.daysOverdue < 31 || r.daysOverdue > 60))
        return false;
      if (tab === "60+ days" && r.daysOverdue <= 60) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !r.customerName.toLowerCase().includes(q) &&
          !r.productName.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [allRows, tab, query]);

  const allSelected =
    filtered.length > 0 && filtered.every((r) => selected.has(r.scheduleId));

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        filtered.forEach((r) => next.delete(r.scheduleId));
      } else {
        filtered.forEach((r) => next.add(r.scheduleId));
      }
      return next;
    });
  }

  const overdueCustomersCount = new Set(allRows.map((r) => r.customerId)).size;
  const totalOverdue = allRows.reduce((sum, r) => sum + r.expectedAmount, 0);
  const longest = allRows[0];

  return (
    <div className="space-y-6 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-base p-5 border-l-4 border-start-danger">
          <p className="text-uppercase">Overdue Customers</p>
          <p className="t-display-xl text-main mt-2">{overdueCustomersCount}</p>
          <p className="t-label-md text-faint mt-1">No trend data</p>
        </div>
        <div className="card-base p-5 border-l-4 border-start-danger">
          <p className="text-uppercase">Total Overdue Amount</p>
          <p className="t-display-xl text-danger mt-2">
            {formatCurrency(totalOverdue)}
          </p>
          <p className="t-label-md text-faint mt-1">
            Across {allRows.length} installments
          </p>
        </div>
        <div className="card-base p-5 border-l-4 border-start-danger">
          <p className="text-uppercase">Longest Overdue</p>
          <p className="t-display-xl text-main mt-2">
            {longest ? `${longest.daysOverdue} Days` : "—"}
          </p>
          <p className="t-label-md text-soft mt-1">
            {longest?.customerName ?? "No overdues"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 surface-tab-list p-1 tab-rounded w-fit">
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              data-state={active ? "active" : "inactive"}
              className={`tabs-trigger px-3 py-1.5 tab-rounded ${
                active ? "surface-card text-main shadow-sm" : ""
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customer or product..."
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header px-4 py-3 w-10">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="table-header text-left px-4 py-3">Customer</th>
                <th className="table-header text-left px-4 py-3">Product</th>
                <th className="table-header text-left px-4 py-3">Due Date</th>
                <th className="table-header text-left px-4 py-3">
                  Days Overdue
                </th>
                <th className="table-header text-left px-4 py-3">Expected</th>
                <th className="table-header text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-faint t-body-md"
                  >
                    No overdue payments in this range.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => {
                  const sev = severityFor(r.daysOverdue);
                  const checked = selected.has(r.scheduleId);
                  return (
                    <tr
                      key={r.scheduleId}
                      className={`border-t ${sev.row}`}
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggle(r.scheduleId)}
                          aria-label={`Select ${r.customerName}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={r.customerName} />
                          <div className="min-w-0">
                            <p className="table-title-text truncate">
                              {r.customerName}
                            </p>
                            <p className="t-label-sm text-faint font-mono">
                              {r.customerPhone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="table-text">{r.productName}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="table-text">
                          {formatDate(r.dueDate)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`fw-black ${sev.text}`}>
                          {r.daysOverdue} days
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="table-title-text fw-bold">
                          {formatCurrency(r.expectedAmount)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <Button
                            variant="outline"
                            onClick={() =>
                              Notification.success(
                                `Reminder sent to ${r.customerName}`,
                              )
                            }
                          >
                            <Bell />
                            Remind
                          </Button>
                          <Button variant="ghost">
                            <Link to="/sales/$id" params={{ id: r.saleId }}>
                              <Eye />
                              View
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected.size > 0 ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4">
          <div className="app-sidebar modal-rounded shadow-2xl px-4 py-3 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="circle-rounded surface-brand h-8 w-8 flex items-center justify-center">
                <span className="t-body-md-bold text-inverse">
                  {selected.size}
                </span>
              </div>
              <span className="t-body-md-bold app-sidebar-text">
                {selected.size} {selected.size === 1 ? "Customer" : "Customers"}{" "}
                selected for reminders
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="link" onClick={() => setSelected(new Set())}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  Notification.success(
                    `WhatsApp reminders sent to ${selected.size} customers`,
                  );
                  setSelected(new Set());
                }}
              >
                <Send />
                Send WhatsApp Reminders
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Customer count for the count summary uses customers length only when needed */}
      <span className="sr-only">{customers.length} customers in system</span>
    </div>
  );
}
