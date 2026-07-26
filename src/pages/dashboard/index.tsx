import { installmentSchedules, saleStats, sales } from "@/constant/sale-data";
import { formatCurrency } from "@/utils/format-currency";

import { KpiCard } from "./components/kpi-card";
import { RecentPayments } from "./components/recent-payments";
import { OverdueList } from "./components/overdue-list";

const DashboardPage = () => {
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
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Outstanding"
          value={formatCurrency(totalOutstanding)}
          sub={`${sales.filter((s) => s.status === "ACTIVE").length} active sales`}
          border
          shadow
        />
        <KpiCard
          label="Collected this Month"
          value={formatCurrency(monthlyCollected)}
          trend={{ label: "↑ 12%", color: "text-success-role" }}
          sub="+12% vs last month"
          border
          shadow
        />
        <KpiCard
          label="Overdue Installments"
          value={String(overdueInstallments.length)}
          trend={{ label: "!!", color: "text-danger" }}
          sub={`${overdueOver60} over 60 days`}
          danger
          border
          shadow
        />
        <KpiCard
          label="New Sales This Month"
          value={String(newSalesThisMonth)}
          sub="LKR 92,000 total value"
          border
          shadow
        />
      </div>
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-5">
        <RecentPayments />
        <OverdueList />
      </div>
    </div>
  );
};

export default DashboardPage;
