import { useMemo, useState } from "react";

import { Notification } from "@/components/ui/custom-toast";
import {
  employees as initialUsers,
  pendingRegistrations,
} from "@/constant/employee-data";
import type { UserFormValues } from "@/schemas/user-schema";
import type { Employee } from "@/types/employee-types";
import type { PendingRegistration } from "@/types/onboarding-types";
import type { UserListRow } from "@/types/user-list-types";

function toUserRow(user: Employee): UserListRow {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    phone: user.phone,
    date: user.lastLogin,
  };
}

function toPendingRow(request: PendingRegistration): UserListRow {
  return {
    id: request.id,
    name: request.name,
    email: request.email,
    role: request.requestedRole,
    status: "pending",
    phone: request.phone,
    date: request.requestedAt,
  };
}

function toEmployee(values: UserFormValues, name: string): Employee {
  return {
    id: `u-${Date.now()}`,
    name,
    email: values.email,
    phone: values.phone,
    role: values.role,
    status: values.status === "pending" ? "inactive" : values.status,
    lastLogin: new Date().toISOString(),
  };
}

export function useUserManagement() {
  const [users, setUsers] = useState<Employee[]>(initialUsers);
  const [pending, setPending] =
    useState<PendingRegistration[]>(pendingRegistrations);

  const rows = useMemo(
    () => [...users.map(toUserRow), ...pending.map(toPendingRow)],
    [pending, users],
  );

  function approve(id: string) {
    const request = pending.find((item) => item.id === id);
    if (!request) return;

    setUsers((current) => [
      ...current,
      {
        id: `u-${Date.now()}`,
        name: request.name,
        email: request.email,
        phone: request.phone,
        role: request.requestedRole,
        status: "active",
        lastLogin: new Date().toISOString(),
      },
    ]);
    setPending((current) => current.filter((item) => item.id !== id));
    Notification.success("User approved successfully");
  }

  function reject(id: string) {
    setPending((current) => current.filter((item) => item.id !== id));
    Notification.success("Request rejected successfully");
  }

  function saveUser(values: UserFormValues, editingUser: UserListRow | null) {
    const name = `${values.firstName} ${values.lastName}`;

    if (!editingUser) {
      setUsers((current) => [...current, toEmployee(values, name)]);
      Notification.success("User created successfully");
      return;
    }

    if (editingUser.status === "pending") {
      if (values.status === "pending") {
        setPending((current) =>
          current.map((request) =>
            request.id === editingUser.id
              ? {
                  ...request,
                  name,
                  email: values.email,
                  phone: values.phone,
                  requestedRole: values.role,
                }
              : request,
          ),
        );
      } else {
        setPending((current) =>
          current.filter((request) => request.id !== editingUser.id),
        );
        setUsers((current) => [...current, toEmployee(values, name)]);
      }
    } else {
      const status = values.status === "pending" ? "inactive" : values.status;
      setUsers((current) =>
        current.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name,
                email: values.email,
                phone: values.phone,
                role: values.role,
                status,
              }
            : user,
        ),
      );
    }

    Notification.success("User updated successfully");
  }

  return { rows, approve, reject, saveUser };
}
