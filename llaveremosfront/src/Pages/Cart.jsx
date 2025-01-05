import React, { useContext } from "react";
import "./CSS/Cart.css";
import { ShopContext } from "../Context/ShopContext";

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeItemFromCart } =
    useContext(ShopContext);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.new_price || 0) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="cart">
      <h1>Tu Carrito de Compras</h1>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Tu carrito está vacío.</p>
        ) : (
          cartItems.map((item) =>
            item ? (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image || "https://via.placeholder.com/120"}
                  alt={item.name || "Producto"}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h2>{item.name || "Producto desconocido"}</h2>
                  <p>Precio: ${item.new_price?.toFixed(2) || "0.00"}</p>
                  <div className="cart-item-controls">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateCartItemQuantity(item.id, item.quantity - 1)
                          : removeItemFromCart(item.id)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.id, (item.quantity || 0) + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="remove-item"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ) : null
          )
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h2>Total: ${calculateTotal()}</h2>
          <button
            className="checkout-button"
            onClick={() => alert("Función de pago pendiente")}
          >
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
