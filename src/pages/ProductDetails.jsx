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

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);

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

  const handleImageScroll = () => {
    if (imageSliderRef.current) {
      const scrollLeft = imageSliderRef.current.scrollLeft;
      const imageWidth = imageSliderRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / imageWidth);
      setCurrentImageIndex(newIndex);
    }
  };

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

          {product.free_delivery && (
            <div className="productdetails-image-badge">
              Free Delivery within Lagos
            </div>
          )}

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

        {/* Product Info */}
        <div className="productdetails-main">

          <h1 className="productdetails-title">{product.name}</h1>

          <div className="productdetails-price-section">
            <div className="productdetails-price">{product.price}</div>
            <p className="productdetails-price-note">
              Price may vary depending on stock availability
            </p>
          </div>

          <div className="productdetails-badges">
            <span className="productdetails-badge productdetails-badge-condition">
              {product.condition}
            </span>
            <span className="productdetails-badge productdetails-badge-payment">
              💳 Payment on Delivery
            </span>
          </div>

          <div className="productdetails-location">
            <IoLocationOutline size={16} />
            <span>{product.location} – Nationwide Delivery</span>
          </div>

          {/* Specifications (FIXED) */}
          <section className="productdetails-section">
            <h2 className="productdetails-section-title">Specifications</h2>

            <ul className="productdetails-specs-list">
              {product.product_specifications?.length > 0 ? (
                product.product_specifications.map((spec, index) => (
                  <li key={index}>
                    {spe_key}: {spec_value}
                  </li>
                ))
              ) : (
                <li>No specifications available</li>
              )}
            </ul>
          </section>

          {/* Description (FIXED) */}
          <section className="productdetails-section">
            <h2 className="productdetails-section-title">
              Product Description
            </h2>

            <p className="productdetails-description">
              {product.description?.trim() ||
                "No description available for this product."}
            </p>
          </section>

          {/* Delivery */}
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

          {/* Trust */}
          <section className="productdetails-section productdetails-trust-section">
            <h2 className="productdetails-section-title">Why Buy From</h2>
            <ul className="productdetails-trust-list">
              <li>✔ Quality Tools</li>
              <li>✔ Reliable Suppliers</li>
              <li>✔ Nationwide Delivery</li>
              <li>✔ Affordable Prices</li>
            </ul>
          </section>

          {/* Related */}
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

          <div className="productdetails-desktop-cta">
            <button
              className="productdetails-desktop-cta-button productdetails-desktop-cta-basket"
              onClick={handleAddToBasket}
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

      <Footer />
    </div>
  );
}