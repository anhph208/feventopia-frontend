import React from "react";
import Slider from "../components/Slider";

function home() {
  return (
    <div className="wrapper">
      <div className="hero-banner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9 col-md-10">
              <div className="hero-banner-content">
                <h2>
                  The Easiest and Most Powerful Online Event Booking and
                  Ticketing System
                </h2>
                <p>
                  Barren is an all-in-one event ticketing platform for event
                  organisers, promoters, and managers. Easily create, promote
                  and manage your events of any type and size.
                </p>
                <a href="create.html" className="main-btn btn-hover">
                  Create Event <i className="fa-solid fa-arrow-right ms-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="explore-events p-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="main-title">
                <h3>Explore Events</h3>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="event-filter-items">
                <div className="featured-controls">
                  <div className="filter-tag">
                    <a href="explore_events_by_date.html" className="active">
                      All
                    </a>
                    <a href="explore_events_by_date.html">Today</a>
                    <a href="explore_events_by_date.html">Tomorrow</a>
                    <a href="explore_events_by_date.html">This Week</a>
                    <a href="explore_events_by_date.html">This Weekend</a>
                    <a href="explore_events_by_date.html">Next Week</a>
                    <a href="explore_events_by_date.html">Next Weekend</a>
                    <a href="explore_events_by_date.html">This Month</a>
                    <a href="explore_events_by_date.html">Next Month</a>
                    <a href="explore_events_by_date.html">This Year</a>
                    <a href="explore_events_by_date.html">Next Year</a>
                  </div>
                  <div className="controls">
                    <button type="button" className="control" data-filter="all">
                      All
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".arts"
                    >
                      Arts
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".business"
                    >
                      Business
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".concert"
                    >
                      Concert
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".workshops"
                    >
                      Workshops
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".coaching_consulting"
                    >
                      Coaching and Consulting
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".health_Wellness"
                    >
                      Health and Wellbeing
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".volunteer"
                    >
                      Volunteer
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".sports"
                    >
                      Sports
                    </button>
                    <button
                      type="button"
                      className="control"
                      data-filter=".free"
                    >
                      Free
                    </button>
                  </div>
                  <div className="row" data-ref="event-filter-content">
                    <div
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mix arts concert workshops volunteer sports health_Wellness"
                      data-ref="mixitup-target"
                    >
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="venue_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img
                              src="./assets/images/event-imgs/img-1.jpg"
                              alt
                            />
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
                    <div
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mix business workshops volunteer sports health_Wellness"
                      data-ref="mixitup-target"
                    >
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="online_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img
                              src="./assets/images/event-imgs/img-2.jpg"
                              alt
                            />
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
                    <div
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mix coaching_consulting free concert volunteer health_Wellness bussiness"
                      data-ref="mixitup-target"
                    >
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="venue_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img
                              src="./assets/images/event-imgs/img-3.jpg"
                              alt
                            />
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
                    <div
                      className=" col-xl-3 col-lg-4 col-md-6 col-sm-12 mix health_Wellness concert volunteer sports free business"
                      data-ref="mixitup-target"
                    >
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="online_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img
                              src="./assets/images/event-imgs/img-4.jpg"
                              alt
                            />
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
                    <div
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mix concert sports health_Wellness free arts"
                      data-ref="mixitup-target"
                    >
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="venue_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img
                              src="./assets/images/event-imgs/img-5.jpg"
                              alt
                            />
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
                    <div
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mix workshops concert arts volunteer sports"
                      data-ref="mixitup-target"
                    >
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="venue_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img
                              src="./assets/images/event-imgs/img-6.jpg"
                              alt
                            />
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
                    <div
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mix volunteer free health_Wellness"
                      data-ref="mixitup-target"
                    >
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="online_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img
                              src="./assets/images/event-imgs/img-7.jpg"
                              alt
                            />
                          </a>
                          <span className="bookmark-icon" title="Bookmark" />
                        </div>
                        <div className="event-content">
                          <a
                            href="online_event_detail_view.html"
                            className="event-title"
                          >
                            Tutorial on Canvas Painting for Beginners
                          </a>
                          <div className="duration-price-remaining">
                            <span className="duration-price">AUD $50.00*</span>
                            <span className="remaining">
                              <i className="fa-solid fa-ticket fa-rotate-90" />
                              17 Remaining
                            </span>
                          </div>
                        </div>
                        <div className="event-footer">
                          <div className="event-timing">
                            <div className="publish-date">
                              <span>
                                <i className="fa-solid fa-calendar-day me-2" />
                                17 Jul
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
                    <div
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mix sports concert volunteer arts"
                      data-ref="mixitup-target"
                    >
                      <div className="main-card mt-4">
                        <div className="event-thumbnail">
                          <a
                            href="venue_event_detail_view.html"
                            className="thumbnail-img"
                          >
                            <img
                              src="./assets/images/event-imgs/img-8.jpg"
                              alt
                            />
                          </a>
                          <span className="bookmark-icon" title="Bookmark" />
                        </div>
                        <div className="event-content">
                          <a
                            href="venue_event_detail_view.html"
                            className="event-title"
                          >
                            Trainee Program on Leadership' 2022
                          </a>
                          <div className="duration-price-remaining">
                            <span className="duration-price">AUD $120.00*</span>
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
                                <i className="fa-solid fa-calendar-day me-2" />
                                20 Jul
                              </span>
                              <span className="dot">
                                <i className="fa-solid fa-circle" />
                              </span>
                              <span>Wed, 11.30 PM</span>
                            </div>
                            <span className="publish-time">
                              <i className="fa-solid fa-clock me-2" />
                              12h
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="browse-btn">
                    <a
                      href="explore_events.html"
                      className="main-btn btn-hover "
                    >
                      Browse All
                    </a>
                  </div>
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
      <div className="feature-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="main-title">
                <h3>No Feature Overload, Get Exactly What You Need</h3>
                <p>
                  As well as being the most affordable online-based event
                  registration tool and one of the best online event ticketing
                  systems in Australia, Barren is super easy-to-use and built
                  with a simplistic layout which is totally convenient for the
                  organisers to operate.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="feature-group-list">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-1.png"
                          alt
                        />
                      </div>
                      <h4>Online Events</h4>
                      <p>
                        Built-in video conferencing platform to save you time
                        and cost.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-2.png"
                          alt
                        />
                      </div>
                      <h4>Venue Event</h4>
                      <p>
                        Easy-to-use features to create and manage your venue
                        events.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-3.png"
                          alt
                        />
                      </div>
                      <h4>Engaging Event Page</h4>
                      <p>
                        Create engaging event pages with your logo and our hero
                        image collage gallery.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-4.png"
                          alt
                        />
                      </div>
                      <h4>Marketing Automation</h4>
                      <p>
                        Use our marketing automation tools to promote your
                        events on social media and email.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-5.png"
                          alt
                        />
                      </div>
                      <h4>Sell Tickets</h4>
                      <p>
                        Start monetising your online and venue events, sell
                        unlimited* tickets.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-6.png"
                          alt
                        />
                      </div>
                      <h4>Networking</h4>
                      <p>
                        Engage your attendees with the speakers using our
                        interactive tools and build your own network.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-7.png"
                          alt
                        />
                      </div>
                      <h4>Recording</h4>
                      <p>
                        Securely record your online events and save on the cloud
                        of your choice*.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-8.png"
                          alt
                        />
                      </div>
                      <h4>Live Streaming</h4>
                      <p>
                        Livestream your online events on Facebook, YouTube and
                        other social networks.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-9.png"
                          alt
                        />
                      </div>
                      <h4>Engagement Metrics</h4>
                      <p>
                        Track your event engagement metrics like visitors,
                        ticket sales, etc. from your dashboard.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-10.png"
                          alt
                        />
                      </div>
                      <h4>Security &amp; Support</h4>
                      <p>
                        Secure data and payment processing backed by a team
                        eager to see you succeed.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-11.png"
                          alt
                        />
                      </div>
                      <h4>Reports &amp; Analytics</h4>
                      <p>
                        Get useful reports and insights to boost your sales and
                        marketing activities.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="feature-item mt-46">
                      <div className="feature-icon">
                        <img
                          src="./assets/images/icons/feature-icon-12.png"
                          alt
                        />
                      </div>
                      <h4>Mobile &amp; Desktop App</h4>
                      <p>
                        Stay on top of things, manage and monitor your events
                        using the organiser app.
                      </p>
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
                <h3>Be a Star Event Host in 4 Easy Steps</h3>
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
                    Step 01<span>Create Your Event</span>
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
                    Step 02<span>Sell Tickets and Get Paid</span>
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
                    Step 03<span>Finally, Host Your Event</span>
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
                    Step 04<span>Repeat and Grow</span>
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
                <Slider deviceType="desktop" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default home;
