import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/home");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Search query:", e.target.value);
      // You can navigate or filter products here
    }
  };

  return (
    <header className="header">
      {/* LOGO */}
      <h2
        onClick={() => navigate("/home")}
        style={{
          cursor: "pointer",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 800,
          fontStyle: "italic",
          letterSpacing: "0.5px",
          color: "#fff",
        }}
      >
        Storefront
      </h2>

      {/* SEARCH */}
      <div className="search-container">
        <i className="fa fa-search search-icon"></i>
        <input
          type="text"
          placeholder="Search products..."
          onKeyDown={handleSearch}
        />
      </div>

      {/* NAV */}
      <nav style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {/* USER ICON */}
        <span className="user-icon" onClick={() => setOpen(!open)}>
          <i className="fa-solid fa-user"></i>
        </span>

        {/* DROPDOWN */}
        {open && (
          <div className="dropdown">
            {!user ? (
              <div
                className="dropdown-item"
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
              >
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </div>
            ) : (
              <>
                <div className="dropdown-item">
                  <i className="fa-regular fa-user"></i> My Profile
                </div>
                <div className="dropdown-item">
                  <i className="fa-solid fa-star"></i> Plus Zone
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setOpen(false);
                    navigate("/orders");
                  }}
                >
                  <i className="fa-solid fa-box"></i> Orders
                </div>
                <div className="dropdown-item">
                  <i className="fa-regular fa-heart"></i> Wishlist
                </div>
                <div className="dropdown-item">
                  <i className="fa-solid fa-gift"></i> Rewards
                </div>
                <div className="dropdown-item">
                  <i className="fa-solid fa-credit-card"></i> Gift Cards
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout" onClick={logoutHandler}>
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </div>
              </>
            )}
          </div>
        )}

        {/* LINKS */}
        <Link to="/orders">Orders</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}
