import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import { ObjectId } from "mongodb";

// Get User data
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    console.log("userId: ", userId);
    const user = await User.findById(userId);
    console.log("user: ", user);
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//  Apply for a Job
export const applyForJob = async (req, res) => {
  console.log(req.body.jobId);
  console.log(req.auth.userId);

  const jobId = new ObjectId(req.body.jobId);
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({
      jobId: jobId,
      userId: userId,
    });

    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: "Already Applied" });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({ success: false, message: "Job Not Found" });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const createUser = async (req, res) => {
  const userId = req.auth.userId;
  const name = req.name;
  const email = req.email;
  const image = req.image;

  try {
    const userData = await User.findById(userId);

    if (userData) {
      return res.json({ success: false, message: "Already has user" });
    }

    await User.create({
      _id: userId,
      name: name,
      email: email,
      image: image,
    });

    res.json({ success: true, message: "User created Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get user applied applications
export const getUserJobApplications = async (req, res) => {
  const userId = req.auth.userId;

  console.log(userId);
  try {
    const applications = await JobApplication.find({ userId: userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "No Job applications found for this user.",
      });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// update user profile (resume)
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const resumeFile = req.file;

    const userData = await User.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.json({ success: true, message: "Resume Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// update applications status

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { applicationId } = req.params;
    console.log(req.params);
    // Validate status
    if (!status || !["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. It must be 'Accepted' or 'Rejected'.",
      });
    }
    console.log(applicationId);
    // Validate applicationId
    if (!applicationId) {
      return res.status(400).json({
        success: false,
        message: "Application ID is required.",
      });
    }

    // Find the application
    const application = await JobApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    // Update status
    application.status = status;
    await application.save(); // Ensure save is awaited

    res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the application status.",
      error: error?.message || error,
    });
  }
};
