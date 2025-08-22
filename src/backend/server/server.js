
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";  
// import authRoutes from "./routes/authRoutes.js";

// const app = express();

// // --- Connect to database ---
// connectDB();

// // --- Middleware ---
// app.use(cors({
//   origin: "https://trip-planner-frontend-rohf.onrender.com",
//   credentials: true,
// }));
// app.use(express.json());
// app.use(cookieParser());

// // --- Routes ---
// app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend is running ✅");
// });

// // --- Start server ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";  
import authRoutes from "./routes/authRoutes.js";

const app = express();

// --- Connect to database ---
connectDB(); // Make sure your DB URI is correct in ./config/db.js

// --- Middleware ---
// CORS must be at the top before any route handling
app.use(cors({
  origin: "https://trip-planner-frontend-rohf.onrender.com", // frontend URL
  credentials: true, // allow cookies/auth headers
}));

// Body parser to handle JSON requests
app.use(express.json());

// Cookie parser to handle cookies
app.use(cookieParser());

// --- Routes ---
app.use("/api/auth", authRoutes);

// Default route to check backend status
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
