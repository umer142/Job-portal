import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";

// Initialize Express
const app = express();

// ✅ FIX 1: JSON Middleware should be before Clerk
app.use(express.json()); // ⬅️ This should be before clerkMiddleware

// ✅ FIX 2: Ensure Database and Cloudinary Connections are Established
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    // ✅ FIX 3: Clerk Middleware AFTER JSON parsing
    app.use(clerkMiddleware());

    // ✅ CORS Configuration
    app.use(
      cors({
        origin: "https://job-portal-client-iglg.onrender.com",
        origin: "https://emperistaffing.com",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );

    // Routes
    app.get("/", (req, res) => res.send("API is working"));
    app.get("/debug-sentry", function mainHandler(req, res) {
      throw new Error("My first Sentry error!");
    });

    app.post("/webhooks", clerkWebhooks);
    app.use("/api/company", companyRoutes);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/users", userRoutes);

    // PORT
    const PORT = process.env.PORT || 5000;
    Sentry.setupExpressErrorHandler(app);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1); // Exit process if connection fails
  }
};

startServer(); // Start the server
