import express from "express";
import {
  ChangeJobApllicationsStatus,
  changeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";
import { updateApplicationStatus } from "../controllers/userController.js";
import { deleteJob } from "../controllers/jobControllers.js";

const router = express.Router();

//  Register a company

router.post("/register", upload.single("image"), registerCompany);

//  Company Login

router.post("/login", loginCompany);

// Get company data
router.get("/company", protectCompany, getCompanyData);

// Post a job
router.post("/post-job", protectCompany, postJob);

// Get  Applicants data of company
router.get("/applicants", protectCompany, getCompanyJobApplicants);

// Get Company Job List
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

// Change Application Statuse
router.post("/change-status", protectCompany, ChangeJobApllicationsStatus);

// Change Application Visiblity

router.post("/change-visiblity", protectCompany, changeVisiblity);

router.put(
  "/applicants/update-status/:applicationId",
  protectCompany,
  updateApplicationStatus
);

router.delete("/jobs/delete/:jobId", deleteJob);

export default router;
