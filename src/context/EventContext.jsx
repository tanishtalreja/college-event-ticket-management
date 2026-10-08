import { createContext, useState } from "react";

// 1. Create Context
export const EventContext = createContext();

// 2. Create Provider
export function EventProvider({ children }) {
  // Global State
  const [cart, setCart] = useState([]);

  // Action 1: Add Event Ticket to Cart
  const addToCart = (event) => {
    setCart((prevCart) => [...prevCart, event]);
  };

  // Action 2: Remove Event Ticket from Cart
  const removeFromCart = (eventId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== eventId));
  };

  return (
    <EventContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </EventContext.Provider>
  );
}