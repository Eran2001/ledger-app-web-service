"use client"

import { useState } from "react"
import { Check, Edit2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InitialsAvatar } from "@/components/shared/initials-avatar"
import { StatusBadge } from "@/components/shared/status-badge"
import { pendingRegistrations, users as initialUsers } from "@/lib/dummy-data"
import { formatDate } from "@/lib/utils"
import type { User, UserRole } from "@/lib/types"
import { toast } from "sonner"

const TABS = ["Team Members", "Pending Requests"] as const
type Tab = (typeof TABS)[number]

function rolePillClass(role: UserRole): string {
  switch (role) {
    case "ADMIN":
      return "pill-indigo"
    case "STAFF":
      return "pill-teal"
    case "VIEWER":
      return "pill-gray"
  }
}

export default function UsersPage() {
  const [tab, setTab] = useState<Tab>("Team Members")
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [pending, setPending] = useState(pendingRegistrations)

  function approve(id: string) {
    const req = pending.find((p) => p.id === id)
    if (!req) return
    setUsers((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        name: req.name,
        email: req.email,
        role: req.requestedRole,
        status: "active",
        lastLogin: new Date().toISOString(),
      },
    ])
    setPending((prev) => prev.filter((p) => p.id !== id))
    toast.success(`${req.name} approved as ${req.requestedRole}`)
  }
  function reject(id: string) {
    setPending((prev) => prev.filter((p) => p.id !== id))
    toast.success("Request rejected")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="t-section text-main">Users</h1>
        <p className="t-meta text-soft mt-1">Manage your team members and pending access requests.</p>
      </div>

      <div className="flex items-center gap-1 surface-tab-list p-1 tab-rounded w-fit">
        {TABS.map((t) => {
          const active = tab === t
          const count = t === "Pending Requests" ? pending.length : users.length
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              data-state={active ? "active" : "inactive"}
              className={`tabs-trigger px-3 py-1.5 tab-rounded flex items-center gap-2 ${
                active ? "surface-card text-main shadow-sm" : ""
              }`}
            >
              {t}
              <span className="t-caption-bold pill-gray px-1.5 py-0.5 global-rounded">{count}</span>
            </button>
          )
        })}
      </div>

      {tab === "Team Members" ? (
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header text-left px-4 py-3">Name</th>
                  <th className="table-header text-left px-4 py-3">Email</th>
                  <th className="table-header text-left px-4 py-3">Role</th>
                  <th className="table-header text-left px-4 py-3">Status</th>
                  <th className="table-header text-left px-4 py-3">Last Login</th>
                  <th className="table-header text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <InitialsAvatar name={u.name} size={36} />
                        <span className="table-title-text">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 table-text mono-text t-meta">{u.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`${rolePillClass(u.role)} t-caption-bold px-2.5 py-0.5 global-rounded`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={u.status === "active" ? "ACTIVE" : "PENDING"} />
                    </td>
                    <td className="px-4 py-3 table-text">{formatDate(u.lastLogin)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast.success(`Edit role for ${u.name}`)}
                          className="gap-1.5"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          Edit Role
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header text-left px-4 py-3">Name</th>
                  <th className="table-header text-left px-4 py-3">Email</th>
                  <th className="table-header text-left px-4 py-3">Phone</th>
                  <th className="table-header text-left px-4 py-3">Requested Role</th>
                  <th className="table-header text-left px-4 py-3">Message</th>
                  <th className="table-header text-left px-4 py-3">Date</th>
                  <th className="table-header text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 align-text-center t-meta text-faint">
                      No pending requests.
                    </td>
                  </tr>
                ) : (
                  pending.map((r) => (
                    <tr key={r.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-3 table-title-text">{r.name}</td>
                      <td className="px-4 py-3 table-text mono-text t-meta">{r.email}</td>
                      <td className="px-4 py-3 table-text mono-text t-meta">{r.phone}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`${rolePillClass(r.requestedRole)} t-caption-bold px-2.5 py-0.5 global-rounded`}
                        >
                          {r.requestedRole}
                        </span>
                      </td>
                      <td className="px-4 py-3 table-text max-w-[280px]">
                        <p className="line-clamp-2">{r.message}</p>
                      </td>
                      <td className="px-4 py-3 table-text">{formatDate(r.requestedAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <Button
                            size="sm"
                            onClick={() => approve(r.id)}
                            className="surface-success text-inverse hover:opacity-90 gap-1.5"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => reject(r.id)}
                            className="gap-1.5 text-danger surface-danger-soft-hover"
                            style={{ borderColor: "var(--destructive)" }}
                          >
                            <X className="h-3.5 w-3.5" />
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
