import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Card } from "@/components/ui/card";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { SyncedHeightPair } from "@/components/shared/synced-height-pair";
import { Button } from "@/components/ui/button";
import { StatInline, StatMeta } from "@/components/ui/stat";

import { useWidth } from "@/hooks/use-width";
import { formatDate } from "@/utils/format-date";
import { cn } from "@/lib/utils";
import { ProfileProps } from "@/types/customer-types";

export const CustomerProfileHeader = ({ customer }: ProfileProps) => {
  const navigate = useNavigate();
  const { width, breakpoints } = useWidth();
  const isMaxXs = width < breakpoints.xs;

  return (
    <Card className="p-0" border shadow>
      <div className="global-rounded overflow-hidden relative p-6">
        <div
          className="surface-brand-soft absolute -top-12 -right-12 h-48 w-48 full-rounded opacity-60"
          aria-hidden
        />
        <div className="relative space-y-6">
          <div className="flex justify-between items-center">
            <Button
              variant="link"
              className="p-0 t-body-md-bold group"
              onClick={() => navigate({ to: "/customers" })}
            >
              <Icon.ArrowLeft className="icon-back-hover" />
              Back to list
            </Button>

            <Button variant="link" size="icon" className="app-sidebar-icon-btn">
              <Icon.Edit />
            </Button>
          </div>

          {isMaxXs ? (
            <div className="flex flex-col gap-6 pb-2">
              <div className="flex justify-center items-center">
                <h2 className="t-title-xl text-main">{customer.fullName}</h2>
              </div>
              <div className="flex justify-center items-center">
                <InitialsAvatar name={customer.fullName} />
              </div>
              <div className="min-w-0 flex flex-col space-y-1">
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
                  <StatMeta label="NIC" value={customer.nic} />
                  <StatMeta label="Phone" value={customer.primary_phone} />
                  {customer.email && (
                    <StatMeta label="Email" value={customer.email} />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <SyncedHeightPair
              left={
                <InitialsAvatar
                  name={customer.fullName}
                  className="h-full w-full"
                />
              }
              right={
                <div className="min-w-0 flex flex-col space-y-1">
                  <h2 className="t-title-xl text-main">{customer.fullName}</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <StatMeta label="NIC" value={customer.nic} />
                    <StatMeta label="Phone" value={customer.primary_phone} />
                    {customer.email && (
                      <StatMeta label="Email" value={customer.email} />
                    )}
                  </div>
                </div>
              }
              squareLeft
              className="gap-6 pb-2"
            />
          )}

          <div
            className={cn(
              "grid grid-cols-[max-content_1fr] gap-x-3 gap-y-2 items-baseline",
              isMaxXs && "grid grid-cols-1 gap-3",
            )}
          >
            <StatInline label="Address" value={customer.address} />
            <StatInline label="City" value={customer.city} />
            {customer.secondary_phone && (
              <StatInline
                label="Secondary Phone"
                value={customer.secondary_phone}
              />
            )}
            <StatInline
              label="Customer Since"
              value={formatDate(customer.createdAt)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
