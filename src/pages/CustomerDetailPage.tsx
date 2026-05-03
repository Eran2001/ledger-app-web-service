import { useState } from "react"
import { Link, useParams, Navigate, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, Plus } from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Button } from "@/components/ui/button"
import { InitialsAvatar } from "@/components/shared/initials-avatar"
import { StatusBadge } from "@/components/shared/status-badge"
import { StatPill } from "@/components/shared/stat-pill"
import {
  customerById,
  customerStats,
  paymentsForSale,
  productById,
  saleStats,
  sales,
  schedulesForSale,
  installmentSchedules,
  userById,
  payments,
} from "@/lib/dummy-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const CATEGORY_PILL: Record<string, "indigo" | "teal" | "amber" | "purple" | "gray"> = {
  Electronics: "indigo",
  Appliances: "teal",
  Furniture: "amber",
  Hardware: "purple",
  Other: "gray",
}

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const customer = customerById(id ?? "")
  if (!customer) return <Navigate to="/customers" replace />

  const [tab, setTab] = useState("active")
  const stats = customerStats(customer.id)
  const customerSales = sales.filter((s) => s.customerId === customer.id)
  const activeSales = customerSales.filter((s) => s.status === "ACTIVE")

  // Payment history across all sales for this customer
  const allPayments = customerSales
    .flatMap((s) => paymentsForSale(s.id).map((p) => ({ ...p, saleId: s.id })))
    .sort((a, b) => new Date(b.paidDate).getTime() - new Date(a.paidDate).getTime())

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle={customer.fullName}
        pageSubtitle="Customer profile"
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
        <Link
          to="/customers"
          className="inline-flex items-center gap-2 t-meta-bold text-brand mb-6 hover:underline group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to list
        </Link>

        {/* Profile Header Card */}
        <div className="surface-card modal-rounded border border-default p-8 mb-8 shadow-sm overflow-hidden relative">
          <div
            className="surface-brand-soft absolute -top-12 -right-12 h-48 w-48 rounded-full opacity-60"
            aria-hidden
          />
          <div className="relative flex flex-col xl:flex-row gap-6 items-start xl:items-center">
            <div className="ring-4 ring-[var(--primary-light)] circle-rounded shadow-brand-soft">
              <InitialsAvatar name={customer.fullName} size="lg" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="t-section text-main mb-1.5">{customer.fullName}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 t-meta text-soft mb-2">
                <span>
                  <span className="text-faint mr-1">NIC</span>
                  <span className="mono-text">{customer.nic}</span>
                </span>
                <span>
                  <span className="text-faint mr-1">Phone</span>
                  {customer.phone}
                </span>
                {customer.email && (
                  <span>
                    <span className="text-faint mr-1">Email</span>
                    {customer.email}
                  </span>
                )}
              </div>
              <p className="t-meta text-soft">{customer.address}</p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <StatPill label={`${stats.activeSalesCount} Active Sales`} color="indigo" />
              <StatPill label={`${formatCurrency(stats.outstanding)} Outstanding`} color="amber" />
              <StatPill label={`Since ${formatDate(customer.createdAt)}`} color="gray" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="surface-page bg-transparent p-0 h-auto gap-6 border-b border-default rounded-none">
            <TabsTrigger
              value="active"
              className="tabs-trigger relative bg-transparent border-0 h-11 px-1 t-meta-bold rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-[var(--primary)]"
            >
              Active Sales
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="tabs-trigger relative bg-transparent border-0 h-11 px-1 t-meta-bold rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-[var(--primary)]"
            >
              Payment History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="pt-6">
            {activeSales.length === 0 ? (
              <p className="t-body text-faint">No active sales.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeSales.map((sale) => {
                  const product = productById(sale.productId)
                  const stat = saleStats(sale.id)
                  const progress = stat.totalCount === 0 ? 0 : (stat.paidCount / stat.totalCount) * 100
                  return (
                    <div
                      key={sale.id}
                      className="surface-card card-rounded border border-default p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="min-w-0">
                          <h3 className="t-section text-main truncate mb-1.5">{product?.name}</h3>
                          {product && <StatPill label={product.category} color={CATEGORY_PILL[product.category] ?? "gray"} />}
                        </div>
                        <StatusBadge status={stat.hasOverdue ? "OVERDUE" : "ACTIVE"} />
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-5">
                        <Stat label="Sold Price" value={formatCurrency(sale.soldPrice)} />
                        <Stat label="Down Payment" value={formatCurrency(sale.downPayment)} />
                        <Stat label="Monthly" value={formatCurrency(sale.monthlyAmount)} />
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between t-caption text-soft mb-1.5">
                          <span>
                            {stat.paidCount} of {stat.totalCount} installments paid
                          </span>
                          <span className="fw-bold text-main">{formatCurrency(stat.outstanding)} left</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-default">
                        <p className="t-caption text-soft">
                          Next due:{" "}
                          <span className="fw-semibold text-main">
                            {stat.nextDue ? formatDate(stat.nextDue) : "—"}
                          </span>
                        </p>
                        <Link
                          to={`/sales/${sale.id}`}
                          className="t-caption-bold text-brand inline-flex items-center gap-1 hover:underline"
                        >
                          View Full Details <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="payments" className="pt-6">
            <div className="surface-card card-rounded border border-default shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="table-header">
                      <th className="px-6 py-3 align-text-left">Date</th>
                      <th className="px-6 py-3 align-text-left">Product</th>
                      <th className="px-6 py-3 align-text-right">Amount</th>
                      <th className="px-6 py-3 align-text-left">Recorded By</th>
                      <th className="px-6 py-3 align-text-left">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPayments.map((p) => {
                      const sale = sales.find((s) => s.id === p.saleId)
                      const prod = sale ? productById(sale.productId) : undefined
                      return (
                        <tr key={p.id} className="border-t border-default surface-hover">
                          <td className="px-6 py-3 table-text">{formatDate(p.paidDate)}</td>
                          <td className="px-6 py-3 table-title-text">{prod?.name}</td>
                          <td className="px-6 py-3 align-text-right t-meta-bold text-main">
                            {formatCurrency(p.paidAmount)}
                          </td>
                          <td className="px-6 py-3 table-text">{p.recordedBy}</td>
                          <td className="px-6 py-3 table-text">{p.notes ?? "—"}</td>
                        </tr>
                      )
                    })}
                    {allPayments.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 align-text-center t-body text-faint">
                          No payment history yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="t-micro-bold text-faint case-upper tracking-label mb-1">{label}</p>
      <p className="t-meta-bold text-main">{value}</p>
    </div>
  )
}
