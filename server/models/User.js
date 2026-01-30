import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is mandatory
    trim: true,
  },
  email: {
    type: String,
    required: true, // Email is mandatory
    unique: true,   // Ensure no duplicates
    lowercase: true,
    trim: true,
  },
  password: {
    trim: true,
  },
  email: {
    type: String,
    required: true, // Email is mandatory
    unique: true,   // Ensure no duplicates
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, // Password is mandatory
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default user is not admin
  },
}, { timestamps: true }); // Track account creation & updates

export default mongoose.model("User", userSchema);
