import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

function NotificationDot({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="notification-dot"
      className={cn(
        "notification-dot full-rounded absolute top-1.5 right-1.5 h-2.5 w-2.5",
        className,
      )}
      {...props}
    />
  );
}

export { NotificationDot };
