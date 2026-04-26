import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:surface-base group-[.toaster]:text-main group-[.toaster]:border-border group-[.toaster]:shadow-lg !w-fit !min-w-max !max-w-sm",
          description: "group-[.toast]:text-faint",
          actionButton:
            "group-[.toast]:surface-brand group-[.toast]:text-brand-contrast",
          cancelButton:
            "group-[.toast]:surface-muted group-[.toast]:text-faint",
        },
      }}
      {...props}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { Toaster, toast };
