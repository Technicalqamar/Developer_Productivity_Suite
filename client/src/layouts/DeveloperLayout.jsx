import { Outlet, useNavigate } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { developerNavigation } from "@/config/navigation";
import useAuth from "@/hooks/useAuth";

const DeveloperLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/developer/login");
  };

  return (
    <AppShell
      navigation={developerNavigation}
      user={user}
      onLogout={handleLogout}
    >
      <Outlet />
    </AppShell>
  );
};

export default DeveloperLayout;
