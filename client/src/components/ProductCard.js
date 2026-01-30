import axios from "axios";

export default function ProductCard({ product, user, fetchCart }) {
  // Add product to cart
  const addToCart = async () => {
    if (!user || !user.token) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Added to cart successfully");
      fetchCart && fetchCart();
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Failed to add to cart");
    }
  };

  // Calculate average rating
  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.name} />
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <p>⭐ {avgRating.toFixed(1)} / 5</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
