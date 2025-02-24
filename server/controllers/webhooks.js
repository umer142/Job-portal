import User from "../models/User.js";
import { Webhook } from "svix"; // Ensure you import Webhook

// API Controller function to manage Clerk user with database
export const clerkWebhooks = async (req, res) => {
  try {
    console.log(
      "🔹 Clerk Webhook Received:",
      JSON.stringify(req.body, null, 2)
    );

    // Verify Clerk webhook headers
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    // Switch Case for different events
    switch (type) {
      case "user.created": {
        console.log("✅ Creating new user in database...");
        const userData = {
          clerkId: data.id, // Store Clerk ID separately
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: "",
        };

        const newUser = await User.create(userData);
        console.log("✅ User created successfully:", newUser);
        res.json({ success: true, message: "User created" });
        break;
      }
      case "user.updated": {
        console.log("✅ Updating user in database...");
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };

        const updatedUser = await User.findOneAndUpdate(
          { clerkId: data.id },
          userData,
          { new: true }
        );

        if (!updatedUser) {
          console.log("❌ User not found for update:", data.id);
          return res
            .status(404)
            .json({ success: false, message: "User Not Found" });
        }

        console.log("✅ User updated successfully:", updatedUser);
        res.json({ success: true, message: "User updated" });
        break;
      }
      case "user.deleted": {
        console.log("✅ Deleting user from database...");
        const deletedUser = await User.findOneAndDelete({ clerkId: data.id });

        if (!deletedUser) {
          console.log("❌ User not found for deletion:", data.id);
          return res
            .status(404)
            .json({ success: false, message: "User Not Found" });
        }

        console.log("✅ User deleted successfully:", deletedUser);
        res.json({ success: true, message: "User deleted" });
        break;
      }
      default:
        console.log("⚠️ Unhandled Clerk webhook event:", type);
        res
          .status(400)
          .json({ success: false, message: "Unhandled webhook event" });
        break;
    }
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    res.status(500).json({ success: false, message: "Webhooks Error" });
  }
};
