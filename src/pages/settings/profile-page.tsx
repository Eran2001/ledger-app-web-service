import React, { useState } from "react";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/hooks/use-toast";

export const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const toast = useToast();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully.");
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warning("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    toast.success("Password changed successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar pageTitle="Profile" pageSubtitle="Your account settings" />

      <div className="p-6 overflow-y-auto">
        <div className="max-w-2xl space-y-8">

          {/* Avatar + name header */}
          <div className="surface-card card-rounded border border-border p-6 shadow-sm flex items-center gap-6">
            <InitialsAvatar name={user?.name || ""} size="lg" />
            <div className="flex flex-col">
              <span className="t-section text-main">{user?.name}</span>
              <span className="t-body text-faint">{user?.email}</span>
              <span className="t-caption fw-bold text-brand mt-1 case-upper tracking-label">{user?.role}</span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="surface-card card-rounded border border-border p-6 shadow-sm">
            <h3 className="t-title text-main mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="t-body fw-semibold text-soft">Full Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="t-body fw-semibold text-soft">Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border-border"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          </div>

          {/* Change Password */}
          <div className="surface-card card-rounded border border-border p-6 shadow-sm">
            <h3 className="t-title text-main mb-6">Change Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="t-body fw-semibold text-soft">Current Password</Label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-10 border-border"
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-2">
                <Label className="t-body fw-semibold text-soft">New Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-10 border-border"
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label className="t-body fw-semibold text-soft">Confirm New Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 border-border"
                  placeholder="Repeat new password"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleChangePassword}>Update Password</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
