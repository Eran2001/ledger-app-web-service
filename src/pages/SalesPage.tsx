import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Download, Plus, Search } from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InitialsAvatar } from "@/components/shared/initials-avatar"
import { StatusBadge } from "@/components/shared/status-badge"
import { customerById, productById, saleStats, sales } from "@/lib/dummy-data"
import { formatCurrency, formatDate } from "@/lib/utils"

const CATEGORY_TEXT: Record<string, string> = {
  Electronics: "text-brand",
  Appliances: "text-cat-teal",
  Furniture: "text-warning-role",
  Hardware: "text-cat-purple",
  Other: "text-faint",
}

type Tab = "all" | "active" | "overdue" | "completed" | "writtenoff"

export default function SalesPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [tab, setTab] = useState<Tab>("all")

  const enriched = useMemo(() => {
    return sales.map((s) => {
      const stat = saleStats(s.id)
      const customer = customerById(s.customerId)
      const product = productById(s.productId)
      return { sale: s, stat, customer, product }
    })
  }, [])

  const filtered = enriched.filter(({ sale, stat, customer, product }) => {
    const q = search.trim().toLowerCase()
    if (q && !customer?.fullName.toLowerCase().includes(q) && !product?.name.toLowerCase().includes(q)) return false
    if (from && new Date(sale.saleDate) < new Date(from)) return false
    if (to && new Date(sale.saleDate) > new Date(to)) return false
    if (tab === "active") return sale.status === "ACTIVE" && !stat.hasOverdue
    if (tab === "overdue") return stat.hasOverdue
    if (tab === "completed") return sale.status === "COMPLETED"
    if (tab === "writtenoff") return sale.status === "WRITTEN_OFF"
    return true
  })

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Sales"
        pageSubtitle={`${sales.length} total sales`}
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
        {/* Filter tabs */}
        <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="mb-4">
          <TabsList className="surface-tab-list h-10 p-1 tab-rounded">
            <TabsTrigger value="all" className="tabs-trigger px-3 tab-rounded">All Sales</TabsTrigger>
            <TabsTrigger value="active" className="tabs-trigger px-3 tab-rounded">Active</TabsTrigger>
            <TabsTrigger value="overdue" className="tabs-trigger px-3 tab-rounded">Overdue</TabsTrigger>
            <TabsTrigger value="completed" className="tabs-trigger px-3 tab-rounded">Completed</TabsTrigger>
            <TabsTrigger value="writtenoff" className="tabs-trigger px-3 tab-rounded">Written Off</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />
            <Input
              placeholder="Search customer or product…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 control-rounded border-default surface-card"
            />
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="h-10 control-rounded border-default surface-card t-meta text-soft"
            />
            <span className="t-caption text-faint">to</span>
            <Input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="h-10 control-rounded border-default surface-card t-meta text-soft"
            />
          </div>

          <Button variant="outline" className="ml-auto h-10 control-rounded border-default text-soft gap-2 bg-transparent">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>

        {/* Table */}
        <div className="surface-card card-rounded border border-default shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3 align-text-left">Customer</th>
                  <th className="px-6 py-3 align-text-left">Product</th>
                  <th className="px-6 py-3 align-text-right">Sold Price</th>
                  <th className="px-6 py-3 align-text-right">Outstanding</th>
                  <th className="px-6 py-3 align-text-right">Monthly</th>
                  <th className="px-6 py-3 align-text-left">Next Due</th>
                  <th className="px-6 py-3 align-text-left">Status</th>
                  <th className="px-6 py-3 align-text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(({ sale, stat, customer, product }) => (
                  <tr
                    key={sale.id}
                    onClick={() => navigate(`/sales/${sale.id}`)}
                    className={`border-t border-default surface-hover cursor-pointer ${
                      stat.hasOverdue ? "surface-overdue-row border-l-2 border-start-danger" : ""
                    }`}
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <InitialsAvatar name={customer?.fullName ?? ""} size="sm" />
                        <span className="table-title-text">{customer?.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-col">
                        <span className="table-title-text">{product?.name}</span>
                        <span className={`t-micro-bold case-upper tracking-label ${product ? CATEGORY_TEXT[product.category] : "text-faint"}`}>
                          {product?.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 align-text-right table-text">{formatCurrency(sale.soldPrice)}</td>
                    <td className="px-6 py-3 align-text-right t-meta-bold text-main fw-bold">
                      {formatCurrency(stat.outstanding)}
                    </td>
                    <td className="px-6 py-3 align-text-right table-text">{formatCurrency(sale.monthlyAmount)}</td>
                    <td className="px-6 py-3 table-text">{stat.nextDue ? formatDate(stat.nextDue) : "—"}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={stat.hasOverdue ? "OVERDUE" : sale.status} />
                    </td>
                    <td className="px-6 py-3 align-text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/sales/${sale.id}`)
                        }}
                        className="t-caption-bold control-rounded border-default text-soft hover:text-brand bg-transparent"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 align-text-center t-body text-faint">
                      No sales match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
