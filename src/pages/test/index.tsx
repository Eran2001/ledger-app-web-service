import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { StatMeta } from "@/components/ui/stat";
import { SyncedHeightPair } from "@/components/shared/synced-height-pair";

import { TEST_CUSTOMER } from "@/constant/test-data";

const Test = () => {
  return (
    <div className="p-6">
      <SyncedHeightPair
        left={
          <InitialsAvatar
            name={TEST_CUSTOMER.fullName}
            className="h-full w-full"
          />
        }
        right={
          <div className="min-w-0 flex flex-col gap-1">
            <StatMeta label="NIC" value={TEST_CUSTOMER.nic} />
            <StatMeta label="Phone" value={TEST_CUSTOMER.primary_phone} />
            <StatMeta label="Email" value={TEST_CUSTOMER.email} />
          </div>
        }
        squareLeft
      />
    </div>
  );
};

export default Test;
