import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/pages/_layouts/app";
import { NotFound } from "@/pages/404";
import { AuthLayout } from "./pages/_layouts/auth";
import SignIn from "./pages/auth/sign-in";
import Dashboard from "./pages/app/dashboard";
import CreateVictim from "./pages/app/create-victim";
import CreateOccurencce from "./pages/app/create-occurencce";
import Search from "./pages/app/search";
import RegisterAggressor from "./pages/app/create-aggresor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/create/victim",
        element: <CreateVictim />,
      },
      {
        path: "/create/aggressor",
        element: <RegisterAggressor />,
      },
      {
        path: "/create/ocurrence",
        element: <CreateOccurencce />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);
