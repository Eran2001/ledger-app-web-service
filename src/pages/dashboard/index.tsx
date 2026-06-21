import * as Icon from "@/components/icons";
import { TopBar } from "@/components/shared/top-bar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { installmentSchedules, saleStats, sales } from "@/lib/dummy-data";
import { formatCurrency } from "@/lib/utils";

import KpiCard from "./components/KpiCard";
import RecentPayments from "./components/RecentPayments";
import OverdueList from "./components/OverdueList";

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
        <div className="mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Sale ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>#S-1042</TableCell>
                <TableCell>{formatCurrency(12500)}</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>2026-07-01</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="simple">John Doe</TableCell>
                <TableCell variant="simple">#S-1042</TableCell>
                <TableCell variant="simple">{formatCurrency(12500)}</TableCell>
                <TableCell variant="simple">Active</TableCell>
                <TableCell variant="simple">2026-07-01</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mb-6">
          <Table variant="simple">
            <TableHeader>
              <TableRow>
                <TableHead variant="simple">Customer</TableHead>
                <TableHead variant="simple">Sale ID</TableHead>
                <TableHead variant="simple">Amount</TableHead>
                <TableHead variant="simple">Status</TableHead>
                <TableHead variant="simple">Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell variant="simple">John Doe</TableCell>
                <TableCell variant="simple">#S-1042</TableCell>
                <TableCell variant="simple">{formatCurrency(12500)}</TableCell>
                <TableCell variant="simple">Active</TableCell>
                <TableCell variant="simple">2026-07-01</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="simple">John Doe</TableCell>
                <TableCell variant="simple">#S-1042</TableCell>
                <TableCell variant="simple">{formatCurrency(12500)}</TableCell>
                <TableCell variant="simple">Active</TableCell>
                <TableCell variant="simple">2026-07-01</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-6">
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
