import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import '../../styles/floating-whatsapp.css';

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2347049685365', '_blank');
  };

  return (
    <button 
      className="floating-whatsapp"
      onClick={handleWhatsAppClick}
      aria-label="Contact us on WhatsApp"
    >
      <IoLogoWhatsapp size={28} />
    </button>
  );
}
