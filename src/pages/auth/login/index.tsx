import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Eye,
  EyeOff,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth-store";
import { users } from "@/lib/dummy-data";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("kamal@silvatraders.lk");
  const [password, setPassword] = useState("admin123");
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      login(users[0]);
      navigate({ to: "/dashboard" });
    }, 400);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row surface-page">
      {/* LEFT: form panel */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-10">
            <div className="app-sidebar-logo h-10 w-10 global-rounded flex items-center justify-center sidebar-brand-logo">
              ST
            </div>
            <div>
              <p className="t-display text-main">Silva Traders</p>
              <p className="t-caption text-soft">Installment Management</p>
            </div>
          </div>

          <h2 className="t-kpi text-main mb-2">Welcome back</h2>
          <p className="t-body text-soft mb-8">
            Sign in to your admin panel to manage your business.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="t-meta-bold text-main">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 control-rounded surface-card border-default text-main"
                placeholder="you@silvatraders.lk"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="t-meta-bold text-main">
                  Password
                </Label>
                <Link
                  to="/setup-password"
                  className="t-caption-bold text-brand link-hover"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 control-rounded surface-card border-default pr-10 text-main"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-main"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-12 surface-brand text-inverse btn-base control-rounded surface-brand-strong-hover"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-8 t-meta text-soft text-center">
            Need access?{" "}
            <Link to="/register" className="text-brand fw-bold link-hover">
              Request access →
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT: hero gradient panel */}
      <div className="hidden lg:flex w-[55%] auth-gradient relative overflow-hidden items-center justify-center p-12">
        {/* Glows */}
        <div
          className="absolute -top-20 -right-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-lg">
          {/* Status pill */}
          <div className="glass inline-flex items-center gap-2 px-3 py-1.5 circle-rounded mb-8">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: "#22c55e" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: "#22c55e" }}
              />
            </span>
            <span className="t-micro-bold text-inverse case-upper tracking-label">
              System Operational
            </span>
          </div>

          <h2 className="t-hero text-inverse text-balanced mb-10 lh-tight">
            Manage your store&apos;s installment plans with confidence
          </h2>

          <div className="grid gap-4">
            <FeatureCard
              icon={BarChart3}
              title="Real-time Tracking"
              copy="Monitor installments and payments instantly across your entire customer base."
            />
            <FeatureCard
              icon={Bell}
              title="Smart Notifications"
              copy="Automated WhatsApp alerts sent on every payment and upcoming due date."
            />
            <FeatureCard
              icon={FileText}
              title="Complete Reports"
              copy="Detailed monthly collection rates and overdue analysis for better financial planning."
            />
          </div>
        </div>

        <p className="absolute bottom-6 left-12 mono-text t-micro text-inverse-faint case-upper tracking-label">
          SILVA TRADERS v1.0.0 · © 2026 Admin Panel
        </p>
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
    <div className="glass panel-rounded p-4 flex items-start gap-4">
      <div
        className="h-10 w-10 global-rounded flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
      >
        <Icon className="h-5 w-5 text-inverse" />
      </div>
      <div>
        <p className="t-meta-bold text-inverse mb-1">{title}</p>
        <p className="t-caption text-inverse-muted">{copy}</p>
      </div>
    </div>
  );
}
