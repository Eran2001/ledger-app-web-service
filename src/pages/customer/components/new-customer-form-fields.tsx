import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { NewCustomerFormFieldsProps } from "@/types/customer-types";

export const NewCustomerFormFields = ({
  register,
  control,
  errors,
}: NewCustomerFormFieldsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="first_name" required>
        First name
      </Label>
      <Input
        id="first_name"
        placeholder="Enter user first name"
        aria-invalid={!!errors.firstName}
        {...register("firstName")}
      />
      {errors.firstName && (
        <p className="t-caption text-danger">{errors.firstName.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1.5">
      <Label htmlFor="last_name" required>
        Last name
      </Label>
      <Input
        id="last_name"
        placeholder="Enter user last name"
        aria-invalid={!!errors.lastName}
        {...register("lastName")}
      />
      {errors.lastName && (
        <p className="t-caption text-danger">{errors.lastName.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1.5">
      <Label htmlFor="nic" required>
        NIC number
      </Label>
      <Input
        id="nic"
        placeholder="Enter user NIC"
        aria-invalid={!!errors.nic}
        {...register("nic")}
      />
      {errors.nic && (
        <p className="t-caption text-danger">{errors.nic.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">
        Email <span className="t-caption text-faint">(optional)</span>
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter user email"
        aria-invalid={!!errors.email}
        {...register("email")}
      />
      {errors.email && (
        <p className="t-caption text-danger">{errors.email.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1.5">
      <Label htmlFor="primary_phone" required>
        Primary phone
      </Label>
      <Controller
        name="primaryPhone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            id="primary_phone"
            value={field.value}
            onChange={field.onChange}
            aria-invalid={!!errors.primaryPhone}
          />
        )}
      />
      {errors.primaryPhone && (
        <p className="t-caption text-danger">{errors.primaryPhone.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1.5">
      <Label htmlFor="secondary_phone">
        Secondary phone <span className="t-caption text-faint">(optional)</span>
      </Label>
      <Controller
        name="secondaryPhone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            id="secondary_phone"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </div>

    <div className="flex flex-col gap-1.5 sm:col-span-2">
      <Label htmlFor="address_line1" required>
        Address line 1
      </Label>
      <Input
        id="address_line1"
        placeholder="Enter user address line 1"
        aria-invalid={!!errors.addressLine1}
        {...register("addressLine1")}
      />
      {errors.addressLine1 && (
        <p className="t-caption text-danger">{errors.addressLine1.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1.5 sm:col-span-2">
      <Label htmlFor="address_line2">
        Address line 2 <span className="t-caption text-faint">(optional)</span>
      </Label>
      <Input
        id="address_line2"
        placeholder="Enter user address line 2"
        {...register("addressLine2")}
      />
    </div>

    <div className="flex flex-col gap-1.5">
      <Label htmlFor="city" required>
        City
      </Label>
      <Input
        id="city"
        placeholder="Enter user city"
        aria-invalid={!!errors.city}
        {...register("city")}
      />
      {errors.city && (
        <p className="t-caption text-danger">{errors.city.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1.5">
      <Label htmlFor="province" required>
        Province
      </Label>
      <Input
        id="province"
        placeholder="Enter user province"
        aria-invalid={!!errors.province}
        {...register("province")}
      />
      {errors.province && (
        <p className="t-caption text-danger">{errors.province.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1.5 sm:col-span-2">
      <Label htmlFor="notes">
        Notes <span className="t-caption text-faint">(optional)</span>
      </Label>
      <Textarea
        id="notes"
        placeholder="Enter user additional notes"
        {...register("notes")}
      />
    </div>
  </div>
);
