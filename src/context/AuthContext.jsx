import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // نقرأ من localStorage أو sessionStorage
    const savedToken =
      localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
    const savedUserId =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");
    const savedUserName =
      localStorage.getItem("userName") || sessionStorage.getItem("userName");
    const savedUserRole =
      localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUser({
        id: savedUserId,
        username: savedUserName,
        role: savedUserRole,
      });
    }
    setIsLoading(false);
  }, []);

  const login = (userData, jwtToken, rememberMe = false, refreshToken = null) => {
    setUser(userData);
    setToken(jwtToken);

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("userToken", jwtToken);
    storage.setItem("userId", userData.id);
    storage.setItem("userName", userData.username || userData.email);
    storage.setItem("userRole", userData.role);
    storage.setItem("rememberMe", rememberMe ? "true" : "false");

    if (refreshToken) {
      storage.setItem("refresh_token", refreshToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    ["userToken", "userId", "userName", "userRole", "rememberMe"].forEach(
      (key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      }
    );
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
