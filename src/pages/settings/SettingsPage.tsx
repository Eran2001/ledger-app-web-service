import React, { useState } from 'react'
import { 
  Users, 
  MessageCircle, 
  Building2, 
  Plus, 
  Edit2, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Upload,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react'
import { Topbar } from '@/components/layout/Topbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { InitialsAvatar } from '@/components/shared/InitialsAvatar'
import { cn } from '@/lib/utils'
import { users, pendingRegistrations } from '@/data/dummy'

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'whatsapp' | 'business'>('users')

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <Topbar 
        pageTitle="Settings" 
        pageSubtitle="System configuration" 
      />

      <div className="p-6 overflow-y-auto">
        {/* Sub-tabs */}
        <div className="border-b border-[#E2E8F0] mb-8 flex gap-10 px-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'users', label: 'Users & Roles', icon: Users },
            { id: 'whatsapp', label: 'WhatsApp API', icon: MessageCircle },
            { id: 'business', label: 'Business Info', icon: Building2 },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "pb-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap",
                activeTab === tab.id 
                    ? "border-[#4F46E5] text-[#4F46E5]" 
                    : "border-transparent text-[#94A3B8] hover:text-[#475569]"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'users' && (
           <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 animate-in fade-in duration-300">
               {/* Team Members */}
               <div className="xl:col-span-3 space-y-8">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
                            <h3 className="font-bold text-[#0F172A]">Team Members</h3>
                            <Button variant="outline" className="h-9 border-[#4F46E5] text-[#4F46E5] font-bold text-xs hover:bg-[#EEF2FF]">
                                <Plus className="w-3.5 h-3.5 mr-1" />
                                Invite User
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#F8FAFC] text-[10px] text-[#475569] uppercase tracking-wider font-bold">
                                    <tr>
                                        <th className="px-5 py-4 border-b">Member</th>
                                        <th className="px-5 py-4 border-b">Role</th>
                                        <th className="px-5 py-4 border-b">Last Login</th>
                                        <th className="px-5 py-4 border-b">Status</th>
                                        <th className="px-5 py-4 border-b text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E2E8F0]">
                                    {users.map(u => (
                                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <InitialsAvatar name={u.name} size="sm" />
                                                    <div className="flex flex-col overflow-hidden">
                                                        <span className="text-sm font-bold text-[#0F172A] truncate leading-tight">{u.name}</span>
                                                        <span className="text-[10px] text-[#94A3B8] truncate">{u.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-widest",
                                                    u.role === 'ADMIN' ? "bg-indigo-50 text-indigo-600" :
                                                    u.role === 'STAFF' ? "bg-purple-50 text-purple-600" : "bg-slate-100 text-slate-500"
                                                )}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-[11px] font-medium text-[#475569]">
                                                {u.lastLogin}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5 font-bold text-[10px] text-green-600 uppercase tracking-tighter">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                    Active
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <button className="text-slate-400 hover:text-[#4F46E5] transition-colors p-1">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pending Approvals */}
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-[#0F172A]">Pending Approvals</h3>
                            <div className="bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-amber-100 shadow-sm animate-pulse">
                                <AlertCircle className="w-3 h-3" />
                                {pendingRegistrations.length} Requests Pending
                            </div>
                        </div>

                        <div className="space-y-4">
                            {pendingRegistrations.map((p) => (
                                <div key={p.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-[#4F46E5] hover:bg-indigo-50/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#4F46E5] font-black italic shadow-inner">
                                            {p.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-[#0F172A]">{p.name}</span>
                                                <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-bold uppercase tracking-tighter shadow-sm">{p.requestedRole}</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                                                <span className="text-[11px] text-[#475569] flex items-center gap-1 font-medium"><Mail className="w-3 h-3 text-slate-400" /> {p.email}</span>
                                                <span className="text-[11px] text-[#475569] flex items-center gap-1 font-medium"><Clock className="w-3 h-3 text-slate-400" /> {p.requestedAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <Button className="h-8 px-4 bg-green-500 hover:bg-green-600 text-[11px] font-bold rounded-lg shadow-sm shadow-green-100">Approve</Button>
                                        <Button variant="outline" className="h-8 px-4 border-slate-200 text-red-500 hover:bg-red-50 text-[11px] font-bold rounded-lg">Reject</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
               </div>

               {/* Role Permissions */}
               <div className="xl:col-span-2">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 h-full">
                        <h3 className="font-bold text-[#0F172A] mb-6">Role Permissions</h3>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="py-3 text-[10px] uppercase font-black tracking-widest text-[#94A3B8]">Permission</th>
                                        <th className="py-3 px-2 text-center text-[10px] uppercase font-black tracking-widest text-indigo-500 bg-indigo-50/50 rounded-t-lg">Admin</th>
                                        <th className="py-3 px-2 text-center text-[10px] uppercase font-black tracking-widest text-purple-500">Staff</th>
                                        <th className="py-3 px-2 text-center text-[10px] uppercase font-black tracking-widest text-slate-400">View</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { p: 'Dashboard Access', a: true, s: true, v: true },
                                        { p: 'Manage Customers', a: true, s: true, v: false },
                                        { p: 'Manage Sales', a: true, s: true, v: false },
                                        { p: 'Record Payment', a: true, s: true, v: false },
                                        { p: 'View Reports', a: true, s: false, v: true },
                                        { p: 'Manage Products', a: true, s: false, v: false },
                                        { p: 'System Settings', a: true, s: false, v: false },
                                        { p: 'User Management', a: true, s: false, v: false },
                                    ].map((perm, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-3 text-xs font-bold text-[#475569]">{perm.p}</td>
                                            <td className="py-3 px-2 text-center bg-indigo-50/20">{perm.a ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                                            <td className="py-3 px-2 text-center">{perm.s ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                                            <td className="py-3 px-2 text-center">{perm.v ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
               </div>
           </div>
        )}

        {activeTab === 'whatsapp' && (
           <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
               {/* Connection Card */}
               <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                       <div className="flex items-center gap-6">
                           <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 group relative shadow-inner overflow-hidden">
                               <MessageCircle className="w-8 h-8 relative z-10" />
                               <div className="absolute inset-0 bg-green-100/50 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                           </div>
                           <div className="flex flex-col">
                               <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg text-[#0F172A]">WhatsApp Business API</h3>
                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-200">Connected</span>
                               </div>
                               <p className="text-sm font-medium text-[#475569] mt-0.5">+94 77 456 7890</p>
                               <span className="text-xs text-[#94A3B8] font-bold uppercase tracking-tight">Active since Jan 2026</span>
                           </div>
                       </div>
                       <Button variant="outline" className="h-10 border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 font-bold whitespace-nowrap">Disconnect Integration</Button>
                   </div>
               </div>

               {/* Templates */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Payment Confirmation', text: 'Dear {customer_name}, your payment of LKR {amount} for {product_name} (Installment {month}/{total}) has been recorded. Thank you! — Silva Traders' },
                    { title: 'Payment Reminder', text: 'Dear {customer_name}, your installment of LKR {amount} for {product_name} was due on {due_date}. Please visit our store. — Silva Traders' },
                  ].map((t, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-[#0F172A] text-sm">{t.title}</h4>
                            <Button variant="ghost" size="sm" className="h-8 text-[#4F46E5] font-bold hover:bg-indigo-50">Edit</Button>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50 flex flex-col flex-1">
                            <p className="text-xs text-[#475569] leading-relaxed font-mono whitespace-pre-wrap flex-1">{t.text}</p>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Template</span>
                            </div>
                        </div>
                    </div>
                  ))}
               </div>

               {/* Test Message */}
               <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
                    <h3 className="font-bold text-[#0F172A] mb-4">Send Test Message</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                         <div className="relative flex-1">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input placeholder="+94 77 XXX XXXX" className="pl-10 h-12 border-slate-200" />
                         </div>
                         <Button className="bg-[#4F46E5] hover:bg-primary-dark h-12 px-8 font-bold shadow-lg shadow-indigo-100">Send Test</Button>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-3 italic">This uses your actual Business API credit. Make sure the number is valid.</p>
               </div>
           </div>
        )}

        {activeTab === 'business' && (
           <div className="max-w-2xl animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-24 h-24 rounded-3xl bg-[#EEF2FF] border-2 border-dashed border-[#4F46E5]/40 flex flex-col items-center justify-center cursor-pointer group hover:bg-[#EEF2FF]/80 transition-all shadow-xl shadow-indigo-50/50">
                            <span className="text-3xl font-black text-[#4F46E5] italic">ST</span>
                            <div className="absolute inset-0 flex items-center justify-center bg-[#4F46E5]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                                <Upload className="w-6 h-6 text-[#4F46E5]" />
                            </div>
                        </div>
                        <h4 className="mt-4 font-bold text-slate-700">Logo Upload</h4>
                        <p className="text-[11px] text-[#94A3B8] font-medium">Click to upload brand logo</p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Store Name</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input defaultValue="Silva Traders" className="h-11 pl-10 border-slate-200" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Business Owner</label>
                                <div className="relative">
                                    <InitialsAvatar name="Kamal Silva" size="sm" className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 text-[8px]" />
                                    <Input defaultValue="Kamal Silva" className="h-11 pl-10 border-slate-200" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input defaultValue="info@silvatraders.lk" className="h-11 pl-10 border-slate-200" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input defaultValue="+94 37 222 3456" className="h-11 pl-10 border-slate-200" />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Store Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Textarea defaultValue="45 Kandy Road, Kurunegala" className="min-h-[80px] pl-10 border-slate-200 resize-none pt-2.5" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50 flex justify-end">
                            <Button className="bg-[#4F46E5] hover:bg-primary-dark px-10 h-12 font-bold shadow-lg shadow-indigo-100">Save Changes</Button>
                        </div>
                    </form>
                </div>
           </div>
        )}
      </div>
    </div>
  )
}
