// Centralized API Base URL configuration
// Uses import.meta.env.VITE_API_URL if configured,
// defaults to the production Render backend URL.
const envApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = (
  envApiUrl && envApiUrl.trim() !== ""
    ? envApiUrl.trim()
    : "https://college-event-ticket-management.onrender.com"
).replace(/\/+$/, "");

export default API_BASE_URL;
