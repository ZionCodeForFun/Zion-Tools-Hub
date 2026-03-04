import React from "react";
import {
  IoMail,
  IoCall,
  IoLogoWhatsapp,
  IoLocation,
  IoLogoFacebook,
  IoLogoTiktok,
} from "react-icons/io5";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        {/* Business Info Section */}
        <div className="footer-main">
          <div className="footer-brand">Zion Tools Hub</div>
          <p className="footer-tagline">
            Your trusted marketplace for quality tools and equipment
          </p>
        </div>

        {/* Contact Information */}
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-section-title">Contact Us</h3>
            <div className="footer-contact-list">
              <a
                href="mailto:ziontoolshub@gmail.com"
                className="footer-contact-item"
              >
                <IoMail size={18} />
                <span>ziontoolshub@gmail.com</span>
              </a>
              <a href="tel:+2348012345678" className="footer-contact-item">
                <IoCall size={18} />
                <span>+234 704 968 5365</span>
              </a>
              <a
                href="https://wa.me/2347049685365"
                className="footer-contact-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoWhatsapp size={18} />
                <span>+234 704 968 5365</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">Location</h3>
            <div className="footer-contact-item">
              <IoLocation size={18} />
              <span>
                Mandalas (Lagos Island)
                <br />
                Lagos, Nigeria
              </span>
            </div>
          </div>

          <div className="footer-section" id="about">
            <h3 className="footer-section-title">Quick Links</h3>
            <div className="footer-links">
              <Link to={"/"} className="footer-link">
                Home
              </Link>
              <Link to={"/about"} className="footer-link">
                About Us
              </Link>
              <Link to={"/contact"} className="footer-link">
                Contact
              </Link>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">Follow Us</h3>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/share/1CByq9k37C/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <IoLogoFacebook size={24} />
              </a>
              <a
                href="https://x.com/ziontoolshub"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <BsTwitterX size={24} />
              </a>
              <a
                href="https://tiktok.com/@ziontoolshub"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <IoLogoTiktok size={24} />
              </a>
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
