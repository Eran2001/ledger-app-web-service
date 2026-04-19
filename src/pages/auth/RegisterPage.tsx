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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 bg-white">
        <div className="max-w-sm w-full">
          {!submitted ? (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-1 text-[#4F46E5] font-semibold text-sm mb-12 hover:translate-x-[-4px] transition-transform"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to sign in
              </button>

              <h2 className="text-3xl font-bold text-[#0F172A]">Request access</h2>
              <p className="text-slate-500 mt-2 mb-8">Submit your details. Admin will review and approve your account.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <Input placeholder="John Doe" required className="h-11 border-slate-200" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <Input type="email" placeholder="john@example.com" required className="h-11 border-slate-200" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <Input placeholder="077-XXXXXXX" required className="h-11 border-slate-200" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Role Requested</label>
                  <Select required>
                    <SelectTrigger className="h-11 border-slate-200">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STAFF">Staff Member</SelectItem>
                      <SelectItem value="VIEWER">Viewer Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Message (Optional)</label>
                  <Textarea 
                    placeholder="Briefly describe your role at Silva Traders" 
                    className="min-h-[100px] border-slate-200"
                  />
                </div>

                <Button className="w-full h-12 bg-[#4F46E5] hover:bg-primary-dark mt-4">
                  Submit Request
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A]">Request submitted!</h2>
              <p className="text-slate-500 mt-3">
                Your request has been sent for review. You'll receive a setup email once the admin approves your account.
              </p>
              <Button 
                variant="outline" 
                className="mt-10 h-12 px-8 border-slate-200" 
                onClick={() => navigate('/login')}
              >
                Back to sign in
              </Button>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500 text-center">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="font-semibold text-[#4F46E5] hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E3A5F] px-16 py-20 flex-col justify-center">
        <h2 className="text-2xl font-bold text-white mb-8">How it works</h2>
        
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex items-start gap-5">
            <span className="text-4xl font-black text-white/20">01</span>
            <div>
              <h4 className="text-white font-semibold">Submit your request</h4>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">Fill in your contact details and select the access level you need.</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex items-start gap-5">
            <span className="text-4xl font-black text-white/20">02</span>
            <div>
              <h4 className="text-white font-semibold">Admin reviews</h4>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">The application administrator reviews and approves your account request.</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex items-start gap-5">
            <span className="text-4xl font-black text-white/20">03</span>
            <div>
              <h4 className="text-white font-semibold">Check your email</h4>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">Once approved, you'll receive a secure link to set your password.</p>
            </div>
          </div>

          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-white/40" />
            <p className="text-white/40 text-xs ">Approval usually takes less than 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
