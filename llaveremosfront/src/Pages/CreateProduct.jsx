import React, { useState, useContext } from 'react';
import axios from 'axios';
import './CSS/CreateProduct.css';
import { AuthContext } from '../Context/AuthContext';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
  });
  const [message, setMessage] = useState('');
  const { auth } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:5003/api/products', product, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        setMessage('Producto creado exitosamente.');
        setProduct({
          name: '',
          price: '',
          quantity: '',
        });
      } else {
        setMessage('Error al crear el producto.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Hubo un problema al crear el producto.');
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
          <button type="submit">Crear Producto</button>
        </form>
        {message && (
          <p
            className={`message ${
              message.includes('exitosamente') ? 'success' : 'error'
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
