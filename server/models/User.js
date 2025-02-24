import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // ✅ Explicitly set _id as String
  clerkId: { type: String, required: true, unique: true }, // Store Clerk ID separately
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String },
  image: { type: String, required: true },
});

// ✅ Fix: Ensure Mongoose treats `_id` as a String
const User = mongoose.model("User", userSchema);

export default User;
