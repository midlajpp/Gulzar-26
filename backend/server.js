import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import newsRoutes from "./routes/newsRoutes.js";
import galleryRoutes from "../backend/routes/galleryRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import participantRoutes from "./routes/participantRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// routes
app.use("/api/news", newsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/participants", participantRoutes);

// db
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Gulzar API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
