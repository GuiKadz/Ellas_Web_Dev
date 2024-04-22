import { QueryClientProvider } from "react-query";
import "./index.css";
import { queryClient } from "@/lib/react-query";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryClientProvider>
  );
}
