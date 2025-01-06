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
      .reduce((total, item) => total + (item.new_price || 0) * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    if (!auth?.user?.id) {
      alert("No se pudo obtener el ID del cliente. Inicia sesión nuevamente.");
      return;
    }

    const clientId = auth.user.id; // ID del cliente correcto

    try {
      const responses = await Promise.all(
        cartItems.map(async (item) => {
          const order = {
            productId: item.id, // ID del producto
            clientId: clientId, // ID del cliente
            purchaseQuantity: item.quantity,
            orderedDate: new Date().toISOString(),
          };

          console.log("Procesando orden (verificar campos):", {
            productId: item.id,
            clientId: clientId,
          });

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

          console.log("Respuesta de creación de orden:", orderResponse.data);

          // Obtener datos actuales del producto
          const productResponse = await axios.get(
            `https://localhost:5003/api/products/${item.id}`
          );
          const productData = productResponse.data;

          console.log("Datos del producto antes de actualizar:", productData);

          // Calcular nueva cantidad
          const updatedQuantity = productData.quantity - item.quantity;
          if (updatedQuantity < 0) {
            throw new Error(
              `Cantidad negativa detectada para el producto ${productData.name}`
            );
          }

          // Actualizar el inventario del producto
          const updateResponse = await axios.put(
            "https://localhost:5003/api/products",
            {
              id: productData.id,
              name: productData.name,
              quantity: updatedQuantity,
              price: productData.price,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );

          console.log(
            "Respuesta de actualización de inventario:",
            updateResponse.data
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
      console.error("Error al realizar la compra:", error.response?.data || error.message);
      alert("Ocurrió un error al procesar la compra. Inténtalo de nuevo.");
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
                  <span>{item.quantity}</span>
                  <button
                    onClick={async () => {
                      try {
                        const response = await axios.get(
                          `https://localhost:5003/api/products/${item.id}`
                        );
                        const product = response.data;

                        if (item.quantity < product.quantity) {
                          updateCartItemQuantity(item.id, item.quantity + 1);
                        } else {
                          alert("No hay suficiente stock disponible.");
                        }
                      } catch (error) {
                        console.error("Error al validar stock:", error);
                        alert("Error al validar stock. Inténtalo más tarde.");
                      }
                    }}
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
