import React from "react";
import axios from "axios";

export default function ProductCard({ product, user, fetchCart }) {
  const addToCart = async () => {
    if (!user?.token) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      alert("Added to cart successfully");
      fetchCart && fetchCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h4 className="product-name">{product.name}</h4>
      <p className="product-price">₹{product.price}</p>
      <p className="product-rating">⭐ {product.averageRating.toFixed(1)} / 5</p>
      <button className="add-to-cart-btn" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
