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
import type { CustomersTableProps } from "@/types/customer-types";

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
        ))
      )}
    </Grid>
  );
};
