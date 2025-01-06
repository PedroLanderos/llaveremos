import React, { useState, useEffect } from "react";
import "./Products.css";
import axios from "axios";
import Items from "../Items/Items";
import { Link } from "react-router-dom"; // Importar Link

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5003/api/products/available"
        );
        const data = response.data;

        const productsWithImages = data.map((product) => ({
          ...product,
          image: `http://localhost:50005/uploads/product_${product.id}.png`,
        }));

        setProducts(productsWithImages);
      } catch (error) {
        setMessage("Error al obtener los productos disponibles.");
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products">
      <h1>Productos Disponibles</h1>
      <hr />
      {message && <p style={{ color: "red", textAlign: "center" }}>{message}</p>}
      <div className="collections">
        {products.length > 0 ? (
          products.map((item) => (
            <div key={item.id} className="item-container">
              {/* Link envuelve la imagen y el componente Items */}
              <Link to={`/product/${item.id}`} className="product-link">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <Items
                  id={item.id}
                  name={item.name}
                  new_price={item.price}
                />
              </Link>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default Products;
