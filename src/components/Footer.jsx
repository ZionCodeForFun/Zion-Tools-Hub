import React from 'react';
import { IoMail, IoCall, IoLogoWhatsapp, IoLocation } from 'react-icons/io5';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        {/* Business Info Section */}
        <div className="footer-main">
          <div className="footer-brand">Zion Tools Hub</div>
          <p className="footer-tagline">Your trusted marketplace for quality tools and equipment</p>
        </div>

        {/* Contact Information */}
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-section-title">Contact Us</h3>
            <div className="footer-contact-list">
              <a href="mailto:ziontoolshub@gmail.com" className="footer-contact-item">
                <IoMail size={18} />
                <span>ziontoolshub@gmail.com</span>
              </a>
              <a href="tel:+2348012345678" className="footer-contact-item">
                <IoCall size={18} />
                <span>+234 801 234 5678</span>
              </a>
              <a href="https://wa.me/2348012345678" className="footer-contact-item" target="_blank" rel="noopener noreferrer">
                <IoLogoWhatsapp size={18} />
                <span>+234 801 234 5678</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">Location</h3>
            <div className="footer-contact-item">
              <IoLocation size={18} />
              <span>123 Market Street, Ikeja<br />Lagos, Nigeria</span>
            </div>
          </div>

          <div className="footer-section" id="about">
            <h3 className="footer-section-title">Quick Links</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About Us</a>
              <a href="#contact" className="footer-link">Contact</a>
              <a href="#categories" className="footer-link">Categories</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 Zion Tools Hub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}