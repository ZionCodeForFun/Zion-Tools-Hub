import React from "react";
import {
  IoCallOutline,
  IoMailOutline,
  IoLogoWhatsapp,
  IoLocationOutline,
  IoLogoFacebook,
  IoLogoTiktok,
} from "react-icons/io5";
import Navbar from "../components/NavBar";
import BackToHome from "../components/BackToHome";
import Footer from "../components/Footer";
import "../styles/contactpage.css";
import { BsTwitterX } from "react-icons/bs";

export default function ContactPage() {
  return (
    <div className="contactpage">
      <Navbar />
      <BackToHome />

      {/* Header Section */}
      <section className="contactpage-header">
        <div className="contactpage-container">
          <h1 className="contactpage-title">Contact Us</h1>
          <p className="contactpage-subtitle">
            Reach out to Zion Tools Hub for inquiries, support, or business.
          </p>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="contactpage-cards">
        <div className="contactpage-container">
          <div className="contactpage-grid">
            <a href="tel:+2347049685365" className="contactpage-card">
              <IoCallOutline size={32} className="contactpage-icon" />
              <h3>Phone</h3>
              <p>+234 704 968 5365</p>
            </a>

            <a href="mailto:ziontoolshub@gmail.com" className="contactpage-card">
              <IoMailOutline size={32} className="contactpage-icon" />
              <h3>Email</h3>
              <p>ziontoolshub@gmail.com</p>
            </a>

            <a
              href="https://wa.me/2347049685365"
              target="_blank"
              rel="noopener noreferrer"
              className="contactpage-card"
            >
              <IoLogoWhatsapp size={32} className="contactpage-icon" />
              <h3>WhatsApp</h3>
              <p>Chat with us</p>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Lagos,Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="contactpage-card"
            >
              <IoLocationOutline size={32} className="contactpage-icon" />
              <h3>Location</h3>
              <p>Lagos, Nigeria</p>
            </a>

            <a
              href="https://facebook.com/ziontoolshub"
              target="_blank"
              rel="noopener noreferrer"
              className="contactpage-card"
            >
              <IoLogoFacebook size={32} className="contactpage-icon" />
              <h3>Facebook</h3>
              <p>Follow us</p>
            </a>

            <a
              href="https://twitter.com/ziontoolshub"
              target="_blank"
              rel="noopener noreferrer"
              className="contactpage-card"
            >
              <BsTwitterX size={32} className="contactpage-icon" />
              <h3>X</h3>
              <p>Follow us</p>
            </a>

            <a
              href="https://tiktok.com/@ziontoolshub"
              target="_blank"
              rel="noopener noreferrer"
              className="contactpage-card"
            >
              <IoLogoTiktok size={32} className="contactpage-icon" />
              <h3>TikTok</h3>
              <p>Follow us</p>
            </a>
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="contactpage-note">
        <div className="contactpage-container">
          <p className="contactpage-note-text">
            Available 7 days a week. Fast response guaranteed.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
