import {
  BarChart3,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

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
    label: "Sessions today",
    value: "1,284",
  },
  {
    label: "Completion rate",
    value: "96.8%",
  },
  {
    label: "Webhook health",
    value: "99.9%",
  },
];

export const loginHeroFeatures: LoginHeroFeature[] = [
  {
    icon: ShieldCheck,
    title: "Verification Sessions",
    copy: "Review KYC status, resubmissions, and customer verification outcomes in real time.",
  },
  {
    icon: Workflow,
    title: "Workflow Control",
    copy: "Configure tenant validation flows for documents, liveness, face match, and business checks.",
  },
];

export const loginHeroSignal = {
  icon: BarChart3,
  label: "Live verification volume",
  value: "+18.4%",
};
