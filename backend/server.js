import express from "express";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 4000;
connectDB();

// import Routers
import authRouter from "./routes/authRoutes.js";
app.use("/api/auth/", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
