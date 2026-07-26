import { useState } from "react";
import { Check, Edit2, Inbox, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Notification } from "@/components/ui/custom-toast";
import {
  Grid,
  GridItem,
  GridItemHeader,
  GridItemBody,
  GridEmpty,
} from "@/components/ui/grid";

import {
  pendingRegistrations,
  employees as initialUsers,
} from "@/constant/employee-data";
import { useWidth } from "@/hooks/use-width";
import { formatDate } from "@/utils/format-date";
import type { Employee, Role } from "@/types/employee-types";

const TABS = ["Team Members", "Pending Requests"] as const;
type Tab = (typeof TABS)[number];

function rolePillClass(role: Role): string {
  switch (role) {
    case "ADMIN":
      return "pill-indigo";
    case "STAFF":
      return "pill-teal";
    case "VIEWER":
    default:
      return "pill-gray";
  }
}

const Users = () => {
  const { width, breakpoints } = useWidth();
  const isMaxLg = width < breakpoints.lg;
  const [tab, setTab] = useState<Tab>("Team Members");
  const [users, setUsers] = useState<Employee[]>(initialUsers);
  const [pending, setPending] = useState(pendingRegistrations);

  function approve(id: string) {
    const req = pending.find((p) => p.id === id);
    if (!req) return;
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
    ]);
    setPending((prev) => prev.filter((p) => p.id !== id));
    Notification.success(`${req.name} approved as ${req.requestedRole}`);
  }
  function reject(id: string) {
    setPending((prev) => prev.filter((p) => p.id !== id));
    Notification.success("Request rejected");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1 surface-tab-list p-1 tab-rounded w-fit">
        {TABS.map((t) => {
          const active = tab === t;
          const count =
            t === "Pending Requests" ? pending.length : users.length;
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
              <span className="t-label-md-bold pill-gray px-1.5 py-0.5 global-rounded">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {tab === "Team Members" ? (
        isMaxLg ? (
          <Grid>
            {users.map((u) => (
              <GridItem key={u.id} border shadow>
                <GridItemHeader>
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <InitialsAvatar name={u.name} />
                    <span className="table-title-text truncate">{u.name}</span>
                  </div>
                  <StatusBadge
                    status={u.status === "active" ? "ACTIVE" : "PENDING"}
                  />
                </GridItemHeader>
                <GridItemBody>
                  <span className="t-label-md text-faint">Email</span>
                  <span className="table-text font-mono t-body-md truncate">
                    {u.email}
                  </span>
                  <span className="t-label-md text-faint">Role</span>
                  <span
                    className={`${rolePillClass(u.role)} t-label-md-bold px-2.5 py-0.5 global-rounded`}
                  >
                    {u.role}
                  </span>
                  <span className="t-label-md text-faint">Last Login</span>
                  <span className="table-text">{formatDate(u.lastLogin)}</span>
                </GridItemBody>
                <Button
                  variant="outline"
                  onClick={() =>
                    Notification.success(`Edit role for ${u.name}`)
                  }
                  className="gap-1.5"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  Edit Role
                </Button>
              </GridItem>
            ))}
          </Grid>
        ) : (
          <div className="card-base overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header text-left px-4 py-3">Name</th>
                    <th className="table-header text-left px-4 py-3">Email</th>
                    <th className="table-header text-left px-4 py-3">Role</th>
                    <th className="table-header text-left px-4 py-3">Status</th>
                    <th className="table-header text-left px-4 py-3">
                      Last Login
                    </th>
                    <th className="table-header text-right px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={u.name} />
                          <span className="table-title-text">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 table-text font-mono t-body-md">
                        {u.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`${rolePillClass(u.role)} t-label-md-bold px-2.5 py-0.5 global-rounded`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          status={u.status === "active" ? "ACTIVE" : "PENDING"}
                        />
                      </td>
                      <td className="px-4 py-3 table-text">
                        {formatDate(u.lastLogin)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            onClick={() =>
                              Notification.success(`Edit role for ${u.name}`)
                            }
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
        )
      ) : isMaxLg ? (
        pending.length === 0 ? (
          <Grid>
            <GridEmpty
              icon={Inbox}
              title="No pending requests"
              description="No pending requests."
            />
          </Grid>
        ) : (
          <Grid>
            {pending.map((r) => (
              <GridItem key={r.id} border shadow>
                <GridItemHeader>
                  <span className="table-title-text">{r.name}</span>
                </GridItemHeader>
                <GridItemBody>
                  <span className="t-label-md text-faint">Email</span>
                  <span className="table-text font-mono t-body-md">
                    {r.email}
                  </span>
                  <span className="t-label-md text-faint">Phone</span>
                  <span className="table-text font-mono t-body-md">
                    {r.phone}
                  </span>
                  <span className="t-label-md text-faint">Requested Role</span>
                  <span
                    className={`${rolePillClass(r.requestedRole)} t-label-md-bold px-2.5 py-0.5 global-rounded`}
                  >
                    {r.requestedRole}
                  </span>
                  <span className="t-label-md text-faint">Message</span>
                  <p className="table-text col-span-2 line-clamp-2">
                    {r.message}
                  </p>
                  <span className="t-label-md text-faint">Date</span>
                  <span className="table-text">
                    {formatDate(r.requestedAt)}
                  </span>
                </GridItemBody>
                <div className="flex items-center gap-2">
                  <Button
                    className="flex-1 gap-1.5 surface-success text-inverse hover:opacity-90"
                    onClick={() => approve(r.id)}
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-1.5 text-danger surface-danger-soft-hover"
                    style={{ borderColor: "var(--destructive)" }}
                    onClick={() => reject(r.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                    Reject
                  </Button>
                </div>
              </GridItem>
            ))}
          </Grid>
        )
      ) : (
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header text-left px-4 py-3">Name</th>
                  <th className="table-header text-left px-4 py-3">Email</th>
                  <th className="table-header text-left px-4 py-3">Phone</th>
                  <th className="table-header text-left px-4 py-3">
                    Requested Role
                  </th>
                  <th className="table-header text-left px-4 py-3">Message</th>
                  <th className="table-header text-left px-4 py-3">Date</th>
                  <th className="table-header text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center t-body-md text-faint"
                    >
                      No pending requests.
                    </td>
                  </tr>
                ) : (
                  pending.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="px-4 py-3 table-title-text">{r.name}</td>
                      <td className="px-4 py-3 table-text font-mono t-body-md">
                        {r.email}
                      </td>
                      <td className="px-4 py-3 table-text font-mono t-body-md">
                        {r.phone}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`${rolePillClass(r.requestedRole)} t-label-md-bold px-2.5 py-0.5 global-rounded`}
                        >
                          {r.requestedRole}
                        </span>
                      </td>
                      <td className="px-4 py-3 table-text max-w-70">
                        <p className="line-clamp-2">{r.message}</p>
                      </td>
                      <td className="px-4 py-3 table-text">
                        {formatDate(r.requestedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <Button
                            onClick={() => approve(r.id)}
                            className="surface-success text-inverse hover:opacity-90 gap-1.5"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Approve
                          </Button>
                          <Button
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
  );
};

export default Users;
