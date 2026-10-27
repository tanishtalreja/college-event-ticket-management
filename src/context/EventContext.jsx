import { createContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

export const EventContext = createContext();

const defaultSampleEvents = [
  {
    id: 1,
    title: "Tech Fest 2026",
    category: "Technology",
    date: "25 AUG",
    location: "Main Auditorium",
    price: 100,
    availableTickets: 50,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    description: "A full day of coding, robotics, innovation and everything tech."
  },
  {
    id: 2,
    title: "Cultural Night",
    category: "Cultural",
    date: "30 AUG",
    location: "College Ground",
    price: 150,
    availableTickets: 120,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    description: "Music, dance, drama and unforgettable performances under the lights."
  },
  {
    id: 3,
    title: "Inter College Cricket",
    category: "Sports",
    date: "05 SEP",
    location: "College Sports Ground",
    price: 80,
    availableTickets: 200,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=80",
    description: "Bring your squad and cheer for your college at the biggest cricket clash."
  },
  {
    id: 4,
    title: "Photography Workshop",
    category: "Workshop",
    date: "10 SEP",
    location: "Seminar Hall",
    price: 200,
    availableTickets: 30,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    description: "Learn photography, composition and creative storytelling from experts."
  },
  {
    id: 5,
    title: "Startup Summit",
    category: "Business",
    date: "15 SEP",
    location: "Conference Hall",
    price: 250,
    availableTickets: 80,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    description: "Meet founders, creators and entrepreneurs building the next big thing."
  },
  {
    id: 6,
    title: "Music Festival",
    category: "Cultural",
    date: "20 SEP",
    location: "College Ground",
    price: 120,
    availableTickets: 150,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
    description: "Live music, student bands and an evening made for good vibes."
  }
];

export function EventProvider({ children }) {
  const [events, setEvents] = useState(defaultSampleEvents);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
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
      if (Array.isArray(data) && data.length > 0) {
        setEvents(data);
      }
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