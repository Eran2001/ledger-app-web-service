import { CustomerInfoCard } from "@/components/shared/customer-info-card";

import { ProfileProps } from "@/types/customer-types";

export const CustomerProfileHeader = ({ customer }: ProfileProps) => {
  return (
    <CustomerInfoCard
      customer={customer}
      backTo="/customers"
      onEdit={() => {}}
      border
      shadow
    />
  );
};
