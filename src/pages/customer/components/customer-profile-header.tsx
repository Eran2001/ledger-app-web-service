import { Card } from "@/components/ui/card";
import { InitialsAvatar } from "@/components/shared/initials-avatar";

type Props = {
  customer: {
    fullName: string;
    nic: string;
    phone: string;
    email?: string;
    address: string;
  };
};

export const CustomerProfileHeader = ({ customer }: Props) => {
  return (
    <Card className="p-6 overflow-hidden relative">
      <div
        className="surface-brand-soft absolute -top-12 -right-12 h-48 w-48 full-rounded opacity-60"
        aria-hidden
      />
      <div className="relative flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        <div>
          <InitialsAvatar name={customer.fullName} size="auto" />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
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
      </div>
    </Card>
  );
};
