import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Notification } from "@/utils/notification";

const CustomerNewPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nic, setNic] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName || !lastName || !nic || !primaryPhone || !addressLine1 || !city || !province) {
      Notification.error("Please fill all required fields.");
      return;
    }
    Notification.success("Customer created.");
    navigate({ to: "/customers" });
  };

  const handleCancel = () => navigate({ to: "/customers" });

  return (
    <>
      <TopBar
        pageTitle="New Customer"
        pageSubtitle="Add a new customer to your records"
      />

      <div className="p-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="card-base p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-3 border-b border-default">
              <Icon.User className="icon-compact text-brand" />
              <h2 className="t-heading text-main">Personal Info</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="first_name" className="t-meta-bold text-main">
                  First name <span className="text-danger">*</span>
                </Label>
                <Input
                  id="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Nimal"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="last_name" className="t-meta-bold text-main">
                  Last name <span className="text-danger">*</span>
                </Label>
                <Input
                  id="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Perera"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nic" className="t-meta-bold text-main">
                  NIC number <span className="text-danger">*</span>
                </Label>
                <Input
                  id="nic"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  placeholder="e.g. 198512345678"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="t-meta-bold text-main">
                  Email <span className="t-caption text-faint">(optional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. nimal@gmail.com"
                />
              </div>
            </div>
          </div>

          <div className="card-base p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-3 border-b border-default">
              <Icon.Phone className="icon-compact text-brand" />
              <h2 className="t-heading text-main">Contact</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="primary_phone" className="t-meta-bold text-main">
                  Primary phone <span className="text-danger">*</span>
                </Label>
                <Input
                  id="primary_phone"
                  type="tel"
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                  placeholder="+94 77 123 4567"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="secondary_phone" className="t-meta-bold text-main">
                  Secondary phone{" "}
                  <span className="t-caption text-faint">(optional)</span>
                </Label>
                <Input
                  id="secondary_phone"
                  type="tel"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                  placeholder="+94 71 234 5678"
                />
              </div>
            </div>
          </div>

          <div className="card-base p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-3 border-b border-default">
              <Icon.MapPin className="icon-compact text-brand" />
              <h2 className="t-heading text-main">Location</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="address_line1" className="t-meta-bold text-main">
                  Address line 1 <span className="text-danger">*</span>
                </Label>
                <Input
                  id="address_line1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="e.g. No 12, Kandy Road"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="address_line2" className="t-meta-bold text-main">
                  Address line 2{" "}
                  <span className="t-caption text-faint">(optional)</span>
                </Label>
                <Input
                  id="address_line2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="e.g. Kadawatha"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city" className="t-meta-bold text-main">
                  City <span className="text-danger">*</span>
                </Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Colombo"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="province" className="t-meta-bold text-main">
                  Province <span className="text-danger">*</span>
                </Label>
                <Input
                  id="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="e.g. Western"
                />
              </div>
            </div>
          </div>

          <div className="card-base p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-3 border-b border-default">
              <Icon.FileText className="icon-compact text-brand" />
              <h2 className="t-heading text-main">Additional Info</h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="notes" className="t-meta-bold text-main">
                Notes <span className="t-caption text-faint">(optional)</span>
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Reminders, contact preferences, etc."
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <Icon.UserPlus />
              Create Customer
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerNewPage;
