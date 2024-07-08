import React from "react";

function staffprofile() {
  return (
    <div>
      <div className="wrapper">
        <div className="profile-banner">
          <div className="hero-cover-block">
            <div className="hero-cover">
              <div className="hero-cover-img" />
            </div>
          </div>
          <div className="user-dt-block">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-12">
                  <div className="main-card user-left-dt">
                    <div className="user-avatar-img">
                      <img src="./assets/images/profile-imgs/img-2.jpg" alt />
                    </div>
                    <div className="user-dts">
                      <h4 className="user-name">
                        Jassica William
                        <span className="verify-badge">
                          <i className="fa-solid fa-circle-check" />
                        </span>
                      </h4>
                      <span className="user-email">jassica@example.com</span>
                    </div>
                    <div className="ff-block">
                      <a
                        href="#"
                        className
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#FFModal"
                      >
                        <span>0</span>Followers
                      </a>
                      <a
                        href="#"
                        className
                        role="button"
                        data-bs-toggle="modal"
                        data-bs-target="#FFModal"
                      >
                        <span>2</span>Following
                      </a>
                    </div>
                    <div className="user-description">
                      <p>Hey I am a Jassica William</p>
                    </div>
                    <div className="user-btns">
                      <button className="main-btn btn-hover min-width h_40 me-2">
                        Follow
                      </button>
                      <button
                        className="co-main-btn min-width h_40"
                        data-bs-toggle="modal"
                        data-bs-target="#contactModal"
                      >
                        Contant Us
                      </button>
                    </div>
                    <div className="profile-social-link">
                      <h6>Find me on</h6>
                      <div className="social-links">
                        <a
                          href="#"
                          className="social-link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Facebook"
                        >
                          <i className="fab fa-facebook-square" />
                        </a>
                        <a
                          href="#"
                          className="social-link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Instagram"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                        <a
                          href="#"
                          className="social-link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Twitter"
                        >
                          <i className="fab fa-twitter" />
                        </a>
                        <a
                          href="#"
                          className="social-link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="LinkedIn"
                        >
                          <i className="fab fa-linkedin-in" />
                        </a>
                        <a
                          href="#"
                          className="social-link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Youtube"
                        >
                          <i className="fab fa-youtube" />
                        </a>
                        <a
                          href="#"
                          className="social-link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Website"
                        >
                          <i className="fa-solid fa-globe" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 col-md-12">
                  <div className="right-profile mt-2">
                    <div className="user-events">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="main-card mt-4">
                            <div className="card-top p-4 border-bottom-0">
                              <div className="card-event-img">
                                <img src="./assets/images/event-imgs/img-6.jpg" alt />
                              </div>
                              <div className="card-event-dt">
                                <h5>Step Up Open Mic Show</h5>
                                <div className="evnt-time">
                                  Thu, Jun 30, 2022 4:30 AM
                                </div>
                                <div className="event-btn-group">
                                  <button
                                    className="esv-btn me-2"
                                    onclick="window.location.href='venue_event_detail_view.html'"
                                  >
                                    <i className="fa-solid fa-arrow-up-from-bracket me-2" />
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="main-card mt-4">
                            <div className="card-top p-4 border-bottom-0">
                              <div className="card-event-img">
                                <img src="./assets/images/event-imgs/img-7.jpg" alt />
                              </div>
                              <div className="card-event-dt">
                                <h5>
                                  Tutorial on Canvas Painting for Beginners
                                </h5>
                                <div className="evnt-time">
                                  Sun, Jul 17, 2022 5:30 AM
                                </div>
                                <div className="event-btn-group">
                                  <button
                                    className="esv-btn me-2"
                                    onclick="window.location.href='online_event_detail_view.html'"
                                  >
                                    <i className="fa-solid fa-arrow-up-from-bracket me-2" />
                                    View
                                  </button>
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
        </div>
      </div>
    </div>
  );
}

export default staffprofile;
