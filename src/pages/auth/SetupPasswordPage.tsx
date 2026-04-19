import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

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
  const strengthColor = strength === 1 ? 'bg-red-500' : strength === 2 ? 'bg-orange-500' : strength === 3 ? 'bg-yellow-500' : 'bg-green-500'

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E3A5F] items-center justify-center p-6">
      <div className="bg-white w-full max-w-[440px] rounded-3xl shadow-2xl p-8 lg:p-12 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 shadow-xl shadow-indigo-200">
            <ShieldCheck className="w-9 h-9 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Set up your password</h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed px-4">
            Hi Nadeeka, create a secure password to activate your account and start managing the store.
          </p>

          <div className="bg-indigo-50 text-primary px-4 py-1.5 rounded-lg text-sm font-semibold mt-6 mb-8 border border-indigo-100">
            nadeeka@silvatraders.lk
          </div>

          <form className="w-full space-y-5 text-left" onSubmit={(e) => {
            e.preventDefault()
            navigate('/login')
          }}>
            <div className="space-y-1.5">
              <Label className="text-slate-700">New Password</Label>
              <Input 
                type="password" 
                className="h-12 border-slate-200" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              
              <div className="mt-3">
                <div className="flex gap-1.5 h-1.5">
                  {[1, 2, 3, 4].map(i => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-slate-100'}`}
                    ></div>
                  ))}
                </div>
                <p className={`text-2xs font-bold uppercase tracking-wider mt-2 ${strength > 0 ? strengthColor.replace('bg-', 'text-') : 'text-slate-300'}`}>
                  {strengthText || 'Enter Password'}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-700">Confirm Password</Label>
              <div className="relative">
                <Input 
                  type="password" 
                  className="h-12 border-slate-200 pr-10" 
                  required
                />
                {password.length >= 8 && (
                   <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                   </div>
                )}
              </div>
            </div>

            <Button className="w-full h-12 bg-primary hover:bg-primary-dark mt-6 shadow-lg shadow-indigo-100">
              Activate Account
            </Button>

            <p className="text-center text-xxs text-slate-400 mt-4">
              Password must be at least 8 characters long and include numbers.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
