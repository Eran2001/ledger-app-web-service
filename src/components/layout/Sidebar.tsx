import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  PlusCircle,
  Package,
  BarChart3,
  AlertTriangle,
  Settings,
  LogOut,
  UserCog,
  MousePointerClick,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { InitialsAvatar } from "../shared/InitialsAvatar";

const SidebarItem: React.FC<{
  to: string;
  icon: React.ElementType;
  label: string;
  end?: boolean;
}> = ({ to, icon: Icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all t-nav",
        isActive
          ? "bg-sidebar-accent backdrop-blur border-l-[3px] border-sidebar-primary text-sidebar-foreground pl-2.25"
          : "text-sidebar-foreground/50 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
      )
    }
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </NavLink>
);

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-55 bg-sidebar flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        <div className="bg-sidebar-primary text-sidebar-foreground w-8 h-8 flex items-center justify-center rounded-lg t-micro-bold shrink-0">
          ST
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="t-heading text-sidebar-foreground truncate leading-tight">
            Silva Traders
          </span>
          <span className="t-caption text-sidebar-foreground/50 truncate">
            Admin Panel
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-hidden p-3 space-y-1">
        <div className="label-caps-wide text-sidebar-foreground/30 px-3 py-2 mt-2">
          Main
        </div>
        <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarItem to="/customers" icon={Users} label="Customers" />
        <SidebarItem to="/sales" icon={ShoppingBag} label="Sales" end />
        <SidebarItem to="/sales/new" icon={PlusCircle} label="New Sale" />
        <SidebarItem to="/products" icon={Package} label="Products" />

        <div className="label-caps-wide text-sidebar-foreground/30 px-3 py-2 mt-4">
          Finance
        </div>
        <SidebarItem to="/reports" icon={BarChart3} label="Reports" />
        <SidebarItem to="/overdue" icon={AlertTriangle} label="Overdue" />

        <div className="label-caps-wide text-sidebar-foreground/30 px-3 py-2 mt-4">
          System
        </div>
        <SidebarItem to="/users" icon={UserCog} label="Users" />
        <SidebarItem to="/buttons" icon={MousePointerClick} label="Buttons" />
        <SidebarItem to="/settings" icon={Settings} label="Settings" />
      </nav>

      <div className="p-3 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent">
          <InitialsAvatar name={user?.name || ""} size="sm" />
          <div className="flex flex-col min-w-0 pr-2">
            <span className="t-caption text-sidebar-foreground truncate">
              {user?.name}
            </span>
            <span className="t-micro text-sidebar-foreground/50 truncate">
              {user?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
