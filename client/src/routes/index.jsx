import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import DeveloperLayout from "@/layouts/developer-layout/DeveloperLayout";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import AdminRoute from "./admin-route/AdminRoute";
import DeveloperRoute from "./developer-route/DeveloperRoute";
import Landing from "@/pages/landing/Landing";
import NotFound from "@/pages/common/not-found/NotFound";
import SectionPlaceholder from "@/pages/common/section-placeholder/SectionPlaceholder";
import DeveloperLogin from "@/pages/auth/developer-login/DeveloperLogin";
import DeveloperRegister from "@/pages/auth/developer-register/DeveloperRegister";
import AdminLogin from "@/pages/auth/admin-login/AdminLogin";
import AdminDashboard from "@/pages/admin/admin-dashboard/AdminDashboard";
import ToolManagementPage from "@/pages/admin/tools";
import DeveloperDashboard from "@/pages/developer/developer-dashboard/DeveloperDashboard";

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
            <ToolManagementPage />
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
