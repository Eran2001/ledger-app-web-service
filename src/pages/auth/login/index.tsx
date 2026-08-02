import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuthStore } from "@/stores/auth-store";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  return (
    <>
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="app-sidebar-logo flex h-10 w-10 items-center justify-center global-rounded sidebar-brand-logo">
          ST
        </div>
        <div>
          <p className="t-title-lg text-main">Silva Traders</p>
          <p className="t-label-md text-soft">Sales & collections</p>
        </div>
      </div>

      <h2 className="t-kpi-lg text-main mb-2 text-center">
        Welcome back
      </h2>
      <p className="t-body text-soft mb-8 text-center">
        Sign in to manage your sales, payments, and customer collections.
      </p>

      <form onSubmit={() => undefined} className="flex flex-col gap-5">
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
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="t-meta-bold text-main">
              Password
            </Label>
            <Link
              to="/forgot-password"
              className="group inline-flex items-center gap-2 text-brand btn-base btn-link"
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
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-main"
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? (
                <Icon.EyeOff className="icon-default" />
              ) : (
                <Icon.Eye className="icon-default" />
              )}
            </button>
          </div>
        </div>

        <Button type="submit">Sign in</Button>
      </form>

      {/* <p className="mt-8 t-meta text-soft text-center">
        Need access?{" "}
        <Link to="/register" className="text-brand fw-bold">
          Request access -&gt;
        </Link>
      </p> */}
    </>
  );
};

export default Login;
