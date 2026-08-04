import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth/useAuth";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/developer/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
