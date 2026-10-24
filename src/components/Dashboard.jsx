import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { EventContext } from "../context/EventContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Dashboard() {
  const user = useContext(UserContext);
  const { events, loading, addToCart } = useContext(EventContext);

  useDocumentTitle("Event Dashboard");

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Welcome, {user ? user.name : "Guest"}!</h2>
      <p>Role: {user ? user.role : "N/A"}</p>

      <hr style={{ margin: "20px 0" }} />

      <h3>Events from MongoDB</h3>

      {loading ? (
        <p>Loading events from database...</p>
      ) : events.length === 0 ? (
        <p>No events found in database.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
          {events.map((event) => (
            <div
              key={event._id || event.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <h4>{event.title}</h4>
              <p>Category: {event.category}</p>
              <p>Location: {event.location}</p>
              <p>Price: ${event.price || event.ticketPrice}</p>
              <button
                onClick={() => addToCart(event)}
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Get Tickets →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;