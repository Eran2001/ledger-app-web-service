import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Download, Plus, Search, Users } from "lucide-react"
import { TopBar } from "@/components/layout/top-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InitialsAvatar } from "@/components/shared/initials-avatar"
import { StatusBadge } from "@/components/shared/status-badge"
import { EmptyState } from "@/components/shared/empty-state"
import { customers, customerStats } from "@/lib/dummy-data"
import { formatCurrency } from "@/lib/utils"

type Tab = "all" | "active" | "overdue"

export default function CustomersPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState<Tab>("all")

  const enriched = useMemo(() => {
    return customers.map((c) => {
      const stat = customerStats(c.id)
      const status: "ACTIVE" | "OVERDUE" | "COMPLETED" =
        stat.outstanding === 0 ? "COMPLETED" : stat.hasOverdue ? "OVERDUE" : "ACTIVE"
      return { ...c, ...stat, status }
    })
  }, [])

  const filtered = enriched.filter((c) => {
    const q = search.trim().toLowerCase()
    const matchesSearch =
      !q ||
      c.fullName.toLowerCase().includes(q) ||
      c.nic.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q)
    if (!matchesSearch) return false
    if (tab === "active") return c.activeSalesCount > 0
    if (tab === "overdue") return c.hasOverdue
    return true
  })

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Customers"
        pageSubtitle={`${customers.length} customers`}
        primaryAction={
          <Button className="surface-brand text-inverse btn-base h-10 px-4 control-rounded surface-brand-strong-hover gap-2">
            <Plus className="h-4 w-4" /> New Customer
          </Button>
        }
      />
      <div className="p-6 overflow-y-auto">
        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />
            <Input
              placeholder="Search by name, NIC, or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 control-rounded border-default surface-card"
            />
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
            <TabsList className="surface-tab-list h-10 p-1 tab-rounded">
              <TabsTrigger value="all" className="tabs-trigger px-3 tab-rounded">
                All Customers
              </TabsTrigger>
              <TabsTrigger value="active" className="tabs-trigger px-3 tab-rounded">
                Active Sales
              </TabsTrigger>
              <TabsTrigger value="overdue" className="tabs-trigger px-3 tab-rounded">
                Has Overdue
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="outline" className="ml-auto h-10 control-rounded border-default text-soft gap-2 bg-transparent">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No customers found"
            subtitle="Try adjusting your search or filter, or add your first customer."
            actionLabel="New Customer"
            onAction={() => undefined}
          />
        ) : (
          <div className="surface-card card-rounded border border-default shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="px-6 py-3 align-text-left">Customer</th>
                    <th className="px-6 py-3 align-text-left">NIC Number</th>
                    <th className="px-6 py-3 align-text-left">Phone</th>
                    <th className="px-6 py-3 align-text-center">Active Sales</th>
                    <th className="px-6 py-3 align-text-right">Outstanding</th>
                    <th className="px-6 py-3 align-text-left">Status</th>
                    <th className="px-6 py-3 align-text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => navigate(`/customers/${c.id}`)}
                      className={`border-t border-default surface-hover cursor-pointer ${
                        c.hasOverdue ? "border-l-4 border-start-danger" : ""
                      }`}
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={c.fullName} size="sm" />
                          <div>
                            <p className="table-title-text">{c.fullName}</p>
                            <p className="t-caption text-faint">{c.city}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 mono-text t-meta text-soft">{c.nic}</td>
                      <td className="px-6 py-3 table-text">{c.phone}</td>
                      <td className="px-6 py-3 align-text-center table-text">{c.activeSalesCount}</td>
                      <td className="px-6 py-3 align-text-right">
                        {c.outstanding > 0 ? (
                          <span className="t-meta-bold text-main fw-semibold">{formatCurrency(c.outstanding)}</span>
                        ) : (
                          <span className="t-meta text-faint">Paid</span>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-6 py-3 align-text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/customers/${c.id}`)
                          }}
                          className="t-caption-bold control-rounded border-default text-soft hover:text-brand bg-transparent"
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
