import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/search-field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";

import { customers, customerStats } from "@/lib/dummy-data";
import { formatCurrency } from "@/lib/utils";
import { Tab } from "@/types/customer";

const CustomersPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const enriched = customers.map((c) => {
    const stat = customerStats(c.id);
    const status: "ACTIVE" | "OVERDUE" | "COMPLETED" =
      stat.outstanding === 0
        ? "COMPLETED"
        : stat.hasOverdue
          ? "OVERDUE"
          : "ACTIVE";
    return { ...c, ...stat, status };
  });

  const filtered = enriched.filter((c) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      c.fullName.toLowerCase().includes(q) ||
      c.nic.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q);
    if (!matchesSearch) return false;
    if (tab === "active") return c.activeSalesCount > 0;
    if (tab === "overdue") return c.hasOverdue;
    return true;
  });

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Customers"
        pageSubtitle={`${customers.length} customers`}
        primaryAction={{
          to: "/customers/new",
          icon: Icon.Plus,
          label: "New Customer",
        }}
      />
      <div className="p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Search by name, NIC, or phone…"
            size="large"
            containerClassName="w-full lg:flex-1 md:min-w-40 md:max-w-xs lg:min-w-60 lg:max-w-sm"
          />
          <div className="flex flex-col xs:flex-row xs:items-center items-start gap-3 w-full min-w-0 lg:w-auto">
            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as Tab)}
              className="w-full xs:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All Customers</TabsTrigger>
                <TabsTrigger value="active">Active Sales</TabsTrigger>
                <TabsTrigger value="overdue">Has Overdue</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" className="shrink-0">
              <Icon.Download /> Export
            </Button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Icon.Users}
            title="No customers found"
            subtitle="Try adjusting your search or filter, or add your first customer."
            actionLabel="New Customer"
            onAction={() => undefined}
          />
        ) : (
          <div className="card-base overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="px-6 py-3 text-left">Customer</th>
                    <th className="px-6 py-3 text-left">NIC Number</th>
                    <th className="px-6 py-3 text-left">Phone</th>
                    <th className="px-6 py-3 text-center">Active Sales</th>
                    <th className="px-6 py-3 text-right">Outstanding</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() =>
                        navigate({ to: "/customers/$id", params: { id: c.id } })
                      }
                      className={`border-t border-default surface-hover cursor-pointer ${c.hasOverdue ? "border-l-4 border-start-danger" : ""}`}
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={c.fullName} size="sm" />
                          <div>
                            <p className="table-title-text">{c.fullName}</p>
                            <p className="t-caption text-faint">{c.city}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 font-mono t-meta text-soft">
                        {c.nic}
                      </td>
                      <td className="px-6 py-3 table-text">{c.phone}</td>
                      <td className="px-6 py-3 text-center table-text">
                        {c.activeSalesCount}
                      </td>
                      <td className="px-6 py-3 text-right">
                        {c.outstanding > 0 ? (
                          <span className="t-meta-bold text-main fw-semibold">
                            {formatCurrency(c.outstanding)}
                          </span>
                        ) : (
                          <span className="t-meta text-faint">Paid</span>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate({
                              to: "/customers/$id",
                              params: { id: c.id },
                            });
                          }}
                          className="t-caption-bold control-rounded border-default text-soft bg-transparent"
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
