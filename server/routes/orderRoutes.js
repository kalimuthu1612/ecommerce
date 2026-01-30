import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import auth from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ===================== USER ROUTES ===================== */

// @route   POST /api/orders
// @desc    Place an order for logged-in user
// @access  Private
router.post("/", auth, placeOrder);

// @route   GET /api/orders/my
// @desc    Get all orders of logged-in user
// @access  Private
router.get("/my", auth, getMyOrders);

/* ===================== ADMIN ROUTES ===================== */

// @route   GET /api/orders
// @desc    Get all orders (admin only)
// @access  Admin
router.get("/", auth, admin, getAllOrders);

// @route   PUT /api/orders/:id
// @desc    Update order status (admin only)
// @access  Admin
router.put("/:id", auth, admin, updateOrderStatus);

export default router;
