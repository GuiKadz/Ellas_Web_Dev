import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/pages/_layouts/app";
import { NotFound } from "@/pages/404";
import { AuthLayout } from "./pages/_layouts/auth";
import SignIn from "./pages/auth/sign-in";
import Dashboard from "./pages/app/dashboard";
import CreateVictim from "./pages/app/create-victim";
import Search from "./pages/app/search";
import CreateAggressor from "./pages/app/create-aggressor";
import CreateOccurence from "./pages/app/create-occurrence";

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
        element: <CreateAggressor/>
      },
      {
        path: "/create/occurrence",
        element: <CreateOccurence/>
      }
      
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
