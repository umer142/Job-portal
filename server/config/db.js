import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/job-portal`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Listen for DB connection errors
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB Connection Error: ${err}`);
});

export default connectDB;
