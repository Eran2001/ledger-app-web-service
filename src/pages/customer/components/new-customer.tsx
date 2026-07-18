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
import { Notification } from "@/components/ui/custom-toast";

import {
  newCustomerSchema,
  type NewCustomerFormValues,
} from "@/schemas/customer-schema";
import { useUIStore } from "@/stores/ui-store";

import { NewCustomerFormFields } from "./new-customer-form-fields";

export const NewCustomer = () => {
  const { newCustomerOpen, closeNewCustomer } = useUIStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<NewCustomerFormValues>({
    resolver: zodResolver(newCustomerSchema),
  });

  const handleClose = () => {
    reset();
    closeNewCustomer();
  };

  const handleFormSubmit = (data: NewCustomerFormValues) => {
    console.log(data);
    Notification.success("Customer created.");
    handleClose();
  };

  return (
    <Sheet
      open={newCustomerOpen}
      onOpenChange={(open) => !open && handleClose()}
    >
      <SheetContent side="right" className="sm:max-w-5xl">
        <SheetHeader>
          <SheetTitle>New Customer</SheetTitle>
          <SheetDescription>
            Add a new customer to your records.
          </SheetDescription>
        </SheetHeader>

        <form
          id="new-customer-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex-1 overflow-y-auto px-4 pb-4"
        >
          <NewCustomerFormFields
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
          <Button type="submit" form="new-customer-form">
            <Icon.UserPlus /> Create Customer
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
