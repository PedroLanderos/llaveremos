import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("Carrito guardado en LocalStorage:", cartItems);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      const newCart = existingItem
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          )
        : [...prevCart, { ...product, cartQuantity: 1 }];
      console.log("Carrito actualizado:", newCart);
      return newCart;
    });
  };

  const updateCartItemQuantity = (id, cartQuantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, cartQuantity: Math.max(1, cartQuantity) }
          : item
      )
    );
  };

  const removeItemFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
