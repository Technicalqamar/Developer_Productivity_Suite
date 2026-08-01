import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const DeveloperDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="rounded-lg bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Developer Dashboard</h1>
      {user && <p className="mt-2 text-sm text-gray-500">Welcome, {user.fullName}</p>}
      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default DeveloperDashboard;
