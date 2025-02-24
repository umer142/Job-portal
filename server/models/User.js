import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Clerk ID as _id
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String, default: "" }, // Default empty string for optional fields
  image: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
