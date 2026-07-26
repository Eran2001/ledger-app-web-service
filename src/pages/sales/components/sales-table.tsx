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
  TableEmpty,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";

import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import type { SalesTableProps } from "@/types/sale-types";

export const SalesTable = ({ rows }: SalesTableProps) => {
  const navigate = useNavigate();

  return (
    <Table variant="main" layout="fixed">
      <colgroup>
        <col className="w-[20%]" />
        <col className="w-[17%]" />
        <col className="w-[11%]" />
        <col className="w-[13%]" />
        <col className="w-[11%]" />
        <col className="w-[11%]" />
        <col className="w-[10%]" />
        <col className="w-[7%]" />
      </colgroup>
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
          <TableEmpty
            colSpan={8}
            icon={Icon.Users}
            title="No sales found"
            description="No sales match your search or filter."
          />
        ) : (
          rows.map(({ sale, stat, customer, product }) => (
            <TableRow
              key={sale.id}
              onClick={() =>
                navigate({ to: "/sales/$id", params: { id: sale.id } })
              }
            >
              <TableCell>
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
              <TableCell className="text-right">
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
                    border
                    shadow
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
