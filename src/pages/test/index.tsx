import type { ReactNode } from "react";

import { CustomToast } from "@/components/ui/custom-toast";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="t-label-sm-bold text-faint text-uppercase tracking-label">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function Test() {
  return (
    <div className="space-y-8 p-6">
      <Block title="custom toast">
        <div className="flex flex-col gap-4">
          <CustomToast id="toast-success" message="Invoice marked as paid." variant="success" />
          <CustomToast id="toast-info" message="Customer profile updated." variant="info" />
          <CustomToast id="toast-warning" message="Payment reminder queued." variant="warning" />
          <CustomToast id="toast-error" message="Unable to save product details." variant="destructive" />
        </div>
      </Block>
    </div>
  );
}
