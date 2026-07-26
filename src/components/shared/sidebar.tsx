import { useEffect } from "react";

import { useUIStore } from "@/stores/ui-store";
import { useWidth } from "@/hooks/use-width";
import { SidebarNav } from "./sidebar-nav";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggle = useUIStore((s) => s.toggleSidebar);
  const { width, breakpoints } = useWidth();

  useEffect(() => {
    if (width < breakpoints.lg && !collapsed) toggle();
  }, [width, breakpoints.lg, collapsed, toggle]);

  return (
    <div className="hidden lg:block shrink-0 h-screen sticky top-0">
      <SidebarNav collapsed={collapsed} onToggleCollapse={toggle} />
    </div>
  );
}

export function MobileSidebar() {
  const open = useUIStore((s) => s.mobileSidebarOpen);
  const setOpen = useUIStore((s) => s.setMobileSidebarOpen);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="p-0 w-full xs:max-w-72 app-sidebar"
        style={{
          borderColor:
            "color-mix(in srgb, var(--sidebar-border) 55%, var(--border-transparent))",
        }}
        aria-describedby={undefined}
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SidebarNav
          collapsed={false}
          onItemClick={() => setOpen(false)}
          showToggle={false}
          className="w-full"
        />
      </SheetContent>
    </Sheet>
  );
}
