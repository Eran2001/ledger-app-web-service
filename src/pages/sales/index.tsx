import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { SearchField } from "@/components/ui/search-field";

import { CategoryLabel } from "@/components/shared/category-label";

import { useWidth } from "@/hooks/use-width";
import { customerById } from "@/constant/customer-data";
import { productById } from "@/constant/product-data";
import { saleStats, sales, SALE_TABS } from "@/constant/sale-data";
import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";
import type { SaleTab } from "@/types/sale-types";

const enriched = sales.map((s) => {
  const stat = saleStats(s.id);
  const customer = customerById(s.customerId);
  const product = productById(s.productId);
  return { sale: s, stat, customer, product };
});

const SalesPage = () => {
  const { width, breakpoints } = useWidth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tab, setTab] = useState<SaleTab>("all");

  const filtered = enriched.filter(({ sale, stat, customer, product }) => {
    const q = search.trim().toLowerCase();
    if (
      q &&
      !customer?.fullName.toLowerCase().includes(q) &&
      !product?.name.toLowerCase().includes(q)
    )
      return false;
    if (from && new Date(sale.saleDate) < new Date(from)) return false;
    if (to && new Date(sale.saleDate) > new Date(to)) return false;
    if (tab === "active") return sale.status === "ACTIVE" && !stat.hasOverdue;
    if (tab === "overdue") return stat.hasOverdue;
    if (tab === "completed") return sale.status === "COMPLETED";
    if (tab === "writtenoff") return sale.status === "WRITTEN_OFF";
    return true;
  });

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Sales"
        pageSubtitle={`${sales.length} total sales`}
        primaryAction={{ to: "/sales/new", icon: Icon.Plus, label: "New Sale" }}
      />
      <div className="p-6 overflow-y-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Search by name, NIC, or phone…"
            size={width >= breakpoints.xl ? "large" : "default"}
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
                  <TabsTrigger value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Button
              size={width >= breakpoints.xl ? "lg" : "default"}
              variant="secondary"
              className="shrink-0"
            >
              <Icon.ArrowUpFromLine /> Export
            </Button>
          </div>
        </div>

        <div className="surface-card global-rounded border border-default shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Product</th>
                  <th className="px-6 py-3 text-right">Sold Price</th>
                  <th className="px-6 py-3 text-right">Outstanding</th>
                  <th className="px-6 py-3 text-right">Monthly</th>
                  <th className="px-6 py-3 text-left">Next Due</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(({ sale, stat, customer, product }) => (
                  <tr
                    key={sale.id}
                    onClick={() =>
                      navigate({ to: "/sales/$id", params: { id: sale.id } })
                    }
                    className={`border-t border-default surface-hover cursor-pointer ${
                      stat.hasOverdue
                        ? "surface-overdue-row border-l-2 border-start-danger"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <InitialsAvatar
                          name={customer?.fullName ?? ""}
                          size="sm"
                        />
                        <span className="table-title-text">
                          {customer?.fullName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-col">
                        <span className="table-title-text">
                          {product?.name}
                        </span>
                        {product && (
                          <CategoryLabel category={product.category} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right table-text">
                      {formatCurrency(sale.soldPrice)}
                    </td>
                    <td className="px-6 py-3 text-right t-meta-bold text-main fw-bold">
                      {formatCurrency(stat.outstanding)}
                    </td>
                    <td className="px-6 py-3 text-right table-text">
                      {formatCurrency(sale.monthlyAmount)}
                    </td>
                    <td className="px-6 py-3 table-text">
                      {formatDate(stat.nextDue)}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge
                        status={stat.hasOverdue ? "OVERDUE" : sale.status}
                      />
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate({
                            to: "/sales/$id",
                            params: { id: sale.id },
                          });
                        }}
                        className="t-caption-bold control-rounded border-default text-soft hover:text-brand bg-transparent"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-16 text-center t-body text-faint"
                    >
                      No sales match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
