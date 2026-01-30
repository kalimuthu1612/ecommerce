import express from "express";
import {
  getProducts,
  addProduct,
  deleteProduct,
  addReview,
} from "../controllers/productController.js";

import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ===================== PUBLIC ROUTES ===================== */

// @route   GET /api/products
// @desc    Get all products (optional category filter can be added later)
// @access  Public
router.get("/", getProducts);

/* ===================== ADMIN ROUTES ===================== */

// @route   POST /api/products
// @desc    Add a new product
// @access  Admin
router.post("/", auth, admin, addProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
// @access  Admin
router.delete("/:id", auth, admin, deleteProduct);

/* ===================== USER ROUTES ===================== */

// @route   POST /api/products/:id/review
// @desc    Add a review & rating to a product
// @access  Private
router.post("/:id/review", auth, addReview);

export default router;
