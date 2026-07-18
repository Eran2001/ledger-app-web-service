import type { ReactNode } from "react";

import * as Icon from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
      <Block title="alert dialog">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete customer</Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete customer record?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The customer, linked sales, and
                related activity history will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                icon={<Icon.Trash2 />}
                text="Delete"
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Block>
    </div>
  );
}
