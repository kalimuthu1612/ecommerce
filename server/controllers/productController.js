import Product from "../models/Product.js";

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    console.error("GetProducts error:", error.message);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
};

/**
 * @desc    Add a new product
 * @route   POST /api/products
 * @access  Admin
 */
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    console.error("AddProduct error:", error.message);
    return res.status(500).json({ message: "Failed to add product" });
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DeleteProduct error:", error.message);
    return res.status(500).json({ message: "Failed to delete product" });
  }
};

/**
 * @desc    Add a review to a product
 * @route   POST /api/products/:id/review
 * @access  Private
 */
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.reviews.push({
      user: req.user.id,
      rating,
      comment,
    });

    // Calculate average rating
    product.averageRating =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

    await product.save();

    return res.json(product);
  } catch (error) {
    console.error("AddReview error:", error.message);
    return res.status(500).json({ message: "Failed to add review" });
  }
};
