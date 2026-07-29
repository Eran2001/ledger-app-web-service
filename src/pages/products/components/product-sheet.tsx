import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

import {
  productSchema,
  type ProductFormValues,
} from "@/schemas/product-schema";
import type { Product } from "@/types/product-types";

import { ProductFormFields } from "./product-form-fields";

interface ProductSheetProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
}

export const ProductSheet = ({
  open,
  product,
  onClose,
  onSubmit,
}: ProductSheetProps) => {
  const isEditing = !!product;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (!open) return;
    reset(
      product
        ? {
            name: product.name,
            category: product.category,
            basePrice: product.basePrice,
          }
        : { name: "", category: "Other", basePrice: 0 },
    );
  }, [open, product, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (values: ProductFormValues) => {
    onSubmit(values);
    handleClose();
  };

  return (
    <Sheet open={open} onOpenChange={(next) => !next && handleClose()}>
      <SheetContent
        side="right"
        className="sm:max-w-xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Product" : "New Product"}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Update the product details below."
              : "Add a new product to your catalog."}
          </SheetDescription>
        </SheetHeader>

        <form
          id="product-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex-1 overflow-y-auto px-4 pb-4"
        >
          <ProductFormFields
            register={register}
            control={control}
            errors={errors}
          />
        </form>

        <SheetFooter className="flex-row max-xs:flex-col justify-end">
          <Button
            type="button"
            variant="cancel"
            className="max-xs:order-2"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button type="submit" form="product-form">
            <Icon.Save /> {isEditing ? "Save Changes" : "Create Product"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
