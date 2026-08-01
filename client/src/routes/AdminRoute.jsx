import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
