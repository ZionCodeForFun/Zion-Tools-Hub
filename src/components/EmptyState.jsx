import React from "react";
import { FaBox } from "react-icons/fa";
import "../styles/emptyState.css";

export default function EmptyState({
  messageTitle = "No products found",
  messageDescription = "We couldn't find this tool right now.",
  whatsappMessage,
}) {
  const phoneNumber = "2347049685365"; // replace with real support number
  const encoded = encodeURIComponent(whatsappMessage || "");
  const link = `https://wa.me/${phoneNumber}?text=${encoded}`;

  return (
    <div className="emptystate-container">
      <FaBox size={48} className="emptystate-icon" />
      <h2 className="emptystate-title">{messageTitle}</h2>
      <p className="emptystate-description">{messageDescription}</p>
      <a
        className="emptystate-whatsapp-btn"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        Request this tool on WhatsApp
      </a>
    </div>
  );
}
