import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

type TabsHeight = "default" | "compact" | "large";

const HeightContext = React.createContext<TabsHeight>("default");

function Tabs({
  className,
  height = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  height?: TabsHeight;
}) {
  return (
    <HeightContext.Provider value={height}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </HeightContext.Provider>
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const height = React.useContext(HeightContext);
  const listRef = React.useRef<HTMLDivElement>(null);
  const [pill, setPill] = React.useState({ left: 0, width: 0, ready: false });

  const updatePill = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>("[data-state=active]");
    if (!active) return;
    setPill({ left: active.offsetLeft, width: active.offsetWidth, ready: true });
  }, []);

  React.useEffect(() => {
    updatePill();
    const list = listRef.current;
    if (!list) return;
    const mo = new MutationObserver(updatePill);
    mo.observe(list, { attributes: true, subtree: true, attributeFilter: ["data-state"] });
    const ro = new ResizeObserver(updatePill);
    ro.observe(list);
    return () => {
      mo.disconnect();
      ro.disconnect();
    };
  }, [updatePill]);

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        "relative inline-flex w-fit items-center justify-center global-rounded tabs-list",
        height === "compact" ? "p-0.75" : height === "large" ? "p-1.5" : "p-1",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="tabs-slide-indicator"
        style={{
          left: pill.left,
          width: pill.width,
          opacity: pill.ready ? 1 : 0,
        }}
      />
      {children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const height = React.useContext(HeightContext);

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-tabs-trigger inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer global-rounded tabs-trigger",
        height === "compact" ? "px-3 py-1 t-caption" : height === "large" ? "px-5 py-2.5 t-body" : "px-4 py-1.5 t-meta",
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

export { Tabs, TabsList, TabsTrigger, TabsContent };
