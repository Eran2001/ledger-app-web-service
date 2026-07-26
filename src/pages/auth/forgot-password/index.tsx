import { useState } from "react";
import { Link } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h2 className="t-kpi-lg text-main">Reset Password</h2>
      <p className="t-body text-soft mb-8">
        Use your email to reset your password
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="t-meta-bold text-main">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 control-rounded surface-card border-default text-main"
            placeholder="Email Address"
            required
          />
        </div>

        <Button type="submit">Send recovery email</Button>

        <div className="flex items-center justify-center">
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 text-brand btn-base btn-link"
          >
            <Icon.ArrowLeft className="icon-default icon-back-hover" />
            Back to Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
