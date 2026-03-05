import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCart, IoMenu, IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import logo from "../../public/logo.png";
import "../styles/navBar.css";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="navbar-links-desktop">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
        </div>

        <div className="navbar-actions">
          <Link
            to="/cart"
            className="navbar-icon-btn navbar-cart-btn"
            aria-label="Cart"
          >
            <IoCart size={22} />
            {cartItemCount > 0 && (
              <span className="navbar-cart-badge">{cartItemCount}</span>
            )}
          </Link>

          <button
            className="navbar-icon-btn navbar-menu-btn"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <Link
            to="/"
            className="navbar-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="navbar-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="navbar-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
