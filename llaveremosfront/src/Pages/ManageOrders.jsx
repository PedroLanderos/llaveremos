import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import "./CSS/ManageOrders.css"; // Crea un archivo CSS opcional para estilos.

const ManageOrders = () => {
  const { auth } = useContext(AuthContext); // Obtener token del contexto
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://localhost:5003/api/orders/", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
      setMessage("Error al obtener las órdenes.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="manage-orders">
      <h1>Administrar Órdenes</h1>
      {message && (
        <p
          style={{
            color: message.includes("Error") ? "red" : "green",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}
      <div className="order-table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Fecha de Orden</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.clientId}</td>
                <td>{order.productId}</td>
                <td>{order.purchaseQuantity}</td>
                <td>{new Date(order.orderedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
