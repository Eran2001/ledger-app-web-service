import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SETTINGS_TABS, type SettingsTab } from "@/constant/setting-data";

import { AccountInformation } from "./components/account-information";
import { BusinessInformation } from "./components/business-information";
import { SecurityPanel } from "./components/security-panel";

export default function Settings() {
  const { tab } = useSearch({ from: "/shell/settings" });
  const navigate = useNavigate();
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="space-y-6">
      <Tabs
        value={tab}
        onValueChange={(value) =>
          navigate({
            to: "/settings",
            search: { tab: value as SettingsTab },
            replace: true,
          })
        }
        className="w-full"
      >
        <TabsList>
          {SETTINGS_TABS.map((value) => (
            <TabsTrigger key={value} value={value}>
              {value}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {tab === "Account Info" && <AccountInformation />}
      {tab === "Business Settings" && <BusinessInformation />}
      {tab === "Security" && <SecurityPanel twoFA={twoFA} setTwoFA={setTwoFA} />}
    </div>
  );
}
