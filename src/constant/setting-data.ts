import { z } from "zod";

export const SETTINGS_TABS = [
  "Account Info",
  "Business Settings",
  "Security",
] as const;

export type SettingsTab = (typeof SETTINGS_TABS)[number];

export const settingsSearchSchema = z.object({
  tab: z.enum(SETTINGS_TABS).default("Account Info"),
});
