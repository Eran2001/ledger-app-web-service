import React, { useState } from "react";
import * as Icon from "@/components/icons";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { cn } from "@/lib/utils";
import { users, pendingRegistrations } from "@/constant/dummy";

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"users" | "whatsapp" | "business">(
    "users",
  );

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar pageTitle="Settings" pageSubtitle="System configuration" />

      <div className="p-6 overflow-y-auto">
        {/* Sub-tabs */}
        <div className="border-b border-border mb-8 flex gap-10 px-2 overflow-x-auto no-scrollbar">
          {[
            { id: "users", label: "Users & Roles", icon: Icon.Users },
            { id: "whatsapp", label: "WhatsApp API", icon: Icon.MessageCircle },
            { id: "business", label: "Business Info", icon: Icon.Building2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id as "users" | "whatsapp" | "business")
              }
              className={cn(
                "pb-4 t-body fw-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap",
                activeTab === tab.id
                  ? "border-brand text-brand"
                  : "border-transparent text-faint hover:text-soft",
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
              <div className="surface-card modal-rounded border border-border shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h3 className="t-title text-main">Team Members</h3>
                  <Button
                    variant="outline"
                    className="h-9 border-brand text-brand fw-bold t-caption surface-brand-soft-hover"
                  >
                    <Icon.Plus className="w-3.5 h-3.5 mr-1" />
                    Invite User
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full align-text-left">
                    <thead className="surface-page t-micro-bold text-soft case-upper tracking-label">
                      <tr>
                        <th className="px-5 py-4 border-b">Member</th>
                        <th className="px-5 py-4 border-b">Role</th>
                        <th className="px-5 py-4 border-b">Last Login</th>
                        <th className="px-5 py-4 border-b">Status</th>
                        <th className="px-5 py-4 border-b align-text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {users.map((u) => (
                        <tr
                          key={u.id}
                          className="surface-hover transition-colors"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <InitialsAvatar name={u.name} size="sm" />
                              <div className="flex flex-col overflow-hidden">
                                <span className="t-body fw-bold text-main truncate leading-title">
                                  {u.name}
                                </span>
                                <span className="t-micro text-faint truncate">
                                  {u.email}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={cn(
                                "px-2 py-0.5 global-rounded t-micro fw-black case-upper tracking-label-wide",
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
                          <td className="px-5 py-4 t-micro fw-medium text-soft">
                            {u.lastLogin}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5 fw-bold t-micro text-success-role case-upper tracking-label">
                              <span className="w-1.5 h-1.5 circle-rounded surface-success"></span>
                              Active
                            </div>
                          </td>
                          <td className="px-5 py-4 align-text-right">
                            <button className="text-faint hover:text-brand transition-colors p-1">
                              <Icon.Edit2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="surface-card modal-rounded border border-border shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="t-title text-main">Pending Approvals</h3>
                  <div className="pill-amber t-micro fw-bold px-3 py-1 global-rounded flex items-center gap-1.5 border border-warning-soft shadow-sm animate-pulse">
                    <Icon.AlertCircle className="w-3 h-3" />
                    {pendingRegistrations.length} Requests Pending
                  </div>
                </div>

                <div className="space-y-4">
                  {pendingRegistrations.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 surface-page border border-border card-rounded flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-brand surface-brand-soft-10-hover transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 circle-rounded surface-card border border-border flex items-center justify-center text-brand fw-black italic shadow-inner">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="t-body fw-bold text-main">
                              {p.name}
                            </span>
                            <span className="t-micro surface-card border border-border px-1.5 py-0.5 global-rounded text-soft fw-bold case-upper tracking-label shadow-sm">
                              {p.requestedRole}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                            <span className="t-micro text-soft flex items-center gap-1 fw-medium">
                              <Icon.Mail className="w-3 h-3 text-faint" /> {p.email}
                            </span>
                            <span className="t-micro text-soft flex items-center gap-1 fw-medium">
                              <Icon.Clock className="w-3 h-3 text-faint" />{" "}
                              {p.requestedAt}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button className="h-8 px-4 surface-success hover:surface-success t-micro fw-bold global-rounded shadow-sm">
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          className="h-8 px-4 border-border text-danger surface-danger-soft-hover t-micro fw-bold global-rounded"
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
              <div className="surface-card modal-rounded border border-border shadow-sm p-6 h-full">
                <h3 className="t-title text-main mb-6">Role Permissions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full align-text-left">
                    <thead>
                      <tr>
                        <th className="py-3 t-micro fw-black case-upper tracking-label-wide text-faint">
                          Permission
                        </th>
                        <th className="py-3 px-2 align-text-center t-micro fw-black case-upper tracking-label-wide text-brand surface-brand-soft-50 global-rounded">
                          Admin
                        </th>
                        <th className="py-3 px-2 align-text-center t-micro fw-black case-upper tracking-label-wide text-soft">
                          Staff
                        </th>
                        <th className="py-3 px-2 align-text-center t-micro fw-black case-upper tracking-label-wide text-faint">
                          View
                        </th>
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
                        <tr
                          key={idx}
                          className="surface-hover transition-colors"
                        >
                          <td className="py-3 t-caption fw-bold text-soft">
                            {perm.p}
                          </td>
                          <td className="py-3 px-2 align-text-center surface-brand-soft-10">
                            {perm.a ? (
                              <Icon.CheckCircle className="w-4 h-4 text-success-role mx-auto" />
                            ) : (
                              <Icon.XCircle className="w-4 h-4 text-faint mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-2 align-text-center">
                            {perm.s ? (
                              <Icon.CheckCircle className="w-4 h-4 text-success-role mx-auto" />
                            ) : (
                              <Icon.XCircle className="w-4 h-4 text-faint mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-2 align-text-center">
                            {perm.v ? (
                              <Icon.CheckCircle className="w-4 h-4 text-success-role mx-auto" />
                            ) : (
                              <Icon.XCircle className="w-4 h-4 text-faint mx-auto" />
                            )}
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
            <div className="surface-card modal-rounded border border-border shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 modal-rounded surface-success-soft flex items-center justify-center text-success-role group relative shadow-inner overflow-hidden">
                    <Icon.MessageCircle className="w-8 h-8 relative z-10" />
                    <div className="absolute inset-0 surface-success-soft scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="t-section text-main">
                        WhatsApp Business API
                      </h3>
                      <span className="px-2 py-0.5 global-rounded surface-success-soft text-success-role t-micro fw-black case-upper tracking-label-wide border border-success-soft">
                        Connected
                      </span>
                    </div>
                    <p className="t-body fw-medium text-soft mt-0.5">
                      +94 77 456 7890
                    </p>
                    <span className="t-caption text-faint fw-bold case-upper tracking-label">
                      Active since Jan 2026
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="h-10 border-danger-soft text-danger surface-danger-soft-hover fw-bold whitespace-nowrap"
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
                <div
                  key={idx}
                  className="surface-card modal-rounded border border-border p-6 shadow-sm flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="t-body fw-bold text-main">{t.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-brand fw-bold surface-brand-soft-hover"
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="surface-page card-rounded p-4 border border-subtle flex flex-col flex-1">
                    <p className="t-caption text-soft leading-copy mono-text whitespace-pre-wrap flex-1">
                      {t.text}
                    </p>
                    <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
                      <span className="w-1.5 h-1.5 circle-rounded surface-success"></span>
                      <span className="t-micro fw-black text-faint case-upper tracking-label-wide">
                        Active Template
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Test Message */}
            <div className="surface-card modal-rounded border border-border shadow-sm p-6">
              <h3 className="t-title text-main mb-4">Send Test Message</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Icon.Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
                  <Input
                    placeholder="+94 77 XXX XXXX"
                    className="pl-10 h-12 border-border"
                  />
                </div>
                <Button className="surface-brand surface-brand-strong-hover h-12 px-8 fw-bold shadow-lg shadow-brand-soft">
                  Send Test
                </Button>
              </div>
              <p className="t-micro text-faint mt-3 italic">
                This uses your actual Business API credit. Make sure the number
                is valid.
              </p>
            </div>
          </div>
        )}

        {activeTab === "business" && (
          <div className="max-w-2xl animate-in fade-in duration-300">
            <div className="surface-card modal-rounded border border-border shadow-sm p-8">
              {/* Logo Section */}
              <div className="flex flex-col items-center mb-10">
                <div className="relative w-24 h-24 auth-rounded surface-brand-soft border-2 border-dashed border-brand-muted flex flex-col items-center justify-center cursor-pointer group surface-brand-soft-80-hover transition-all shadow-xl shadow-brand-faint">
                  <span className="t-hero fw-black text-brand italic">ST</span>
                  <div className="absolute inset-0 flex items-center justify-center surface-brand-overlay auth-rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon.Upload className="w-6 h-6 text-brand" />
                  </div>
                </div>
                <h4 className="mt-4 t-body fw-bold text-soft">Logo Upload</h4>
                <p className="t-micro text-faint fw-medium">
                  Click to upload brand logo
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="t-micro fw-black text-faint case-upper tracking-label-wide">
                      Store Name
                    </label>
                    <div className="relative">
                      <Icon.Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
                      <Input
                        defaultValue="Silva Traders"
                        className="h-11 pl-10 border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="t-micro fw-black text-faint case-upper tracking-label-wide">
                      Business Owner
                    </label>
                    <div className="relative">
                      <InitialsAvatar
                        name="Kamal Silva"
                        size="sm"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 t-4xs"
                      />
                      <Input
                        defaultValue="Kamal Silva"
                        className="h-11 pl-10 border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="t-micro fw-black text-faint case-upper tracking-label-wide">
                      Email Address
                    </label>
                    <div className="relative">
                      <Icon.Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
                      <Input
                        defaultValue="info@silvatraders.lk"
                        className="h-11 pl-10 border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="t-micro fw-black text-faint case-upper tracking-label-wide">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Icon.Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
                      <Input
                        defaultValue="+94 37 222 3456"
                        className="h-11 pl-10 border-border"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="t-micro fw-black text-faint case-upper tracking-label-wide">
                      Store Address
                    </label>
                    <div className="relative">
                      <Icon.MapPin className="absolute left-3 top-3 w-4 h-4 text-faint" />
                      <Textarea
                        defaultValue="45 Kandy Road, Kurunegala"
                        className="min-h-20 pl-10 border-border resize-none pt-2.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex justify-end">
                  <Button className="surface-brand surface-brand-strong-hover px-10 h-12 fw-bold shadow-lg shadow-brand-soft">
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
