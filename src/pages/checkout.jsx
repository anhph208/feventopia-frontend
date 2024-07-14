import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getProfileAPI,
  buyTicketAPI,
} from "../components/services/userServices";
import { formatDateTime, PriceFormat } from "../utils/tools";
import RechargeModal from "../components/rechargeModal"; // Import the RechargeModal component

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventDetail, ticketCount, eventBanner, checkoutType } =
    location.state || {};

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    creditAmount: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutMode, setCheckoutMode] = useState(checkoutType || "cart");
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileAPI();
        setProfile({
          name: profileData.name,
          email: profileData.email,
          creditAmount: profileData.creditAmount,
        });
      } catch (error) {
        console.error("Error fetching profile data", error);
        toast.error("Error fetching profile data");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (checkoutMode === "bookNow" && eventDetail) {
      setCartItems([
        {
          ...eventDetail,
          ticketCount: ticketCount,
          eventBanner: eventBanner,
        },
      ]);
    } else {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      setCartItems(cart);
    }
  }, [checkoutMode, eventDetail, ticketCount, eventBanner]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.ticketCount || 0) * (item.ticketPrice || 0);
    }, 0);
  };

  const handleConfirmAndPay = async () => {
    if (profile.creditAmount < calculateTotalPrice()) {
      setErrorMessage("Số dư ví không đủ. Vui lòng nạp thêm tiền.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const orderDetails = cartItems.map((item) => ({
      eventDetailId: item.eventId,
      quantity: item.ticketCount,
    }));

    const totalPrice = calculateTotalPrice();

    const requestBody = {
      ticketRequests: orderDetails,
      emailAddress: profile.email,
      totalPrice: totalPrice,
    };

    try {
      await buyTicketAPI(requestBody);
      const toastId = toast.success("Thanh toán thành công!", {
        autoClose: 2000, // close after 2 seconds
      });

      // Navigate after the toast disappears
      toast.onChange((payload) => {
        if (payload.status === "removed" && payload.id === toastId) {
          if (checkoutMode === "cart") {
            sessionStorage.removeItem("cart"); // Clear the cart after successful booking
          }
          navigate("/userprofile", { state: { activeTab: "orders" } });
        }
      });
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error creating order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecharge = (amount) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      creditAmount: prevProfile.creditAmount + parseFloat(amount),
    }));
    toast.success("Nạp tiền thành công!");
    setShowRechargeModal(false);
  };

  if (cartItems.length === 0) {
    return <div>No event details available</div>;
  }

  const totalPrice = calculateTotalPrice();
  const isInsufficientFunds = profile.creditAmount < totalPrice;

  return (
    <div>
      <div className="wrapper">
        <div className="event-dt-block p-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="main-title checkout-title">
                  <h3>THANH TOÁN</h3>
                </div>
              </div>
              <div className="col-xl-8 col-lg-12 col-md-12">
                <div className="checkout-block">
                  <div className="main-card">
                    <div className="bp-title">
                      <h4>Thông tin Thanh toán</h4>
                    </div>
                    <div className="bp-content bp-form">
                      <div className="row">
                        <div className="col-lg-6 col-md-12">
                          <div className="form-group mt-4">
                            <label className="form-label">Họ Tên*</label>
                            <input
                              className="form-control h_50"
                              type="text"
                              value={profile.name}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                          <div className="form-group mt-4">
                            <label className="form-label">Email*</label>
                            <input
                              className="form-control h_50"
                              type="email"
                              value={profile.email}
                              required
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        {isInsufficientFunds && (
                          <div className="alert alert-danger mt-3">
                            Số dư ví của bạn không đủ. Vui lòng nạp thêm tiền.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12">
                <div className="main-card order-summary">
                  <div className="bp-title">
                    <h4>Đơn Mua Vé</h4>
                  </div>
                  <div className="order-summary-content p_30">
                    {cartItems.map((item, index) => (
                      <div key={index} className="event-order-dt mt-2">
                        <div className="event-thumbnail-img">
                          <img
                            src={
                              item.eventBanner ||
                              "./assets/images/event-imgs/img-7.jpg"
                            }
                            alt="Event Thumbnail"
                          />
                        </div>
                        <div className="event-order-dt-content">
                          <h5>{item.eventName || "Event Name"}</h5>
                          <span>
                            {item.startDate && formatDateTime(item.startDate)}
                          </span>
                          <span>
                            Giá vé: {<PriceFormat price={item.ticketPrice} />}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="order-total-block">
                      <div className="order-total-dt">
                        <div className="order-text">Tổng số Vé</div>
                        <div className="order-number">
                          {cartItems.reduce(
                            (total, item) => total + item.ticketCount,
                            0
                          ) || 0}
                        </div>
                      </div>
                      <div className="order-total-dt">
                        <div className="order-text">Tổng Tạm tính</div>
                        <div className="order-number">
                          <PriceFormat price={totalPrice} />
                        </div>
                      </div>
                      <div className="divider-line" />
                      <div className="order-total-dt">
                        <div className="order-text">Tổng Tiền</div>
                        <div className="order-number ttl-clr">
                          <PriceFormat price={totalPrice} />
                        </div>
                      </div>
                      <div className="order-total-dt">
                        <div className="order-text">Số dư ví</div>
                        <div className="order-number ttl-clr">
                          <PriceFormat price={profile.creditAmount} />
                        </div>
                      </div>
                    </div>
                    <div className="confirmation-btn">
                      <button
                        className="main-btn btn-hover h_50 w-100 mt-5"
                        type="button"
                        onClick={
                          isInsufficientFunds
                            ? () => setShowRechargeModal(true)
                            : handleConfirmAndPay
                        }
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Đang xử lí... Vui lòng không thoát trang!"
                          : isInsufficientFunds
                          ? "Nạp tiền"
                          : "Xác nhận Thanh toán"}
                      </button>
                      {isInsufficientFunds && (
                        <div className="text-danger mt-2">
                          Số dư ví không đủ. Vui lòng nạp thêm tiền.
                        </div>
                      )}
                      <span>Giá Vé đã bao gồm VAT.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RechargeModal
        show={showRechargeModal}
        handleClose={() => setShowRechargeModal(false)}
        handleRecharge={handleRecharge}
      />
    </div>
  );
}

export default Checkout;
