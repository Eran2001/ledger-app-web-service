import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  role: z.enum(["ADMIN", "STAFF", "VIEWER"], {
    required_error: "Role is required",
  }),
  status: z.enum(["active", "inactive", "pending"], {
    required_error: "Status is required",
  }),
  phone: z.string().trim().min(1, "Phone number is required"),
});

export type UserFormValues = z.infer<typeof userSchema>;
