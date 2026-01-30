// db.js
import mongoose from "mongoose";

/**
 * Connect to MongoDB using Mongoose.
 * The MongoDB URI should be stored in environment variables for security.
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
