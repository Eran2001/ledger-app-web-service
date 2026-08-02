import { useMemo, useState } from "react";
import { differenceInDays } from "date-fns";
import * as Icon from "@/components/icons";
import { Notification } from "@/components/ui/custom-toast";
import { SearchField } from "@/components/ui/search-field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { customerById } from "@/constant/customer-data";
import { productById } from "@/constant/product-data";
import { installmentSchedules, saleById } from "@/constant/sale-data";
import { useWidth } from "@/hooks/use-width";
import { formatCurrency } from "@/utils/format-currency";

import { OverdueGrid } from "./components/overdue-grid";
import { OverdueStatCard } from "./components/overdue-stat-card";
import { OverdueTable } from "./components/overdue-table";
import type { OverdueRow } from "./components/overdue-list-types";

const TABS = ["All", "1-30 days", "31-60 days", "60+ days"] as const;
type Tab = (typeof TABS)[number];

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

const Overdue = () => {
  const { width, breakpoints } = useWidth();
  const isMaxLg = width < breakpoints.lg;
  const allRows = useMemo(buildOverdueRows, []);
  const [tab, setTab] = useState<Tab>("All");
  const [query, setQuery] = useState("");

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

  const overdueCustomersCount = new Set(allRows.map((r) => r.customerId)).size;
  const totalOverdue = allRows.reduce((sum, r) => sum + r.expectedAmount, 0);
  const longest = allRows[0];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OverdueStatCard
          label="Overdue Customers"
          value={overdueCustomersCount}
          tooltip="No trend data"
          icon={Icon.Users}
          border
          shadow
        />
        <OverdueStatCard
          label="Total Overdue Amount"
          value={formatCurrency(totalOverdue)}
          valueClassName="text-danger"
          tooltip={`Across ${allRows.length} installments`}
          icon={Icon.Banknote}
          border
          shadow
        />
        <OverdueStatCard
          label="Longest Overdue"
          value={longest ? `${longest.daysOverdue} Days` : "—"}
          tooltip={longest?.customerName ?? "No overdues"}
          icon={Icon.Clock}
          border
          shadow
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-6">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search customer or product…"
          containerClassName="w-full lg:flex-1 md:min-w-40 md:max-w-xs lg:min-w-60 lg:max-w-sm"
        />
        <div className="flex flex-col xs:flex-row xs:items-center items-start gap-3 w-full min-w-0 lg:w-auto">
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as Tab)}
            className="w-full xs:w-auto"
          >
            <TabsList>
              {TABS.map((value) => (
                <TabsTrigger key={value} value={value}>
                  {value}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {isMaxLg ? (
        <OverdueGrid
          rows={filtered}
          onRemind={(customerName) =>
            Notification.success(`Reminder sent to ${customerName}`)
          }
        />
      ) : (
        <OverdueTable
          rows={filtered}
          onRemind={(customerName) =>
            Notification.success(`Reminder sent to ${customerName}`)
          }
        />
      )}
    </>
  );
};

export default Overdue;
