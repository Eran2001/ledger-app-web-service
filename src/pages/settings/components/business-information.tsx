import { useState } from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Notification } from "@/components/ui/custom-toast";

export const BusinessInformation = () => {
  const [form, setForm] = useState({
    businessName: "Silva Traders",
    ownerName: "Kamal Silva",
    address: "No 45, Galle Road, Colombo 03",
    phone: "+94 11 234 5678",
    whatsapp: "+94 77 123 4567",
    email: "info@silvatraders.lk",
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    Notification.success("Business settings saved");
  }

  return (
    <form onSubmit={handleSave} className="card-base p-6 max-w-3xl">
      <h2 className="t-title-lg text-main mb-1">Business Information</h2>
      <p className="t-label-md text-soft mb-6">
        Used on receipts, reminders, and customer communications.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            value={form.ownerName}
            onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            rows={2}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input
            id="whatsapp"
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          className="surface-brand text-inverse surface-brand-strong-hover gap-2"
        >
          <Icon.Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </form>
  );
};
