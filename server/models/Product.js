import mongoose from "mongoose";

// Sub-schema for product reviews
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, default: "" },
}, { timestamps: true }); // Optional: track when review was added/updated

// Main product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: "" },

  // Category with predefined options
  category: {
    type: String,
    enum: ["Electronics", "Furniture", "Grocery", "Clothing"],
    required: true,
  },

  // Reviews array
  reviews: [reviewSchema],

  // Average rating of the product
  averageRating: { type: Number, default: 0, min: 0, max: 5 },

  // Product image URL
  imageUrl: { type: String, default: "" },
}, { timestamps: true }); // Track creation and updates

export default mongoose.model("Product", productSchema);
