import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

/**
 * @desc    Place an order from user's cart
 * @route   POST /api/orders
 * @access  Private
 */
export const placeOrder = async (req, res) => {
  try {
    // Get user's cart and populate product details
    const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Remove null or deleted products
    const validProducts = cart.products.filter(item => item.product !== null);

    if (validProducts.length === 0) {
      return res.status(400).json({ message: "No valid products in cart" });
    }

    // Calculate total price
    const totalPrice = validProducts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Create new order
    const order = new Order({
      user: req.user.id,
      products: validProducts,
      totalPrice,
      status: "Pending", // default status
    });

    await order.save();

    // Clear user's cart after placing order
    cart.products = [];
    await cart.save();

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order error:", error.message);
    return res.status(500).json({ message: "Order failed" });
  }
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders/my
 * @access  Private
 */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    console.error("GetMyOrders error:", error.message);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/**
 * @desc    Admin: Get all orders
 * @route   GET /api/orders
 * @access  Admin
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product")
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    console.error("GetAllOrders error:", error.message);
    return res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

/**
 * @desc    Update order status (Admin)
 * @route   PATCH /api/orders/:id
 * @access  Admin
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    return res.json(order);
  } catch (error) {
    console.error("UpdateOrderStatus error:", error.message);
    return res.status(500).json({ message: "Failed to update order status" });
  }
};
