import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center auth-gradient p-6 relative overflow-hidden">
      <div
        className="absolute -top-32 -right-20 h-96 w-96 rounded-full opacity-40 blur-3xl"
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

      <div className="relative w-full max-w-xl surface-card auth-rounded p-8 sm:p-10 shadow-brand-soft">
        <div className="flex items-center gap-3 mb-8">
          <div className="app-sidebar-logo h-10 w-10 global-rounded flex items-center justify-center sidebar-brand-logo">
            ST
          </div>
          <div>
            <p className="t-title-lg text-main">Silva Traders</p>
            <p className="t-label-md text-soft">Request Admin Panel Access</p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-10">
            <div className="surface-success-soft circle-rounded h-16 w-16 mx-auto flex items-center justify-center mb-5">
              <CheckCircle2
                className="h-8 w-8 text-success-role"
                strokeWidth={2}
              />
            </div>
            <h2 className="t-title-xl text-main mb-2">Request submitted</h2>
            <p className="t-body-lg text-soft mb-6 max-w-sm mx-auto">
              Your request has been submitted. Admin will review it shortly.
            </p>
            <Link to="/login" className="t-body-md-bold text-brand">
              ← Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h2 className="t-display-lg text-main mb-2">Request Access</h2>
            <p className="t-body-lg text-soft mb-8">
              Fill in your details and an administrator will review your
              request.
            </p>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="t-body-md-bold text-main">
                  Full name
                </Label>
                <Input
                  id="name"
                  required
                  className="h-11 control-rounded border-default"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="t-body-md-bold text-main">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="h-11 control-rounded border-default"
                    placeholder="you@example.lk"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone" className="t-body-md-bold text-main">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    required
                    className="h-11 control-rounded border-default"
                    placeholder="+94 77 123 4567"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="role" className="t-body-md-bold text-main">
                  Requested role
                </Label>
                <Select defaultValue="STAFF">
                  <SelectTrigger className="h-11 control-rounded border-default text-main">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STAFF">
                      STAFF — record sales and payments
                    </SelectItem>
                    <SelectItem value="VIEWER">
                      VIEWER — read-only access
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="t-body-md-bold text-main">
                  Message
                </Label>
                <Textarea
                  id="message"
                  required
                  className="control-rounded border-default min-h-28"
                  placeholder="Tell us about your role and why you need access."
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 surface-brand text-inverse btn-base control-rounded surface-brand-strong-hover"
              >
                Submit Request
              </Button>

              <p className="t-body-md text-soft text-center mt-2">
                Already have access?{" "}
                <Link to="/login" className="text-brand fw-bold">
                  Sign in
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
