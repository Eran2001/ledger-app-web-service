import type { ProductCategory } from "@/types/product-types";

const CATEGORY_TEXT: Record<ProductCategory, string> = {
  Electronics: "text-brand",
  Appliances: "text-cat-teal",
  Furniture: "text-warning-role",
  Hardware: "text-cat-purple",
  Other: "text-faint",
};

interface CategoryLabelProps {
  category: ProductCategory;
}

export const CategoryLabel = ({ category }: CategoryLabelProps) => (
  <span className={`t-label-sm-bold text-uppercase tracking-label ${CATEGORY_TEXT[category]}`}>
    {category}
  </span>
);
