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
import { StatusBadge } from "@/components/shared/status-badge";

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
              <TableCell accentBar={c.hasOverdue}>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon.MoreVertical />
                    </Button>
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
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
