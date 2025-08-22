
import express from "express";
const app = express();
import cors from "cors";
app.use(cors({
  origin: "https://trip-planner-frontend-rohf.onrender.com", // frontend URL
  credentials: true,   // allow cookies/auth headers
}));

import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";  

const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());






// --- Your routes below ---

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server.js

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv"; // Make sure dotenv is configured at the top
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// // Import your other route files here if you have them
// // import userRoutes from "./routes/userRoutes.js";
// // import adventureRoutes from "./routes/adventureRoutes.js";

// // Load environment variables from .env file
// dotenv.config();

// const app = express();

// // Connect to the database
// connectDB();

// // --- Dynamic CORS Configuration ---
// // Read the allowed origins from the environment variable.
// const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
//   ? process.env.CORS_ALLOWED_ORIGINS.split(',')
//   : [];

// // If no origins are specified in .env, log a warning.
// if (allowedOrigins.length === 0) {
//     console.warn("Warning: No CORS origins specified in .env file. Requests may be blocked.");
// }

// const corsOptions = {
//   origin: (origin, callback) => {
//     // The 'origin' is the URL of the frontend making the request.
//     // We check if this origin is in our 'allowedOrigins' array.
//     // '!origin' allows server-to-server requests or tools like Postman.
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); // Allow the request
//     } else {
//       callback(new Error("This origin is not allowed by CORS")); // Block the request
//     }
//   },
//   credentials: true, // This allows cookies and authorization headers to be sent.
// };

// // --- Global Middleware ---
// app.use(cors(corsOptions)); // Use the dynamic CORS options
// app.use(express.json()); // Middleware to parse JSON bodies
// app.use(cookieParser()); // Middleware to parse cookies

// // --- API Routes ---
// app.use("/api/auth", authRoutes);
// // app.use("/api/user", userRoutes);
// // app.use("/api/adventure", adventureRoutes);


// // --- Root Route ---
// app.get("/", (req, res) => {
//   res.send("Backend is running ✅");
// });

// // --- Server Initialization ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log(`Accepting requests from: ${allowedOrigins.join(", ")}`);
// });