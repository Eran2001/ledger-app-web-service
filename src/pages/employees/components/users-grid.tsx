import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Grid,
  GridEmpty,
  GridItem,
  GridItemBody,
  GridItemHeader,
} from "@/components/ui/grid";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { StatusBadge } from "@/components/ui/status-badge";

import { formatDate } from "@/utils/format-date";

import {
  rolePillClass,
  type UserListProps,
} from "../../../types/user-list-types";

export function UsersGrid({
  rows,
  onApprove,
  onReject,
  onOpen,
}: UserListProps) {
  if (rows.length === 0) {
    return (
      <Grid>
        <GridEmpty
          icon={Icon.Users}
          title="No users found"
          description="No users match your search or status filter."
          border
          shadow
        />
      </Grid>
    );
  }

  return (
    <Grid>
      {rows.map((user) => (
        <GridItem key={user.id} border shadow className="cursor-pointer" onClick={() => onOpen(user)}>
          <GridItemHeader>
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <InitialsAvatar name={user.name} />
              <div className="min-w-0">
                <p className="table-title-text truncate">{user.name}</p>
                <p className="t-label-sm text-faint font-mono truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1" onClick={(event) => event.stopPropagation()}>
              <StatusBadge
                status={
                  user.status === "pending"
                    ? "PENDING"
                    : user.status === "active"
                      ? "ACTIVE"
                      : "INACTIVE"
                }
              />
              <UserActions
                user={user}
                onApprove={onApprove}
                onReject={onReject}
                onOpen={onOpen}
              />
            </div>
          </GridItemHeader>
          <GridItemBody className="grid-cols-2 [&>*]:justify-self-start">
            <span
              className={`${rolePillClass(user.role)} t-label-md-bold global-rounded px-2.5 py-0.5`}
            >
              {user.role}
            </span>
            <span className="table-text">{formatDate(user.date)}</span>
            {user.phone && (
              <span className="table-text font-mono">{user.phone}</span>
            )}
          </GridItemBody>
        </GridItem>
      ))}
    </Grid>
  );
}

function UserActions({
  user,
  onApprove,
  onReject,
  onOpen,
}: Pick<UserListProps, "onApprove" | "onReject" | "onOpen"> & {
  user: UserListProps["rows"][number];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="focus-visible:shadow-none"
        >
          <Icon.MoreHorizontal />
          <span className="sr-only">Actions for {user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" border shadow>
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
  );
}
