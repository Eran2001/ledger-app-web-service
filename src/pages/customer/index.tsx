import { useState } from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/search-field";
import { Tabs, TabsList, TabsTrigger, TabsCount } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";

import { useWidth } from "@/hooks/use-width";
import { useUIStore } from "@/stores/ui-store";
import { customers, customerStats } from "@/constant/customer-data";
import { Tab } from "@/types/customer-types";

import { NewCustomer } from "./components/new-customer";
import { CustomersTable } from "./components/customers-table";
import { CustomersGrid } from "./components/customers-grid";

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

const Customers = () => {
  const { width, breakpoints } = useWidth();
  const isMaxLg = width < breakpoints.lg;
  const openNewCustomer = useUIStore((s) => s.openNewCustomer);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const searched = enriched.filter((c) => {
    const q = search.trim().toLowerCase();
    return (
      !q ||
      c.fullName.toLowerCase().includes(q) ||
      c.nic.toLowerCase().includes(q) ||
      c.primary_phone.toLowerCase().includes(q)
    );
  });

  const tabCounts = {
    all: searched.length,
    active: searched.filter((c) => c.activeSalesCount > 0).length,
    overdue: searched.filter((c) => c.hasOverdue).length,
  };

  const filtered = searched.filter((c) => {
    if (tab === "active") return c.activeSalesCount > 0;
    if (tab === "overdue") return c.hasOverdue;
    return true;
  });

  return (
    <>
      <NewCustomer />
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
                onValueChange={(v) => setTab(v as Tab)}
                className="w-full xs:w-auto"
              >
                <TabsList>
                  <TabsTrigger value="all">
                    All Customers <TabsCount>{tabCounts.all}</TabsCount>
                  </TabsTrigger>
                  <TabsTrigger value="active">
                    Active Sales <TabsCount>{tabCounts.active}</TabsCount>
                  </TabsTrigger>
                  <TabsTrigger value="overdue">
                    Has Overdue <TabsCount>{tabCounts.overdue}</TabsCount>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="secondary">
                <Icon.ArrowUpFromLine /> Export
              </Button>
            </div>
          </div>

          {isMaxLg ? (
            <CustomersGrid rows={filtered} />
          ) : (
            <CustomersTable rows={filtered} />
          )}
        </div>
      )}
    </>
  );
};

export default Customers;
