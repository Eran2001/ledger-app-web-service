import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { differenceInDays, format, subMonths } from "date-fns";
import { Download, Eye } from "lucide-react";
import { TopBar } from "@/components/shared/top-bar";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  customerById,
  installmentSchedules,
  productById,
  saleById,
  sales,
} from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Notification } from "@/utils/notification";

interface MonthlyPoint {
  month: string;
  collected: number;
}

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

export default function ReportsPage() {
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

  return (
    <div className="flex min-h-screen flex-col surface-page">
      <TopBar
        pageTitle="Reports"
        pageSubtitle="Financial performance, collections, and overdue analytics"
        primaryAction={{
          onClick: () => Notification.success("Report exported as PDF"),
          icon: Download,
          label: "Export PDF",
        }}
      />
      <div className="flex-1 space-y-6 p-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-base p-5">
            <p className="label-caps">Total Outstanding</p>
            <p className="t-kpi-lg text-main mt-2">
              {formatCurrency(stats.totalOutstanding)}
            </p>
            <p className="t-caption text-soft mt-1">All active sales</p>
          </div>
          <div className="card-base p-5">
            <p className="label-caps">Collected This Month</p>
            <p className="t-kpi-lg text-success-role mt-2">
              {formatCurrency(stats.collectedThisMonth)}
            </p>
            <p className="t-caption text-soft mt-1">
              {format(new Date(), "MMMM yyyy")}
            </p>
          </div>
          <div className="card-base p-5">
            <p className="label-caps">Collection Rate</p>
            <p className="t-kpi-lg text-main mt-2">{stats.collectionRate}%</p>
            <p className="t-caption text-soft mt-1">This month</p>
          </div>
          <div className="card-base p-5">
            <p className="label-caps">Active Sales</p>
            <p className="t-kpi-lg text-main mt-2">{stats.activeSalesCount}</p>
            <p className="t-caption text-soft mt-1">In progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="card-base p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="t-display text-main">Monthly Collections</h2>
                <p className="t-caption text-soft">Last 6 months</p>
              </div>
            </div>
            <div className="h-72 chart-frame">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthly}
                  margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
                >
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="var(--text-muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--text-muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--primary-light)" }}
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.525rem",
                      color: "var(--text-primary)",
                    }}
                    formatter={(v: number) => formatCurrency(v)}
                  />
                  <Bar
                    dataKey="collected"
                    fill="var(--primary)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-base p-5">
            <div className="mb-4">
              <h2 className="t-display text-main">Collection Status</h2>
              <p className="t-caption text-soft">By installment</p>
            </div>
            <div className="h-72 chart-frame">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={2}
                    stroke="var(--card-bg)"
                    strokeWidth={3}
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.525rem",
                      color: "var(--text-primary)",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card-base overflow-hidden">
          <div
            className="px-5 py-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <h2 className="t-display text-main">Overdue Aging</h2>
            <p className="t-caption text-soft">
              Customers with unpaid past-due installments
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header text-left px-4 py-3">Customer</th>
                  <th className="table-header text-left px-4 py-3">Product</th>
                  <th className="table-header text-left px-4 py-3">
                    Days Overdue
                  </th>
                  <th className="table-header text-left px-4 py-3">Amount</th>
                  <th className="table-header text-right px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {overdueRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 align-text-center t-meta text-faint"
                    >
                      No overdue installments.
                    </td>
                  </tr>
                ) : (
                  overdueRows.slice(0, 10).map((r) => {
                    const sevText =
                      r.daysOverdue > 60
                        ? "text-danger"
                        : r.daysOverdue > 30
                          ? "text-warning-role"
                          : "text-warning-role";
                    return (
                      <tr
                        key={r.id}
                        className="border-t"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <td className="px-4 py-3 table-title-text">
                          {r.customerName}
                        </td>
                        <td className="px-4 py-3 table-text">
                          {r.productName}
                        </td>
                        <td className={`px-4 py-3 fw-black ${sevText}`}>
                          {r.daysOverdue} days
                        </td>
                        <td className="px-4 py-3 table-title-text fw-bold">
                          {formatCurrency(r.amount)}
                        </td>
                        <td className="px-4 py-3 align-text-right">
                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="gap-1.5"
                          >
                            <Link to="/sales/$id" params={{ id: r.saleId }}>
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="sr-only">{formatDate(new Date())}</p>
      </div>
    </div>
  );
}
