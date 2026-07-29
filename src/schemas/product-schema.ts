import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.enum(["Electronics", "Appliances", "Furniture", "Hardware", "Other"]),
  basePrice: z.coerce.number().positive("Base price must be greater than 0"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
