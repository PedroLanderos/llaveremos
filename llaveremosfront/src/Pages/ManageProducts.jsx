import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext"; // Importar el contexto de autenticación
import "./CSS/ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const { auth } = useContext(AuthContext); // Usar el contexto para obtener el token

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:5003/api/products", {
        headers: {
          Authorization: `Bearer ${auth.token}`, // Usar el token del contexto
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setMessage("Error al obtener los productos.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setSelectedImage(null); // Reiniciar la selección de imagen
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Guardar la imagen seleccionada
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      // Actualizar el producto en el backend .NET
      const productResponse = await axios.put(
        "https://localhost:5003/api/products",
        editingProduct,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (productResponse.status !== 200 && productResponse.status !== 201) {
        throw new Error("El producto no pudo ser actualizado.");
      }

      // Subir la imagen al servidor con el nombre `product_{id}`
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadResponse = await axios.post(
          `http://localhost:50005/upload/${editingProduct.id}`,
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

      // Mostrar mensaje de éxito y actualizar la lista de productos
      setMessage("Producto actualizado exitosamente.");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar el producto o subir la imagen:", error);
      setMessage("Hubo un problema: " + error.message);
    }
  };

  return (
    <div className="manage-products">
      <h1>Administrar Productos</h1>
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
      {!editingProduct ? (
        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleEditClick(product)}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="edit-product-container">
          <h2>Editar Producto</h2>
          <form onSubmit={handleUpdateSubmit} className="edit-product-form">
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Cantidad:
              <input
                type="number"
                name="quantity"
                value={editingProduct.quantity}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Precio:
              <input
                type="number"
                step="0.01"
                name="price"
                value={editingProduct.price}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Imagen:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={() => setEditingProduct(null)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
