import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h3>Storefront.</h3>
          <p>
            Premium shopping experience for modern lifestyle products.
            Quality guaranteed on every purchase.
          </p>
        </div>

        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Living</li>
            <li>Books</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Shipping Info</li>
            <li>Returns & Exchanges</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Social</h4>
          <div className="social-icons">
            <a href="/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <p>123 Commerce Street</p>
          <p>Tech Park, Bangalore</p>
          <p>Karnataka, India 560001</p>
          <p>Email: support@storefront.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 E-Commerce Storefront.</p>
        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
