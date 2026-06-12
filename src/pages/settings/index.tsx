import { useState } from "react";

import { TopBar } from "@/components/shared/top-bar";

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

interface WhatsAppTemplate {
  id: string;
  name: string;
  preview: string;
  active: boolean;
}

const initialTemplates: WhatsAppTemplate[] = [
  {
    id: "t1",
    name: "Payment Reminder",
    preview: "Hi {customer}, your installment of {amount} is due on {date}.",
    active: true,
  },
  {
    id: "t2",
    name: "Overdue Notice",
    preview:
      "Hi {customer}, your payment of {amount} is overdue by {days} days.",
    active: true,
  },
  {
    id: "t3",
    name: "Payment Confirmation",
    preview: "Thank you {customer}! We've received your payment of {amount}.",
    active: true,
  },
  {
    id: "t4",
    name: "Sale Completion",
    preview: "Congratulations {customer}! You've completed all installments.",
    active: false,
  },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("Business Settings");
  const [templates, setTemplates] =
    useState<WhatsAppTemplate[]>(initialTemplates);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Settings"
        pageSubtitle="Manage your business, integrations, and security"
      />
      <div className="p-6 overflow-y-auto space-y-6">
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
    </div>
  );
}
