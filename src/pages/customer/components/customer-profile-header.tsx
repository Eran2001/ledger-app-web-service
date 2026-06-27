import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Card } from "@/components/ui/card";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { Button } from "@/components/ui/button";
import { StatInline, StatMeta } from "@/components/ui/stat";

import { formatDate } from "@/lib/utils";

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

  return (
    <Card className="p-6 overflow-hidden relative">
      <div
        className="surface-brand-soft absolute -top-12 -right-12 h-48 w-48 full-rounded opacity-60"
        aria-hidden
      />
      <div className="relative space-y-4">
        <Button
          variant="link"
          size="sm"
          className="p-0 t-meta-bold group"
          onClick={() => navigate({ to: "/customers" })}
        >
          <Icon.ArrowLeft className="icon-back-hover" />
          Back to list
        </Button>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[auto_1fr] lg:gap-6">
          <InitialsAvatar name={customer.fullName} size="auto" />
          <div className="min-w-0 flex flex-col justify-center space-y-1">
            <h2 className="t-section text-main">{customer.fullName}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <StatMeta label="NIC" value={customer.nic} />
              <StatMeta label="Phone" value={customer.primary_phone} />
              {customer.email && (
                <StatMeta label="Email" value={customer.email} />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-2 items-baseline">
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
