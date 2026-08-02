import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";

import { useScrollOnTop } from "@/hooks/use-scroll-on-top";
import { queryClient } from "@/lib/query-client";

import { router } from "./router";

export default function App() {
  useScrollOnTop(router);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        toastOptions={{
          unstyled: true,
          classNames: { toast: "flex justify-center w-auto" },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
