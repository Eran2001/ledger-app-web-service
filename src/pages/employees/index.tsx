import { useCallback, useMemo, useState } from "react";

import * as Icon from "@/components/icons";
import { SearchField } from "@/components/ui/search-field";
import { Tabs, TabsCount, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useTopBarOverride } from "@/hooks/use-top-bar-override";
import { useUserManagement } from "@/hooks/use-user-management";
import { useWidth } from "@/hooks/use-width";
import type { UserListRow, UserStatusTab } from "@/types/user-list-types";

import { UsersGrid } from "./components/users-grid";
import { UserSheet } from "./components/user-sheet";
import { UsersTable } from "./components/users-table";

const STATUS_TABS: { value: UserStatusTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

export default function Users() {
  const { width, breakpoints } = useWidth();
  const { rows, approve, reject, saveUser } = useUserManagement();
  const [tab, setTab] = useState<UserStatusTab>("all");
  const [query, setQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserListRow | null>(null);

  const openCreateUser = useCallback(() => {
    setEditingUser(null);
    setSheetOpen(true);
  }, []);

  const openUser = useCallback((user: UserListRow) => {
    setEditingUser(user);
    setSheetOpen(true);
  }, []);

  useTopBarOverride(
    useMemo(
      () => ({
        primaryAction: {
          onClick: openCreateUser,
          icon: Icon.UserPlus,
          label: "Create User",
        },
      }),
      [openCreateUser],
    ),
  );

  const searchedRows = rows.filter((user) => {
    const value = query.trim().toLowerCase();
    return (
      !value ||
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.phone?.toLowerCase().includes(value)
    );
  });
  const tabCounts = Object.fromEntries(
    STATUS_TABS.map(({ value }) => [
      value,
      value === "all"
        ? searchedRows.length
        : searchedRows.filter((user) => user.status === value).length,
    ]),
  ) as Record<UserStatusTab, number>;
  const filteredRows = searchedRows.filter(
    (user) => tab === "all" || user.status === tab,
  );
  const listProps = { rows: filteredRows, onApprove: approve, onReject: reject, onOpen: openUser };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search users…"
          containerClassName="w-full lg:flex-1 md:min-w-40 md:max-w-xs lg:min-w-60 lg:max-w-sm"
        />
        <div className="flex flex-col xs:flex-row xs:items-center items-start gap-3 w-full min-w-0 lg:w-auto">
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as UserStatusTab)}
            className="w-full xs:w-auto"
          >
            <TabsList>
              {STATUS_TABS.map(({ value, label }) => (
                <TabsTrigger key={value} value={value}>
                  {label} <TabsCount>{tabCounts[value]}</TabsCount>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {width < breakpoints.lg ? <UsersGrid {...listProps} /> : <UsersTable {...listProps} />}

      <UserSheet
        open={sheetOpen}
        user={editingUser}
        onClose={() => {
          setSheetOpen(false);
          setEditingUser(null);
        }}
        onSubmit={(values) => saveUser(values, editingUser)}
      />
    </div>
  );
}
