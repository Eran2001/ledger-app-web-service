import type { ReactNode } from "react";
import { toast as sonnerToast } from "sonner";

import * as Icon from "@/components/icons";

import { cn } from "@/lib/utils";

type ToastVariant = "success" | "destructive" | "warning" | "info";
type ToastId = string | number;
type ToastStyle = { icon: ReactNode };
type CustomToastProps = {
  id: ToastId;
  message: string;
  variant: ToastVariant;
};

const VARIANT_STYLES: Record<ToastVariant, ToastStyle> = {
  success: {
    icon: (
      <Icon.CircleCheckBig className="custom-toast__icon-svg" strokeWidth={3} />
    ),
  },
  destructive: {
    icon: <Icon.CircleX className="custom-toast__icon-svg" strokeWidth={3} />,
  },
  warning: {
    icon: (
      <Icon.TriangleAlert className="custom-toast__icon-svg" strokeWidth={3} />
    ),
  },
  info: {
    icon: <Icon.Info className="custom-toast__icon-svg" strokeWidth={3} />,
  },
};

function CustomToast({ id, message, variant }: CustomToastProps) {
  const { icon } = VARIANT_STYLES[variant];

  return (
    <div
      className={cn("custom-toast global-rounded", `custom-toast--${variant}`)}
    >
      <span aria-hidden="true" className="custom-toast__icon global-rounded">
        {icon}
      </span>
      <span className="custom-toast__message t-body-md-bold text-main">
        {message}
      </span>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => sonnerToast.dismiss(id)}
        className="custom-toast__close global-rounded"
      >
        <Icon.X aria-hidden="true" className="custom-toast__close-icon" />
      </button>
    </div>
  );
}

function show(message: string, variant: ToastVariant) {
  sonnerToast.custom(
    (id) => <CustomToast id={id} message={message} variant={variant} />,
    { duration: 2000 },
  );
}

export const Notification = {
  success: (message: string) => show(message, "success"),
  error: (message: string) => show(message, "destructive"),
  warning: (message: string) => show(message, "warning"),
  info: (message: string) => show(message, "info"),
};

export { CustomToast };
