import * as Icon from "@/components/icons";
import { TopBar } from "@/components/shared/top-bar";

import { installmentSchedules, saleStats, sales } from "@/lib/dummy-data";
import { formatCurrency } from "@/lib/utils";

import { KpiCard } from "./components/kpi-card";
import { RecentPayments } from "./components/recent-payments";
import { OverdueList } from "./components/overdue-list";

export default function DashboardPage() {
  const totalOutstanding = sales.reduce(
    (sum, s) => sum + saleStats(s.id).outstanding,
    0,
  );
  const overdueInstallments = installmentSchedules.filter(
    (i) => i.status === "OVERDUE",
  );
  const monthlyCollected = 48200;
  const newSalesThisMonth = 7;
  const overdueOver60 = overdueInstallments.filter((i) => {
    const days = Math.floor(
      (Date.now() - new Date(i.dueDate).getTime()) / 86400000,
    );
    return days >= 60;
  }).length;

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Dashboard"
        pageSubtitle="Overview of your installment business"
        primaryAction={{ to: "/sales/new", icon: Icon.Plus, label: "New Sale" }}
      />
      <div className="p-6 overflow-y-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-6">
          <KpiCard
            label="Total Outstanding"
            value={formatCurrency(totalOutstanding)}
            sub={`${sales.filter((s) => s.status === "ACTIVE").length} active sales`}
          />
          <KpiCard
            label="Collected this Month"
            value={formatCurrency(monthlyCollected)}
            trend={{ label: "↑ 12%", color: "text-success-role" }}
            sub="+12% vs last month"
          />
          <KpiCard
            label="Overdue Installments"
            value={String(overdueInstallments.length)}
            trend={{ label: "!!", color: "text-danger" }}
            sub={`${overdueOver60} over 60 days`}
            danger
          />
          <KpiCard
            label="New Sales This Month"
            value={String(newSalesThisMonth)}
            sub="LKR 92,000 total value"
          />
        </div>
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-5">
          <RecentPayments />
          <OverdueList />
        </div>
      </div>
    </div>
  );
}
