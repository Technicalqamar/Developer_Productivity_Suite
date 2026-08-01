import { createContext, useCallback, useState } from "react";
import * as authService from "@/services/auth.service";

const TOKEN_KEY = "dps_token";
const USER_KEY = "dps_user";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(token);

  const persistAuth = (data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const authenticate = useCallback(
    async (serviceMethod, credentials, fallbackMessage) => {
      setLoading(true);

      try {
        const data = await serviceMethod(credentials);
        persistAuth(data);

        return { success: true };
      } catch (error) {
        const message =
          error.response?.data?.message || fallbackMessage;

        return { success: false, message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    (credentials) =>
      authenticate(
        authService.loginDeveloper,
        credentials,
        "Login failed. Please try again."
      ),
    [authenticate]
  );

  const loginAdmin = useCallback(
    (credentials) =>
      authenticate(
        authService.loginAdmin,
        credentials,
        "Admin login failed. Please try again."
      ),
    [authenticate]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    loginAdmin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
