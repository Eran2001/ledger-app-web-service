import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { useAuthStore } from "@/stores/auth-store";
import { Notification } from "@/utils/notification";

export default function AccountInfoPage() {
  const user = useAuthStore((s) => s.user);

  const [form, setForm] = useState({
    name: user?.name ?? "Kamal Silva",
    email: user?.email ?? "kamal@silvatraders.lk",
    phone: "+94 77 123 4567",
  });

  function save(e: React.FormEvent) {
    e.preventDefault();
    Notification.success("Profile updated");
  }

  return (
    <div className="flex flex-col h-full surface-page">
      <div className="space-y-6">
        <div className="card-base p-6 flex items-center gap-5">
          <InitialsAvatar name={form.name} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="t-section text-main">{form.name}</h1>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="pill-indigo t-caption-bold px-2.5 py-0.5 global-rounded">
                {user?.role ?? "ADMIN"}
              </span>
              <span className="t-meta text-soft mono-text">{form.email}</span>
            </div>
          </div>
        </div>

        <form onSubmit={save} className="card-base p-6">
          <h2 className="t-display text-main mb-1">Account Details</h2>
          <p className="t-caption text-soft mb-6">
            Your basic profile information.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} disabled />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              className="surface-brand text-inverse surface-brand-strong-hover gap-2"
            >
              <Save className="h-4 w-4" />
              Save Profile
            </Button>
          </div>
        </form>

        <div
          className="card-base p-6"
          style={{
            borderColor:
              "color-mix(in srgb, var(--destructive) 30%, transparent)",
          }}
        >
          <h2 className="t-display text-danger mb-1">Danger Zone</h2>
          <p className="t-caption text-soft mb-4">
            Deleting your account is permanent and cannot be undone.
          </p>
          <Button
            variant="outline"
            onClick={() =>
              Notification.error("Account deletion is disabled in this demo")
            }
            className="text-danger gap-2"
            style={{ borderColor: "var(--destructive)" }}
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
