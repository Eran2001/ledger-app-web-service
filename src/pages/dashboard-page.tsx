import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowRight } from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: string;
  subText: string;
  trend?: { value: string; color: string };
}

const KPICard: React.FC<KPICardProps> = ({ label, value, subText, trend }) => (
  <div className="surface-card card-rounded border border-border p-5 border-l-4 border-start-brand shadow-sm">
    <div className="t-micro-bold text-soft case-upper tracking-label mb-2">
      {label}
    </div>
    <div className="t-kpi text-main">{value}</div>
    <div className="flex items-center gap-1.5 mt-1">
      {trend && (
        <span className={cn("t-micro fw-bold", trend.color)}>
          {trend.value}
        </span>
      )}
      <span className="t-micro text-faint">{subText}</span>
    </div>
  </div>
);

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const recentPayments = [
    {
      name: "Nimal Perera",
      product: 'Samsung TV 43"',
      amount: 4500,
      date: "18 Apr",
      status: "PAID",
    },
    {
      name: "Sunethra De Silva",
      product: "LG Fridge 250L",
      amount: 3200,
      date: "17 Apr",
      status: "PARTIALLY_PAID",
    },
    {
      name: "Roshan Fernando",
      product: "Washing Machine",
      amount: 6000,
      date: "16 Apr",
      status: "PAID",
    },
    {
      name: "Dilini Jayawardena",
      product: "Sofa Set 3+1",
      amount: 2800,
      date: "15 Apr",
      status: "PAID",
    },
    {
      name: "Chamara Bandara",
      product: "Air Cooler",
      amount: 1500,
      date: "14 Apr",
      status: "PENDING",
    },
  ];

  const overdueInstallments = [
    { name: "Anura Kumara", product: "Sony Speaker", days: 72, amount: 7500 },
    { name: "Priya Wickrama", product: "Dining Table", days: 45, amount: 5200 },
    {
      name: "Tharaka Samaratunge",
      product: "Water Pump",
      days: 18,
      amount: 2800,
    },
    {
      name: "Malani Gunawardena",
      product: "Gas Cooker",
      days: 12,
      amount: 3100,
    },
  ];

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Dashboard"
        pageSubtitle="April 2026 overview"
        primaryAction={
          <Button onClick={() => navigate("/sales/new")}>
            <Plus className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        }
      />

      <div className="p-6 overflow-y-auto">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KPICard
            label="Total Outstanding"
            value="LKR 284,500"
            subText="42 active sales"
          />
          <KPICard
            label="Collected this Month"
            value="LKR 48,200"
            subText="+12% vs last month"
            trend={{ value: "↑ 12%", color: "text-success-role" }}
          />
          <KPICard
            label="Overdue Installments"
            value="9"
            subText="3 over 60 days"
            trend={{ value: "!!", color: "text-danger" }}
          />
          <KPICard
            label="New Sales This Month"
            value="7"
            subText="LKR 92,000 total value"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Recent Payments */}
          <div className="xl:col-span-3 surface-card card-rounded border border-border shadow-sm flex flex-col">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="t-title text-main">Recent Payments</h3>
              <button
                onClick={() => navigate("/sales")}
                className="text-brand t-caption-bold flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full align-text-left">
                <thead className="surface-page t-micro-bold text-soft case-upper tracking-label-wide">
                  <tr>
                    <th className="px-5 py-3 border-b">Customer</th>
                    <th className="px-5 py-3 border-b">Product</th>
                    <th className="px-5 py-3 border-b">Amount</th>
                    <th className="px-5 py-3 border-b">Date</th>
                    <th className="px-5 py-3 border-b">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentPayments.map((p, idx) => (
                    <tr
                      key={idx}
                      className="surface-hover transition-colors group"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={p.name} size="sm" />
                          <span className="t-body fw-semibold text-main">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 t-body text-soft">
                        {p.product}
                      </td>
                      <td className="px-5 py-3.5 t-body fw-semibold text-main whitespace-nowrap">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="px-5 py-3.5 t-body text-soft">{p.date}</td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overdue List */}
          <div className="xl:col-span-2 surface-card card-rounded border border-border shadow-sm flex flex-col">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="t-title text-main">Overdue Installments</h3>
              <button
                onClick={() => navigate("/overdue")}
                className="text-danger t-caption-bold flex items-center gap-1 hover:underline"
              >
                Send Reminders <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1 divide-y divide-border">
              {overdueInstallments.map((o, idx) => (
                <div
                  key={idx}
                  className="p-4 flex items-center justify-between surface-hover transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={o.name} size="sm" />
                    <div className="flex flex-col">
                      <span className="t-body fw-semibold text-main group-hover:text-brand transition-colors">
                        {o.name}
                      </span>
                      <span className="t-micro text-faint">{o.product}</span>
                    </div>
                  </div>
                  <div className="align-text-right">
                    <div className="t-micro-bold text-danger case-upper tracking-label">
                      {o.days} DAYS OVERDUE
                    </div>
                    <div className="t-body fw-bold text-main">
                      {formatCurrency(o.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 surface-page corner-rounded-bottom-xl border-t">
              <p className="t-micro align-text-center text-faint">
                Manual reminders recommended for 60+ days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
