import React, { useState } from "react";
import axios from "axios";
import "./CSS/CreateProduct.css"; // Reutilizamos el CSS de CreateProduct

const AddUser = () => {
  const [userData, setUserData] = useState({
    Name: "",
    TelephoneNumber: "",
    Address: "",
    email: "",
    password: "",
    Role: "", // Por defecto "Normal", puedes cambiarlo según necesidad
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:5003/api/authentication/Register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setMessage("Usuario agregado exitosamente.");
        setUserData({
          Name: "",
          TelephoneNumber: "",
          Address: "",
          email: "",
          password: "",
          Role: "Normal",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage("Error al agregar usuario. Verifica los datos.");
    }
  };

  return (
    <div className="create-product">
      <div className="create-product-container">
        <h1>Agregar Usuario</h1>
        {message && (
          <p
            className={`message ${
              message.includes("exitosamente") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="create-product-fields">
          <input
            type="text"
            name="Name"
            placeholder="Nombre Completo"
            value={userData.Name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="TelephoneNumber"
            placeholder="Número de Teléfono"
            value={userData.TelephoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Address"
            placeholder="Dirección"
            value={userData.Address}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <select
            name="Role"
            value={userData.Role}
            onChange={handleChange}
            required
          >
            <option value="Normal">Normal</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Agregar Usuario</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
