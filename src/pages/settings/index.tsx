import { useState } from "react";

import { initialTemplates } from "@/constant/setting-data";

import BusinessInformation from "./components/business-information";
import WhatsAppPanel from "./components/whatsapp-panel";
import SecurityPanel from "./components/security-panel";
import ProfilePage from "./components/account-information";
import NotificationAlert from "./components/notification-alert";

const TABS = [
  "Account Info",
  "Business Settings",
  "Notifications",
  "WhatsApp",
  "Security",
] as const;
type Tab = (typeof TABS)[number];

function Settings() {
  const [tab, setTab] = useState<Tab>("Business Settings");
  const [templates, setTemplates] = useState(initialTemplates);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1 surface-tab-list p-1 tab-rounded w-fit">
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
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

      {tab === "Account Info" ? <ProfilePage /> : null}
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
