import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Plus, TrendingUp, AlertCircle } from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { InitialsAvatar } from "@/components/shared/initials-avatar"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import {
  customers,
  installmentSchedules,
  payments,
  productById,
  customerById,
  saleStats,
  schedulesForSale,
  sales,
} from "@/lib/dummy-data"
import { formatCurrency, formatDate, daysOverdue } from "@/lib/utils"

export default function DashboardPage() {
  const navigate = useNavigate()

  const totalOutstanding = sales.reduce((sum, s) => sum + saleStats(s.id).outstanding, 0)
  const overdueInstallments = installmentSchedules.filter((i) => i.status === "OVERDUE")
  const monthlyCollected = 48200
  const newSalesThisMonth = 7

  // Recent payments
  const recentPayments = [...payments]
    .sort((a, b) => new Date(b.paidDate).getTime() - new Date(a.paidDate).getTime())
    .slice(0, 5)
    .map((p) => {
      const sched = installmentSchedules.find((s) => s.id === p.installmentScheduleId)
      const sale = sched ? sales.find((s) => s.id === sched.saleId) : undefined
      const customer = sale ? customerById(sale.customerId) : undefined
      const product = sale ? productById(sale.productId) : undefined
      const status = (sched?.status ?? "PAID") as "PAID" | "PARTIALLY_PAID" | "OVERDUE" | "PENDING"
      return {
        id: p.id,
        customer: customer?.fullName ?? "Unknown",
        product: product?.name ?? "—",
        amount: p.paidAmount,
        date: p.paidDate,
        status,
      }
    })

  // Overdue list
  const overdueRows = overdueInstallments
    .map((i) => {
      const sale = sales.find((s) => s.id === i.saleId)
      const customer = sale ? customerById(sale.customerId) : undefined
      const product = sale ? productById(sale.productId) : undefined
      return {
        id: i.id,
        customer: customer?.fullName ?? "Unknown",
        customerId: customer?.id ?? "",
        product: product?.name ?? "—",
        days: daysOverdue(i.dueDate),
        amount: i.expectedAmount - i.paidAmount,
      }
    })
    .sort((a, b) => b.days - a.days)
    .slice(0, 6)

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Dashboard"
        pageSubtitle="Overview of your installment business"
        primaryAction={
          <Button
            onClick={() => navigate("/sales/new")}
            className="surface-brand text-inverse btn-base h-10 px-4 control-rounded surface-brand-strong-hover gap-2"
          >
            <Plus className="h-4 w-4" /> New Sale
          </Button>
        }
      />
      <div className="p-6 overflow-y-auto">
        {/* KPI grid */}
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
            sub={`${overdueRows.filter((r) => r.days >= 60).length} over 60 days`}
            danger
          />
          <KpiCard
            label="New Sales This Month"
            value={String(newSalesThisMonth)}
            sub="LKR 92,000 total value"
          />
        </div>

        {/* Main grid */}
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-5">
          {/* Recent payments */}
          <section className="surface-card card-rounded border border-default shadow-sm xl:col-span-3 overflow-hidden">
            <div className="flex items-center justify-between px-6 h-14 border-b border-default">
              <h2 className="t-title text-main">Recent Payments</h2>
              <Link to="/sales" className="t-meta-bold text-brand inline-flex items-center gap-1 hover:underline">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="px-6 py-3 align-text-left">Customer</th>
                    <th className="px-6 py-3 align-text-left">Product</th>
                    <th className="px-6 py-3 align-text-right">Amount</th>
                    <th className="px-6 py-3 align-text-left">Date</th>
                    <th className="px-6 py-3 align-text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((p) => (
                    <tr key={p.id} className="border-t border-default surface-hover">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={p.customer} size="sm" />
                          <span className="table-title-text">{p.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 table-text">{p.product}</td>
                      <td className="px-6 py-3 align-text-right t-meta-bold text-main fw-semibold">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="px-6 py-3 table-text">{formatDate(p.date)}</td>
                      <td className="px-6 py-3">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Overdue list */}
          <section className="surface-card card-rounded border border-default shadow-sm xl:col-span-2 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 h-14 border-b border-default">
              <h2 className="t-title text-main">Overdue Installments</h2>
              <button className="t-meta-bold text-danger inline-flex items-center gap-1 hover:underline">
                Send Reminders <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <ul className="flex-1 divide-y divide-[var(--border)]">
              {overdueRows.map((r) => (
                <li
                  key={r.id}
                  onClick={() => r.customerId && navigate(`/customers/${r.customerId}`)}
                  className="surface-hover cursor-pointer flex items-center justify-between gap-3 px-6 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <InitialsAvatar name={r.customer} size="sm" />
                    <div className="min-w-0">
                      <p className="t-meta-bold text-main truncate">{r.customer}</p>
                      <p className="t-micro text-faint truncate">{r.product}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="t-micro-bold text-danger case-upper tracking-label">{r.days} days late</p>
                    <p className="t-meta-bold text-main">{formatCurrency(r.amount)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="surface-page px-6 py-3 align-text-center t-micro text-faint">
              Manual reminders recommended for 60+ days
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function KpiCard({
  label,
  value,
  sub,
  trend,
  danger,
}: {
  label: string
  value: string
  sub?: string
  trend?: { label: string; color: string }
  danger?: boolean
}) {
  return (
    <div className={`surface-card card-rounded border border-default p-5 border-l-4 ${danger ? "border-start-danger" : "border-start-brand"} shadow-sm`}>
      <p className="t-micro-bold text-soft case-upper tracking-label mb-2">{label}</p>
      <p className="t-kpi text-main">{value}</p>
      <div className="mt-2 flex items-center gap-2">
        {trend && <span className={`t-micro fw-bold ${trend.color}`}>{trend.label}</span>}
        {sub && <span className="t-micro text-faint">{sub}</span>}
      </div>
    </div>
  )
}
