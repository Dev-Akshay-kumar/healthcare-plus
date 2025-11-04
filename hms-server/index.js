import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import hospitalRouter from "./hospitals/route.js";
import doctorRouter from "./doctors/route.js";
import patientRouter from "./patients/route.js";
import appointmentRouter from "./appointments/route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Simple logger middleware (optional)
app.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

// Routes
app.use("/api/hospitals", hospitalRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/appointments", appointmentRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// ✅ Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
