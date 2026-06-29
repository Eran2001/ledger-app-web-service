import * as React from "react";
import PhoneInputPrimitive from "react-phone-number-input";
import type { Value, Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { cn } from "@/lib/utils";

interface PhoneInputProps {
  id?: string;
  value?: Value;
  onChange: (value: Value | undefined) => void;
  "aria-invalid"?: boolean;
  className?: string;
  placeholder?: string;
  defaultCountry?: Country;
  disabled?: boolean;
}

export const PhoneInput = ({
  id,
  value,
  onChange,
  "aria-invalid": ariaInvalid,
  className,
  placeholder = "Enter phone number",
  defaultCountry = "LK",
  disabled,
}: PhoneInputProps) => {
  return (
    <PhoneInputPrimitive
      id={id}
      international
      defaultCountry={defaultCountry}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoComplete="off"
      className={cn(ariaInvalid && "phone-input-invalid", className)}
    />
  );
};
