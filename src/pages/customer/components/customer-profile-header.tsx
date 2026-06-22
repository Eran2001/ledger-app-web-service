import { Card } from "@/components/ui/card";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { StatPill } from "@/components/shared/stat-pill";

import { formatCurrency, formatDate } from "@/lib/utils";
import { Props } from "@/types/customer";

export const CustomerProfileHeader = ({ customer, stats }: Props) => {
  return (
    <Card className="p-6 overflow-hidden relative">
      <div
        className="surface-brand-soft absolute -top-12 -right-12 h-48 w-48 full-rounded opacity-60"
        aria-hidden
      />
      <div className="relative flex flex-col lg:flex-row gap-6 items-start lg:items-stretch">
        <div>
          <InitialsAvatar name={customer.fullName} size="auto" />
        </div>
        <div className="flex-1 min-w-0 xl:self-center space-y-1">
          <h2 className="t-section text-main">{customer.fullName}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 t-meta text-soft">
            <span>
              <span className="text-faint">NIC: </span>
              <span className="font-mono">{customer.nic}</span>
            </span>
            <span>
              <span className="text-faint">Phone: </span>
              {customer.phone}
            </span>
            {customer.email && (
              <span>
                <span className="text-faint">Email: </span>
                {customer.email}
              </span>
            )}
          </div>
          <p className="t-meta text-soft">{customer.address}</p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0 lg:self-center">
          <StatPill
            label={`${stats.activeSalesCount} Active Sales`}
            color="indigo"
          />
          <StatPill
            label={`${formatCurrency(stats.outstanding)} Outstanding`}
            color="amber"
          />
          <StatPill
            label={`Since ${formatDate(customer.createdAt)}`}
            color="gray"
          />
        </div>
      </div>
    </Card>
  );
};
