import React, { useContext } from "react";
import "./CSS/Cart.css";
import { ShopContext } from "../Context/ShopContext";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeItemFromCart, clearCart } =
    useContext(ShopContext);
  const { auth } = useContext(AuthContext);

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) => total + (item.price || 0) * item.cartQuantity,
        0
      )
      .toFixed(2);
  };

  const handleCheckout = async () => {
    if (!auth?.user?.id) {
      alert("No se pudo obtener el ID del cliente. Inicia sesión nuevamente.");
      return;
    }

    const clientId = auth.user.id;

    try {
      const responses = await Promise.all(
        cartItems.map(async (item) => {
          const order = {
            productId: item.id,
            clientId: clientId,
            purchaseQuantity: item.cartQuantity,
            orderedDate: new Date().toISOString(),
          };

          // Crear orden
          const orderResponse = await axios.post(
            "https://localhost:5003/api/orders/",
            order,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );

          return orderResponse;
        })
      );

      if (responses.every((res) => res.status === 200 || res.status === 201)) {
        alert("¡Compra realizada con éxito!");
        clearCart();
      } else {
        alert("Algunas compras no se completaron correctamente.");
      }
    } catch (error) {
      console.error(
        "Error al realizar la compra:",
        error.response?.data || error.message
      );
      alert("Ocurrió un error al procesar la compra. Inténtalo de nuevo.");
    }
  };

  const handleIncreaseQuantity = async (item) => {
    try {
      const response = await axios.get(
        `https://localhost:5003/api/products/${item.id}`
      );
      const productData = response.data;

      if (item.cartQuantity < productData.quantity) {
        updateCartItemQuantity(item.id, item.cartQuantity + 1);
      } else {
        alert(`Solo hay ${productData.quantity} unidades disponibles.`);
      }
    } catch (error) {
      console.error("Error al validar stock:", error);
      alert("Error al validar stock. Inténtalo más tarde.");
    }
  };

  return (
    <div className="cart">
      <h1>Tu Carrito de Compras</h1>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Tu carrito está vacío.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image || "https://via.placeholder.com/120"}
                alt={item.name || "Producto"}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h2>{item.name || "Producto desconocido"}</h2>
                <p>Precio unitario: ${item.price?.toFixed(2) || "0.00"}</p>
                <div className="cart-item-controls">
                  <button
                    onClick={() =>
                      item.cartQuantity > 1
                        ? updateCartItemQuantity(item.id, item.cartQuantity - 1)
                        : removeItemFromCart(item.id)
                    }
                  >
                    -
                  </button>
                  <span>{item.cartQuantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="remove-item"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h2>Total: ${calculateTotal()}</h2>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
