import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Card } from "@/components/ui/card";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { Button } from "@/components/ui/button";
import { StatInline, StatMeta } from "@/components/ui/stat";

import { useIsMobile } from "@/hooks/use-mobile";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  customer: {
    fullName: string;
    nic: string;
    primary_phone: string;
    secondary_phone?: string;
    email?: string;
    address: string;
    city: string;
    createdAt: string;
  };
};

export const CustomerProfileHeader = ({ customer }: Props) => {
  const navigate = useNavigate();
  const isMaxXs = useIsMobile(480);

  return (
    <Card className="overflow-hidden relative">
      <div
        className="surface-brand-soft absolute -top-12 -right-12 h-48 w-48 full-rounded opacity-60"
        aria-hidden
      />
      <div className="relative space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="link"
            size="sm"
            className="p-0 t-meta-bold group"
            onClick={() => navigate({ to: "/customers" })}
          >
            <Icon.ArrowLeft className="icon-back-hover" />
            Back to list
          </Button>

          <Button variant="link" size="icon" className="app-sidebar-icon-btn">
            <Icon.Edit />
          </Button>
        </div>

        <div className="flex flex-col gap-6 pb-2 xs:grid xs:grid-cols-[auto_1fr] xs:gap-6">
          {isMaxXs && (
            <div className="flex justify-center items-center">
              <h2 className="t-section text-main">{customer.fullName}</h2>
            </div>
          )}
          {isMaxXs ? (
            <div className="flex justify-center items-center">
              <InitialsAvatar
                name={customer.fullName}
                size={isMaxXs ? "lg" : "auto"}
              />
            </div>
          ) : (
            <InitialsAvatar
              name={customer.fullName}
              size={isMaxXs ? "lg" : "auto"}
            />
          )}
          <div className="min-w-0 flex flex-col space-y-1">
            {!isMaxXs && (
              <h2 className="t-section text-main">{customer.fullName}</h2>
            )}
            <div
              className={cn(
                "flex flex-wrap gap-x-4 gap-y-1",
                isMaxXs && "flex justify-center items-center",
              )}
            >
              <StatMeta label="NIC" value={customer.nic} />
              <StatMeta label="Phone" value={customer.primary_phone} />
              {customer.email && (
                <StatMeta label="Email" value={customer.email} />
              )}
            </div>
          </div>
        </div>

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
    </Card>
  );
};
