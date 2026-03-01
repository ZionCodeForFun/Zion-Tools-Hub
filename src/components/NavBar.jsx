import React, { useState } from 'react';
import { IoCart, IoMenu, IoClose } from 'react-icons/io5';
import { useCart } from '../context/CartContext';
import '../styles/navBar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">Zion Tools Hub</div>
        
        {/* Desktop Navigation */}
        <div className="navbar-links-desktop">
          <a href="#" className="navbar-link">Home</a>
          <a href="#about" className="navbar-link">About</a>
          <a href="#contact" className="navbar-link">Contact</a>
        </div>

        <div className="navbar-actions">
          {/* Cart Icon with Badge */}
          <button className="navbar-icon-btn navbar-cart-btn" aria-label="Cart">
            <IoCart size={22} />
            {cartItemCount > 0 && (
              <span className="navbar-cart-badge">{cartItemCount}</span>
            )}
          </button>
          
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
          <a href="#" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#contact" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
}