import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, UserX, FileDown } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { customers, sales, installmentSchedules } from "@/constant/dummy";
import { formatCurrency, cn } from "@/lib/utils";

export const CustomersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "overdue">(
    "all",
  );
  const navigate = useNavigate();

  // Computed data for each customer
  const enrichedCustomers = customers.map((c) => {
    const customerSales = sales.filter((s) => s.customerId === c.id);
    const activeSalesCount = customerSales.filter(
      (s) => s.status === "ACTIVE",
    ).length;

    // Calculate total outstanding for this customer
    const customerSaleIds = customerSales.map((s) => s.id);
    const schedules = installmentSchedules.filter((is) =>
      customerSaleIds.includes(is.saleId),
    );
    const outstanding = schedules.reduce(
      (acc, curr) => acc + (curr.expectedAmount - curr.paidAmount),
      0,
    );
    const hasOverdue = schedules.some((is) => is.status === "OVERDUE");

    return {
      ...c,
      activeSalesCount,
      outstanding,
      hasOverdue,
      status:
        outstanding > 0 ? (hasOverdue ? "OVERDUE" : "ACTIVE") : "COMPLETED",
    };
  });

  const filteredCustomers = enrichedCustomers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.nic.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && c.outstanding > 0) ||
      (activeTab === "overdue" && c.hasOverdue);

    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <Topbar
        pageTitle="Customers"
        pageSubtitle="Manage customer records"
        primaryAction={
          <Button className="bg-[#4F46E5] hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            New Customer
          </Button>
        }
      />

      <div className="p-6 overflow-y-auto">
        {/* Filters Row */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <Input
              placeholder="Search by name, NIC or phone..."
              className="pl-10 h-10 border-[#E2E8F0] bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-1 bg-slate-200/50 p-1 rounded-lg">
            {(["all", "active", "overdue"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-bold transition-all capitalize",
                  activeTab === tab
                    ? "bg-white text-[#0F172A] shadow-sm"
                    : "text-[#475569] hover:text-[#0F172A]",
                )}
              >
                {tab === "active"
                  ? "Active Sales"
                  : tab === "overdue"
                    ? "Has Overdue"
                    : "All Customers"}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            className="ml-auto h-10 gap-2 border-[#E2E8F0] shadow-sm"
          >
            <FileDown className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          {filteredCustomers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F8FAFC] text-[10px] text-[#475569] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="px-5 py-4 border-b">Customer</th>
                    <th className="px-5 py-4 border-b">NIC Number</th>
                    <th className="px-5 py-4 border-b">Phone</th>
                    <th className="px-5 py-4 border-b">Active Sales</th>
                    <th className="px-5 py-4 border-b">Outstanding</th>
                    <th className="px-5 py-4 border-b">Status</th>
                    <th className="px-5 py-4 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredCustomers.map((c) => (
                    <tr
                      key={c.id}
                      className={cn(
                        "hover:bg-slate-50 transition-colors group cursor-pointer",
                        c.hasOverdue && "border-l-4 border-l-red-400",
                      )}
                      onClick={() => navigate(`/customers/${c.id}`)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={c.fullName} size="sm" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#0F172A] group-hover:text-[#4F46E5]">
                              {c.fullName}
                            </span>
                            <span className="text-[11px] text-[#94A3B8] capitalize">
                              {c.address.split(",")[1]?.trim() || "Colombo"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#475569] font-mono">
                        {c.nic}
                      </td>
                      <td className="px-5 py-4 text-sm text-[#475569]">
                        {c.phone}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-center">
                        <span
                          className={cn(
                            c.activeSalesCount > 0
                              ? "text-[#0F172A]"
                              : "text-[#94A3B8]",
                          )}
                        >
                          {c.activeSalesCount}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-[#0F172A]">
                        {c.outstanding > 0 ? (
                          formatCurrency(c.outstanding)
                        ) : (
                          <span className="text-[#94A3B8]">Paid</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 border-slate-200 h-8 font-semibold hover:bg-[#F1F5F9] hover:text-[#4F46E5]"
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={UserX}
              title={search ? "No matches found" : "No customers yet"}
              subtitle={
                search
                  ? "We couldn't find any customers matching your search query."
                  : "Add your first customer to start tracking installment sales."
              }
              actionLabel={search ? "Clear Filters" : "Add New Customer"}
              onAction={() => (search ? setSearch("") : {})}
            />
          )}
        </div>
      </div>
    </div>
  );
};
