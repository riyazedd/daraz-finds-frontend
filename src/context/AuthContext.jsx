import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || null);

  useEffect(() => {
    setAdminToken(localStorage.getItem("adminToken")); // Keep token updated
  }, []);

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setAdminToken(token);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
  };

  return (
    <AuthContext.Provider value={{ adminToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
