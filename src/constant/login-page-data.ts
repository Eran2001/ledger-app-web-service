import { type LucideIcon } from "lucide-react";

import * as Icon from "@/components/icons";

interface LoginHeroFeature {
  icon: LucideIcon;
  title: string;
  copy: string;
}

interface LoginHeroStat {
  label: string;
  value: string;
}

export const loginHeroStats: LoginHeroStat[] = [
  {
    label: "Active sales",
    value: "248",
  },
  {
    label: "Collected this month",
    value: "LKR 1.2M",
  },
  {
    label: "On-time payments",
    value: "96.8%",
  },
];

export const loginHeroFeatures: LoginHeroFeature[] = [
  {
    icon: Icon.ShieldCheck,
    title: "Stay on top of collections",
    copy: "See every sale, installment, and upcoming payment in one clear workspace.",
  },
  {
    icon: Icon.Workflow,
    title: "Follow up with confidence",
    copy: "Prioritize overdue customers and keep payment reminders moving.",
  },
];

export const loginHeroSignal = {
  icon: Icon.BarChart3,
  label: "Monthly collection growth",
  value: "+18.4%",
};
