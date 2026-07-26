import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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

import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import type { SalesTableProps } from "@/types/sale-types";

export const SalesGrid = ({ rows }: SalesTableProps) => {
  const navigate = useNavigate();

  if (rows.length === 0) {
    return (
      <Grid>
        <GridEmpty
          icon={Icon.ShoppingBag}
          title="No sales found"
          description="No sales match your filters."
          border
          shadow
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
          onClick={() =>
            navigate({ to: "/sales/$id", params: { id: sale.id } })
          }
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
            <StatusBadge status={stat.hasOverdue ? "OVERDUE" : sale.status} />
          </GridItemBody>
        </GridItem>
      ))}
    </Grid>
  );
};
