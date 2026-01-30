import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    // Reference to the user who owns this cart
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    // Array of products in the cart
    products: [
      {
        product: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Product", 
          required: true 
        },
        quantity: { 
          type: Number, 
          default: 1,
          min: 1 // Ensure quantity is always at least 1
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model("Cart", cartSchema);
