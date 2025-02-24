import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Store Clerk ID separately
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String, default: "" },
  image: { type: String, required: true },
});

// Mongoose automatically assigns an `_id` of type ObjectId, no need to manually define it.
const User = mongoose.model("User", userSchema);

export default User;
