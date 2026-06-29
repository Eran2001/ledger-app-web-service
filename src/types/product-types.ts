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
}
