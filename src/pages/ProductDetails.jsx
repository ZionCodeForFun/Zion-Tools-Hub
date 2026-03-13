import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const imageSliderRef = useRef(null);
  const relatedRef = useRef(null);

  // Pagination state for related products
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

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
          .slice(0, 100); // get all related, we'll paginate
        setRelatedProducts(related);
        setCurrentPage(1); // reset page when product changes
      }
    }
  }, [id, products]);

  // Image slider scroll logic
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
      setSuccessMessage(exists ? "Quantity Increased!" : "Added to Basket!");
      addToCart(product);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    }
  };
  const handleContactClick = () => {
    const message = `Hello, I'm interested in the ${product.name}. Is it available?`;
    const whatsappUrl = `https://wa.me/2347049685365?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (relatedRef.current) {
      setTimeout(() => {
        relatedRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [currentPage]);

  if (loadingProducts) return <Spinner />;
  if (errorProducts)
    return <div className="productdetails-error">{errorProducts}</div>;
  if (!product)
    return <div className="productdetails-not-found">Product not found</div>;

  // Pagination calculation
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentRelated = relatedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(relatedProducts.length / productsPerPage);

  return (
    <div className="productdetails-page">
      <NavBar />

      <div className="productdetails-container">
        {/* Image Slider */}
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
          <div className="productdetails-price">{product.price}</div>

          {/* Specifications */}
          <section className="productdetails-section">
            <h2>Specifications</h2>
            <ul>
              {product.product_specifications?.length ? (
                product.product_specifications.map((spec, idx) => (
                  <li key={idx}>
                    {spec.spec_key}: {spec.spec_value}
                  </li>
                ))
              ) : (
                <li>No specifications available</li>
              )}
            </ul>
          </section>

          {/* Description */}
          <section className="productdetails-section">
            <h2>Description</h2>
            <p>{product.description || "No description available."}</p>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="productdetails-section" ref={relatedRef}>
              <h2>You May Also Like</h2>
              <div className="productdetails-related-grid">
                {currentRelated.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`pagination-number ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </section>
          )}

          <div className="productdetails-desktop-cta">
            <button
              onClick={handleAddToBasket}
              className="productdetails-desktop-cta-button productdetails-desktop-cta-basket"
            >
              <CiShoppingBasket size={20} />
              Add to Basket
            </button>

            <button
              onClick={handleContactClick}
              className="productdetails-desktop-cta-button productdetails-desktop-cta-contact"
            >
              Contact to Order
            </button>
          </div>
        </div>
      </div>
      <div className="productdetails-sticky-cta">
        <button
          className="productdetails-cta-button productdetails-cta-basket"
          onClick={handleAddToBasket}
        >
          <CiShoppingBasket size={18} />
          Add to Basket
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
