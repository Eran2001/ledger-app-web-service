import { toast } from "sonner";

export const Notification = {
  success(message: string) {
    toast.success(message, { duration: 2000 });
  },

  error(message: string) {
    toast.error(message, { duration: 2000 });
  },

  warning(message: string) {
    toast.warning(message, { duration: 2000 });
  },

  info(message: string) {
    toast.info(message, { duration: 2000 });
  },
};
