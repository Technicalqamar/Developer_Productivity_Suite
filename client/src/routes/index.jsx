import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import DeveloperRoute from "./DeveloperRoute";
import Landing from "@/pages/Landing";
import DeveloperLogin from "@/pages/auth/DeveloperLogin";
import DeveloperRegister from "@/pages/auth/DeveloperRegister";
import AdminLogin from "@/pages/auth/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import DeveloperDashboard from "@/pages/developer/DeveloperDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <DeveloperLogin /> },
      { path: "/register", element: <DeveloperRegister /> },
      { path: "/admin/login", element: <AdminLogin /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: (
              <DeveloperRoute>
                <DeveloperDashboard />
              </DeveloperRoute>
            ),
          },
          {
            path: "/admin/dashboard",
            element: (
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
