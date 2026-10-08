import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Dashboard() {
  const user = useContext(UserContext);

  useDocumentTitle("Event Dashboard");

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user ? user.name : "Guest"}!</p>
      <p>Role: {user ? user.role : "N/A"}</p>
    </div>
  );
}

export default Dashboard;