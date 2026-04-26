import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, CheckCircle, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export const RegisterPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen surface-card">
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 surface-card">
        <div className="max-w-sm w-full">
          {!submitted ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-1 text-brand fw-semibold t-body mb-12 hover:-translate-x-1 transition-transform"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to sign in
              </button>

              <h2 className="t-kpi text-main">Request access</h2>
              <p className="t-body text-faint mt-2 mb-8">
                Submit your details. Admin will review and approve your account.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="t-body fw-medium text-soft">Full Name</label>
                  <Input placeholder="John Doe" required className="h-11 border-border" />
                </div>

                <div className="space-y-1.5">
                  <label className="t-body fw-medium text-soft">Email Address</label>
                  <Input type="email" placeholder="john@example.com" required className="h-11 border-border" />
                </div>

                <div className="space-y-1.5">
                  <label className="t-body fw-medium text-soft">Phone Number</label>
                  <Input placeholder="077-XXXXXXX" required className="h-11 border-border" />
                </div>

                <div className="space-y-1.5">
                  <label className="t-body fw-medium text-soft">Role Requested</label>
                  <Select required>
                    <SelectTrigger className="h-11 border-border">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STAFF">Staff Member</SelectItem>
                      <SelectItem value="VIEWER">Viewer Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="t-body fw-medium text-soft">Message (Optional)</label>
                  <Textarea
                    placeholder="Briefly describe your role at Silva Traders"
                    className="min-h-25 border-border"
                  />
                </div>

                <Button className="w-full h-12 surface-brand surface-brand-strong-hover mt-4">
                  Submit Request
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center align-text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 circle-rounded surface-success-soft flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-success-role" />
              </div>
              <h2 className="t-kpi text-main">Request submitted!</h2>
              <p className="t-body text-faint mt-3">
                Your request has been sent for review. You'll receive a setup email once the admin approves your account.
              </p>
              <Button
                variant="outline"
                className="mt-10 h-12 px-8 border-border"
                onClick={() => navigate('/login')}
              >
                Back to sign in
              </Button>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-border">
            <p className="t-body text-faint align-text-center">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="fw-semibold text-brand hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 auth-gradient px-16 py-20 flex-col justify-center">
        <h2 className="t-section text-inverse mb-8">How it works</h2>

        <div className="space-y-6">
          <div className="auth-glass-card backdrop-blur border modal-rounded p-6 flex items-start gap-5">
            <span className="t-hero fw-black text-inverse-faint">01</span>
            <div>
              <h4 className="text-inverse fw-semibold t-body">Submit your request</h4>
              <p className="text-inverse-muted t-body mt-1 leading-copy">Fill in your contact details and select the access level you need.</p>
            </div>
          </div>

          <div className="auth-glass-card backdrop-blur border modal-rounded p-6 flex items-start gap-5">
            <span className="t-hero fw-black text-inverse-faint">02</span>
            <div>
              <h4 className="text-inverse fw-semibold t-body">Admin reviews</h4>
              <p className="text-inverse-muted t-body mt-1 leading-copy">The application administrator reviews and approves your account request.</p>
            </div>
          </div>

          <div className="auth-glass-card backdrop-blur border modal-rounded p-6 flex items-start gap-5">
            <span className="t-hero fw-black text-inverse-faint">03</span>
            <div>
              <h4 className="text-inverse fw-semibold t-body">Check your email</h4>
              <p className="text-inverse-muted t-body mt-1 leading-copy">Once approved, you'll receive a secure link to set your password.</p>
            </div>
          </div>

          <div className="glass global-rounded p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-inverse-subtle" />
            <p className="text-inverse-subtle t-caption">Approval usually takes less than 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
