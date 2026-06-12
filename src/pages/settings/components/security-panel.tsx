import { useState } from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { Notification } from "@/utils/notification";

export default function SecurityPanel({
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
            <Icon.Save className="h-4 w-4" />
            Update Password
          </Button>
        </div>
      </form>

      <div className="card-base p-6 flex items-start gap-4">
        <div className="surface-brand-soft circle-rounded h-10 w-10 flex items-center justify-center shrink-0">
          <Icon.Shield className="h-5 w-5 text-brand" />
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
