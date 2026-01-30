import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        alert("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchOrders();
  }, [user]);

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setOrders((prevOrders) =>
        prevOrders.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Error updating order status");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading orders...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 15,
              marginBottom: 15,
              background: "#fff",
            }}
          >
            <p><b>User:</b> {order.user?.email || "N/A"}</p>
            <p><b>Total:</b> ₹{order.totalPrice}</p>
            <p><b>Status:</b> {order.status}</p>

            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              style={{ padding: "5px", borderRadius: "4px" }}
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}
