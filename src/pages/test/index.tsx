import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8">
      <Block title="sheet">
        <div className="surface-card global-rounded flex max-w-xl flex-col gap-5 p-5">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button>Open sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Customer summary</SheetTitle>
                <SheetDescription>
                  Review recent invoice activity, payment velocity, and follow-up
                  notes in a compact side panel.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-4 px-4">
                <div className="space-y-1">
                  <p className="t-label-sm-bold text-faint text-uppercase tracking-label">
                    Open invoices
                  </p>
                  <p className="t-body-md">18 active records need review.</p>
                </div>
                <div className="space-y-1">
                  <p className="t-label-sm-bold text-faint text-uppercase tracking-label">
                    Payment velocity
                  </p>
                  <p className="t-body-md">
                    Average settlement time is 12 days this month.
                  </p>
                </div>
              </div>

              <SheetFooter>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Close panel
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </Block>
    </div>
  );
}
