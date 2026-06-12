import { useState } from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { Notification } from "@/utils/notification";

interface WhatsAppTemplate {
  id: string;
  name: string;
  preview: string;
  active: boolean;
}

export default function WhatsAppPanel({
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
          <Icon.MessageCircle className="h-5 w-5 text-success-role" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="t-display text-main flex items-center gap-2">
            WhatsApp Connected
            <Icon.CheckCircle2 className="h-4 w-4 text-success-role" />
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
