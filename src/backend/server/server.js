

import express from "express";
import dotenv from "dotenv";
import cors from "cors"; //
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adventureRoutes from "./routes/adventureRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // The origin of your React frontend
  credentials: true // This is crucial for allowing cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/adventure", adventureRoutes);

app.get("/", (req, res) => res.send("Server running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
