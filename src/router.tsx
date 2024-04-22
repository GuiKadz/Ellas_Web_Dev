import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/pages/_layouts/app";
import { NotFound } from "@/pages/404";
import { AuthLayout } from "./pages/_layouts/auth";
import SignIn from "./pages/auth/sign-in";
import DashboardVictim from "./pages/app/dashboard-victim";
import DashboardAggressor from "./pages/app/dashboard-aggresor";
import DashboardOccurencce from "./pages/app/dashboard-occurencce";
import CreateVictim from "./pages/app/create-victim";
import CreateAggressor from "./pages/app/create-aggresor";
import CreateOccurencce from "./pages/app/create-occurencce";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <DashboardVictim />,
      },
      {
        path: "/dashboard-victim",
        element: <DashboardVictim />,
      },
      {
        path: "/dashboard-aggresor",
        element: <DashboardAggressor />,
      },
      {
        path: "/dashboard-occurencce",
        element: <DashboardOccurencce />,
      },
      {
        path: "/search",
        element: <DashboardVictim />,
      },
      {
        path: "/create-victim",
        element: <CreateVictim />,
      },
      {
        path: "/create-aggresor",
        element: <CreateAggressor />,
      },
      {
        path: "/create-occurencce",
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
