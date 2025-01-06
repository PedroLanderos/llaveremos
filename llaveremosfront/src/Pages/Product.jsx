import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CSS/Product.css";
import { ShopContext } from "../Context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const { addToCart, cartItems } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5003/api/products/${productId}`
        );
        const data = response.data;

        const productWithImage = {
          ...data,
          image: `http://localhost:50005/uploads/product_${data.id}.png`,
        };

        setProduct(productWithImage);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los detalles del producto.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    const cartItem = cartItems.find((item) => item.id === product.id) || { quantity: 0 };

    if (cartItem.quantity < product.quantity) {
      addToCart(product);
    } else {
      alert("No hay suficiente stock disponible.");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!product) {
    return <div className="product-not-found">Producto no encontrado</div>;
  }

  return (
    <div className="product-details">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <p>Imagen no disponible</p>
        )}
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-prices">
          <span className="new-price">${product.price}</span>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default Product;
