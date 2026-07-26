import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import {
  Grid,
  GridItem,
  GridItemHeader,
  GridItemBody,
  GridItemMedia,
  GridEmpty,
  type GridItemAccentVariant,
} from "@/components/ui/grid";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import type { SalesTableProps } from "@/types/sale-types";

const STATUS_ACCENT: Record<
  "ACTIVE" | "OVERDUE" | "COMPLETED" | "WRITTEN_OFF",
  GridItemAccentVariant
> = {
  ACTIVE: "default",
  OVERDUE: "destructive",
  COMPLETED: "success",
  WRITTEN_OFF: "secondary",
};

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
      {rows.map(({ sale, stat, customer, product }) => {
        const status = stat.hasOverdue ? "OVERDUE" : sale.status;

        return (
          <GridItem
            key={sale.id}
            border
            shadow
            accentVariant={STATUS_ACCENT[status]}
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
              <StatusBadge status={status} />
            </GridItemHeader>
            <GridItemBody>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="t-body-md-bold text-main">
                    {formatCurrency(sale.soldPrice)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Sold Price</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="t-body-md-bold text-main">
                    {formatCurrency(stat.outstanding)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Outstanding</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="t-body-md-bold text-main">
                    {formatCurrency(sale.monthlyAmount)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Monthly</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="t-body-md-bold text-main">
                    {formatDate(stat.nextDue)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Next Due</TooltipContent>
              </Tooltip>
            </GridItemBody>
          </GridItem>
        );
      })}
    </Grid>
  );
};
