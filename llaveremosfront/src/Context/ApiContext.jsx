import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto
export const ApiContext = createContext();

// Hook personalizado para usar el contexto
export const useApi = () => useContext(ApiContext);

// Proveedor del contexto
export const ApiProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL del API Gateway (Ocelot)
  const baseUrl = 'https://localhost:5003'; // Ajusta según tu configuración

  // Función para obtener productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/products`);
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener pedidos
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/orders`);
      setOrders(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la autenticación de usuarios
  const authenticateUser = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/authentication/login`, credentials);
      setUser(response.data); // Asumiendo que la respuesta contiene datos de usuario
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Cargar productos al iniciar
  }, []);

  return (
    <ApiContext.Provider value={{ products, orders, user, loading, error, fetchProducts, fetchOrders, authenticateUser }}>
      {children}
    </ApiContext.Provider>
  );
};
