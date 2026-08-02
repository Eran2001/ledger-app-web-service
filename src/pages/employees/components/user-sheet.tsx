import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { userSchema, type UserFormValues } from "@/schemas/user-schema";
import type { UserListRow } from "@/types/user-list-types";

interface UserSheetProps {
  open: boolean;
  user: UserListRow | null;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void;
}

export function UserSheet({ open, user, onClose, onSubmit }: UserSheetProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({ resolver: zodResolver(userSchema) });

  useEffect(() => {
    if (!open) return;

    const [firstName = "", ...lastNameParts] = user?.name.split(" ") ?? [];
    reset({
      firstName,
      lastName: lastNameParts.join(" "),
      email: user?.email ?? "",
      role: user?.role,
      status: user?.status,
      phone: user?.phone ?? "",
    });
  }, [open, reset, user]);

  function handleClose() {
    reset();
    onClose();
  }

  function handleFormSubmit(values: UserFormValues) {
    onSubmit(values);
    handleClose();
  }

  return (
    <Sheet open={open} onOpenChange={(next) => !next && handleClose()}>
      <SheetContent side="right" className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{user ? "Edit User" : "Create User"}</SheetTitle>
          <SheetDescription>
            {user ? "Update the user details below." : "Add a user to your team."}
          </SheetDescription>
        </SheetHeader>

        <form
          id="user-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex-1 overflow-y-auto px-4 pb-4"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField label="First name" htmlFor="firstName" error={errors.firstName?.message}>
              <Input
                id="firstName"
                placeholder="Enter first name"
                aria-invalid={!!errors.firstName}
                {...register("firstName")}
              />
            </FormField>
            <FormField label="Last name" htmlFor="lastName" error={errors.lastName?.message}>
              <Input
                id="lastName"
                placeholder="Enter last name"
                aria-invalid={!!errors.lastName}
                {...register("lastName")}
              />
            </FormField>
            <FormField label="Email" htmlFor="email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </FormField>
            <FormField label="Phone number" htmlFor="phone" error={errors.phone?.message}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="phone"
                    value={field.value}
                    onChange={(value) => field.onChange(value ?? "")}
                    placeholder="+94 77 123 4567"
                    aria-invalid={!!errors.phone}
                    className="w-full"
                  />
                )}
              />
            </FormField>
            <FormField label="Role" htmlFor="role" error={errors.role?.message}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="role" className="w-full" aria-invalid={!!errors.role}>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="STAFF">Staff</SelectItem>
                      <SelectItem value="VIEWER">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            <FormField label="Status" htmlFor="status" error={errors.status?.message}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="status" className="w-full" aria-invalid={!!errors.status}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
          </div>
        </form>

        <SheetFooter className="flex-row max-xs:flex-col justify-end">
          <Button type="button" variant="cancel" className="max-xs:order-2" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="user-form">
            {user ? <Icon.Save /> : <Icon.UserPlus />}
            {user ? "Save Changes" : "Create User"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function FormField({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} required>
        {label}
      </Label>
      {children}
      {error && <p className="t-label-md text-danger">{error}</p>}
    </div>
  );
}
