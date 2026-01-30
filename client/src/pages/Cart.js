import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const validItems = (res.data.products || []).filter(
          (item) => item.product !== null
        );

        setCart(validItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, [navigate, user]);

  const placeOrder = async () => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/orders",
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      alert("Order placed successfully");
      setCart([]);
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="main-content" style={{ padding: "20px" }}>
      <h3>Your Cart</h3>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="card" style={{ display: "flex", alignItems: "center" }}>
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "15px" }}
              />
              <div style={{ flex: 1 }}>
                <p><strong>{item.product.name}</strong> × {item.quantity}</p>
                <p>₹{item.product.price * item.quantity}</p>
              </div>
            </div>
          ))}

          <h4>Total: ₹{totalAmount}</h4>

          <div className="action-buttons">
            <button className="order-btn" onClick={placeOrder} disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
