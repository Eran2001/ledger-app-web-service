import type { ReactNode } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    <div className="space-y-8">
      <Block title="alert">
        <Alert border shadow>
          <AlertTitle>Default alert</AlertTitle>
          <AlertDescription>
            Use this for general status and neutral informational messages.
          </AlertDescription>
        </Alert>

        <Alert variant="success">
          <AlertTitle>Payment collected</AlertTitle>
          <AlertDescription>
            The invoice was marked as paid and the customer balance is updated.
          </AlertDescription>
        </Alert>

        <Alert variant="info" border shadow>
          <AlertTitle>Sync in progress</AlertTitle>
          <AlertDescription>
            Ledger data is currently syncing from the external service.
          </AlertDescription>
        </Alert>

        <Alert variant="warning" border shadow>
          <AlertTitle>Verification pending</AlertTitle>
          <AlertDescription>
            Some customer details still need review before approval.
          </AlertDescription>
        </Alert>

        <Alert variant="destructive" border shadow>
          <AlertTitle>Delete failed</AlertTitle>
          <AlertDescription>
            The customer could not be removed because linked sales still exist.
          </AlertDescription>
        </Alert>
      </Block>
    </div>
  );
}
