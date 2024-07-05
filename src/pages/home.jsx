import React, { useState, useEffect, useRef } from "react";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import {
  getAllEventAPI,
  getEventDetailsAPI,
} from "../components/services/userServices";
import mixitup from "mixitup";
import HomeSlider from "../components/HomeSlider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { formatDateTime, PriceFormat } from "../utils/tools";

const CATEGORY_ORDER = {
  TALKSHOW: 1,
  COMPETITION: 2,
  FESTIVAL: 3,
  MUSICSHOW: 4,
};

const sliderItems = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-banner%2FHackAthon.jfif?alt=media&token=2beb5b41-6760-4f39-81e4-1e2e0c54d5a8",
    altText: "Hackathon 2024",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-banner%2FTichtichtinhtang.jfif?alt=media&token=35a49e1a-67b5-4638-915d-37a7ca574932",
    altText: "TTTT 2024",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-banner%2FLookOnme.jpg?alt=media&token=c2b558e1-8aa3-4ba0-99ba-d5c5b7e7da82",
    altText: "LOOKONME 2024",
  },
];

const sponsorItems = [
  {
    image: "./assets/images/icons/sponsor-1.png",
    altText: "Sponsor 1",
  },
  {
    image: "./assets/images/icons/sponsor-2.png",
    altText: "Sponsor 2",
  },
  {
    image: "./assets/images/icons/sponsor-3.png",
    altText: "Sponsor 3",
  },
  {
    image: "./assets/images/icons/sponsor-4.png",
    altText: "Sponsor 4",
  },
  {
    image: "./assets/images/icons/sponsor-5.png",
    altText: "Sponsor 5",
  },
  {
    image: "./assets/images/icons/sponsor-6.png",
    altText: "Sponsor 6",
  },
  {
    image: "./assets/images/icons/sponsor-7.png",
    altText: "Sponsor 7",
  },
];

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const containerRef = useRef(null);
  const mixerRef = useRef(null);

  const fetchEvents = async (page) => {
    setLoading(true);
    try {
      const { events, pagination } = await getAllEventAPI(page, 8);
      const filteredEvents = events.filter(
        (event) => event.status === "EXECUTE"
      );

      // Fetch details for each event
      const eventDetailsPromises = filteredEvents.map((event) =>
        getEventDetailsAPI(event.id)
      );
      const eventsWithDetails = await Promise.all(eventDetailsPromises);

      // Process the details to get the earliest start date and smallest price
      const processedEvents = eventsWithDetails.map((eventDetails) => {
        const earliestStartDate = eventDetails.eventDetail.reduce(
          (earliest, current) =>
            new Date(current.startDate) < new Date(earliest.startDate)
              ? current
              : earliest
        ).startDate;

        const smallestPrice = Math.min(
          ...eventDetails.eventDetail.map((detail) => detail.ticketPrice)
        );

        return {
          ...eventDetails,
          earliestStartDate,
          smallestPrice,
        };
      });

      // Sort events by category
      const sortedEvents = processedEvents.sort((a, b) => {
        const categoryA = a.category.toUpperCase();
        const categoryB = b.category.toUpperCase();
        return (
          (CATEGORY_ORDER[categoryA] || 999) -
          (CATEGORY_ORDER[categoryB] || 999)
        );
      });

      setEvents(sortedEvents);
      setTotalPages(pagination.TotalPages);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    if (containerRef.current && events.length > 0 && !mixerRef.current) {
      console.log("Initializing Mixitup");
      mixerRef.current = mixitup(containerRef.current, {
        animation: {
          duration: 250,
        },
      });
    }
    return () => {
      if (mixerRef.current) {
        mixerRef.current.destroy();
        mixerRef.current = null;
      }
    };
  }, [events]);

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <div className="wrapper">
      <div className="slider-container">
        <HomeSlider
          items={sliderItems}
          autoplayTimeout={3000}
          loop={true}
          margin={0}
          smartSpeed={700}
        />
      </div>
      <div className="explore-events p-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="main-title">
                <h3>SƯ KIỆN MỚI NHẤT</h3>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="event-filter-items">
                <div className="featured-controls mt-2">
                  <div className="controls">
                    <button type="button" className="control" data-filter="all">
                      TẤT CẢ
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".talkshow"
                    >
                      TALKSHOW
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".competition"
                    >
                      CUỘC THI
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".festival"
                    >
                      FESTIVAL
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".musicshow"
                    >
                      ÂM NHẠC
                    </button>
                  </div>
                  <div className="row" ref={containerRef}>
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className={`col-xl-3 col-lg-4 col-md-6 col-sm-12 mix ${event.category.toLowerCase()}`}
                        data-ref="mixitup-target"
                      >
                        <div className="main-card mt-4">
                          <div className="event-thumbnail">
                            <Link
                              to={`/event/${event.id}`}
                              className="thumbnail-img"
                            >
                              <img
                                src={
                                  event.banner && event.banner !== "null"
                                    ? event.banner
                                    : "./assets/images/event-imgs/img-1.jpg"
                                }
                                alt={event.eventName}
                              />
                            </Link>
                            <span className="bookmark-icon" title="Bookmark" />
                          </div>
                          <div className="event-content">
                            <Link
                              to={`/event/${event.id}`}
                              className="event-title"
                            >
                              {event.eventName}
                            </Link>
                            <div className="duration-price-remaining">
                              <span className="duration-price">
                                GIÁ VÉ TỪ <strong><PriceFormat price={event.smallestPrice} /></strong>
                              </span>
                              <span className="remaining" />
                            </div>
                          </div>
                          <div className="event-footer">
                            <div className="event-timing">
                              <div className="publish-date">
                                <span>
                                  <i className="fa-solid fa-calendar-day me-2" />
                                  {formatDateTime(event.earliestStartDate)}
                                </span>
                                <span className="dot">
                                  <i className="fa-solid fa-circle" />
                                </span>
                              </div>                              
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {loading && <div>Loading...</div>}
                  {events.length === 0 && !loading && (
                    <div>No events found.</div>
                  )}
                  <Stack spacing={2} className="pagination-controls mt-5">
                    <Pagination
                      count={totalPages}
                      page={pageNumber}
                      onChange={handlePageChange}
                      variant="outlined"
                      shape="rounded"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "white",
                          backgroundColor: "#450b00",
                          "&.Mui-selected": {
                            backgroundColor: "#ff7f50",
                          },
                          "&:hover": {
                            backgroundColor: "#450b00",
                          },
                        },
                      }}
                    />
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="host-engaging-event-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="main-title">
                <h3>Host Engaging Online and Venue Events with Barren</h3>
                <p>
                  Organise venue events and host online events with unlimited
                  possibilities using our built-in virtual event platform. Build
                  a unique event experience for you and your attendees.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="engaging-block">
                <div className="owl-carousel engaging-slider owl-theme">
                  <div className="item">
                    <div className="main-card">
                      <div className="host-item">
                        <div className="host-img">
                          <img
                            src="./assets/images/icons/venue-events.png"
                            alt
                          />
                        </div>
                        <h4>Venue Events</h4>
                        <p>
                          Create outstanding event page for your venue events,
                          attract attendees and sell more tickets.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="main-card">
                      <div className="host-item">
                        <div className="host-img">
                          <img src="./assets/images/icons/webinar.png" alt />
                        </div>
                        <h4>Webinar</h4>
                        <p>
                          Webinars tend to be one-way events. Barren helps to
                          make them more engaging.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="main-card">
                      <div className="host-item">
                        <div className="host-img">
                          <img
                            src="./assets/images/icons/training-workshop.png"
                            alt
                          />
                        </div>
                        <h4>Training &amp; Workshop </h4>
                        <p>
                          Create and host profitable workshops and training
                          sessions online, sell tickets and earn money.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="main-card">
                      <div className="host-item">
                        <div className="host-img">
                          <img
                            src="./assets/images/icons/online-class.png"
                            alt
                          />
                        </div>
                        <h4>Online Class</h4>
                        <p>
                          Try our e-learning template to create a fantastic
                          e-learning event page and drive engagement.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="main-card">
                      <div className="host-item">
                        <div className="host-img">
                          <img src="./assets/images/icons/talk-show.png" alt />
                        </div>
                        <h4>Talk Show</h4>
                        <p>
                          Use our intuitive built-in event template to create
                          and host an engaging Talk Show.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="host-step-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="main-title">
                <h3>KHÔNG BỎ LỠ BẤT KÌ SỰ KIỆN NÀO VỚI FEVENTOPIA</h3>
                <p>
                  Use early-bird discounts, coupons and group ticketing to
                  double your ticket sale. Get paid quickly and securely.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="easy-steps-tab">
                <div className="nav step-tabs" role="tablist">
                  <button
                    className="step-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#step-01"
                    type="button"
                    role="tab"
                    aria-controls="step-01"
                    aria-selected="true"
                  >
                    BƯỚC 01<span>LỰA CHỌN SỰ KIỆN</span>
                  </button>
                  <button
                    className="step-link"
                    data-bs-toggle="tab"
                    data-bs-target="#step-02"
                    type="button"
                    role="tab"
                    aria-controls="step-02"
                    aria-selected="false"
                  >
                    BƯỚC 02<span>MUA VÉ</span>
                  </button>
                  <button
                    className="step-link"
                    data-bs-toggle="tab"
                    data-bs-target="#step-03"
                    type="button"
                    role="tab"
                    aria-controls="step-03"
                    aria-selected="false"
                  >
                    BƯỚC 03<span>THAM GIA SỰ KIỆN</span>
                  </button>
                  <button
                    className="step-link"
                    data-bs-toggle="tab"
                    data-bs-target="#step-04"
                    type="button"
                    role="tab"
                    aria-controls="step-04"
                    aria-selected="false"
                  >
                    BƯỚC 04<span>GỬI ĐÁNH GIÁ VÀ TIẾP TỤC THÔI</span>
                  </button>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="step-01"
                    role="tabpanel"
                  >
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="step-text">
                          Sign up for free and create your event easily in
                          minutes.
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-1.png"
                              alt
                            />
                          </div>
                          <h4>Sign up for free</h4>
                          <p>
                            Sign up easily using your Google or Facebook account
                            or email and create your events in minutes.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-2.png"
                              alt
                            />
                          </div>
                          <h4>Use built-in event page template</h4>
                          <p>
                            Choose from our customised page templates specially
                            designed to attract attendees.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-3.png"
                              alt
                            />
                          </div>
                          <h4>Customise your event page as you like</h4>
                          <p>
                            Add logo, collage hero images, and add details to
                            create an outstanding event page.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="step-02" role="tabpanel">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="step-text">
                          Use our multiple ticketing features &amp; marketing
                          automation tools to boost ticket sales.
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-4.png"
                              alt
                            />
                          </div>
                          <h4>
                            Promote your events on social media &amp; email
                          </h4>
                          <p>
                            Use our intuitive event promotion tools to reach
                            your target audience and sell tickets.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-5.png"
                              alt
                            />
                          </div>
                          <h4>
                            Use early-bird discounts, coupons &amp; group
                            ticketing
                          </h4>
                          <p>
                            Double your ticket sales using our built-in
                            discounts, coupons and group ticketing features.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-6.png"
                              alt
                            />
                          </div>
                          <h4>Get paid quickly &amp; securely</h4>
                          <p>
                            Use our PCI compliant payment gateways to collect
                            your payment securely.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="step-03" role="tabpanel">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="step-text">
                          Use Barren to host any types of online events for
                          free.
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-7.png"
                              alt
                            />
                          </div>
                          <h4>Free event hosting</h4>
                          <p>
                            Use Eventbookings to host any types of online events
                            for free.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-8.png"
                              alt
                            />
                          </div>
                          <h4>Built-in video conferencing platform</h4>
                          <p>
                            No need to integrate with ZOOM or other 3rd party
                            apps, use our built-in video conferencing platform
                            for your events.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-9.png"
                              alt
                            />
                          </div>
                          <h4>Connect your attendees with your event</h4>
                          <p>
                            Use our live engagement tools to connect with
                            attendees during the event.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="step-04" role="tabpanel">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="step-text">
                          Create more events and earn more money.
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-10.png"
                              alt
                            />
                          </div>
                          <h4>Create multiple sessions &amp; earn more</h4>
                          <p>
                            Use our event scheduling features to create multiple
                            sessions for your events &amp; earn more money.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-11.png"
                              alt
                            />
                          </div>
                          <h4>Clone past event to create similar events</h4>
                          <p>
                            Use our event cloning feature to clone past event
                            and create a new one easily within a few clicks.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-12.png"
                              alt
                            />
                          </div>
                          <h4>Get support like nowhere else</h4>
                          <p>
                            Our dedicated on-boarding coach will assist you in
                            becoming an expert in no time.
                          </p>
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
      <div className="testimonial-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="main-title">
                <h3>Transforming Thousands of Event Hosts Just Like You</h3>
                <p>
                  Be part of a winning team. We are continuously thriving to
                  bring the best to our customers. Be that a new product
                  feature, help in setting up your events or even supporting
                  your customers so that they can easily buy tickets and
                  participate your in events. Here is what some of the clients
                  have to say,
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="testimonial-slider-area">
                <div className="owl-carousel testimonial-slider owl-theme">
                  <div className="item">
                    <div className="main-card">
                      <div className="testimonial-content">
                        <div className="testimonial-text">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus maximus arcu et ligula maximus
                            vehicula. Phasellus at luctus lacus, quis eleifend
                            nibh. Nam vitae convallis nisi, vitae tempus risus.
                          </p>
                        </div>
                        <div className="testimonial-user-dt">
                          <h5>Madeline S.</h5>
                          <span>Events Co-ordinator</span>
                          <ul>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                          </ul>
                        </div>
                        <span className="quote-icon">
                          <i className="fa-solid fa-quote-right" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="main-card">
                      <div className="testimonial-content">
                        <div className="testimonial-text">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus maximus arcu et ligula maximus
                            vehicula. Phasellus at luctus lacus, quis eleifend
                            nibh. Nam vitae convallis nisi, vitae tempus risus.
                          </p>
                        </div>
                        <div className="testimonial-user-dt">
                          <h5>Gabrielle B.</h5>
                          <span>Administration</span>
                          <ul>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                          </ul>
                        </div>
                        <span className="quote-icon">
                          <i className="fa-solid fa-quote-right" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="main-card">
                      <div className="testimonial-content">
                        <div className="testimonial-text">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus maximus arcu et ligula maximus
                            vehicula. Phasellus at luctus lacus, quis eleifend
                            nibh. Nam vitae convallis nisi, vitae tempus risus.
                          </p>
                        </div>
                        <div className="testimonial-user-dt">
                          <h5>Piyush G.</h5>
                          <span>Application Developer</span>
                          <ul>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                          </ul>
                        </div>
                        <span className="quote-icon">
                          <i className="fa-solid fa-quote-right" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="main-card">
                      <div className="testimonial-content">
                        <div className="testimonial-text">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus maximus arcu et ligula maximus
                            vehicula. Phasellus at luctus lacus, quis eleifend
                            nibh. Nam vitae convallis nisi, vitae tempus risus.
                          </p>
                        </div>
                        <div className="testimonial-user-dt">
                          <h5>Joanna P.</h5>
                          <span>Event manager</span>
                          <ul>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                          </ul>
                        </div>
                        <span className="quote-icon">
                          <i className="fa-solid fa-quote-right" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="main-card">
                      <div className="testimonial-content">
                        <div className="testimonial-text">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus maximus arcu et ligula maximus
                            vehicula. Phasellus at luctus lacus, quis eleifend
                            nibh. Nam vitae convallis nisi, vitae tempus risus.
                          </p>
                        </div>
                        <div className="testimonial-user-dt">
                          <h5>Romo S.</h5>
                          <span>Admin</span>
                          <ul>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                          </ul>
                        </div>
                        <span className="quote-icon">
                          <i className="fa-solid fa-quote-right" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="main-card">
                      <div className="testimonial-content">
                        <div className="testimonial-text">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus maximus arcu et ligula maximus
                            vehicula. Phasellus at luctus lacus, quis eleifend
                            nibh. Nam vitae convallis nisi, vitae tempus risus.
                          </p>
                        </div>
                        <div className="testimonial-user-dt">
                          <h5>Christopher F.</h5>
                          <span>Online Marketing Executive</span>
                          <ul>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                            <li>
                              <i className="fa-solid fa-star" />
                            </li>
                          </ul>
                        </div>
                        <span className="quote-icon">
                          <i className="fa-solid fa-quote-right" />
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
      <div className="our-organisations-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-title text-center">
                <h3>
                  321+ events created by thousands of organisations around the
                  globe
                </h3>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="organisations-area">
                <Slider
                  items={sponsorItems}
                  autoplayTimeout={3000}
                  loop={true}
                  margin={10}
                  smartSpeed={700}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
