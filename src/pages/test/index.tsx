import type { ReactNode } from "react";

import { CardCaption } from "@/components/ui/card-caption";

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
      <Block title="card caption">
        <CardCaption
          title="Recent Reports"
          actionLabel="View all"
          actionTo="/reports"
          border
          shadow
        >
          <div className="space-y-0">
            <div className="flex items-center justify-between px-5 py-4 border-b-stroke border-default">
              <div className="space-y-1">
                <p className="t-body-md-bold">Revenue Summary</p>
                <p className="t-label-md text-faint">Updated 2 hours ago</p>
              </div>
              <p className="t-label-md-bold text-brand">Ready</p>
            </div>

            <div className="flex items-center justify-between px-5 py-4 border-b-stroke border-default">
              <div className="space-y-1">
                <p className="t-body-md-bold">Outstanding Invoices</p>
                <p className="t-label-md text-faint">
                  Needs review before export
                </p>
              </div>
              <p className="t-label-md-bold text-warning-role">Review</p>
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <div className="space-y-1">
                <p className="t-body-md-bold">Customer Aging</p>
                <p className="t-label-md text-faint">
                  Prepared for leadership sync
                </p>
              </div>
              <p className="t-label-md-bold text-success-role">Done</p>
            </div>
          </div>
        </CardCaption>
      </Block>
    </div>
  );
}
