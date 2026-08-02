import { useState } from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { Notification } from "@/components/ui/custom-toast";

import { useAuthStore } from "@/stores/auth-store";
import { useBusinessStore } from "@/stores/business-store";

export function AccountInformation() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const setLogoUrl = useBusinessStore((state) => state.setLogoUrl);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: user?.name ?? "Kamal Silva",
    email: user?.email ?? "kamal@silvatraders.lk",
    phone: user?.phone ?? "+94 77 123 4567",
  });

  function handleLogoChange(file: File | null) {
    setLogoFile(file);
    if (!file) {
      setLogoUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setLogoUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  function save(event: React.FormEvent) {
    event.preventDefault();
    if (user) updateUser({ ...user, ...form });
    Notification.success("Profile updated successfully");
  }

  return (
    <form onSubmit={save} className="card-base p-6">
      <div className="mb-6">
        <h2 className="t-title-lg text-main">Account Information</h2>
        <p className="t-label-md text-soft">
          Manage your profile and sidebar logo.
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <FileDropzone
          file={logoFile}
          icon={Icon.ImagePlus}
          hint="Upload your sidebar logo."
          accept="image/*"
          onFileSelect={handleLogoChange}
          border
          className="w-full sm:max-w-70"
        />

        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={user?.role ?? "ADMIN"} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <PhoneInput
              id="phone"
              value={form.phone}
              onChange={(value) => setForm({ ...form, phone: value ?? "" })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit" className="surface-brand text-inverse surface-brand-strong-hover">
          <Icon.Save /> Save Profile
        </Button>
      </div>
    </form>
  );
}
