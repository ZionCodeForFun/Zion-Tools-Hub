import React, { useState } from "react";
import { FaMinus, FaPlus, FaTrash, FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/cartpage.css";

export default function CartPage() {
  const { cartItems, updateQuantity, clearCart, getCartTotal } = useCart();
  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    deliveryAddress: "",
    phoneNumber: "",
  });
  const [showClearModal, setShowClearModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleQuantityChange = (id, change) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + change);
    }
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  const handleOrderViaWhatsApp = () => {
    if (!customerDetails.fullName || !customerDetails.deliveryAddress) {
      setErrorMessage("Please fill in your full name and delivery address.");
      setShowErrorModal(true);
      return;
    }

    const itemsList = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (x${item.quantity}) - ${item.price}`,
      )
      .join("\n");

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = getCartTotal();

    const message = `Hello Zion Tools Hub,

I would like to order the following tools:

${itemsList}

Total Items: ${totalItems}
Total Price: ₦${totalPrice.toLocaleString()}

Customer Name: ${customerDetails.fullName}
Delivery Address: ${customerDetails.deliveryAddress}
Phone: ${customerDetails.phoneNumber || "Not provided"}

Please confirm availability.`;

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/2347049685365?text=${encodedMessage}`;
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getCartTotal();

  return (
    <div className="cartpage-page">
      <NavBar />
      <div className="cartpage-container">
        <h1 className="cartpage-title">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="cartpage-empty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="cartpage-items">
              {cartItems.map((item) => {
                // Handle both string prices (e.g., "₦1,234") and numeric prices
                const priceString =
                  typeof item.price === "string"
                    ? item.price.replace(/[^0-9]/g, "")
                    : item.price;
                const priceNum = parseFloat(priceString) || 0;
                const subtotal = priceNum * item.quantity;

                return (
                  <div key={item.id} className="cartpage-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cartpage-item-image"
                    />
                    <div className="cartpage-item-details">
                      <h3 className="cartpage-item-name">{item.name}</h3>
                      <p className="cartpage-item-price">{item.price}</p>
                      <div className="cartpage-item-controls">
                        <button
                          className="cartpage-qty-btn"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <FaMinus />
                        </button>
                        <span className="cartpage-qty">{item.quantity}</span>
                        <button
                          className="cartpage-qty-btn"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <p className="cartpage-item-subtotal">
                        Subtotal: ₦{subtotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cartpage-summary">
              <h2 className="cartpage-summary-title">Cart Summary</h2>
              <p className="cartpage-summary-items">
                Total Items: {totalItems}
              </p>
              <p className="cartpage-summary-price">
                Total Price: ₦{totalPrice.toLocaleString()}
              </p>
            </div>

            <div className="cartpage-customer-form">
              <h2 className="cartpage-form-title">Customer Details</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={customerDetails.fullName}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    fullName: e.target.value,
                  })
                }
                className="cartpage-input"
                required
              />
              <input
                type="text"
                placeholder="Delivery Address"
                value={customerDetails.deliveryAddress}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    deliveryAddress: e.target.value,
                  })
                }
                className="cartpage-input"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number "
                value={customerDetails.phoneNumber}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    phoneNumber: e.target.value,
                  })
                }
                className="cartpage-input"
              />
            </div>

            <div className="cartpage-actions">
              <button className="cartpage-clear-btn" onClick={handleClearCart}>
                <FaTrash /> Clear Cart
              </button>
              <button
                className="cartpage-order-btn"
                onClick={handleOrderViaWhatsApp}
              >
                <FaWhatsapp /> Order via WhatsApp
              </button>
            </div>
          </>
        )}
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearModal && (
        <div
          className="cartpage-modal-overlay"
          onClick={() => setShowClearModal(false)}
        >
          <div className="cartpage-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="cartpage-modal-title">Clear Cart</h2>
            <p className="cartpage-modal-message">
              Are you sure you want to clear your cart? This action cannot be
              undone.
            </p>
            <div className="cartpage-modal-actions">
              <button
                className="cartpage-modal-btn cartpage-modal-cancel"
                onClick={() => setShowClearModal(false)}
              >
                Cancel
              </button>
              <button
                className="cartpage-modal-btn cartpage-modal-confirm"
                onClick={confirmClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div
          className="cartpage-modal-overlay"
          onClick={() => setShowErrorModal(false)}
        >
          <div className="cartpage-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="cartpage-modal-title">Error</h2>
            <p className="cartpage-modal-message">{errorMessage}</p>
            <div className="cartpage-modal-actions">
              <button
                className="cartpage-modal-btn cartpage-modal-ok"
                onClick={() => setShowErrorModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
