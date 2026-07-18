import { StatPill } from "@/components/ui/stat-pill";
import type { ProductCategory } from "@/types/product-types";

const CATEGORY_COLOR: Record<
  ProductCategory,
  "indigo" | "teal" | "amber" | "purple" | "gray"
> = {
  Electronics: "indigo",
  Appliances: "teal",
  Furniture: "amber",
  Hardware: "purple",
  Other: "gray",
};

interface CategoryPillProps {
  category: ProductCategory;
}

export const CategoryPill = ({ category }: CategoryPillProps) => (
  <StatPill label={category} color={CATEGORY_COLOR[category]} />
);
