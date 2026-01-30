import express from "express";
import { addToCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/cart/add
// @desc    Add a product to the logged-in user's cart
// @access  Private
router.post("/add", authMiddleware, addToCart);

// @route   GET /api/cart
// @desc    Get all items in the logged-in user's cart
// @access  Private
router.get("/", authMiddleware, getCart);

export default router;
