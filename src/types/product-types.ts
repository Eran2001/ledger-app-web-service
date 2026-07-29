import type { UseFormRegister, Control, FieldErrors } from "react-hook-form";

import type { ProductFormValues } from "@/schemas/product-schema";

export type ProductCategory =
  | "Electronics"
  | "Appliances"
  | "Furniture"
  | "Hardware"
  | "Other";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  basePrice: number;
  activeSales: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListProps {
  rows: Product[];
  isArchivedView: boolean;
  onEdit: (product: Product) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
}

export interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormValues>;
  control: Control<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}
