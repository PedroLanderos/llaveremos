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

  const saveImageToPublic = (image, id) => {
    const newFileName = `product_${id}.png`;

    // Crear un enlace para descargar la imagen en `public/assets/images`
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const blob = new Blob([fileReader.result], { type: image.type });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `public/assets/images/${newFileName}`;
      a.click();
      URL.revokeObjectURL(url);
    };
    fileReader.readAsArrayBuffer(image);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (selectedImage) {
      try {
        saveImageToPublic(selectedImage, editingProduct.id); // Guardar la imagen en `public`
        setMessage("Imagen guardada exitosamente.");
      } catch (error) {
        console.error("Error al guardar la imagen:", error);
        setMessage("Error al guardar la imagen. Intenta de nuevo.");
        return;
      }
    }

    try {
      const response = await axios.put(
        "https://localhost:5003/api/products",
        editingProduct,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`, // Usar el token del contexto
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setMessage("Producto actualizado exitosamente.");
        setEditingProduct(null);
        fetchProducts(); // Actualizar la lista después de la edición
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      setMessage("Error al actualizar el producto. Intenta de nuevo.");
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
                accept="image/png"
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
