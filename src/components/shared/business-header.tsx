import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { useBusinessStore } from "@/stores/business-store";

interface BusinessHeaderProps {
  collapsed: boolean;
}

export function BusinessHeader({ collapsed }: BusinessHeaderProps) {
  const logoUrl = useBusinessStore((state) => state.logoUrl);

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 h-14 border-b-stroke border-r-stroke shrink-0",
        collapsed && "justify-center px-0",
      )}
      style={{
        borderColor:
          "color-mix(in srgb, var(--sidebar-border) 55%, var(--border-transparent))",
      }}
      >
      <Avatar>
        {logoUrl && <AvatarImage src={logoUrl} alt="Silva Traders logo" />}
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
