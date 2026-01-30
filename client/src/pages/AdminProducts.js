import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        alert("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchProducts();
  }, [user]);

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Error deleting product");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading products...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 15,
              marginBottom: 15,
              background: "#fff",
            }}
          >
            <p><b>Name:</b> {product.name}</p>
            <p><b>Price:</b> ₹{product.price}</p>
            <p><b>Stock:</b> {product.stock}</p>

            <button
              onClick={() => deleteProduct(product._id)}
              style={{
                padding: "5px 10px",
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
