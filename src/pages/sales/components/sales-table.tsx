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
  TableCellProduct,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";

import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import type { SalesTableProps } from "@/types/sale-types";

export const SalesTable = ({ rows }: SalesTableProps) => {
  const navigate = useNavigate();

  return (
    <Table variant="main">
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Sold Price</TableHead>
          <TableHead>Outstanding</TableHead>
          <TableHead>Monthly</TableHead>
          <TableHead>Next Due</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="table-empty">
              No sales match your filters.
            </TableCell>
          </TableRow>
        ) : (
          rows.map(({ sale, stat, customer, product }) => (
            <TableRow
              key={sale.id}
              onClick={() =>
                navigate({ to: "/sales/$id", params: { id: sale.id } })
              }
            >
              <TableCell accentBar={stat.hasOverdue}>
                <TableCellMedia
                  name={customer?.fullName ?? ""}
                  title={customer?.fullName ?? ""}
                />
              </TableCell>
              <TableCell>
                <TableCellProduct
                  name={product?.name}
                  category={product?.category}
                />
              </TableCell>
              <TableCell>{formatCurrency(sale.soldPrice)}</TableCell>
              <TableCell>{formatCurrency(stat.outstanding)}</TableCell>
              <TableCell>{formatCurrency(sale.monthlyAmount)}</TableCell>
              <TableCell>{formatDate(stat.nextDue)}</TableCell>
              <TableCell>
                <StatusBadge
                  status={stat.hasOverdue ? "OVERDUE" : sale.status}
                />
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
                        navigate({
                          to: "/sales/$id",
                          params: { id: sale.id },
                        })
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
