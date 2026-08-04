import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth/useAuth";

const DeveloperRoute = ({ children }) => {
  const { token, user } = useAuth();

  if (!token || !user) {
    return <Navigate to="/developer/login" replace />;
  }

  if (user.role !== "developer") {
    return <Navigate to="/developer/login" replace />;
  }

  return children;
};

export default DeveloperRoute;
