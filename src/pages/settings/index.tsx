import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { initialTemplates, SETTINGS_TABS } from "@/constant/setting-data";
import type { SettingsTab } from "@/constant/setting-data";

import { AccountInformation } from "./components/account-information";
import { BusinessInformation } from "./components/business-information";
import { WhatsAppPanel } from "./components/whatsapp-panel";
import { SecurityPanel } from "./components/security-panel";
import { NotificationAlert } from "./components/notification-alert";

function Settings() {
  const { tab } = useSearch({ from: "/shell/settings" });
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(initialTemplates);
  const [twoFA, setTwoFA] = useState(false);

  const handleTabChange = (nextTab: SettingsTab) => {
    navigate({ to: "/settings", search: { tab: nextTab }, replace: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1 surface-tab-list p-1 tab-rounded w-fit">
        {SETTINGS_TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => handleTabChange(t)}
              data-state={active ? "active" : "inactive"}
              className={`tabs-trigger px-3 py-1.5 tab-rounded ${
                active ? "surface-card text-main shadow-sm" : ""
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {tab === "Account Info" ? <AccountInformation /> : null}
      {tab === "Business Settings" ? <BusinessInformation /> : null}
      {tab === "Notifications" ? <NotificationAlert /> : null}
      {tab === "WhatsApp" ? (
        <WhatsAppPanel templates={templates} setTemplates={setTemplates} />
      ) : null}
      {tab === "Security" ? (
        <SecurityPanel twoFA={twoFA} setTwoFA={setTwoFA} />
      ) : null}
    </div>
  );
}

export default Settings;
