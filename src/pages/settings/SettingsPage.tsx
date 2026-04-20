import React, { useState } from "react";
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
  Clock,
} from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { cn } from "@/lib/utils";
import { users, pendingRegistrations } from "@/constant/dummy";

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"users" | "whatsapp" | "business">("users");

  return (
    <div className="flex flex-col h-full bg-surface">
      <Topbar pageTitle="Settings" pageSubtitle="System configuration" />

      <div className="p-6 overflow-y-auto">
        {/* Sub-tabs */}
        <div className="border-b border-border mb-8 flex gap-10 px-2 overflow-x-auto no-scrollbar">
          {[
            { id: "users", label: "Users & Roles", icon: Users },
            { id: "whatsapp", label: "WhatsApp API", icon: MessageCircle },
            { id: "business", label: "Business Info", icon: Building2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "users" | "whatsapp" | "business")}
              className={cn(
                "pb-4 t-body fw-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-hint hover:text-body",
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "users" && (
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 animate-in fade-in duration-300">
            {/* Team Members */}
            <div className="xl:col-span-3 space-y-8">
              <div className="bg-card modal-rounded border border-border shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h3 className="t-title text-heading">Team Members</h3>
                  <Button
                    variant="outline"
                    className="h-9 border-primary text-primary fw-bold t-caption hover:bg-primary-light"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Invite User
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-surface t-micro-bold text-body uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-4 border-b">Member</th>
                        <th className="px-5 py-4 border-b">Role</th>
                        <th className="px-5 py-4 border-b">Last Login</th>
                        <th className="px-5 py-4 border-b">Status</th>
                        <th className="px-5 py-4 border-b text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-surface transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <InitialsAvatar name={u.name} size="sm" />
                              <div className="flex flex-col overflow-hidden">
                                <span className="t-body fw-bold text-heading truncate leading-tight">{u.name}</span>
                                <span className="t-micro text-hint truncate">{u.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={cn(
                                "px-2 py-0.5 global-rounded t-micro fw-black uppercase tracking-widest",
                                u.role === "ADMIN"
                                  ? "pill-indigo"
                                  : u.role === "STAFF"
                                    ? "pill-purple"
                                    : "pill-gray",
                              )}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="px-5 py-4 t-micro fw-medium text-body">{u.lastLogin}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5 fw-bold t-micro text-success uppercase tracking-tighter">
                              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                              Active
                            </div>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button className="text-hint hover:text-primary transition-colors p-1">
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
              <div className="bg-card modal-rounded border border-border shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="t-title text-heading">Pending Approvals</h3>
                  <div className="pill-amber t-micro fw-bold px-3 py-1 global-rounded flex items-center gap-1.5 border border-warning/20 shadow-sm animate-pulse">
                    <AlertCircle className="w-3 h-3" />
                    {pendingRegistrations.length} Requests Pending
                  </div>
                </div>

                <div className="space-y-4">
                  {pendingRegistrations.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 bg-surface border border-border card-rounded flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary hover:bg-primary-light/10 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary fw-black italic shadow-inner">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="t-body fw-bold text-heading">{p.name}</span>
                            <span className="t-micro bg-card border border-border px-1.5 py-0.5 global-rounded text-body fw-bold uppercase tracking-tighter shadow-sm">
                              {p.requestedRole}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                            <span className="t-micro text-body flex items-center gap-1 fw-medium">
                              <Mail className="w-3 h-3 text-hint" /> {p.email}
                            </span>
                            <span className="t-micro text-body flex items-center gap-1 fw-medium">
                              <Clock className="w-3 h-3 text-hint" /> {p.requestedAt}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button className="h-8 px-4 bg-success hover:bg-success t-micro fw-bold global-rounded shadow-sm">
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          className="h-8 px-4 border-border text-destructive hover:bg-destructive/5 t-micro fw-bold global-rounded"
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Role Permissions */}
            <div className="xl:col-span-2">
              <div className="bg-card modal-rounded border border-border shadow-sm p-6 h-full">
                <h3 className="t-title text-heading mb-6">Role Permissions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="py-3 t-micro fw-black uppercase tracking-widest text-hint">Permission</th>
                        <th className="py-3 px-2 text-center t-micro fw-black uppercase tracking-widest text-primary bg-primary-light/50 rounded-t-lg">Admin</th>
                        <th className="py-3 px-2 text-center t-micro fw-black uppercase tracking-widest text-body">Staff</th>
                        <th className="py-3 px-2 text-center t-micro fw-black uppercase tracking-widest text-hint">View</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { p: "Dashboard Access", a: true, s: true, v: true },
                        { p: "Manage Customers", a: true, s: true, v: false },
                        { p: "Manage Sales", a: true, s: true, v: false },
                        { p: "Record Payment", a: true, s: true, v: false },
                        { p: "View Reports", a: true, s: false, v: true },
                        { p: "Manage Products", a: true, s: false, v: false },
                        { p: "System Settings", a: true, s: false, v: false },
                        { p: "User Management", a: true, s: false, v: false },
                      ].map((perm, idx) => (
                        <tr key={idx} className="hover:bg-surface transition-colors">
                          <td className="py-3 t-caption fw-bold text-body">{perm.p}</td>
                          <td className="py-3 px-2 text-center bg-primary-light/10">
                            {perm.a ? <CheckCircle className="w-4 h-4 text-success mx-auto" /> : <XCircle className="w-4 h-4 text-hint mx-auto" />}
                          </td>
                          <td className="py-3 px-2 text-center">
                            {perm.s ? <CheckCircle className="w-4 h-4 text-success mx-auto" /> : <XCircle className="w-4 h-4 text-hint mx-auto" />}
                          </td>
                          <td className="py-3 px-2 text-center">
                            {perm.v ? <CheckCircle className="w-4 h-4 text-success mx-auto" /> : <XCircle className="w-4 h-4 text-hint mx-auto" />}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "whatsapp" && (
          <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
            {/* Connection Card */}
            <div className="bg-card modal-rounded border border-border shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 modal-rounded bg-success-bg flex items-center justify-center text-success group relative shadow-inner overflow-hidden">
                    <MessageCircle className="w-8 h-8 relative z-10" />
                    <div className="absolute inset-0 bg-success-bg scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="t-section text-heading">WhatsApp Business API</h3>
                      <span className="px-2 py-0.5 global-rounded bg-success-bg text-success t-micro fw-black uppercase tracking-widest border border-success/20">
                        Connected
                      </span>
                    </div>
                    <p className="t-body fw-medium text-body mt-0.5">+94 77 456 7890</p>
                    <span className="t-caption text-hint fw-bold uppercase tracking-tight">Active since Jan 2026</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="h-10 border-destructive/20 text-destructive hover:bg-destructive/5 fw-bold whitespace-nowrap"
                >
                  Disconnect Integration
                </Button>
              </div>
            </div>

            {/* Templates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Payment Confirmation",
                  text: "Dear {customer_name}, your payment of LKR {amount} for {product_name} (Installment {month}/{total}) has been recorded. Thank you! — Silva Traders",
                },
                {
                  title: "Payment Reminder",
                  text: "Dear {customer_name}, your installment of LKR {amount} for {product_name} was due on {due_date}. Please visit our store. — Silva Traders",
                },
              ].map((t, idx) => (
                <div key={idx} className="bg-card modal-rounded border border-border p-6 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="t-body fw-bold text-heading">{t.title}</h4>
                    <Button variant="ghost" size="sm" className="h-8 text-primary fw-bold hover:bg-primary-light">
                      Edit
                    </Button>
                  </div>
                  <div className="bg-surface card-rounded p-4 border border-border/50 flex flex-col flex-1">
                    <p className="t-caption text-body leading-relaxed font-mono whitespace-pre-wrap flex-1">{t.text}</p>
                    <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                      <span className="t-micro fw-black text-hint uppercase tracking-widest">Active Template</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Test Message */}
            <div className="bg-card modal-rounded border border-border shadow-sm p-6">
              <h3 className="t-title text-heading mb-4">Send Test Message</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hint" />
                  <Input placeholder="+94 77 XXX XXXX" className="pl-10 h-12 border-border" />
                </div>
                <Button className="bg-primary hover:bg-primary-dark h-12 px-8 fw-bold shadow-lg shadow-indigo-100">
                  Send Test
                </Button>
              </div>
              <p className="t-micro text-hint mt-3 italic">
                This uses your actual Business API credit. Make sure the number is valid.
              </p>
            </div>
          </div>
        )}

        {activeTab === "business" && (
          <div className="max-w-2xl animate-in fade-in duration-300">
            <div className="bg-card modal-rounded border border-border shadow-sm p-8">
              {/* Logo Section */}
              <div className="flex flex-col items-center mb-10">
                <div className="relative w-24 h-24 auth-rounded bg-primary-light border-2 border-dashed border-primary/40 flex flex-col items-center justify-center cursor-pointer group hover:bg-primary-light/80 transition-all shadow-xl shadow-indigo-50/50">
                  <span className="t-hero fw-black text-primary italic">ST</span>
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10 auth-rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h4 className="mt-4 t-body fw-bold text-body">Logo Upload</h4>
                <p className="t-micro text-hint fw-medium">Click to upload brand logo</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="t-micro fw-black text-hint uppercase tracking-widest">Store Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hint" />
                      <Input defaultValue="Silva Traders" className="h-11 pl-10 border-border" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="t-micro fw-black text-hint uppercase tracking-widest">Business Owner</label>
                    <div className="relative">
                      <InitialsAvatar name="Kamal Silva" size="sm" className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 t-4xs" />
                      <Input defaultValue="Kamal Silva" className="h-11 pl-10 border-border" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="t-micro fw-black text-hint uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hint" />
                      <Input defaultValue="info@silvatraders.lk" className="h-11 pl-10 border-border" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="t-micro fw-black text-hint uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hint" />
                      <Input defaultValue="+94 37 222 3456" className="h-11 pl-10 border-border" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="t-micro fw-black text-hint uppercase tracking-widest">Store Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-hint" />
                      <Textarea
                        defaultValue="45 Kandy Road, Kurunegala"
                        className="min-h-20 pl-10 border-border resize-none pt-2.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex justify-end">
                  <Button className="bg-primary hover:bg-primary-dark px-10 h-12 fw-bold shadow-lg shadow-indigo-100">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
