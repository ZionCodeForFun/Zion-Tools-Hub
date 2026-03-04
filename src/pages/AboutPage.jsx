import React from "react";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoLogoWhatsapp,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoTiktok,
} from "react-icons/io5";
import Navbar from "../components/NavBar";
import BackToHome from "../components/BackToHome";
import Footer from "../components/Footer";
import "../styles/aboutpage.css";
import { BsTwitterX } from "react-icons/bs";

export default function AboutPage() {
  return (
    <div className="aboutpage">
      <Navbar />
      <BackToHome />

      <section className="aboutpage-hero">
        <div className="aboutpage-hero-content">
          <h1 className="aboutpage-hero-title">About Us</h1>
          <p className="aboutpage-hero-subtitle">
            Your reliable source for quality tools and equipment
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="aboutpage-content">
        <div className="aboutpage-container">
          <h2 className="aboutpage-section-title">Who We Are</h2>

          <div className="aboutpage-text-block">
            <p>
              Zion Tools Hub is a Lagos-based tools supply business focused on
              providing reliable, durable hand tools and equipment for
              professionals and everyday users.
            </p>

            <p>
              We specialize in tools such as spanners, screwdrivers, tool kits,
              workshop equipment, and pressure washers carefully selected to
              meet real working needs.
            </p>

            <p>
              At Zion Tools Hub, we understand the importance of quality tools.
              That's why we are committed to supplying products that are
              dependable, practical, and built to last.
            </p>

            <p>
              We are based in Lagos and deliver across Nigeria, making it easy
              for customers anywhere to access the tools they need.
            </p>

            <p>
              Whether you're a technician, builder, or need tools for personal
              use, Zion Tools Hub is here to serve you with consistency and
              reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Values / Features Section */}
      <section className="aboutpage-values">
        <div className="aboutpage-container">
          <h2 className="aboutpage-section-title">Our Values</h2>

          <div className="aboutpage-values-grid">
            <div className="aboutpage-value-card">
              <div className="aboutpage-value-icon">✓</div>
              <h3>Quality Tools</h3>
              <p>Carefully selected products built to last</p>
            </div>

            <div className="aboutpage-value-card">
              <div className="aboutpage-value-icon">✓</div>
              <h3>Reliable Supply</h3>
              <p>Dependable availability of what you need</p>
            </div>

            <div className="aboutpage-value-card">
              <div className="aboutpage-value-icon">✓</div>
              <h3>Nationwide Delivery</h3>
              <p>Fast shipping across Nigeria</p>
            </div>

            <div className="aboutpage-value-card">
              <div className="aboutpage-value-icon">✓</div>
              <h3>Customer Focus</h3>
              <p>Your satisfaction is our priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Location Section */}
      <section className="aboutpage-contact">
        <div className="aboutpage-container">
          <h2 className="aboutpage-section-title">Get In Touch</h2>

          <div className="aboutpage-contact-grid">
            <div className="aboutpage-contact-item">
              <IoLocationOutline size={24} className="aboutpage-contact-icon" />
              <h3>Location</h3>
              <p>Lagos, Nigeria</p>
            </div>

            <div className="aboutpage-contact-item">
              <IoCallOutline size={24} className="aboutpage-contact-icon" />
              <h3>Phone</h3>
              <p>
                <a href="tel:+2347049685365" className="aboutpage-contact-link">
                  +234 704 968 5365
                </a>
              </p>
            </div>

            <div className="aboutpage-contact-item">
              <IoMailOutline size={24} className="aboutpage-contact-icon" />
              <h3>Email</h3>
              <p>
                <a
                  href="mailto:ziontoolshub@gmail.com"
                  className="aboutpage-contact-link"
                >
                  ziontoolshub@gmail.com
                </a>
              </p>
            </div>

            <div className="aboutpage-contact-item">
              <IoLogoWhatsapp size={24} className="aboutpage-contact-icon" />
              <h3>WhatsApp</h3>
              <p>
                <a
                  href="https://wa.me/2347049685365"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aboutpage-contact-link"
                >
                  Chat with us
                </a>
              </p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="aboutpage-social">
            <h3>Follow Us</h3>
            <div className="aboutpage-social-links">
              <a
                href="https://facebook.com/ziontoolshub"
                target="_blank"
                rel="noopener noreferrer"
                className="aboutpage-social-link"
              >
                <IoLogoFacebook size={28} />
                <span>Facebook</span>
              </a>
              <a
                href="https://twitter.com/ziontoolshub"
                target="_blank"
                rel="noopener noreferrer"
                className="aboutpage-social-link"
              >
                <BsTwitterX  size={28} />
                <span>X</span>
              </a>
              <a
                href="https://tiktok.com/@ziontoolshub"
                target="_blank"
                rel="noopener noreferrer"
                className="aboutpage-social-link"
              >
                <IoLogoTiktok size={28} />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
