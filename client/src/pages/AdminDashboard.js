import React, { useState } from "react";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "products", label: "Products" },
    { id: "orders", label: "Orders" },
    { id: "users", label: "Users" },
  ];

  return (
    <div className="admin-dashboard-container" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        className="sidebar"
        style={{
          width: "220px",
          background: "#1f2937",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "40px" }}>Admin Panel</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                padding: "10px 15px",
                marginBottom: "10px",
                cursor: "pointer",
                background: activeSection === item.id ? "#374151" : "transparent",
                borderRadius: "5px",
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main
        className="main-content"
        style={{ flex: 1, padding: "30px", background: "#f3f4f6" }}
      >
        <header style={{ marginBottom: "30px" }}>
          <h2>
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h2>
        </header>

        <section>
          {activeSection === "dashboard" && (
            <p>Welcome to the Admin Dashboard. Manage Products, Orders & Users here.</p>
          )}
          {activeSection === "products" && <p>Product management section</p>}
          {activeSection === "orders" && <p>Order management section</p>}
          {activeSection === "users" && <p>User management section</p>}
        </section>
      </main>
    </div>
  );
}
