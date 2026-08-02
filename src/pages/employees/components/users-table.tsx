import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableCellMedia,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDate } from "@/utils/format-date";

import {
  rolePillClass,
  type UserListProps,
} from "../../../types/user-list-types";

export function UsersTable({
  rows,
  onApprove,
  onReject,
  onOpen,
}: UserListProps) {
  return (
    <Table variant="main" layout="fixed">
      <colgroup>
        <col className="w-[24%]" />
        <col className="w-[25%]" />
        <col className="w-[14%]" />
        <col className="w-[13%]" />
        <col className="w-[16%]" />
        <col className="w-[8%]" />
      </colgroup>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last activity</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableEmpty
            colSpan={6}
            icon={Icon.Users}
            title="No users found"
            description="No users match your search or status filter."
          />
        ) : (
          rows.map((user) => (
            <TableRow key={user.id} onClick={() => onOpen(user)}>
              <TableCell>
                <TableCellMedia
                  name={user.name}
                  title={user.name}
                  subtitle={user.phone}
                />
              </TableCell>
              <TableCell className="font-mono">{user.email}</TableCell>
              <TableCell>
                <span
                  className={`${rolePillClass(user.role)} t-label-md-bold global-rounded px-2.5 py-0.5`}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                <StatusBadge
                  status={
                    user.status === "pending"
                      ? "PENDING"
                      : user.status === "active"
                        ? "ACTIVE"
                        : "INACTIVE"
                  }
                />
              </TableCell>
              <TableCell>{formatDate(user.date)}</TableCell>
              <TableCell className="text-right">
                <div
                  className="flex items-center justify-end"
                  onClick={(event) => event.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="focus-visible:shadow-none"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Icon.MoreHorizontal />
                        <span className="sr-only">Actions for {user.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      onClick={(event) => event.stopPropagation()}
                      border
                      shadow
                    >
                      {user.status === "pending" ? (
                        <>
                          <DropdownMenuItem onClick={() => onApprove(user.id)}>
                            <Icon.Check /> Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onReject(user.id)}
                          >
                            <Icon.X /> Reject
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem onClick={() => onOpen(user)}>
                          <Icon.Edit /> Edit user
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
