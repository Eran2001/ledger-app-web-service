import { z } from "zod";

interface WhatsAppTemplate {
  id: string;
  name: string;
  preview: string;
  active: boolean;
}

export const SETTINGS_TABS = [
  "Account Info",
  "Business Settings",
  "Notifications",
  "WhatsApp",
  "Security",
] as const;

export type SettingsTab = (typeof SETTINGS_TABS)[number];

export const settingsSearchSchema = z.object({
  tab: z.enum(SETTINGS_TABS).default("Business Settings"),
});

export const initialTemplates: WhatsAppTemplate[] = [
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
