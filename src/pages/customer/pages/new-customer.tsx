import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

import {
  newCustomerSchema,
  type NewCustomerFormValues,
} from "@/schemas/customers-schema";
import { useUIStore } from "@/stores/ui-store";
import { Notification } from "@/utils/notification";

export const NewCustomer = () => {
  const { newCustomerOpen, closeNewCustomer } = useUIStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewCustomerFormValues>({
    resolver: zodResolver(newCustomerSchema),
  });

  const handleClose = () => {
    reset();
    closeNewCustomer();
  };

  const handleFormSubmit = (data: NewCustomerFormValues) => {
    console.log(data);
    Notification.success("Customer created.");
    handleClose();
  };

  return (
    <Sheet
      open={newCustomerOpen}
      onOpenChange={(open) => !open && handleClose()}
    >
      <SheetContent side="right" className="sm:max-w-5xl">
        <SheetHeader>
          <SheetTitle>New Customer</SheetTitle>
          <SheetDescription>
            Add a new customer to your records.
          </SheetDescription>
        </SheetHeader>

        <form
          id="new-customer-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-4"
        >
          <Card>
            <CardHeader>
              <CardTitle icon={Icon.User}>Personal Info</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="first_name" required>
                    First name
                  </Label>
                  <Input
                    id="first_name"
                    placeholder="e.g. Nimal"
                    aria-invalid={!!errors.firstName}
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="t-caption text-danger">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="last_name" required>
                    Last name
                  </Label>
                  <Input
                    id="last_name"
                    placeholder="e.g. Perera"
                    aria-invalid={!!errors.lastName}
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="t-caption text-danger">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="nic" required>
                    NIC number
                  </Label>
                  <Input
                    id="nic"
                    placeholder="e.g. 198512345678"
                    aria-invalid={!!errors.nic}
                    {...register("nic")}
                  />
                  {errors.nic && (
                    <p className="t-caption text-danger">
                      {errors.nic.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">
                    Email{" "}
                    <span className="t-caption text-faint">(optional)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. nimal@gmail.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="t-caption text-danger">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle icon={Icon.Phone}>Contact</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="primary_phone" required>
                    Primary phone
                  </Label>
                  <Input
                    id="primary_phone"
                    type="tel"
                    placeholder="+94 77 123 4567"
                    aria-invalid={!!errors.primaryPhone}
                    {...register("primaryPhone")}
                  />
                  {errors.primaryPhone && (
                    <p className="t-caption text-danger">
                      {errors.primaryPhone.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="secondary_phone">
                    Secondary phone{" "}
                    <span className="t-caption text-faint">(optional)</span>
                  </Label>
                  <Input
                    id="secondary_phone"
                    type="tel"
                    placeholder="+94 71 234 5678"
                    {...register("secondaryPhone")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle icon={Icon.MapPin}>Location</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="address_line1" required>
                    Address line 1
                  </Label>
                  <Input
                    id="address_line1"
                    placeholder="e.g. No 12, Kandy Road"
                    aria-invalid={!!errors.addressLine1}
                    {...register("addressLine1")}
                  />
                  {errors.addressLine1 && (
                    <p className="t-caption text-danger">
                      {errors.addressLine1.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="address_line2">
                    Address line 2{" "}
                    <span className="t-caption text-faint">(optional)</span>
                  </Label>
                  <Input
                    id="address_line2"
                    placeholder="e.g. Kadawatha"
                    {...register("addressLine2")}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="city" required>
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="e.g. Colombo"
                    aria-invalid={!!errors.city}
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="t-caption text-danger">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="province" required>
                    Province
                  </Label>
                  <Input
                    id="province"
                    placeholder="e.g. Western"
                    aria-invalid={!!errors.province}
                    {...register("province")}
                  />
                  {errors.province && (
                    <p className="t-caption text-danger">
                      {errors.province.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle icon={Icon.FileText}>Additional Info</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="notes">
                  Notes <span className="t-caption text-faint">(optional)</span>
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Reminders, contact preferences, etc."
                  {...register("notes")}
                />
              </div>
            </CardContent>
          </Card>
        </form>

        <SheetFooter className="flex-row justify-end">
          <Button type="button" variant="cancel" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="new-customer-form">
            <Icon.UserPlus /> Create Customer
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
