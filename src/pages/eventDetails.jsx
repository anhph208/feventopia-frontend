import React, { useState, useEffect, useContext } from "react";
import { getEventDetailsAPI } from "../components/services/userServices";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../components/Cart/CartContext";
import Cart from "../components/Cart/Cart";
import { toast } from "react-toastify";
import { formatDateTime, PriceFormat } from "../utils/tools"; // Import the functions

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketCounts, setTicketCounts] = useState({});

  const decreaseCount = (id) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0,
    }));
  };

  const increaseCount = (id) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const handleBookNow = (id) => {
    const selectedEventDetail = eventDetails.eventDetail.find(
      (event) => event.id === id
    );

    if (!selectedEventDetail) {
      console.error("Không tìm thấy sự kiện.");
      return;
    }

    const ticketCount = ticketCounts[id] || 0;
    if (ticketCount === 0) {
      toast.error("Hãy chọn ít nhất 1 vé!");
      return;
    }

    const selectedEvent = {
      eventId: selectedEventDetail.id,
      eventName: eventDetails.eventName,
      startDate: selectedEventDetail.startDate,
      endDate: selectedEventDetail.endDate,
      location: selectedEventDetail.location.locationName,
      ticketCount: ticketCounts[id] || 0,
      ticketPrice: selectedEventDetail.ticketPrice,
    };

    navigate("/checkout", {
      state: {
        eventDetail: selectedEvent,
        ticketCount: ticketCounts[id] || 0,
        eventBanner: eventDetails.banner,
      },
    });
  };

  const handleAddToCart = (id) => {
    const selectedEventDetail = eventDetails.eventDetail.find(
      (event) => event.id === id
    );

    if (!selectedEventDetail) {
      console.error("Không tìm thấy sự kiện.");
      return;
    }

    const ticketCount = ticketCounts[id] || 0;
    if (ticketCount === 0) {
      toast.error("Hãy chọn ít nhất 1 vé!");
      return;
    }

    const cartItem = {
      eventId: selectedEventDetail.id,
      eventName: eventDetails.eventName,
      startDate: selectedEventDetail.startDate,
      endDate: selectedEventDetail.endDate,
      location: selectedEventDetail.location.locationName,
      ticketCount: ticketCount,
      ticketPrice: selectedEventDetail.ticketPrice,
      eventBanner: eventDetails.banner,
    };

    addToCart(cartItem);
    toast.success("Vé đã được thêm vào Giỏ Hàng!");
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const details = await getEventDetailsAPI(eventId);
        setEventDetails(details);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading event details</div>;
  if (!eventDetails) return <div>No event details found</div>;

  const isEventPast = (endDate) => {
    const currentDateTime = new Date();
    const eventEndDate = new Date(endDate);
    return currentDateTime > eventEndDate;
  };

  return (
    <div>
      <div className="wrapper">       
        <div className="event-dt-block p-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="main-event-dt">
                  <div className="event-img">
                    <img
                      src={
                        eventDetails.banner ||
                        "./assets/images/event-imgs/big-2.jpg"
                      }
                      alt={eventDetails.eventName}
                    />
                  </div>
                  <div className="share-save-btns dropdown">                 
                    <button
                      className="sv-btn"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-share-nodes me-2" />
                      Chia Sẻ
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fa-brands fa-facebook me-3" />
                          Facebook
                        </a>
                      </li>                     
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fa-regular fa-envelope me-3" />
                          Email
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="main-event-content">
                  <div className="event-top-dt">
                    <h3 className="event-main-title">
                      {eventDetails.eventName}
                    </h3>
                  </div>
                  <div
                    className="event-description"
                    dangerouslySetInnerHTML={{
                      __html: eventDetails.eventDescription,
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                {eventDetails.eventDetail.map((eventDetail) => (
                  <div key={eventDetail.id} className="event-right-dt">
                    <div className="main-card">
                      <div className="event-dt-right-group mt-5">
                        <div className="event-dt-right-icon">
                          <i className="fa-solid fa-calendar-day" />
                        </div>
                        <div className="event-dt-right-content">
                          <h4>Thời gian</h4>
                          <h5>
                            {formatDateTime(eventDetail.startDate)} -{" "}
                            {formatDateTime(eventDetail.endDate)}
                          </h5>
                        </div>
                      </div>
                      <div className="event-dt-right-group">
                        <div className="event-dt-right-icon">
                          <i className="fa-solid fa-location-dot" />
                        </div>
                        <div className="event-dt-right-content">
                          <h4>Địa điểm</h4>
                          <h5 className="mb-0">
                            {eventDetail.location.locationName}
                          </h5>
                        </div>
                      </div>
                      {!isEventPast(eventDetail.endDate) && (
                        <div className="select-tickets-block">
                          <div className="select-ticket-action">
                            <div className="ticket-price">
                              <h5>Giá vé</h5>
                              <strong>
                                <PriceFormat price={eventDetail.ticketPrice} />
                              </strong>
                              {/* Use PriceFormat component */}
                            </div>
                            <div className="quantity">
                              <div className="counter">
                                <span
                                  className="down"
                                  onClick={() => decreaseCount(eventDetail.id)}
                                >
                                  -
                                </span>
                                <input
                                  type="text"
                                  value={ticketCounts[eventDetail.id] || 0}
                                  readOnly
                                />
                                <span
                                  className="up"
                                  onClick={() => increaseCount(eventDetail.id)}
                                >
                                  +
                                </span>
                              </div>
                            </div>
                          </div>
                          <p>TỔNG TIỀN TẠM TÍNH</p>
                          <div className="xtotel-tickets-count">
                            <div className="x-title">
                              {ticketCounts[eventDetail.id] || 0}x Ticket(s)
                            </div>
                            <h4>
                              <span>
                                <PriceFormat
                                  price={
                                    (ticketCounts[eventDetail.id] || 0) *
                                    eventDetail.ticketPrice
                                  }
                                />
                              </span>
                            </h4>
                          </div>
                        </div>
                      )}
                      <div className="booking-btn">
                        {isEventPast(eventDetail.endDate) ? (
                          <button className="main-end-btn w-100" disabled>
                            <strong>SỰ KIỆN ĐÃ NGỪNG BÁN VÉ</strong>
                          </button>
                        ) : (
                          <>
                            <button
                              className="main-btn btn-hover w-100 mt-2"
                              onClick={() => handleBookNow(eventDetail.id)}
                            >
                              <strong>Mua vé ngay!</strong>
                            </button>
                            <button
                              className="main-btn btn-hover w-100 mt-3"
                              onClick={() => handleAddToCart(eventDetail.id)}
                            >
                              <strong>Thêm vào giỏ hàng</strong>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cart />
    </div>
  );
}

export default EventDetails;
