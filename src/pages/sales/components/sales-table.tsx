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
import { formatDate } from "@/utils/format-date";
import type { SalesTableProps } from "@/types/sale-types";

export const SalesTable = ({ rows }: SalesTableProps) => {
  const navigate = useNavigate();
  const { width, breakpoints } = useWidth();
  const isMaxLg = width < breakpoints.lg;

  if (isMaxLg) {
    if (rows.length === 0) {
      return (
        <Grid>
          <GridEmpty
            icon={Icon.ShoppingBag}
            title="No sales found"
            description="No sales match your filters."
          />
        </Grid>
      );
    }

    return (
      <Grid>
        {rows.map(({ sale, stat, customer, product }) => (
          <GridItem
            key={sale.id}
            border
            shadow
            className="cursor-pointer"
            onClick={() => navigate({ to: "/sales/$id", params: { id: sale.id } })}
          >
            <GridItemHeader>
              <GridItemMedia
                name={customer?.fullName ?? ""}
                title={customer?.fullName ?? ""}
                subtitle={product?.name}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <GridItemAction
                    className="focus-visible:shadow-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon.MoreVertical />
                  </GridItemAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenuItem
                    onClick={() =>
                      navigate({ to: "/sales/$id", params: { id: sale.id } })
                    }
                  >
                    <Icon.Eye /> View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </GridItemHeader>
            <GridItemBody>
              <span className="t-label-md text-faint">Sold Price</span>
              <span className="t-body-md-bold text-main">
                {formatCurrency(sale.soldPrice)}
              </span>
              <span className="t-label-md text-faint">Outstanding</span>
              <span className="t-body-md-bold text-main">
                {formatCurrency(stat.outstanding)}
              </span>
              <span className="t-label-md text-faint">Monthly</span>
              <span className="t-body-md-bold text-main">
                {formatCurrency(sale.monthlyAmount)}
              </span>
              <span className="t-label-md text-faint">Next Due</span>
              <span className="t-body-md-bold text-main">
                {formatDate(stat.nextDue)}
              </span>
              <span className="t-label-md text-faint">Status</span>
              <StatusBadge
                status={stat.hasOverdue ? "OVERDUE" : sale.status}
              />
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
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      className="focus-visible:shadow-none"
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
