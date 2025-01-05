import React, { useState } from 'react';
import axios from 'axios';
import './CSS/PanelDeAdministrador.css';

const PanelDeAdministrador = () => {
  const [activeTab, setActiveTab] = useState('');
  const [activeSubmenu, setActiveSubmenu] = useState('');
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const toggleSubmenu = (menu) => {
    setActiveSubmenu((prev) => (prev === menu ? '' : menu));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar datos del producto al backend
      const response = await axios.post('https://localhost:5003/api/products', product);
      if (response.status === 201 || response.status === 200) {
        const productId = response.data.id; // Obtén el ID del producto

        // Guardar la imagen localmente en el frontend
        if (image) {
          const formData = new FormData();
          formData.append('file', image);
          formData.append('productId', productId);

          // Guardar la imagen localmente en el frontend
          const saveImageResponse = await fetch('/save-image', {
            method: 'POST',
            body: formData,
          });

          if (saveImageResponse.ok) {
            setMessage('Producto e imagen agregados exitosamente.');
          } else {
            setMessage('Producto agregado, pero hubo un error al subir la imagen.');
          }
        } else {
          setMessage('Producto agregado exitosamente.');
        }

        // Resetear formulario
        setProduct({
          name: '',
          price: '',
          quantity: '',
        });
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al agregar el producto. Inténtalo de nuevo.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'agregarUsuario':
        return <div>Agregar Usuario</div>;
      case 'administrarUsuarios':
        return <div>Administrar Usuarios</div>;
      case 'agregarProducto':
        return (
          <div className="loginsingup">
            <div className="loginSingup-container">
              <h1>Agregar Producto</h1>
              <form onSubmit={handleProductSubmit}>
                <div className="loginsignup-fields">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre del producto"
                    value={product.name}
                    onChange={handleProductChange}
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={product.price}
                    onChange={handleProductChange}
                    required
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Cantidad"
                    value={product.quantity}
                    onChange={handleProductChange}
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>
                <button type="submit">Agregar Producto</button>
              </form>
              {message && (
                <p style={{ marginTop: '20px', color: message.includes('exitosamente') ? 'green' : 'red' }}>
                  {message}
                </p>
              )}
            </div>
          </div>
        );
      case 'administrarProductos':
        return <Productos />;
      case 'administrarCompras':
        return <Compras />;
      default:
        return <div>Selecciona una sección del panel.</div>;
    }
  };

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h1>Panel de Administrador</h1>
        <ul>
          <li onClick={() => toggleSubmenu('productos')} className={activeSubmenu === 'productos' ? 'active' : ''}>
            Productos
            {activeSubmenu === 'productos' && (
              <ul className="submenu">
                <li onClick={() => setActiveTab('agregarProducto')}>Agregar Producto</li>
                <li onClick={() => setActiveTab('administrarProductos')}>Administrar Productos</li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleSubmenu('usuarios')} className={activeSubmenu === 'usuarios' ? 'active' : ''}>
            Usuarios
            {activeSubmenu === 'usuarios' && (
              <ul className="submenu">
                <li onClick={() => setActiveTab('agregarUsuario')}>Agregar Usuario</li>
                <li onClick={() => setActiveTab('administrarUsuarios')}>Administrar Usuarios</li>
              </ul>
            )}
          </li>
          <li onClick={() => setActiveTab('administrarCompras')} className={activeTab === 'administrarCompras' ? 'active' : ''}>
            Compras
          </li>
        </ul>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

const Productos = () => (
  <div>
    <h2>Administrar Productos</h2>
    <p>Aquí puedes agregar, editar o eliminar productos.</p>
  </div>
);

const Compras = () => (
  <div>
    <h2>Administrar Compras</h2>
    <p>Aquí puedes revisar y administrar las compras realizadas.</p>
  </div>
);

export default PanelDeAdministrador;
