import React from "react";

function eventDetails() {
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
                        <a href="index.html">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="explore_events.html">Explore Events</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Venue Event Detail View
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
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="event-top-dts">
                  <div className="event-top-date">
                    <span className="event-month">Apr</span>
                    <span className="event-date">30</span>
                  </div>
                  <div className="event-top-dt">
                    <h3 className="event-main-title">
                      Spring Showcase Saturday April 30th 2022 at 7pm
                    </h3>
                    <div className="event-top-info-status">
                      <span className="event-type-name">
                        <i className="fa-solid fa-location-dot" />
                        Venue Event
                      </span>
                      <span className="event-type-name details-hr">
                        Starts on{" "}
                        <span className="ev-event-date">
                          Sat, Apr 30, 2022 11:30 AM
                        </span>
                      </span>
                      <span className="event-type-name details-hr">2h</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-md-12">
                <div className="main-event-dt">
                  <div className="event-img">
                    <img src="./assets/./assets/images/event-imgs/big-2.jpg" alt />
                  </div>
                  <div className="share-save-btns dropdown">
                    <button className="sv-btn me-2">
                      <i className="fa-regular fa-bookmark me-2" />
                      Save
                    </button>
                    <button
                      className="sv-btn"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-share-nodes me-2" />
                      Share
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
                          <i className="fa-brands fa-twitter me-3" />
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fa-brands fa-linkedin-in me-3" />
                          LinkedIn
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
                  <div className="main-event-content">
                    <h4>About This Event</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Proin dolor justo, sodales mattis orci et, mattis faucibus
                      est. Nulla semper consectetur sapien a tempor. Ut vel
                      lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis
                      euismod libero. Ut pretium bibendum urna nec egestas.
                      Etiam tempor vehicula libero. Aenean cursus venenatis
                      orci, ac porttitor leo porta sit amet. Nulla eleifend
                      mollis enim sed rutrum. Nunc cursus ex a ligula consequat
                      aliquet. Donec semper tellus ac ante vestibulum, vitae
                      varius leo mattis. In vestibulum blandit tempus. Etiam
                      elit turpis, volutpat hendrerit varius ut, posuere a
                      sapien. Maecenas molestie bibendum finibus. Nulla euismod
                      neque vel sem hendrerit faucibus. Nam sit amet metus
                      sollicitudin, luctus eros at, consectetur libero.
                    </p>
                    <p>
                      In malesuada luctus libero sed gravida. Suspendisse nunc
                      est, maximus vel viverra nec, suscipit non massa. Maecenas
                      efficitur vestibulum pellentesque. Ut finibus ullamcorper
                      congue. Sed ut libero sit amet lorem venenatis facilisis.
                      Mauris egestas tortor vel massa auctor, eget gravida
                      mauris cursus. Etiam elementum semper fermentum.
                      Suspendisse potenti. Morbi lobortis leo urna, non laoreet
                      enim ultricies id. Integer id felis nec sapien consectetur
                      porttitor. Proin tempor mauris in odio iaculis semper.
                      Cras ultricies nulla et dui viverra, eu convallis orci
                      fermentum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-12">
                <div className="main-card event-right-dt">
                  <div className="bp-title">
                    <h4>Event Details</h4>
                  </div>
                  <div className="time-left">
                    <div className="countdown">
                      <div className="countdown-item">
                        <span id="day" />
                        days
                      </div>
                      <div className="countdown-item">
                        <span id="hour" />
                        Hours
                      </div>
                      <div className="countdown-item">
                        <span id="minute" />
                        Minutes
                      </div>
                      <div className="countdown-item">
                        <span id="second" />
                        Seconds
                      </div>
                    </div>
                  </div>
                  <div className="event-dt-right-group mt-5">
                    <div className="event-dt-right-icon">
                      <i className="fa-solid fa-circle-user" />
                    </div>
                    <div className="event-dt-right-content">
                      <h4>Organised by</h4>
                      <h5>The Teeny Rabbit</h5>
                      <a href="attendee_profile_view.html">View Profile</a>
                    </div>
                  </div>
                  <div className="event-dt-right-group">
                    <div className="event-dt-right-icon">
                      <i className="fa-solid fa-calendar-day" />
                    </div>
                    <div className="event-dt-right-content">
                      <h4>Date and Time</h4>
                      <h5>Sat, Apr 30, 2022 11:30 AM</h5>
                      <div className="add-to-calendar">
                        <a
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-regular fa-calendar-days me-3" />
                          Add to Calendar
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <i className="fa-brands fa-windows me-3" />
                              Outlook
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <i className="fa-brands fa-apple me-3" />
                              Apple
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <i className="fa-brands fa-google me-3" />
                              Google
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <i className="fa-brands fa-yahoo me-3" />
                              Yahoo
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="event-dt-right-group">
                    <div className="event-dt-right-icon">
                      <i className="fa-solid fa-location-dot" />
                    </div>
                    <div className="event-dt-right-content">
                      <h4>Location</h4>
                      <h5 className="mb-0">
                        00 Challis St, Newport, Victoria, 0000, Australia
                      </h5>
                      <a href="#">
                        <i className="fa-solid fa-location-dot me-2" />
                        View Map
                      </a>
                    </div>
                  </div>
                  <div className="select-tickets-block">
                    <h6>Select Tickets</h6>
                    <div className="select-ticket-action">
                      <div className="ticket-price">AUD $75.00</div>
                      <div className="quantity">
                        <div className="counter">
                          <span
                            className="down"
                            onclick="decreaseCount(event, this)"
                          >
                            -
                          </span>
                          <input type="text" defaultValue={0} />
                          <span
                            className="up"
                            onclick="increaseCount(event, this)"
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                    <p>
                      2 x pair hand painted leather earrings 1 x glass of
                      bubbles / or coffee Individual grazing box / fruit cup
                    </p>
                    <div className="xtotel-tickets-count">
                      <div className="x-title">1x Ticket(s)</div>
                      <h4>
                        AUD <span>$0.00</span>
                      </h4>
                    </div>
                  </div>
                  <div className="booking-btn">
                    <a
                      href="checkout.html"
                      className="main-btn btn-hover w-100"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="more-events">
                  <div className="main-title position-relative">
                    <h3>More Events</h3>
                    <a href="explore_events.html" className="view-all-link">
                      Browse All
                      <i className="fa-solid fa-right-long ms-2" />
                    </a>
                  </div>
                  <div className="owl-carousel moreEvents-slider owl-theme">
                    <div className="item">
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="venue_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img src="./assets/./assets/images/event-imgs/img-1.jpg" alt />
                          </a>
                          <span className="bookmark-icon" title="Bookmark" />
                        </div>
                        <div className="event-content">
                          <a
                            href="venue_event_detail_view.html"
                            className="event-title"
                          >
                            A New Way Of Life
                          </a>
                          <div className="duration-price-remaining">
                            <span className="duration-price">AUD $100.00*</span>
                            <span className="remaining" />
                          </div>
                        </div>
                        <div className="event-footer">
                          <div className="event-timing">
                            <div className="publish-date">
                              <span>
                                <i className="fa-solid fa-calendar-day me-2" />
                                15 Apr
                              </span>
                              <span className="dot">
                                <i className="fa-solid fa-circle" />
                              </span>
                              <span>Fri, 3.45 PM</span>
                            </div>
                            <span className="publish-time">
                              <i className="fa-solid fa-clock me-2" />
                              1h
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="online_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img src="./assets/./assets/images/event-imgs/img-2.jpg" alt />
                          </a>
                          <span className="bookmark-icon" title="Bookmark" />
                        </div>
                        <div className="event-content">
                          <a
                            href="online_event_detail_view.html"
                            className="event-title"
                          >
                            Earrings Workshop with Bronwyn David
                          </a>
                          <div className="duration-price-remaining">
                            <span className="duration-price">AUD $75.00*</span>
                            <span className="remaining">
                              <i className="fa-solid fa-ticket fa-rotate-90" />6
                              Remaining
                            </span>
                          </div>
                        </div>
                        <div className="event-footer">
                          <div className="event-timing">
                            <div className="publish-date">
                              <span>
                                <i className="fa-solid fa-calendar-day me-2" />
                                30 Apr
                              </span>
                              <span className="dot">
                                <i className="fa-solid fa-circle" />
                              </span>
                              <span>Sat, 11.20 PM</span>
                            </div>
                            <span className="publish-time">
                              <i className="fa-solid fa-clock me-2" />
                              2h
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="venue_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img src="./assets/./assets/images/event-imgs/img-3.jpg" alt />
                          </a>
                          <span className="bookmark-icon" title="Bookmark" />
                        </div>
                        <div className="event-content">
                          <a
                            href="venue_event_detail_view.html"
                            className="event-title"
                          >
                            Spring Showcase Saturday April 30th 2022 at 7pm
                          </a>
                          <div className="duration-price-remaining">
                            <span className="duration-price">Free*</span>
                            <span className="remaining" />
                          </div>
                        </div>
                        <div className="event-footer">
                          <div className="event-timing">
                            <div className="publish-date">
                              <span>
                                <i className="fa-solid fa-calendar-day me-2" />1
                                May
                              </span>
                              <span className="dot">
                                <i className="fa-solid fa-circle" />
                              </span>
                              <span>Sun, 4.30 PM</span>
                            </div>
                            <span className="publish-time">
                              <i className="fa-solid fa-clock me-2" />
                              3h
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="online_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img src="./assets/./assets/images/event-imgs/img-4.jpg" alt />
                          </a>
                          <span className="bookmark-icon" title="Bookmark" />
                        </div>
                        <div className="event-content">
                          <a
                            href="online_event_detail_view.html"
                            className="event-title"
                          >
                            Shutter Life
                          </a>
                          <div className="duration-price-remaining">
                            <span className="duration-price">AUD $85.00</span>
                            <span className="remaining">
                              <i className="fa-solid fa-ticket fa-rotate-90" />7
                              Remaining
                            </span>
                          </div>
                        </div>
                        <div className="event-footer">
                          <div className="event-timing">
                            <div className="publish-date">
                              <span>
                                <i className="fa-solid fa-calendar-day me-2" />1
                                May
                              </span>
                              <span className="dot">
                                <i className="fa-solid fa-circle" />
                              </span>
                              <span>Sun, 5.30 PM</span>
                            </div>
                            <span className="publish-time">
                              <i className="fa-solid fa-clock me-2" />
                              1h
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="venue_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img src="./assets/./assets/images/event-imgs/img-5.jpg" alt />
                          </a>
                          <span className="bookmark-icon" title="Bookmark" />
                        </div>
                        <div className="event-content">
                          <a
                            href="venue_event_detail_view.html"
                            className="event-title"
                          >
                            Friday Night Dinner at The Old Station May 27 2022
                          </a>
                          <div className="duration-price-remaining">
                            <span className="duration-price">AUD $41.50*</span>
                            <span className="remaining" />
                          </div>
                        </div>
                        <div className="event-footer">
                          <div className="event-timing">
                            <div className="publish-date">
                              <span>
                                <i className="fa-solid fa-calendar-day me-2" />
                                27 May
                              </span>
                              <span className="dot">
                                <i className="fa-solid fa-circle" />
                              </span>
                              <span>Fri, 12.00 PM</span>
                            </div>
                            <span className="publish-time">
                              <i className="fa-solid fa-clock me-2" />
                              5h
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="venue_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img src="./assets/./assets/images/event-imgs/img-6.jpg" alt />
                          </a>
                          <span className="bookmark-icon" title="Bookmark" />
                        </div>
                        <div className="event-content">
                          <a
                            href="venue_event_detail_view.html"
                            className="event-title"
                          >
                            Step Up Open Mic Show
                          </a>
                          <div className="duration-price-remaining">
                            <span className="duration-price">AUD $200.00*</span>
                            <span className="remaining" />
                          </div>
                        </div>
                        <div className="event-footer">
                          <div className="event-timing">
                            <div className="publish-date">
                              <span>
                                <i className="fa-solid fa-calendar-day me-2" />
                                30 Jun
                              </span>
                              <span className="dot">
                                <i className="fa-solid fa-circle" />
                              </span>
                              <span>Thu, 4.30 PM</span>
                            </div>
                            <span className="publish-time">
                              <i className="fa-solid fa-clock me-2" />
                              1h
                            </span>
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
      </div>
    </div>
  );
}

export default eventDetails;
