import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const ProgressContext = React.createContext<{ value: number }>({ value: 0 });

function ProgressTrack({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const resolvedValue = Math.max(0, Math.min(100, value ?? 0));

  return (
    <ProgressPrimitive.Root
      data-slot="progress-track"
      className={cn(
        "relative h-progress w-full overflow-hidden",
        "full-rounded progress-root",
        className,
      )}
      value={resolvedValue}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full progress-indicator"
        style={{ width: `${resolvedValue}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

function Progress({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const resolvedValue = Math.max(0, Math.min(100, value ?? 0));

  if (!children) {
    return (
      <ProgressTrack
        data-slot="progress"
        className={className}
        value={resolvedValue}
        {...props}
      />
    );
  }

  return (
    <ProgressContext.Provider value={{ value: resolvedValue }}>
      <div
        data-slot="progress"
        className={cn("flex w-full flex-col gap-2.5", className)}
      >
        <div className="flex items-baseline justify-between gap-3">
          {children}
        </div>
        <ProgressTrack value={resolvedValue} {...props} />
      </div>
    </ProgressContext.Provider>
  );
}

function ProgressLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="progress-label"
      className={cn("t-body-md-bold text-main", className)}
      {...props}
    />
  );
}

function ProgressValue({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const { value } = React.useContext(ProgressContext);

  return (
    <span
      data-slot="progress-value"
      className={cn("t-body-md text-faint", className)}
      {...props}
    >
      {children ?? `${value}%`}
    </span>
  );
}

export { Progress, ProgressLabel, ProgressValue };
