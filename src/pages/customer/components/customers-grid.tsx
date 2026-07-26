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
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { formatCurrency } from "@/utils/format-currency";
import type {
  CustomersTableProps,
  EnrichedCustomer,
} from "@/types/customer-types";

const STATUS_ACCENT: Record<EnrichedCustomer["status"], GridItemAccentVariant> =
  {
    ACTIVE: "default",
    OVERDUE: "destructive",
    COMPLETED: "success",
  };

export const CustomersGrid = ({ rows }: CustomersTableProps) => {
  const navigate = useNavigate();

  return (
    <Grid>
      {rows.length === 0 ? (
        <GridEmpty
          icon={Icon.Users}
          title="No customers found"
          description="No customers match your search or filter."
          border
          shadow
        />
      ) : (
        rows.map((c) => (
          <GridItem
            key={c.id}
            border
            shadow
            accentVariant={STATUS_ACCENT[c.status]}
            className="cursor-pointer"
            onClick={() =>
              navigate({ to: "/customers/$id", params: { id: c.id } })
            }
          >
            <GridItemHeader>
              <GridItemMedia
                name={c.fullName}
                title={c.fullName}
                subtitle={c.city}
              />
              <StatusBadge status={c.status} />
            </GridItemHeader>
            <GridItemBody>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="t-body-md-bold text-main">{c.nic}</span>
                </TooltipTrigger>
                <TooltipContent>NIC Number</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="t-body-md-bold text-main">
                    {c.primary_phone}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Phone</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="t-body-md-bold text-main">
                    {c.activeSalesCount}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Active Sales</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="t-body-md-bold text-main">
                    {c.outstanding > 0 ? formatCurrency(c.outstanding) : "N/A"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Outstanding</TooltipContent>
              </Tooltip>
            </GridItemBody>
          </GridItem>
        ))
      )}
    </Grid>
  );
};
