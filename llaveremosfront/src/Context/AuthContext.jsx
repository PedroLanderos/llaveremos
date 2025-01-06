import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setAuth({
        isAuthenticated: true,
        token,
        user,
      });
    }
  }, []);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    const user = {
      id: parseInt(decodedToken.UserId, 10), // Asegúrate de que sea un número
      name: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setAuth({
      isAuthenticated: true,
      token,
      user,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
