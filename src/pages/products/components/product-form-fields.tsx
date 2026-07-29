import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CATEGORIES } from "@/constant/product-data";
import type { ProductFormFieldsProps } from "@/types/product-types";

export const ProductFormFields = ({
  register,
  control,
  errors,
}: ProductFormFieldsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div className="flex flex-col gap-1.5 sm:col-span-2">
      <Label htmlFor="name" required>
        Product name
      </Label>
      <Input
        id="name"
        placeholder="Enter product name"
        aria-invalid={!!errors.name}
        {...register("name")}
      />
      {errors.name && (
        <p className="t-label-md text-danger">{errors.name.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1.5">
      <Label htmlFor="category" required>
        Category
      </Label>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              id="category"
              className="w-full"
              aria-invalid={!!errors.category}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.category && (
        <p className="t-label-md text-danger">{errors.category.message}</p>
      )}
    </div>

    <div className="flex flex-col gap-1.5">
      <Label htmlFor="basePrice" required>
        Base price
      </Label>
      <Input
        id="basePrice"
        type="number"
        placeholder="Enter base price"
        aria-invalid={!!errors.basePrice}
        {...register("basePrice")}
      />
      {errors.basePrice && (
        <p className="t-label-md text-danger">{errors.basePrice.message}</p>
      )}
    </div>
  </div>
);
