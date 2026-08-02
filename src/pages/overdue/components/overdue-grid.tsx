import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";

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

import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";

import { overdueSeverity, type OverdueListProps } from "./overdue-list-types";

export function OverdueGrid({ rows, onRemind }: OverdueListProps) {
  if (rows.length === 0) {
    return (
      <Grid>
        <GridEmpty
          icon={Eye}
          title="No overdue payments"
          description="No overdue payments in this range."
          border
          shadow
        />
      </Grid>
    );
  }

  return (
    <Grid>
      {rows.map((row) => {
        const severity = overdueSeverity(row.daysOverdue);
        return (
          <GridItem key={row.scheduleId} border shadow className={severity.row}>
            <GridItemHeader>
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <InitialsAvatar name={row.customerName} />
                <div className="min-w-0">
                  <p className="table-title-text truncate">
                    {row.customerName}
                  </p>
                  <p className="t-label-sm text-faint font-mono">
                    {row.customerPhone}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="focus-visible:shadow-none"
                  >
                    <Icon.MoreHorizontal />
                    <span className="sr-only">
                      Actions for {row.customerName}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" border shadow>
                  <DropdownMenuItem onClick={() => onRemind(row.customerName)}>
                    <Icon.Bell /> Remind
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/sales/$id" params={{ id: row.saleId }}>
                      <Icon.Eye /> View
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </GridItemHeader>
            <GridItemBody className="grid-cols-2 *:justify-self-start">
              <span className="table-text">{row.productName}</span>
              <span className="table-text">{formatDate(row.dueDate)}</span>
              <span className={`fw-black ${severity.text}`}>
                {row.daysOverdue} days
              </span>
              <span className="table-title-text fw-bold">
                {formatCurrency(row.expectedAmount)}
              </span>
            </GridItemBody>
          </GridItem>
        );
      })}
    </Grid>
  );
}
