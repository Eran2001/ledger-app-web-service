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
  border?: boolean;
  shadow?: boolean;
}

export const CategoryPill = ({
  category,
  border = false,
  shadow = false,
}: CategoryPillProps) => (
  <StatPill
    label={category}
    color={CATEGORY_COLOR[category]}
    border={border}
    shadow={shadow}
  />
);
