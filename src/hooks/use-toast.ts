import { toast } from "sonner";
import { Notification } from "@/utils/notification";

export { toast };

export function useToast() {
  return {
    success: (message: string) => Notification.success(message),
    error: (message: string) => Notification.error(message),
    warning: (message: string) => Notification.warning(message),
    info: (message: string) => Notification.info(message),
  };
}
