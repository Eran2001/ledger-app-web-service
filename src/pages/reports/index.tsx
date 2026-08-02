import { useMemo, useState } from "react";
import { differenceInDays, format, subMonths } from "date-fns";
import * as Icon from "@/components/icons";
import { Notification } from "@/components/ui/custom-toast";
import { customerById } from "@/constant/customer-data";
import { productById } from "@/constant/product-data";
import { installmentSchedules, saleById, sales } from "@/constant/sale-data";
import { useTopBarOverride } from "@/hooks/use-top-bar-override";
import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";

import { CollectionStatusChart } from "./components/collection-status-chart";
import { ExportReportSheet } from "./components/export-report-sheet";
import {
  MonthlyCollectionsChart,
  type MonthlyPoint,
} from "./components/monthly-collections-chart";
import { OverdueAgingTable } from "./components/overdue-aging-table";
import { StatReportCard } from "./components/stat-report-card";

function buildMonthlyCollections(): MonthlyPoint[] {
  const today = new Date();
  const points: MonthlyPoint[] = [];
  for (let i = 5; i >= 0; i--) {
    const m = subMonths(today, i);
    const label = format(m, "MMM");
    // base value scaled by month index for variation
    const base = 180000 + ((i * 27) % 11) * 9000 + (5 - i) * 25000;
    points.push({ month: label, collected: base });
  }
  return points;
}

function Reports() {
  const [exportSheetOpen, setExportSheetOpen] = useState(false);
  const monthly = useMemo(buildMonthlyCollections, []);

  const stats = useMemo(() => {
    const today = new Date();
    let totalOutstanding = 0;
    let collectedThisMonth = 0;
    let totalExpectedThisMonth = 0;
    const statusCounts = { PAID: 0, PARTIAL: 0, OVERDUE: 0 };

    installmentSchedules.forEach((s) => {
      const due = new Date(s.dueDate);
      const isThisMonth =
        due.getMonth() === today.getMonth() &&
        due.getFullYear() === today.getFullYear();

      if (isThisMonth) {
        totalExpectedThisMonth += s.expectedAmount;
        collectedThisMonth += s.paidAmount;
      }

      if (s.status === "PAID") statusCounts.PAID++;
      else if (s.status === "PARTIALLY_PAID") statusCounts.PARTIAL++;
      else if (s.status === "OVERDUE") statusCounts.OVERDUE++;

      const remaining = s.expectedAmount - s.paidAmount;
      if (s.status !== "PAID") totalOutstanding += remaining;
    });

    const collectionRate =
      totalExpectedThisMonth > 0
        ? Math.round((collectedThisMonth / totalExpectedThisMonth) * 100)
        : 0;
    const activeSalesCount = sales.filter((s) => s.status === "ACTIVE").length;

    return {
      totalOutstanding,
      collectedThisMonth,
      collectionRate,
      activeSalesCount,
      statusCounts,
    };
  }, []);

  const pieData = [
    { name: "PAID", value: stats.statusCounts.PAID, color: "var(--success)" },
    {
      name: "PARTIAL",
      value: stats.statusCounts.PARTIAL,
      color: "var(--warning)",
    },
    {
      name: "OVERDUE",
      value: stats.statusCounts.OVERDUE,
      color: "var(--destructive)",
    },
  ];

  const overdueRows = useMemo(() => {
    const today = new Date();
    return installmentSchedules
      .filter((s) => s.status === "OVERDUE")
      .map((s) => {
        const sale = saleById(s.saleId);
        const customer = sale ? customerById(sale.customerId) : undefined;
        const product = sale ? productById(sale.productId) : undefined;
        return {
          id: s.id,
          saleId: s.saleId,
          customerName: customer?.fullName ?? "Unknown",
          productName: product?.name ?? "Unknown",
          daysOverdue: differenceInDays(today, new Date(s.dueDate)),
          amount: s.expectedAmount - s.paidAmount,
        };
      })
      .sort((a, b) => b.daysOverdue - a.daysOverdue);
  }, []);

  const topBarOverride = useMemo(
    () => ({
      primaryAction: {
        onClick: () => setExportSheetOpen(true),
        icon: Icon.Download,
        label: "Export PDF",
      },
    }),
    [],
  );

  useTopBarOverride(topBarOverride);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatReportCard
          label="Total Outstanding"
          value={formatCurrency(stats.totalOutstanding)}
          tooltip="All active sales"
          icon={Icon.Wallet}
          iconColor="brand"
          border
          shadow
        />
        <StatReportCard
          label="Collected This Month"
          value={formatCurrency(stats.collectedThisMonth)}
          valueClassName="text-success-role"
          tooltip={format(new Date(), "MMMM yyyy")}
          icon={Icon.CalendarCheck2}
          iconColor="success"
          border
          shadow
        />
        <StatReportCard
          label="Collection Rate"
          value={`${stats.collectionRate}%`}
          tooltip="This month"
          icon={Icon.TrendingUp}
          iconColor="info"
          border
          shadow
        />
        <StatReportCard
          label="Active Sales"
          value={stats.activeSalesCount}
          tooltip="In progress"
          icon={Icon.Timer}
          iconColor="warning"
          border
          shadow
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        <MonthlyCollectionsChart data={monthly} />
        <CollectionStatusChart data={pieData} />
      </div>

      <OverdueAgingTable rows={overdueRows} />

      <p className="sr-only">{formatDate(new Date())}</p>

      <ExportReportSheet
        open={exportSheetOpen}
        onClose={() => setExportSheetOpen(false)}
        onExport={() => Notification.success("Report exported as PDF")}
      />
    </>
  );
}

export default Reports;
