import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProfileAPI, buyTicketAPI } from "../components/services/userServices";

function Checkout() {
  const location = useLocation();
  const { eventDetail, ticketCount, eventBanner } = location.state || {}; 

  const [profile, setProfile] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileAPI();
        setProfile({ name: profileData.name, email: profileData.email });
      } catch (error) {
        console.error("Error fetching profile data", error);
        toast.error("Error fetching profile data");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!eventDetail) {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      setCartItems(cart);
    } else {
      setCartItems([
        {
          ...eventDetail,
          ticketCount: ticketCount,
          eventBanner: eventBanner,
        },
      ]);
    }
  }, [eventDetail, ticketCount, eventBanner]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.ticketCount || 0) * (item.ticketPrice || 0);
    }, 0);
  };

  const handleConfirmAndPay = async () => {
    setIsSubmitting(true);

    const orderDetails = cartItems.map((item) => ({
      eventDetailId: item.eventId, 
      quantity: item.ticketCount,
      emailReceive: profile.email,
      ticketPrice: item.ticketPrice,
    }));

    try {
      await buyTicketAPI(orderDetails);
      toast.success("Booking confirmed!");
      setTimeout(() => {
        sessionStorage.removeItem("cart"); // Clear the cart after successful booking
        window.location.href = "/booking_confirmed";
      }, 2000);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error creating order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return <div>No event details available</div>;
  }

  return (
    <div>
      <ToastContainer />
      <div className="wrapper">
        <div className="breadcrumb-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-10">
                <div className="barren-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="/explore_events">Explore Events</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Checkout
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="event-dt-block p-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="main-title checkout-title">
                  <h3>Order Confirmation</h3>
                </div>
              </div>
              <div className="col-xl-8 col-lg-12 col-md-12">
                <div className="checkout-block">
                  <div className="main-card">
                    <div className="bp-title">
                      <h4>Billing Information</h4>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12">
                <div className="main-card order-summary">
                  <div className="bp-title">
                    <h4>Order Summary</h4>
                  </div>
                  <div className="order-summary-content p_30">
                    {cartItems.map((item, index) => (
                      <div key={index} className="event-order-dt">
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
                            {item.startDate &&
                              new Date(item.startDate).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="order-total-block">
                      <div className="order-total-dt">
                        <div className="order-text">Total Tickets</div>
                        <div className="order-number">
                          {cartItems.reduce((total, item) => total + item.ticketCount, 0) || 0}
                        </div>
                      </div>
                      <div className="order-total-dt">
                        <div className="order-text">Sub Total</div>
                        <div className="order-number">
                          {`$${calculateTotalPrice().toFixed(2)}`}
                        </div>
                      </div>
                      <div className="divider-line" />
                      <div className="order-total-dt">
                        <div className="order-text">Total</div>
                        <div className="order-number ttl-clr">
                          {`$${calculateTotalPrice().toFixed(2)}`}
                        </div>
                      </div>
                    </div>
                    <div className="coupon-code-block">
                      <div className="form-group mt-4">
                        <label className="form-label">Coupon Code*</label>
                        <div className="position-relative">
                          <input
                            className="form-control h_50"
                            type="text"
                            placeholder="Code"
                          />
                          <button className="apply-btn btn-hover" type="button">
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="confirmation-btn">
                      <button
                        className="main-btn btn-hover h_50 w-100 mt-5"
                        type="button"
                        onClick={handleConfirmAndPay}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Confirm & Pay"}
                      </button>
                      <span>Price is inclusive of all applicable GST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
