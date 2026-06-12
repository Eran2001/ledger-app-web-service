import { useState } from "react";
import { CheckCircle2, MessageCircle, Save, Shield } from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Notification } from "@/utils/notification";

const TABS = ["Business Settings", "WhatsApp", "Security"] as const;
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

        {tab === "Business Settings" ? <BusinessForm /> : null}
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

function BusinessForm() {
  const [form, setForm] = useState({
    businessName: "Silva Traders",
    ownerName: "Kamal Silva",
    address: "No 45, Galle Road, Colombo 03",
    phone: "+94 11 234 5678",
    whatsapp: "+94 77 123 4567",
    email: "info@silvatraders.lk",
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    Notification.success("Business settings saved");
  }

  return (
    <form onSubmit={handleSave} className="card-base p-6 max-w-3xl">
      <h2 className="t-display text-main mb-1">Business Information</h2>
      <p className="t-caption text-soft mb-6">
        Used on receipts, reminders, and customer communications.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            value={form.ownerName}
            onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            rows={2}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input
            id="whatsapp"
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          className="surface-brand text-inverse surface-brand-strong-hover gap-2"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </form>
  );
}

function WhatsAppPanel({
  templates,
  setTemplates,
}: {
  templates: WhatsAppTemplate[];
  setTemplates: (t: WhatsAppTemplate[]) => void;
}) {
  function toggle(id: string) {
    setTemplates(
      templates.map((t) => (t.id === id ? { ...t, active: !t.active } : t)),
    );
    Notification.success("Template updated");
  }

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="card-base p-5 flex items-center gap-4">
        <div className="surface-success-soft circle-rounded h-10 w-10 flex items-center justify-center">
          <MessageCircle className="h-5 w-5 text-success-role" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="t-display text-main flex items-center gap-2">
            WhatsApp Connected
            <CheckCircle2 className="h-4 w-4 text-success-role" />
          </h2>
          <p className="t-caption text-soft">
            Connected to <span className="mono-text">+94 77 123 4567</span> ·
            Active templates will be used for reminders.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => Notification.success("Reconnecting...")}
        >
          Reconnect
        </Button>
      </div>

      <div className="card-base overflow-hidden">
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h2 className="t-display text-main">Message Templates</h2>
          <p className="t-caption text-soft">
            Toggle which templates are available for reminders.
          </p>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header text-left px-4 py-3">Template</th>
              <th className="table-header text-left px-4 py-3">Preview</th>
              <th className="table-header text-right px-4 py-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((t) => (
              <tr
                key={t.id}
                className="border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <td className="px-4 py-3 table-title-text">{t.name}</td>
                <td className="px-4 py-3 t-meta text-soft mono-text">
                  {t.preview}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <Switch
                      checked={t.active}
                      onCheckedChange={() => toggle(t.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SecurityPanel({
  twoFA,
  setTwoFA,
}: {
  twoFA: boolean;
  setTwoFA: (v: boolean) => void;
}) {
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });

  function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!pwd.current || !pwd.next) {
      Notification.error("Please complete all password fields");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      Notification.error("New passwords do not match");
      return;
    }
    setPwd({ current: "", next: "", confirm: "" });
    Notification.success("Password updated");
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <form onSubmit={changePassword} className="card-base p-6">
        <h2 className="t-display text-main mb-1">Change Password</h2>
        <p className="t-caption text-soft mb-6">
          Use at least 8 characters with a mix of letters and numbers.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current Password</Label>
            <Input
              id="current"
              type="password"
              value={pwd.current}
              onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="next">New Password</Label>
            <Input
              id="next"
              type="password"
              value={pwd.next}
              onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input
              id="confirm"
              type="password"
              value={pwd.confirm}
              onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            className="surface-brand text-inverse surface-brand-strong-hover gap-2"
          >
            <Save className="h-4 w-4" />
            Update Password
          </Button>
        </div>
      </form>

      <div className="card-base p-6 flex items-start gap-4">
        <div className="surface-brand-soft circle-rounded h-10 w-10 flex items-center justify-center shrink-0">
          <Shield className="h-5 w-5 text-brand" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="t-display text-main">Two-Factor Authentication</h2>
              <p className="t-caption text-soft mt-1 max-w-md">
                Add an extra layer of security by requiring a code from your
                authenticator app at sign in.
              </p>
            </div>
            <Switch
              checked={twoFA}
              onCheckedChange={(v) => {
                setTwoFA(v);
                Notification.success(v ? "2FA enabled" : "2FA disabled");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
