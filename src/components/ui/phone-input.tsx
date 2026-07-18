import * as React from "react";
import PhoneInputPrimitive from "react-phone-number-input";
import type { Value, Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

interface PhoneInputProps {
  id?: string;
  value?: Value;
  onChange: (value: Value | undefined) => void;
  "aria-invalid"?: boolean;
  className?: string;
  placeholder?: string;
  defaultCountry?: Country;
  disabled?: boolean;
  size?: ResponsiveSize;
}

export const PhoneInput = ({
  id,
  value,
  onChange,
  "aria-invalid": ariaInvalid,
  className,
  placeholder = "Enter your phone number",
  defaultCountry = "LK",
  disabled,
  size,
}: PhoneInputProps) => {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);

  return (
    <PhoneInputPrimitive
      id={id}
      international
      defaultCountry={defaultCountry}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoComplete="tel"
      className={cn(
        resolvedSize === "compact"
          ? "h-compact px-2.5 t-caption"
          : resolvedSize === "large"
            ? "h-large px-4 t-meta"
            : resolvedSize === "extra-large"
              ? "h-extra-large px-5 t-body"
              : "h-field px-3 t-meta",
        ariaInvalid && "phone-input-invalid",
        "xl-rounded",
        className,
      )}
    />
  );
};
