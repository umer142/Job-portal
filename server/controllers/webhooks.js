import User from "../models/User.js";
import { Webhook } from "svix"; // Ensure you import Webhook

// API Controller function to manage Clerk User with the database
export const clerkWebhooks = async (req, res) => {
  try {
    console.log("Received Clerk Webhook:", JSON.stringify(req.body, null, 2)); // Debugging logs

    // Verify the webhook signature
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    // Handle different Clerk webhook events
    switch (type) {
      case "user.created": {
        console.log("Creating new user...");

        const userData = {
          _id: data.id, // Using `id` instead of `_id`
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);
        res
          .status(201)
          .json({ success: true, message: "User created successfully." });
        break;
      }

      case "user.updated": {
        console.log("Updating user...");

        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };

        const updatedUser = await User.findOneAndUpdate(
          { _id: data.id },
          userData,
          { new: true }
        );

        if (!updatedUser) {
          return res
            .status(404)
            .json({ success: false, message: "User not found." });
        }

        res.json({ success: true, message: "User updated successfully." });
        break;
      }

      case "user.deleted": {
        console.log("Deleting user...");

        const deletedUser = await User.findOneAndDelete({ _id: data.id });

        if (!deletedUser) {
          return res
            .status(404)
            .json({ success: false, message: "User not found." });
        }

        res.json({ success: true, message: "User deleted successfully." });
        break;
      }

      default:
        console.log("Unhandled event type:", type);
        res
          .status(400)
          .json({ success: false, message: "Unhandled event type." });
    }
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Webhook processing failed." });
  }
};
