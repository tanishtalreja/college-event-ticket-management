import { createContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch live events from MongoDB Atlas via Express API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/events`);
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching events from MongoDB API:", err);
      setError(err.message);
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
        error,
        fetchEvents,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}