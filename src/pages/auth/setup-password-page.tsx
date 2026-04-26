import React, { useState } from 'react'
import * as Icon from "@/components/icons";
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export const SetupPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const getStrength = () => {
    if (password.length === 0) return 0
    if (password.length < 4) return 1
    if (password.length < 7) return 2
    if (password.length < 10) return 3
    return 4
  }

  const strength = getStrength()
  const strengthText = strength === 0 ? '' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'
  const strengthColor = strength === 1 ? 'surface-danger' : strength === 2 ? 'surface-warning' : strength === 3 ? 'surface-warning-mid' : 'surface-success'
  const strengthTextColor = strength === 1 ? 'text-danger' : strength === 2 ? 'text-warning' : strength === 3 ? 'text-warning-mid' : 'text-success-role'

  return (
    <div className="flex min-h-screen auth-gradient items-center justify-center p-6">
      <div className="surface-card w-full max-w-110 auth-rounded shadow-2xl p-8 lg:p-12 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center align-text-center">
          <div className="w-16 h-16 circle-rounded surface-brand flex items-center justify-center mb-6 shadow-xl shadow-brand">
            <Icon.ShieldCheck className="w-9 h-9 text-inverse" />
          </div>

          <h2 className="t-kpi text-main">Set up your password</h2>
          <p className="t-body text-faint mt-2 leading-copy px-4">
            Hi Nadeeka, create a secure password to activate your account and start managing the store.
          </p>

          <div className="surface-brand-soft text-brand px-4 py-1.5 global-rounded t-body fw-semibold mt-6 mb-8 border border-brand-soft">
            nadeeka@silvatraders.lk
          </div>

          <form
            className="w-full space-y-5 align-text-left"
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/login')
            }}
          >
            <div className="space-y-1.5">
              <Label className="t-body text-soft">New Password</Label>
              <Input
                type="password"
                className="h-12 border-border"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />

              <div className="mt-3">
                <div className="flex gap-1.5 h-1.5">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className={cn(
                        'flex-1 circle-rounded transition-all duration-300',
                        i <= strength ? strengthColor : 'surface-border'
                      )}
                    />
                  ))}
                </div>
                <p className={cn('t-micro fw-bold case-upper tracking-label mt-2', strength > 0 ? strengthTextColor : 'text-faint')}>
                  {strengthText || 'Enter Password'}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="t-body text-soft">Confirm Password</Label>
              <div className="relative">
                <Input
                  type="password"
                  className="h-12 border-border pr-10"
                  required
                />
                {password.length >= 8 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon.CheckCircle className="w-5 h-5 text-success-role" />
                  </div>
                )}
              </div>
            </div>

            <Button className="w-full h-12 surface-brand surface-brand-strong-hover mt-6 shadow-lg shadow-brand-soft">
              Activate Account
            </Button>

            <p className="align-text-center t-micro text-faint mt-4">
              Password must be at least 8 characters long and include numbers.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
