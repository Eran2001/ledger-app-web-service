
import { useUIStore } from "@/store/ui-store"
import { SidebarNav } from "./sidebar-nav"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const toggle = useUIStore((s) => s.toggleSidebar)
  return (
    <div className="hidden lg:block shrink-0 self-stretch">
      <SidebarNav collapsed={collapsed} onToggleCollapse={toggle} />
    </div>
  )
}

export function MobileSidebar() {
  const open = useUIStore((s) => s.mobileSidebarOpen)
  const setOpen = useUIStore((s) => s.setMobileSidebarOpen)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="p-0 w-72 app-sidebar"
        style={{ borderColor: "var(--sidebar-border)" }}
        aria-label="Mobile navigation"
      >
        <SidebarNav collapsed={false} onItemClick={() => setOpen(false)} showToggle={false} />
      </SheetContent>
    </Sheet>
  )
}
