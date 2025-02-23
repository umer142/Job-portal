import express from "express";
import {
  applyForJob,
  createUser,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

// Get user Data
router.get("/user", getUserData);
router.post("/create-user", createUser);

// Apply for a job
router.post("/apply", applyForJob);
// Apply for a job

// Get applied jobs Data
router.get("/applications", getUserJobApplications);

// Update   user profile (resume)
router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
