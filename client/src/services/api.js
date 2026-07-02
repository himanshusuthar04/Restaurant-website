// import axios from "axios";

// // const API = axios.create({ baseURL: "http://localhost:5000/api" });
// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
// });
// // Add token to every request if available
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default API;

import axios from "axios";

// Fix 1: Use env variable instead of hardcoded localhost
const baseURL = (
  process.env.REACT_APP_API_URL || "http://localhost:5000/api"
).replace(/\/$/, ""); // Fix 2: strip trailing slash to avoid double-slash URLs

const API = axios.create({
  baseURL,
  timeout: 15000, // Fix 3: 15s timeout handles Render cold starts
  headers: { "Content-Type": "application/json" },
});

// Add token to every request
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (err) => Promise.reject(err) // Fix 4: missing error handler
);

// Auto-logout on expired token
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"; // Fix 5: guard against redirect loop
      }
    }
    return Promise.reject(err);
  }
);

export default API;
