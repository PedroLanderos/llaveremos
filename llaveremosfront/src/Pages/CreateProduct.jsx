import React, { useState, useContext } from "react";
import axios from "axios";
import "./CSS/CreateProduct.css";
import { AuthContext } from "../Context/AuthContext";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const { auth } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Guardar la imagen seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear el producto en el backend .NET
      const productResponse = await axios.post(
        "https://localhost:5003/api/products",
        product,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`, // Requiere autorización
          },
        }
      );

      if (productResponse.status !== 200 && productResponse.status !== 201) {
        throw new Error("El producto no pudo ser creado.");
      }

      // Obtener el ID del último producto creado
      const productsResponse = await axios.get("https://localhost:5003/api/products"); // No necesita autorización
      const products = productsResponse.data;

      // Encontrar el producto con el ID más alto
      const lastProduct = products.reduce((max, product) =>
        product.id > max.id ? product : max
      );

      // Subir la imagen al servidor con el nombre `product_{id}`
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const uploadResponse = await axios.post(
          `http://localhost:50005/upload/${lastProduct.id}`, // Usar el ID del último producto
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (uploadResponse.status !== 200) {
          throw new Error("La imagen no pudo ser subida correctamente.");
        }
      }

      // Mostrar mensaje de éxito y reiniciar el formulario
      setMessage("Producto creado exitosamente.");
      setProduct({
        name: "",
        price: "",
        quantity: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error al crear el producto o subir la imagen:", error);
      setMessage("Hubo un problema: " + error.message);
    }
  };

  return (
    <div className="create-product">
      <div className="create-product-container">
        <h1>Crear Producto</h1>
        <form onSubmit={handleSubmit} className="create-product-fields">
          <input
            type="text"
            name="name"
            placeholder="Nombre del producto"
            value={product.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={product.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Cantidad"
            value={product.quantity}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit">Crear Producto</button>
        </form>
        {message && (
          <p
            className={`message ${
              message.includes("exitosamente") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
