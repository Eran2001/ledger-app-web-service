import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface BusinessHeaderProps {
  collapsed: boolean;
}

export function BusinessHeader({ collapsed }: BusinessHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 h-16 border-b shrink-0",
        collapsed && "justify-center px-0",
      )}
      style={{ borderColor: "var(--sidebar-border)" }}
    >
      <Avatar>
        <AvatarFallback>ST</AvatarFallback>
      </Avatar>
      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <span className="sidebar-brand-name app-sidebar-text truncate">
            Silva Traders
          </span>
          <span className="sidebar-brand-sub app-sidebar-text-faint truncate">
            Admin Panel
          </span>
        </div>
      )}
    </div>
  );
}
