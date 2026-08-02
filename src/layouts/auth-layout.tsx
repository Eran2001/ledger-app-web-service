import { Suspense } from "react";
import { Outlet } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import * as Icon from "@/components/icons";

import {
  loginHeroFeatures,
  loginHeroSignal,
  loginHeroStats,
} from "@/constant/login-page-data";
import { useThemeStore } from "@/stores/theme-store";

export default function AuthLayout() {
  const SignalIcon = loginHeroSignal.icon;
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggle);

  return (
    <div className="flex h-full min-h-dvh flex-col overflow-y-auto surface-page lg:flex-row">
      <div className="auth-gradient hidden lg:flex w-[55%] relative overflow-hidden items-center justify-center p-10 text-inverse">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
          aria-hidden
        />
        <div
          className="absolute -bottom-24 -right-16 h-72 w-72 full-rounded bg-white/15 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute left-12 top-10 h-44 w-44 full-rounded bg-[rgba(255,255,255,0.08)] blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-xl">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center global-rounded bg-white/15 t-title-lg text-inverse">
              ST
            </div>
            <div>
              <p className="t-title-lg text-inverse">Silva Traders</p>
              <p className="t-body-md text-inverse-muted">Sales & collections workspace</p>
            </div>
          </div>
          <h2 className="t-display-2xl text-inverse text-balance mb-8">
            Run your business with confidence.
          </h2>
          <p className="t-title-lg text-inverse-muted mb-8 max-w-xl">
            Manage sales, installments, customer balances, and collections from one place.
          </p>

          <div className="glass global-rounded p-5 mb-4 shadow-brand-soft">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 global-rounded bg-[rgba(255,255,255,0.16)] flex items-center justify-center shrink-0">
                  <SignalIcon className="icon-large text-inverse" />
                </div>
                <div>
                  <p className="t-meta-bold text-inverse">
                    {loginHeroSignal.label}
                  </p>
                  <p className="t-caption text-inverse-muted">
                    Across active tenant workflows
                  </p>
                </div>
              </div>
              <p className="t-kpi text-inverse">{loginHeroSignal.value}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {loginHeroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="global-rounded border border-white/15 bg-white/10 p-3"
                >
                  <p className="t-title-lg text-inverse mb-1">{stat.value}</p>
                  <p className="t-micro text-inverse-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {loginHeroFeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                copy={feature.copy}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center p-6 sm:p-12 lg:w-[45%]">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="absolute right-4 top-4 app-sidebar-link app-sidebar-icon-btn sm:right-6 sm:top-6"
          aria-label="Toggle theme"
        >
          {isDark ? <Icon.Sun /> : <Icon.Moon />}
        </Button>
        <div className="w-full max-w-md">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  copy,
}: {
  icon: LucideIcon;
  title: string;
  copy: string;
}) {
  return (
    <div className="glass global-rounded p-4 flex items-start gap-4">
      <div className="h-10 w-10 global-rounded flex items-center justify-center shrink-0 bg-[rgba(255,255,255,0.16)]">
        <Icon className="icon-large text-inverse" />
      </div>
      <div>
        <p className="t-meta-bold text-inverse mb-1">{title}</p>
        <p className="t-caption text-inverse-muted">{copy}</p>
      </div>
    </div>
  );
}
