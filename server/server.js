const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// =======================
// CORS Configuration
// =======================
const allowedOrigins = [
  "http://localhost:3000",
  /^https:\/\/.*\.vercel\.app$/, // all Vercel preview + production URLs
  /^https:\/\/.*\.netlify\.app$/, // all Netlify URLs
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, Render health checks)
      if (!origin) return callback(null, true);
      const allowed = allowedOrigins.some((item) =>
        typeof item === "string" ? item === origin : item.test(origin)
      );
      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
  })
);

// Middleware — must come BEFORE routes
app.use(express.json({ limit: "1mb" })); // Fix: add payload size limit

// =======================
// Routes
// =======================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Default Route — used to test if server is alive
app.get("/", (req, res) => {
  res.send("CozyBite API is running...");
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
