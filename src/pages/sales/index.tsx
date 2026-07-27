import { useState } from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsCount } from "@/components/ui/tabs";
import { SearchField } from "@/components/ui/search-field";

import { useWidth } from "@/hooks/use-width";
import { customerById } from "@/constant/customer-data";
import { productById } from "@/constant/product-data";
import { saleStats, sales, SALE_TABS } from "@/constant/sale-data";
import type { SaleTab } from "@/types/sale-types";

import { SalesTable } from "./components/sales-table";
import { SalesGrid } from "./components/sales-grid";

const enriched = sales.map((s) => {
  const stat = saleStats(s.id);
  const customer = customerById(s.customerId);
  const product = productById(s.productId);
  return { sale: s, stat, customer, product };
});

const Sales = () => {
  const { width, breakpoints } = useWidth();
  const isMaxLg = width < breakpoints.lg;
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tab, setTab] = useState<SaleTab>("all");

  const matchesTab = (
    { sale, stat }: (typeof enriched)[number],
    value: SaleTab,
  ) => {
    if (value === "active") return sale.status === "ACTIVE" && !stat.hasOverdue;
    if (value === "overdue") return stat.hasOverdue;
    if (value === "completed") return sale.status === "COMPLETED";
    if (value === "writtenoff") return sale.status === "WRITTEN_OFF";
    return true;
  };

  const searched = enriched.filter(({ sale, customer, product }) => {
    const q = search.trim().toLowerCase();
    if (
      q &&
      !customer?.fullName.toLowerCase().includes(q) &&
      !product?.name.toLowerCase().includes(q)
    )
      return false;
    if (from && new Date(sale.saleDate) < new Date(from)) return false;
    if (to && new Date(sale.saleDate) > new Date(to)) return false;
    return true;
  });

  const tabCounts = Object.fromEntries(
    SALE_TABS.map((t) => [
      t.value,
      searched.filter((row) => matchesTab(row, t.value)).length,
    ]),
  ) as Record<SaleTab, number>;

  const filtered = searched.filter((row) => matchesTab(row, tab));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search by name, NIC, or phone…"
          containerClassName="w-full lg:flex-1 md:min-w-40 md:max-w-xs lg:min-w-60 lg:max-w-sm"
        />
        <div className="flex flex-col xs:flex-row xs:items-center items-start gap-3 w-full min-w-0 lg:w-auto">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as SaleTab)}
            className="w-full xs:w-auto"
          >
            <TabsList>
              {SALE_TABS.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>
                  {t.label} <TabsCount>{tabCounts[t.value]}</TabsCount>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Button variant="secondary" className="shrink-0">
            <Icon.ArrowUpFromLine /> Export
          </Button>
        </div>
      </div>

      {isMaxLg ? <SalesGrid rows={filtered} /> : <SalesTable rows={filtered} />}
    </div>
  );
};

export default Sales;
