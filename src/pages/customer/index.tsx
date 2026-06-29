import { useState } from "react";

import * as Icon from "@/components/icons";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";

import { SearchField } from "@/components/ui/search-field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";

import { NewCustomer } from "./components/new-customer";
import { CustomersTable } from "./components/customers-table";

import { customers, customerStats } from "@/constant/customer-data";
import { Tab } from "@/types/customer-types";

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

const CustomersPage = () => {
  const openNewCustomer = useUIStore((s) => s.openNewCustomer);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const filtered = enriched.filter((c) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      c.fullName.toLowerCase().includes(q) ||
      c.nic.toLowerCase().includes(q) ||
      c.primary_phone.toLowerCase().includes(q);
    if (!matchesSearch) return false;
    if (tab === "active") return c.activeSalesCount > 0;
    if (tab === "overdue") return c.hasOverdue;
    return true;
  });

  return (
    <>
      <NewCustomer />
      <TopBar
        pageTitle="Customers"
        pageSubtitle={`${customers.length} customers`}
        primaryAction={{
          onClick: openNewCustomer,
          icon: Icon.Plus,
          label: "New Customer",
        }}
      />

      {customers.length === 0 ? (
        <EmptyState
          icon={Icon.Users}
          title="No customers found"
          subtitle="Try adjusting your search or filter, or add your first customer."
          actionIcon={Icon.Plus}
          actionLabel="New Customer"
          onAction={openNewCustomer}
        />
      ) : (
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
              <Button variant="secondary" className="shrink-0">
                <Icon.ArrowUpFromLine /> Export
              </Button>
            </div>
          </div>

          <CustomersTable rows={filtered} />
        </div>
      )}
    </>
  );
};

export default CustomersPage;
