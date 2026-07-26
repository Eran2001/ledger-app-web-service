// import { Suspense } from "react";
// import { Outlet } from "@tanstack/react-router";

// import { Loading } from "@/components/ui/loading";

// export default function AuthLayout() {
//   return (
//     <Suspense fallback={<Loading />}>
//       <Outlet />
//     </Suspense>
//   );
// }
import { Suspense } from "react";
import { Outlet } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

import { Loading } from "@/components/ui/loading";
import {
  loginHeroFeatures,
  loginHeroSignal,
  loginHeroStats,
} from "@/constant/login-page-data";

export default function AuthLayout() {
  const SignalIcon = loginHeroSignal.icon;

  return (
    <div className="flex h-full min-h-dvh flex-col overflow-y-auto surface-page lg:flex-row">
      <div className="hidden lg:flex w-[55%] relative overflow-hidden items-center justify-center p-10 text-inverse bg-[radial-gradient(circle_at_78%_88%,rgba(249,158,11,0.88)_0%,rgba(151,91,20,0.52)_28%,rgba(57,35,20,0.96)_68%),linear-gradient(145deg,#1f160f_0%,#4a2f19_54%,#9b5b12_100%)]">
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
          className="absolute -bottom-24 -right-16 h-72 w-72 full-rounded bg-[rgba(255,174,41,0.28)] blur-3xl"
          aria-hidden
        />
        <div
          className="absolute left-12 top-10 h-44 w-44 full-rounded bg-[rgba(255,255,255,0.08)] blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-xl">
          <h2 className="t-display-3xl text-inverse text-balance mb-8">
            Control every verification workflow from one workspace
          </h2>

          {/* <p className="t-body-lg text-inverse-muted mb-8 max-w-lg">
            Monitor customer and business verifications, tune workflow rules,
            and keep integrations healthy across every tenant environment.
          </p> */}

          <div className="glass global-rounded p-5 mb-4 shadow-brand-soft">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 global-rounded bg-[rgba(255,255,255,0.16)] flex items-center justify-center shrink-0">
                  <SignalIcon className="icon-large text-amber-300" />
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
              <p className="t-kpi text-amber-300">{loginHeroSignal.value}</p>
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

      <div className="flex flex-1 items-center justify-center p-6 sm:p-12 lg:w-[45%]">
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
        <Icon className="icon-large text-amber-300" />
      </div>
      <div>
        <p className="t-meta-bold text-inverse mb-1">{title}</p>
        <p className="t-caption text-inverse-muted">{copy}</p>
      </div>
    </div>
  );
}
