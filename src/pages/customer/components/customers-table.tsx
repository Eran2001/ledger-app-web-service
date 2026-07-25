import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCellMedia,
} from "@/components/ui/table";
import {
  Grid,
  GridItem,
  GridItemHeader,
  GridItemBody,
  GridItemMedia,
  GridItemAction,
  GridEmpty,
} from "@/components/ui/grid";
import { StatusBadge } from "@/components/ui/status-badge";

import { useWidth } from "@/hooks/use-width";
import { formatCurrency } from "@/utils/format-currency";
import type { Customer } from "@/types/customer-types";
import type { customerStats } from "@/constant/customer-data";

type EnrichedCustomer = Customer &
  ReturnType<typeof customerStats> & {
    status: "ACTIVE" | "OVERDUE" | "COMPLETED";
  };

interface CustomersTableProps {
  rows: EnrichedCustomer[];
}

export const CustomersTable = ({ rows }: CustomersTableProps) => {
  const { width, breakpoints } = useWidth();
  const navigate = useNavigate();
  const isMaxLg = width < breakpoints.lg;

  if (isMaxLg) {
    if (rows.length === 0) {
      return (
        <Grid>
          <GridEmpty
            icon={Icon.Users}
            title="No customers found"
            description="No customers match your search or filter."
          />
        </Grid>
      );
    }

    return (
      <Grid>
        {rows.map((c) => (
          <GridItem
            key={c.id}
            border
            shadow
            className="cursor-pointer"
            onClick={() =>
              navigate({ to: "/customers/$id", params: { id: c.id } })
            }
          >
            <GridItemHeader>
              <GridItemMedia name={c.fullName} title={c.fullName} subtitle={c.city} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <GridItemAction
                    className="focus-visible:shadow-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon.MoreHorizontal />
                  </GridItemAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenuItem
                    onClick={() =>
                      navigate({ to: "/customers/$id", params: { id: c.id } })
                    }
                  >
                    <Icon.Eye /> View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </GridItemHeader>
            <GridItemBody>
              <span className="t-label-md text-faint">NIC Number</span>
              <span className="t-body-md-bold text-main">{c.nic}</span>
              <span className="t-label-md text-faint">Phone</span>
              <span className="t-body-md-bold text-main">
                {c.primary_phone}
              </span>
              <span className="t-label-md text-faint">Active Sales</span>
              <span className="t-body-md-bold text-main">
                {c.activeSalesCount}
              </span>
              <span className="t-label-md text-faint">Outstanding</span>
              <span className="t-body-md-bold text-main">
                {c.outstanding > 0 ? formatCurrency(c.outstanding) : "N/A"}
              </span>
              <span className="t-label-md text-faint">Status</span>
              <StatusBadge status={c.status} />
            </GridItemBody>
          </GridItem>
        ))}
      </Grid>
    );
  }

  return (
    <Table variant="main">
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>NIC Number</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Active Sales</TableHead>
          <TableHead>Outstanding</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="table-empty">
              No customers match your search or filter.
            </TableCell>
          </TableRow>
        ) : (
          rows.map((c) => (
            <TableRow
              key={c.id}
              onClick={() =>
                navigate({ to: "/customers/$id", params: { id: c.id } })
              }
            >
              <TableCell>
                <TableCellMedia
                  name={c.fullName}
                  title={c.fullName}
                  subtitle={c.city}
                />
              </TableCell>
              <TableCell>{c.nic}</TableCell>
              <TableCell>{c.primary_phone}</TableCell>
              <TableCell>{c.activeSalesCount}</TableCell>
              <TableCell>
                {c.outstanding > 0 ? (
                  <span>{formatCurrency(c.outstanding)}</span>
                ) : (
                  <span>N/A</span>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={c.status} />
              </TableCell>
              <TableCell>
                <div
                  className="flex items-center justify-end gap-2"
                  onClick={(event) => event.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="focus-visible:shadow-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon.MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenuItem
                        onClick={() =>
                          navigate({
                            to: "/customers/$id",
                            params: { id: c.id },
                          })
                        }
                      >
                        <Icon.Eye /> View
                      </DropdownMenuItem>
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
};
