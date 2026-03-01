import React, { useRef, useState, useEffect } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import '../styles/ProductCard.css';

export default function ProductCard({ product }) {
  const sliderRef = useRef(null);
  const [showRightIndicator, setShowRightIndicator] = useState(true);
  
  // Handle scroll to update indicator visibility
  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
      setShowRightIndicator(!isAtEnd);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && product.images.length > 1) {
      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, [product.images]);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <div className="product-image-slider" ref={sliderRef}>
          {product.images.map((image, index) => (
            <div key={index} className="product-image-slide">
              <img 
                src={image} 
                alt={`${product.name} - ${index + 1}`}
                className="product-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        {/* Scroll indicator - only show if more than 1 image */}
        {product.images.length > 1 && showRightIndicator && (
          <div className="product-image-indicator"></div>
        )}
        
        {product.free_delivery && (
          <div className="product-badge">Free Delivery</div>
        )}
      </div>
      
      <div className="product-content">
        <div className="product-price">{product.price}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-location">
          <IoLocationOutline size={14} />
          <span>{product.location}</span>
        </div>
        <div className="product-condition-badge">{product.condition}</div>
      </div>
    </div>
  );
}