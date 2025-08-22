

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
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// ✅ Temporary CORS setup (open for all)
app.use(
  cors({
    origin: "*",  // allow requests from anywhere
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running 🎉" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
});
