import { Outlet, useNavigate } from "react-router-dom";
import AppShell from "@/components/layout/app-shell/AppShell";
import { adminNavigation } from "@/config/navigation/navigation";
import useAuth from "@/hooks/use-auth/useAuth";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <AppShell navigation={adminNavigation} user={user} onLogout={handleLogout}>
      <Outlet />
    </AppShell>
  );
};

export default AdminLayout;
