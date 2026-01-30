import Cart from "../models/Cart.js";

/**
 * @desc    Add a product to user's cart
 * @route   POST /api/cart/add
 * @access  Private
 */
export const addToCart = async (req, res) => {
  const userId = req.user.id; // requires auth middleware
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    // Find existing cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart if not exists
      cart = new Cart({ user: userId, products: [{ product: productId, quantity: 1 }] });
    } else {
      // Check if product already exists in cart
      const index = cart.products.findIndex(p => p.product.toString() === productId);

      if (index > -1) {
        cart.products[index].quantity += 1; // Increment quantity
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }
    }

    await cart.save();

    // Populate product details for response
    const populatedCart = await cart.populate("products.product");

    return res.json(populatedCart);
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all cart items for a user
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("products.product");

    return res.json(cart || { products: [] });
  } catch (error) {
    console.error("Error in getCart:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
