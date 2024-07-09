import React from "react";

function dashboard() {
  return (
    <div>
      <div className="wrapper wrapper-body">
        <div className="dashboard-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="d-main-title">
                  <h3>
                    <i className="fa-solid fa-gauge me-3" />
                    Dashboard
                  </h3>
                </div>
              </div>
              <div className="col-md-12">
                <div className="main-card add-organisation-card p-4 mt-5">
                  <div className="ocard-left">
                    <div className="ocard-avatar">
                      <img src="./assets/images/profile-imgs/img-13.jpg" alt />
                    </div>
                    <div className="ocard-name">
                      <h4>John Doe</h4>
                      <span>My Organisation</span>
                    </div>
                  </div>
                  <div className="ocard-right">
                    <button
                      className="pe-4 ps-4 co-main-btn min-width"
                      data-bs-toggle="modal"
                      data-bs-target="#addorganisationModal"
                    >
                      <i className="fa-solid fa-plus" />
                      Add Organisation
                    </button>
                  </div>
                </div>
                <div className="main-card mt-4">
                  <div className="dashboard-wrap-content">
                    <div className="d-flex flex-wrap justify-content-between align-items-center p-4">
                      <div className="dashboard-date-wrap d-flex flex-wrap justify-content-between align-items-center">
                        <div className="dashboard-date-arrows">
                          <a href="#" className="before_date">
                            <i className="fa-solid fa-angle-left" />
                          </a>
                          <a href="#" className="after_date disabled">
                            <i className="fa-solid fa-angle-right" />
                          </a>
                        </div>
                        <h5 className="dashboard-select-date">
                          <span>1st April, 2022</span>-
                          <span>30th April, 2022</span>
                        </h5>
                      </div>
                      <div className="rs">
                        <div className="dropdown dropdown-text event-list-dropdown">
                          <button
                            className="dropdown-toggle event-list-dropdown"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span>Selected Events (1)</span>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                1
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard-report-content">
                      <div className="row">
                        <div className="col-xl-3 col-lg-6 col-md-6">
                          <div className="dashboard-report-card purple">
                            <div className="card-content">
                              <div className="card-content">
                                <span className="card-title fs-6">
                                  Revenue (AUD)
                                </span>
                                <span className="card-sub-title fs-3">
                                  $550.00
                                </span>
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="fa-solid fa-arrow-trend-up" />
                                  </span>
                                  <span className="text-Light font-12 ms-2 me-2">
                                    0.00%
                                  </span>
                                  <span className="font-12 color-body text-nowrap">
                                    From Previous Period
                                  </span>
                                </div>
                              </div>
                              <div className="card-media">
                                <i className="fa-solid fa-money-bill" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                          <div className="dashboard-report-card red">
                            <div className="card-content">
                              <div className="card-content">
                                <span className="card-title fs-6">Orders</span>
                                <span className="card-sub-title fs-3">2</span>
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="fa-solid fa-arrow-trend-up" />
                                  </span>
                                  <span className="text-Light font-12 ms-2 me-2">
                                    0.00%
                                  </span>
                                  <span className="font-12 color-body text-nowrap">
                                    From Previous Period
                                  </span>
                                </div>
                              </div>
                              <div className="card-media">
                                <i className="fa-solid fa-box" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                          <div className="dashboard-report-card info">
                            <div className="card-content">
                              <div className="card-content">
                                <span className="card-title fs-6">
                                  Page Views
                                </span>
                                <span className="card-sub-title fs-3">30</span>
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="fa-solid fa-arrow-trend-up" />
                                  </span>
                                  <span className="text-Light font-12 ms-2 me-2">
                                    0.00%
                                  </span>
                                  <span className="font-12 color-body text-nowrap">
                                    From Previous Period
                                  </span>
                                </div>
                              </div>
                              <div className="card-media">
                                <i className="fa-solid fa-eye" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                          <div className="dashboard-report-card success">
                            <div className="card-content">
                              <div className="card-content">
                                <span className="card-title fs-6">
                                  Ticket Sales
                                </span>
                                <span className="card-sub-title fs-3">3</span>
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="fa-solid fa-arrow-trend-up" />
                                  </span>
                                  <span className="text-Light font-12 ms-2 me-2">
                                    0.00%
                                  </span>
                                  <span className="font-12 color-body text-nowrap">
                                    From Previous Period
                                  </span>
                                </div>
                              </div>
                              <div className="card-media">
                                <i className="fa-solid fa-ticket" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-card mt-4">
                  <div className="d-flex flex-wrap justify-content-between align-items-center border_bottom p-4">
                    <div className="dashboard-date-wrap d-flex flex-wrap justify-content-between align-items-center">
                      <div className="select-graphic-category">
                        <div className="form-group main-form mb-2">
                          <select className="selectpicker" data-width="150px">
                            <option value="revenue">Revenue</option>
                            <option value="orders">Orders</option>
                            <option value="pageviews">Page Views</option>
                            <option value="ticketsales">Ticket Sales</option>
                          </select>
                        </div>
                        <small className="mt-4">
                          See the graphical representation below
                        </small>
                      </div>
                    </div>
                    <div className="rs">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio1"
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="btnradio1"
                        >
                          Monthly
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio2"
                          defaultChecked
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="btnradio2"
                        >
                          Weekly
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio3"
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="btnradio3"
                        >
                          Dailty
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="item-analytics-content p-4 ps-1 pb-2">
                    <div id="views-graphic" />
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

export default dashboard;
