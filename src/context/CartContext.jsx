import React, { createContext, useContext, useState } from "react";
import cartService from "../service/CartService";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const response = await cartService.countItems();
      if (response.data) {
        setCartCount(response.data.count);
      }
    } catch (error) {
      console.error("Error updating cart count:", error);
      setCartCount(0);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
