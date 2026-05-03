import { useState } from "react"
import { Link } from "react-router-dom"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SetupPasswordPage() {
  const [done, setDone] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setDone(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center auth-gradient p-6">
      <div className="w-full max-w-md surface-card auth-rounded p-8 sm:p-10 shadow-brand-soft">
        <div className="surface-brand-soft circle-rounded h-12 w-12 flex items-center justify-center mb-5">
          <ShieldCheck className="h-6 w-6 text-brand" />
        </div>

        {done ? (
          <>
            <h2 className="t-kpi text-main mb-2">Password updated</h2>
            <p className="t-body text-soft mb-6">Your new password is set. You can now sign in to your account.</p>
            <Link to="/login">
              <Button className="w-full h-12 surface-brand text-inverse btn-base control-rounded surface-brand-strong-hover">
                Continue to sign in
              </Button>
            </Link>
          </>
        ) : (
          <>
            <h2 className="t-kpi text-main mb-2">Set your password</h2>
            <p className="t-body text-soft mb-8">Choose a strong password with at least 8 characters.</p>

            <form onSubmit={submit} className="grid gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="t-meta-bold text-main">
                  New password
                </Label>
                <Input id="password" type="password" required className="h-11 control-rounded border-default" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm" className="t-meta-bold text-main">
                  Confirm password
                </Label>
                <Input id="confirm" type="password" required className="h-11 control-rounded border-default" />
              </div>
              <Button
                type="submit"
                className="w-full h-12 surface-brand text-inverse btn-base control-rounded surface-brand-strong-hover"
              >
                Save password
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
