import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { StatPill } from "@/components/shared/stat-pill";
import { formatCurrency, formatDate } from "@/lib/utils";

type Props = {
  customer: {
    fullName: string;
    nic: string;
    phone: string;
    email?: string;
    address: string;
    createdAt: string;
  };
  stats: {
    activeSalesCount: number;
    outstanding: number;
  };
};

export default function CustomerProfileHeader({ customer, stats }: Props) {
  return (
    <div className="surface-card modal-rounded border border-default p-8 mb-8 shadow-sm overflow-hidden relative">
      <div
        className="surface-brand-soft absolute -top-12 -right-12 h-48 w-48 rounded-full opacity-60"
        aria-hidden
      />
      <div className="relative flex flex-col xl:flex-row gap-6 items-start xl:items-center">
        <div className="ring-4 ring-(--primary-light) circle-rounded shadow-brand-soft">
          <InitialsAvatar name={customer.fullName} size="lg" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="t-section text-main mb-1.5">{customer.fullName}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 t-meta text-soft mb-2">
            <span>
              <span className="text-faint mr-1">NIC</span>
              <span className="font-mono">{customer.nic}</span>
            </span>
            <span>
              <span className="text-faint mr-1">Phone</span>
              {customer.phone}
            </span>
            {customer.email && (
              <span>
                <span className="text-faint mr-1">Email</span>
                {customer.email}
              </span>
            )}
          </div>
          <p className="t-meta text-soft">{customer.address}</p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <StatPill label={`${stats.activeSalesCount} Active Sales`} color="indigo" />
          <StatPill label={`${formatCurrency(stats.outstanding)} Outstanding`} color="amber" />
          <StatPill label={`Since ${formatDate(customer.createdAt)}`} color="gray" />
        </div>
      </div>
    </div>
  );
}
