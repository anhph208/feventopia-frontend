import React from "react";
import { useNavigate } from "react-router-dom";

const PopupCart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className={`popup-cart ${isOpen ? "open" : ""}`}>
      <div className="popup-cart-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Giỏ hàng của bạn</h3>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <h4>{item.eventName}</h4>
              <p>
                {item.ticketCount} x {item.ticketPrice} VND
              </p>
              <p>
                Tổng: {item.ticketCount * item.ticketPrice} VND
              </p>
            </div>
          ))
        ) : (
          <p>Giỏ hàng trống.</p>
        )}
        <button className="checkout-btn" onClick={handleCheckout}>
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default PopupCart;
