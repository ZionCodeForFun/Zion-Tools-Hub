import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CiShoppingBasket } from "react-icons/ci";
import { MdCheckCircle } from "react-icons/md";
import { useCart } from "../context/CartContext";
import useProducts from "../data/ProductApi";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import "../styles/productdetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { cartItems, addToCart } = useCart();
  const { products, loadingProducts, errorProducts } = useProducts();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const sliderRef = useRef(null);
  const imageSliderRef = useRef(null);

  // Get product data from Supabase
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);

        // Get related products from same category
        const related = products
          .filter(
            (p) =>
              p.category === foundProduct.category && p.id !== foundProduct.id,
          )
          .slice(0, 8);
        setRelatedProducts(related);
      }
    }
  }, [id, products]);

  // Handle image scroll
  const handleImageScroll = () => {
    if (imageSliderRef.current) {
      const scrollLeft = imageSliderRef.current.scrollLeft;
      const imageWidth = imageSliderRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / imageWidth);
      setCurrentImageIndex(newIndex);
    }
  };

  // Auto-scroll image indicators
  useEffect(() => {
    const slider = imageSliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleImageScroll);
      return () => slider.removeEventListener("scroll", handleImageScroll);
    }
  }, []);

  const handleAddToBasket = () => {
    if (product) {
      const exists = cartItems.some((item) => item.id === product.id);
      if (exists) {
        setSuccessMessage("Quantity Increased!");
      } else {
        setSuccessMessage("Added to Basket!");
      }
      addToCart(product);
      setShowSuccessModal(true);
      // Auto-close modal after 3 seconds
      setTimeout(() => setShowSuccessModal(false), 3000);
    }
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleCallSeller = () => {
    window.location.href = "tel:+2347049685365";
  };

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in this product from Zion Tools Hub.

Product: ${product.name}
Price: ${product.price}
Quantity: 1
Location: ${product.location}

Product Link: ${window.location.href}

Please confirm availability.`;

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/2347049685365?text=${encodedMessage}`;
  };

  if (loadingProducts) {
    return <Spinner />;
  }

  if (errorProducts) {
    return <div className="productdetails-error">Error: {errorProducts}</div>;
  }

  if (!product) {
    return <div className="productdetails-not-found">Product not found</div>;
  }

  return (
    <div className="productdetails-page">
      <NavBar />
      <div className="productdetails-container">
        {/* Product Image Slider */}
        <div className="productdetails-image-section">
          <div className="productdetails-image-slider" ref={imageSliderRef}>
            {product.images.map((image, index) => (
              <div key={index} className="productdetails-image-slide">
                <img
                  src={image}
                  alt={`${product.name} - ${index + 1}`}
                  className="productdetails-image"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Free Delivery Badge on Image */}
          {product.free_delivery && (
            <div className="productdetails-image-badge">
              Free Delivery within Lagos
            </div>
          )}

          {/* Image indicators */}
          {product.images.length > 1 && (
            <div className="productdetails-image-indicators">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`productdetails-indicator-dot ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="productdetails-main">
          {/* Title */}
          <h1 className="productdetails-title">{product.name}</h1>

          {/* Price */}
          <div className="productdetails-price-section">
            <div className="productdetails-price">{product.price}</div>
            <p className="productdetails-price-note">
              Price may vary depending on stock availability
            </p>
          </div>

          {/* Badges */}
          <div className="productdetails-badges">
            <span className="productdetails-badge productdetails-badge-condition">
              {product.condition}
            </span>
            <span className="productdetails-badge productdetails-badge-payment">
              💳 Payment on Delivery
            </span>
          </div>

          {/* Location */}
          <div className="productdetails-location">
            <IoLocationOutline size={16} />
            <span>{product.location} – Nationwide Delivery</span>
          </div>

          {/* Specifications */}
          <section className="productdetails-section">
            <h2 className="productdetails-section-title">Specifications</h2>
            <ul className="productdetails-specs-list">
              {Object.entries(product.specifications || {}).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ),
              )}
              {(!product.specifications ||
                Object.keys(product.specifications).length === 0) && (
                <li>No specifications available</li>
              )}
            </ul>
          </section>

          {/* Product Description */}
          <section className="productdetails-section">
            <h2 className="productdetails-section-title">
              Product Description
            </h2>
            <p className="productdetails-description">
              {product.description || "No description available for this product."}
            </p>
          </section>

          {/* Delivery Information */}
          <section className="productdetails-section">
            <h2 className="productdetails-section-title">
              Delivery Information
            </h2>
            <ul className="productdetails-delivery-list">
              <li>Same-day delivery within Lagos</li>
              <li>Nationwide delivery available</li>
              <li>Store pickup available</li>
            </ul>
          </section>

          {/* Trust Section */}
          <section className="productdetails-section productdetails-trust-section">
            <h2 className="productdetails-section-title">Why Buy From</h2>
            <ul className="productdetails-trust-list">
              <li>✔ Quality Tools</li>
              <li>✔ Reliable Suppliers</li>
              <li>✔ Nationwide Delivery</li>
              <li>✔ Affordable Prices</li>
            </ul>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="productdetails-section">
              <h2 className="productdetails-section-title">
                You May Also Like
              </h2>
              <div className="productdetails-related-grid">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Desktop CTA Buttons */}
          <div className="productdetails-desktop-cta">
            <button
              className="productdetails-desktop-cta-button productdetails-desktop-cta-basket"
              onClick={handleAddToBasket}
              title="Add to Basket"
            >
              <CiShoppingBasket size={20} />
              <span>Add to Basket</span>
            </button>

            <button
              className="productdetails-desktop-cta-button productdetails-desktop-cta-contact"
              onClick={handleContactClick}
            >
              Contact to Order
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          className="productdetails-modal-overlay"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="productdetails-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="productdetails-modal-close"
              onClick={() => setShowContactModal(false)}
            >
              <IoMdClose size={24} />
            </button>

            <h2 className="productdetails-modal-title">Contact to Order</h2>

            <div className="productdetails-modal-buttons">
              <button
                className="productdetails-modal-button productdetails-modal-button-call"
                onClick={handleCallSeller}
              >
                <FaPhone size={20} />
                <span>Call Us</span>
              </button>

              <button
                className="productdetails-modal-button productdetails-modal-button-whatsapp"
                onClick={handleWhatsApp}
              >
                <FaWhatsapp size={20} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="productdetails-success-modal-overlay">
          <div className="productdetails-success-modal">
            <div className="productdetails-success-icon">
              <MdCheckCircle size={60} />
            </div>
            <h2 className="productdetails-success-title">{successMessage}</h2>
            <p className="productdetails-success-text">
              {product.name}{" "}
              {successMessage === "Added to Basket!"
                ? "has been successfully added to your basket."
                : "quantity updated in your basket."}
            </p>
            <button
              className="productdetails-success-button"
              onClick={() => setShowSuccessModal(false)}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA Bar */}
      <div className="productdetails-sticky-cta">
        <button
          className="productdetails-cta-button productdetails-cta-basket"
          onClick={handleAddToBasket}
          title="Add to Basket"
        >
          <CiShoppingBasket size={20} />
          <span>Add to Basket</span>
        </button>

        <button
          className="productdetails-cta-button productdetails-cta-contact"
          onClick={handleContactClick}
        >
          Contact to Order
        </button>
      </div>

      <Footer />
    </div>
  );
}
