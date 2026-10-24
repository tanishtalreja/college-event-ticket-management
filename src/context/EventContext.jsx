import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live events from MongoDB Atlas via Express API
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events from MongoDB:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Global Cart Action: Add/Update Ticket
  const addToCart = (event, qty) => {
    setCart((prevCart) => {
      const eventId = event._id || event.id;
      const existing = prevCart.find((item) => (item._id || item.id) === eventId);

      if (existing) {
        return prevCart.map((item) =>
          (item._id || item.id) === eventId
            ? { ...item, tickets: item.tickets + qty }
            : item
        );
      }
      return [...prevCart, { ...event, tickets: qty }];
    });
  };

  // Global Cart Action: Remove Ticket
  const removeFromCart = (eventId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => (item._id || item.id) !== eventId)
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        cart,
        loading,
        fetchEvents,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}