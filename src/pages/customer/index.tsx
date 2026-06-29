import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";

import { SearchField } from "@/components/ui/search-field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCellMedia,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";

import { NewCustomer } from "./components/new-customer";

import { customers, customerStats } from "@/constant/customer-data";
import { formatCurrency } from "@/utils/format-currency";
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
  const navigate = useNavigate();
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

          <Table variant="main">
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>NIC Number</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Active Sales</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="table-empty">
                    No customers match your search or filter.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow
                    key={c.id}
                    onClick={() =>
                      navigate({
                        to: "/customers/$id",
                        params: { id: c.id },
                      })
                    }
                  >
                    <TableCell accentBar={c.hasOverdue}>
                      <TableCellMedia
                        name={c.fullName}
                        title={c.fullName}
                        subtitle={c.city}
                      />
                    </TableCell>
                    <TableCell>{c.nic}</TableCell>
                    <TableCell>{c.primary_phone}</TableCell>
                    <TableCell>{c.activeSalesCount}</TableCell>
                    <TableCell>
                      {c.outstanding > 0 ? (
                        <span>{formatCurrency(c.outstanding)}</span>
                      ) : (
                        <span>N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={c.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Icon.MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              navigate({
                                to: "/customers/$id",
                                params: { id: c.id },
                              })
                            }
                          >
                            <Icon.Eye /> View
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default CustomersPage;
