import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";
import DeveloperLayout from "@/layouts/DeveloperLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import DeveloperRoute from "./DeveloperRoute";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/common/NotFound";
import SectionPlaceholder from "@/pages/common/SectionPlaceholder";
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
    element: <DeveloperLayout />,
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
        path: "/developer/projects",
        element: (
          <ProtectedRoute>
            <DeveloperRoute>
              <SectionPlaceholder title="My Projects" />
            </DeveloperRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "/developer/templates",
        element: (
          <ProtectedRoute>
            <DeveloperRoute>
              <SectionPlaceholder title="My Templates" />
            </DeveloperRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "/developer/tools",
        element: (
          <ProtectedRoute>
            <DeveloperRoute>
              <SectionPlaceholder title="Tools" />
            </DeveloperRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "/developer/profile",
        element: (
          <ProtectedRoute>
            <DeveloperRoute>
              <SectionPlaceholder title="Profile" />
            </DeveloperRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "/developer/settings",
        element: (
          <ProtectedRoute>
            <DeveloperRoute>
              <SectionPlaceholder title="Settings" />
            </DeveloperRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/tools",
        element: (
          <AdminRoute>
            <SectionPlaceholder title="Tool Management" />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/developers",
        element: (
          <AdminRoute>
            <SectionPlaceholder title="Developers" />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/projects",
        element: (
          <AdminRoute>
            <SectionPlaceholder title="Projects" />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/analytics",
        element: (
          <AdminRoute>
            <SectionPlaceholder title="Analytics" />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/settings",
        element: (
          <AdminRoute>
            <SectionPlaceholder title="Settings" />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
