import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, BarChart3, Bell, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { users } from "@/constant/dummy";

const FeatureCard: React.FC<{
  icon: React.ElementType;
  title: string;
  subtitle: string;
}> = ({ icon: Icon, title, subtitle }) => (
  <div className="auth-glass-panel backdrop-blur-md border global-rounded p-4 flex items-start gap-4 transition-transform hover:-translate-y-0.5 duration-200">
    <div className="w-10 h-10 global-rounded surface-brand-translucent flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-inverse" />
    </div>
    <div className="flex flex-col">
      <h4 className="text-inverse t-body fw-semibold leading-title">{title}</h4>
      <p className="text-inverse-muted t-caption mt-1 leading-copy">{subtitle}</p>
    </div>
  </div>
);

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("kamal@silvatraders.lk");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(users[0]);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen surface-card">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 surface-card">
        <div className="max-w-sm w-full">
          <div className="flex items-center gap-2 mb-12">
            <div className="surface-brand text-inverse px-2 py-1 global-rounded t-caption fw-bold">
              ST
            </div>
            <span className="t-section text-main">Silva Traders</span>
          </div>

          <div className="mb-8">
            <h2 className="t-kpi text-main">Welcome back</h2>
            <p className="t-body text-faint mt-2">
              Sign in to your admin panel to manage your business.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="t-body fw-medium text-soft">Email Address</label>
              <Input
                type="email"
                placeholder="kamal@silvatraders.lk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-border"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="t-body fw-medium text-soft">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="h-12 border-border pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-soft"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="t-caption fw-semibold text-brand hover:underline">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 surface-brand surface-brand-strong-hover text-inverse global-rounded fw-semibold transition-all shadow-lg shadow-brand-soft"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border align-text-center">
            <p className="t-body text-faint">
              Need access?{" "}
              <button
                onClick={() => navigate("/register")}
                className="fw-semibold text-brand hover:underline"
              >
                Request access →
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:flex flex-1 auth-gradient px-16 py-20 flex-col justify-center relative overflow-hidden">
        <div className="absolute -top-25 -right-25 w-64 h-64 auth-brand-glow circle-rounded blur-3xl"></div>
        <div className="absolute -bottom-25 -left-25 w-80 h-80 auth-brand-glow-alt circle-rounded blur-3xl"></div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="inline-flex items-center gap-2 glass circle-rounded px-4 py-2 t-micro fw-bold tracking-label text-inverse mb-8 border-glass-strong">
            <span className="w-2 h-2 circle-rounded surface-success animate-pulse"></span>
            SYSTEM OPERATIONAL
          </div>

          <h1 className="t-hero text-inverse leading-title mb-8">
            Manage your store's installment plans with confidence
          </h1>

          <div className="space-y-4 pr-12">
            <FeatureCard
              icon={BarChart3}
              title="Real-time Tracking"
              subtitle="Monitor installments and payments instantly across your entire customer base."
            />
            <FeatureCard
              icon={Bell}
              title="Smart Notifications"
              subtitle="Automated WhatsApp alerts sent on every payment and upcoming due date."
            />
            <FeatureCard
              icon={FileText}
              title="Complete Reports"
              subtitle="Detailed monthly collection rates and overdue analysis for better financial planning."
            />
          </div>
        </div>

        <div className="mt-auto relative z-10">
          <p className="text-inverse-faint t-micro mono-text">
            SILVA TRADERS v1.0.0 · © 2026 Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
};
