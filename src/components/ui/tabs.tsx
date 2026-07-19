import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [pill, setPill] = React.useState({ left: 0, width: 0, ready: false });

  const updatePill = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>("[data-state=active]");
    if (!active) return;
    setPill({
      left: active.offsetLeft,
      width: active.offsetWidth,
      ready: true,
    });
  }, []);

  React.useEffect(() => {
    updatePill();
    const list = listRef.current;
    if (!list) return;
    const mo = new MutationObserver(updatePill);
    mo.observe(list, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-state"],
    });
    const ro = new ResizeObserver(updatePill);
    ro.observe(list);
    return () => {
      mo.disconnect();
      ro.disconnect();
    };
  }, [updatePill]);

  return (
    <div className="w-full min-w-0 overflow-x-auto hide-scrollbar">
      <TabsPrimitive.List
        ref={listRef}
        data-slot="tabs-list"
        className={cn(
          "relative inline-flex h-field w-fit items-center justify-center global-rounded tabs-list p-1",
          className,
        )}
        {...props}
      >
        <div
          aria-hidden
          className="tabs-slide-indicator global-rounded absolute top-1 bottom-1"
          style={{
            left: pill.left,
            width: pill.width,
            opacity: pill.ready ? 1 : 0,
          }}
        />
        {children}
      </TabsPrimitive.List>
    </div>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-tabs-trigger inline-flex h-full items-center justify-center gap-2 whitespace-nowrap cursor-pointer global-rounded px-4 t-body-md tabs-trigger",
        className,
      )}
      {...props}
    />
  );
}

function TabsCount({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tabs-count"
      className={cn(
        "t-label-md-bold pill-gray global-rounded px-1.5 py-0.5",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("mt-2 tabs-content", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsCount, TabsContent };
