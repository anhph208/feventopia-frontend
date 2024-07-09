import React from "react";
import { useLocation } from "react-router-dom";

function BookingConfirm() {
  const location = useLocation();
  const { eventDetail, ticketCount, profile } = location.state || {};

  if (!eventDetail || !profile) {
    return <div>No booking details available</div>;
  }

  return (
    <div>
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
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Booking Confirmed
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
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-7 col-md-10">
                <div className="booking-confirmed-content">
                  <div className="main-card">
                    <div className="booking-confirmed-top text-center p_30">
                      <div className="booking-confirmed-img mt-4">
                        <img
                          src="/assets/images/confirmed.png"
                          alt="Booking Confirmed"
                        />
                      </div>
                      <h4>Booking Confirmed</h4>
                      <p className="ps-lg-4 pe-lg-4">
                        We are pleased to inform you that your reservation
                        request has been received and confirmed.
                      </p>
                      <div className="add-calender-booking">
                        <h5>Add</h5>
                        <a href="#" className="cb-icon">
                          <i className="fa-brands fa-windows" />
                        </a>
                        <a href="#" className="cb-icon">
                          <i className="fa-brands fa-apple" />
                        </a>
                        <a href="#" className="cb-icon">
                          <i className="fa-brands fa-google" />
                        </a>
                        <a href="#" className="cb-icon">
                          <i className="fa-brands fa-yahoo" />
                        </a>
                      </div>
                    </div>
                    <div className="booking-confirmed-bottom">
                      <div className="booking-confirmed-bottom-bg p_30">
                        <div className="event-order-dt">
                          <div className="event-thumbnail-img">
                            <img
                              src={eventDetail?.eventBanner || "/assets/images/event-imgs/img-7.jpg"}
                              alt="Event Thumbnail"
                            />
                          </div>
                          <div className="event-order-dt-content">
                            <h5>{eventDetail.eventName}</h5>
                            <span>
                              {eventDetail.startDate &&
                                new Date(eventDetail.startDate).toLocaleString()}.
                              Duration {eventDetail.duration || "1h"}
                            </span>
                            <div className="buyer-name">{profile.name}</div>
                            <div className="booking-total-tickets">
                              <i className="fa-solid fa-ticket rotate-icon" />
                              <span className="booking-count-tickets mx-2">
                                {ticketCount}
                              </span>
                              x Ticket
                            </div>
                            <div className="booking-total-grand">
                              Total : <span>${eventDetail.ticketPrice * ticketCount}</span>
                            </div>
                          </div>
                        </div>
                        <a
                          href="/invoice"
                          className="main-btn btn-hover h_50 w-100 mt-5"
                        >
                          <i className="fa-solid fa-ticket rotate-icon me-3" />
                          View Ticket
                        </a>
                      </div>
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

export default BookingConfirm;
