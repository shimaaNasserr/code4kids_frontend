import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
  }, []);

  const login = (userData, jwtToken, rememberMe = false) => {
    setUser(userData);
    setToken(jwtToken);

    if (rememberMe) {
      localStorage.setItem("userToken", jwtToken);
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("userName", userData.username || userData.email);
      localStorage.setItem("userRole", userData.role);
      localStorage.setItem("rememberMe", "true");
    } else {
      sessionStorage.setItem("userToken", jwtToken);
      sessionStorage.setItem("userId", userData.id);
      sessionStorage.setItem("userName", userData.username || userData.email);
      sessionStorage.setItem("userRole", userData.role);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
