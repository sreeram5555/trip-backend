

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors"; //
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import adventureRoutes from "./routes/adventureRoutes.js";


// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors({
//   origin: ["http://localhost:3000", "https://trip-project-ma1k.vercel.app"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/adventure", adventureRoutes);

// app.get("/", (req, res) => res.send("Server running 🚀"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";  

const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());


// ✅ Replace * with your frontend origin
// app.use(cors({
//   // origin: 'https://trip-planner-frontend-rohf.onrender.com', // The ONLY origin you trust
//   origin:"http://localhost:5000/",
//   credentials: true,                             // Allow cookies/tokens
// }));
// app.use(cors({
//   origin: "http://localhost:3000",  // Your frontend
//   credentials: true,                 // Allow cookies/tokens
// }));


// --- Your routes below ---

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
