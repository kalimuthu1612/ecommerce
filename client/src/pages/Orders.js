import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/my", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, user]);

  if (!user) return null;

  if (loading) return <p className="loading-text">Loading orders...</p>;

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>

            <div className="order-products">
              {order.products.map(
                (item, index) =>
                  item.product && (
                    <div key={index} className="order-product-item">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="order-product-image"
                      />
                      <div className="order-product-details">
                        <p>
                          <strong>{item.product.name}</strong> × {item.quantity}
                        </p>
                        <p>₹{item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
