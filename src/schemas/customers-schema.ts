import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const newCustomerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  nic: z.string().min(1, "NIC number is required"),
  email: z.string().email("Invalid email address").or(z.literal("")).optional(),
  primaryPhone: z
    .string({ required_error: "Primary phone is required" })
    .min(1, "Primary phone is required")
    .refine((val) => isValidPhoneNumber(val), "Enter a valid phone number"),
  secondaryPhone: z
    .string()
    .refine((val) => isValidPhoneNumber(val), "Enter a valid phone number")
    .optional(),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  notes: z.string().optional(),
});

export type NewCustomerFormValues = z.infer<typeof newCustomerSchema>;
