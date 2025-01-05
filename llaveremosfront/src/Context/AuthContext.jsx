import React, { createContext, useState, useEffect, useContext } from "react";
import { ShopContext } from "./ShopContext"; // Importa el contexto del carrito

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { clearCart } = useContext(ShopContext); // Usa la función clearCart
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

  const login = (token, user) => {
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
    clearCart(); // Vacía el carrito al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
