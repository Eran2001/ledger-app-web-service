import React from "react";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export const UsersPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Users"
        pageSubtitle="Internal team members"
        primaryAction={
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        }
      />
      <div className="p-6 overflow-y-auto">
        <div className="surface-card card-rounded border border-border shadow-sm p-8 flex items-center justify-center min-h-64">
          <p className="t-body text-faint">Users management coming soon.</p>
        </div>
      </div>
    </div>
  );
};
