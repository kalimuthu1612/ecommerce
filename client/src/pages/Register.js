import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [strength, setStrength] = useState("");
  const navigate = useNavigate();

  // Check password strength
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    if (val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)) {
      setStrength("Strong");
    } else if (val.length >= 6) {
      setStrength("Medium");
    } else {
      setStrength("Weak");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      setShowPopup(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      alert("Registration failed");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setStrength("");
  };

  return (
    <>
      <div className="browser-frame">
        <div className="browser-header">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Signup Form</h2>

          <label>Username</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your username"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            required
          />
          <div className="strength">Strength: {strength}</div>

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>

      {showPopup && (
        <div id="popup">
          <div className="popup-content">
            <div className="popup-header">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="popup-body">
              <h3>🎉 Signup Successful!</h3>
              <p>Redirecting...</p>
              <button onClick={closePopup} className="popup-close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
