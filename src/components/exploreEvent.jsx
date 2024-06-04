import React from "react";

function exploreEvent() {
  return (
    <div>
      <div className="wrapper">
        <div className="hero-banner">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-8 col-md-10">
                <div className="hero-banner-content">
                  <h2>Discover Events For All The Things You Love</h2>
                  <div className="search-form main-form">
                    <div className="row g-3">
                      <div className="col-lg-5 col-md-12">
                        <div className="form-group search-category">
                          <select
                            className="selectpicker"
                            data-width="100%"
                            data-size={5}
                          >
                            <option
                              value="browse_all"
                              data-icon="fa-solid fa-tower-broadcast"
                              selected
                            >
                              Browse All
                            </option>
                            <option
                              value="online_events"
                              data-icon="fa-solid fa-video"
                            >
                              Online Events
                            </option>
                            <option
                              value="venue_events"
                              data-icon="fa-solid fa-location-dot"
                            >
                              Venue Events
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-12">
                        <div className="form-group">
                          <select
                            className="selectpicker"
                            data-width="100%"
                            data-size={5}
                            data-live-search="true"
                          >
                            <option value={"All"} selected>
                              All
                            </option>
                            <option value={"Arts"}>Arts</option>
                                      <option value={"Business"}>Business</option>
                                      <option value={"Coaching and Consulting"}>
                                        Coaching and Consulting
                                      </option>
                                      <option value={"Community and Culture"}>
                                        Community and Culture
                                      </option>
                                      <option value={"Entrepreneurship"}>
                                        Entrepreneurship
                                      </option>
                                      <option value={"Education and Training"}>
                                        Education and Training
                                      </option>
                                      <option value={"Family and Friends"}>
                                        Family and Friends
                                      </option>
                                      <option value={"Fashion and Beauty"}>
                                        Fashion and Beauty
                                      </option>
                                      <option value={"Film and Entertainment"}>
                                        Film and Entertainment
                                      </option>
                                      <option value={"Food and Drink"}>Food and Drink</option>
                                      <option value={"Government and Politics"}>
                                        Government and Politics
                                      </option>
                                      <option value={"Health and Wellbeing"}>
                                        Health and Wellbeing
                                      </option>
                                      <option value={"Hobbies and Interest"}>
                                        Hobbies and Interest
                                      </option>
                                      <option value={"Music and Theater"}>
                                        Music and Theater
                                      </option>
                                      <option value={"Religion and Spirituality"}>
                                        Religion and Spirituality
                                      </option>
                                      <option value={"Science and Technology"}>
                                        Science and Technology
                                      </option>
                                      <option value={"Sports and Fitness"}>
                                        Sports and Fitness
                                      </option>
                                      <option value={"Travel and Outdoor"}>
                                        Travel and Outdoor
                                      </option>
                                      <option value={"Visual Arts"}>Visual Arts</option>
                                      <option value={"Others"}>Others</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-12">
                        <a href="#" className="main-btn btn-hover w-100">
                          Find
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="explore-events p-80">
          <div className="container">
            <div className="row">
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
                      <button
                        type="button"
                        className="control"
                        data-filter="all"
                      >
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
                              <img src="./assets/images/event-imgs/img-1.jpg" alt />
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
                              <span className="duration-price">
                                AUD $100.00*
                              </span>
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
                              <img src="./assets/images/event-imgs/img-2.jpg" alt />
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
                              <span className="duration-price">
                                AUD $75.00*
                              </span>
                              <span className="remaining">
                                <i className="fa-solid fa-ticket fa-rotate-90" />
                                6 Remaining
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
                              <img src="./assets/images/event-imgs/img-3.jpg" alt />
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
                                  <i className="fa-solid fa-calendar-day me-2" />
                                  1 May
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
                              <img src="./assets/images/event-imgs/img-4.jpg" alt />
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
                                <i className="fa-solid fa-ticket fa-rotate-90" />
                                7 Remaining
                              </span>
                            </div>
                          </div>
                          <div className="event-footer">
                            <div className="event-timing">
                              <div className="publish-date">
                                <span>
                                  <i className="fa-solid fa-calendar-day me-2" />
                                  1 May
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
                              <img src="./assets/images/event-imgs/img-5.jpg" alt />
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
                              <span className="duration-price">
                                AUD $41.50*
                              </span>
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
                              <img src="./assets/images/event-imgs/img-6.jpg" alt />
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
                              <span className="duration-price">
                                AUD $200.00*
                              </span>
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
                              <img src="./assets/images/event-imgs/img-7.jpg" alt />
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
                              <span className="duration-price">
                                AUD $50.00*
                              </span>
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
                              <img src="./assets/images/event-imgs/img-8.jpg" alt />
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
                              <span className="duration-price">
                                AUD $120.00*
                              </span>
                              <span className="remaining">
                                <i className="fa-solid fa-ticket fa-rotate-90" />
                                7 Remaining
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
                      <a href="#" className="main-btn btn-hover ">
                        See More
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
  );
}

export default exploreEvent;
