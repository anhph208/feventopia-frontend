import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.eventId === item.eventId
      );

      if (existingItemIndex >= 0) {
        const updatedCartItems = [...prevItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          ticketCount:
            updatedCartItems[existingItemIndex].ticketCount + item.ticketCount,
          eventBanner: item.eventBanner,
        };
        toast.success("Vé đã được thêm vào Giỏ Hàng!");
        return updatedCartItems;
      }


      return [...prevItems, item];
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    toast.success("Đã xóa vé khỏi Giỏ hàng!");
  };

  const clearCart = () => {
    setCartItems([]);
    // toast.success("Giỏ hàng đang trống!");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
