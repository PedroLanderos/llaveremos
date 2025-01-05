import React, { useState, useEffect } from 'react';
import './Products.css';
import axios from 'axios';
import Items from '../Items/Items';

// Función para cargar imágenes dinámicamente
const importAll = (r) => {
  let images = {};
  r.keys().forEach((key) => {
    // Extraer el ID del nombre del archivo (ejemplo: product_12.png)
    const id = key.match(/product_(\d+)\.png$/)?.[1];
    if (id) {
      images[id] = r(key);
    }
  });
  return images;
};

// Importa todas las imágenes desde la carpeta Assets/Images
const images = importAll(require.context('../Assets/Images', false, /\.png$/));

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Obtener productos de la API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:5003/api/products');
        const data = response.data;

        // Asociar imágenes a los productos
        const productsWithImages = data.map((product) => ({
          ...product,
          image: images[product.id] || null, // Asignar imagen según ID
          new_price: product.price, // Precio actual de la API
          old_price: null, // Asignar null si no hay precio antiguo
        }));

        setProducts(productsWithImages);
      } catch (error) {
        setMessage('Error al obtener los productos.');
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products">
      <h1>Todos los llaveros</h1>
      <hr />
      {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
      <div className="collections">
        {products.length > 0 ? (
          products.map((item) => (
            <Items
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default Products;
