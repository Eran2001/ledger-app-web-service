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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { InitialsAvatar } from "../shared/InitialsAvatar";

const SidebarItem: React.FC<{
  to: string;
  icon: React.ElementType;
  label: string;
}> = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all text-sm",
        isActive
          ? "bg-white/8 backdrop-blur border-l-[3px] border-[#4F46E5] text-white pl-[9px]"
          : "text-[#94A3B8] hover:bg-white/5 hover:text-white",
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
    <aside className="w-[220px] bg-[#0F172A] flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-white/5 flex items-center gap-3">
        <div className="bg-[#4F46E5] text-white w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold shrink-0">
          ST
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-white text-sm font-semibold truncate leading-tight">
            Silva Traders
          </span>
          <span className="text-[#94A3B8] text-[11px] truncate">
            Admin Panel
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="text-[#475569] text-[10px] uppercase tracking-widest font-medium px-3 py-2 mt-2">
          Main
        </div>
        <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarItem to="/customers" icon={Users} label="Customers" />
        <SidebarItem to="/sales" icon={ShoppingBag} label="Sales" />
        <SidebarItem to="/sales/new" icon={PlusCircle} label="New Sale" />
        <SidebarItem to="/products" icon={Package} label="Products" />

        <div className="text-[#475569] text-[10px] uppercase tracking-widest font-medium px-3 py-2 mt-4">
          Finance
        </div>
        <SidebarItem to="/reports" icon={BarChart3} label="Reports" />
        <SidebarItem to="/overdue" icon={AlertTriangle} label="Overdue" />

        <div className="text-[#475569] text-[10px] uppercase tracking-widest font-medium px-3 py-2 mt-4">
          System
        </div>
        <SidebarItem to="/settings" icon={Settings} label="Settings" />
      </nav>

      <div className="p-3 border-t border-white/5 mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
          <InitialsAvatar name={user?.name || ""} size="sm" />
          <div className="flex flex-col min-w-0 pr-2">
            <span className="text-white text-[11px] font-medium truncate">
              {user?.name}
            </span>
            <span className="text-[#94A3B8] text-[10px] truncate">
              {user?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto text-[#475569] hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
