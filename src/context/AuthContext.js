import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const login = (jwtToken) => {
    const decoded = jwtDecode(jwtToken);
    const username =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    localStorage.setItem("isLogged", "true");

    setToken(jwtToken);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("isLogged");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
