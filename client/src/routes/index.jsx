import { createBrowserRouter, Navigate } from "react-router-dom";

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
      { path: "/developer/login", element: <DeveloperLogin /> },
      { path: "/developer/register", element: <DeveloperRegister /> },
      { path: "/admin/login", element: <AdminLogin /> },
    ],
  },
  {
    path: "/admin",
    element: <Navigate to="/admin/login" replace />,
  },
  {
    path: "/developer",
    element: <Navigate to="/developer/login" replace />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/developer/dashboard",
        element: (
          <ProtectedRoute>
            <DeveloperRoute>
              <DeveloperDashboard />
            </DeveloperRoute>
          </ProtectedRoute>
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
]);

export default router;
