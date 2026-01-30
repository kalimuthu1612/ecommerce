import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    let valid = true;

    // Validation
    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email.");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) return;

    // Login request
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      alert("Login successful");

      // Store token + user in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: response.data.token,
          ...response.data.user,
        })
      );

      navigate("/home");
    } catch (error) {
      if (error.response?.data?.message) {
        setGeneralError(error.response.data.message);
      } else {
        setGeneralError("Invalid email or password");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submit} className="login-form">
        <h3 className="login-title">Login</h3>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        {emailError && <div className="error">{emailError}</div>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {passwordError && <div className="error">{passwordError}</div>}

        {generalError && <div className="error">{generalError}</div>}

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="signup-text">If you don't have an account, signup</p>

        <button
          type="button"
          className="signup-btn"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
