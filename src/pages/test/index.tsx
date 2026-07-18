import type { ReactNode } from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardEmpty,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Block title="card">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader border>
              <CardTitle icon={Icon.ChartColumn}>Quarterly Revenue</CardTitle>
              <CardDescription>
                Performance summary for the current reporting window.
              </CardDescription>
              <CardAction>
                <Button size="sm">Export</Button>
              </CardAction>
            </CardHeader>

            <CardContent className="space-y-4 px-6 pb-0">
              <div className="space-y-1">
                <p className="t-display-lg">$128,400</p>
                <p className="t-label-md text-faint">
                  Up 12% compared to last month
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="surface-muted global-rounded px-4 py-3">
                  <p className="t-label-sm text-faint">Paid invoices</p>
                  <p className="t-body-md-bold">342</p>
                </div>
                <div className="surface-muted global-rounded px-4 py-3">
                  <p className="t-label-sm text-faint">Average ticket</p>
                  <p className="t-body-md-bold">$375</p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="justify-between px-6 py-4">
              <p className="t-label-md text-faint">Updated 10 minutes ago</p>
              <Button variant="link" size="sm">
                Open report
              </Button>
            </CardFooter>
          </Card>

          <Card border shadow>
            <CardHeader border>
              <CardTitle>Empty State</CardTitle>
              <CardDescription>
                Example of the empty slot inside the shared card primitive.
              </CardDescription>
            </CardHeader>

            <CardEmpty
              icon={Icon.FileSearch}
              title="No reports found"
              description="Create a new report or adjust your current filters to see results here."
            />
          </Card>
        </div>
      </Block>
    </div>
  );
}
