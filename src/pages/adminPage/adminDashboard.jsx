import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
    <div className="modal fade" id="addorganisationModal" tabIndex={-1} aria-labelledby="addorganisationLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="addorganisationLabel">Organisation details</h5>
          <button type="button" className="close-model-btn" data-bs-dismiss="modal" aria-label="Close"><i className="uil uil-multiply" /></button>
        </div>
        <div className="modal-body">
          <div className="model-content main-form">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="form-group text-center mt-4">
                  <label className="form-label">Avatar*</label>
                  <span className="org_design_button btn-file">
                    <span><i className="fa-solid fa-camera" /></span>
                    <input type="file" id="org_avatar" accept="image/*" name="Organisation_avatar" />
                  </span>																								
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Name*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Profile Link*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue="https://www.barren.com/b/organiser/" disabled />																								
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">About*</label>
                  <textarea className="form-textarea" placeholder defaultValue={"About"} />																							
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Email*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Phone*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Website*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Facebook*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Instagram*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Twitter*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">LinkedIn*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Youtube*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <h4 className="address-title">Address</h4>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Address 1*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Address 2*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group main-form mt-4">
                  <label className="form-label">Country*</label>
                  <select className="selectpicker" data-size={5} title="Nothing selected" data-live-search="true">
                    <option value="Algeria">Algeria</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria (Österreich)</option>
                    <option value="Belgium">Belgium (België)</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Canada">Canada</option>
                    <option value="Chile">Chile</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Greece">Greece</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Norway">Norway</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Spain">Spain</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Turkey">Turkey</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Vietnam">Vietnam</option>																					
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">State*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">City/Suburb*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-group mt-4">
                  <label className="form-label">Zip/Post Code*</label>
                  <input className="form-control h_40" type="text" placeholder defaultValue />																								
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="co-main-btn min-width btn-hover h_40" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="main-btn min-width btn-hover h_40">Add</button>
        </div>
      </div>
    </div>
  </div>

  <nav className="vertical_nav">
    <div className="left_section menu_left" id="js-menu">
      <div className="left_section">
        <ul>
          <li className="menu--item">
            <a href="my_organisation_dashboard.html" className="menu--link active" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
              <i className="fa-solid fa-gauge menu--icon" />
              <span className="menu--label">Dashboard</span>
            </a>
          </li>
          <li className="menu--item">
            <a href="my_organisation_dashboard_events.html" className="menu--link" title="Events" data-bs-toggle="tooltip" data-bs-placement="right">
              <i className="fa-solid fa-calendar-days menu--icon" />
              <span className="menu--label">Events</span>
            </a>
          </li>
          <li className="menu--item">
            <a href="my_organisation_dashboard_promotion.html" className="menu--link" title="Promotion" data-bs-toggle="tooltip" data-bs-placement="right">
              <i className="fa-solid fa-rectangle-ad menu--icon" />
              <span className="menu--label">Promotion</span>
            </a>
          </li>
          <li className="menu--item">
            <a href="my_organisation_dashboard_contact_lists.html" className="menu--link" title="Contact List" data-bs-toggle="tooltip" data-bs-placement="right">
              <i className="fa-regular fa-address-card menu--icon" />
              <span className="menu--label">Contact List</span>
            </a>
          </li>
          <li className="menu--item">
            <a href="my_organisation_dashboard_payout.html" className="menu--link" title="Payouts" data-bs-toggle="tooltip" data-bs-placement="right">
              <i className="fa-solid fa-credit-card menu--icon" />
              <span className="menu--label">Payouts</span>
            </a>
          </li>
          <li className="menu--item">
            <a href="my_organisation_dashboard_reports.html" className="menu--link" title="Reports" data-bs-toggle="tooltip" data-bs-placement="right">
              <i className="fa-solid fa-chart-pie menu--icon" />
              <span className="menu--label">Reports</span>
            </a>
          </li>
          <li className="menu--item">
            <a href="my_organisation_dashboard_subscription.html" className="menu--link" title="Subscription" data-bs-toggle="tooltip" data-bs-placement="right">
              <i className="fa-solid fa-bahai menu--icon" />
              <span className="menu--label">Subscription</span>
            </a>
          </li>
          <li className="menu--item">
            <a href="my_organisation_dashboard_conversion_setup.html" className="menu--link" title="Conversion Setup" data-bs-toggle="tooltip" data-bs-placement="right">
              <i className="fa-solid fa-square-plus menu--icon" />
              <span className="menu--label">Conversion Setup</span>
            </a>
          </li>
          <li className="menu--item">
            <a href="my_organisation_dashboard_about.html" className="menu--link" title="About" data-bs-toggle="tooltip" data-bs-placement="right">
              <i className="fa-solid fa-circle-info menu--icon" />
              <span className="menu--label">About</span>
            </a>
          </li>
          <li className="menu--item">
            <a href="my_organisation_dashboard_my_team.html" className="menu--link team-lock" title="My Team" data-bs-toggle="tooltip" data-bs-placement="right"> 
              <i className="fa-solid fa-user-group menu--icon" />
              <span className="menu--label">My Team</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  <div className="wrapper wrapper-body">
    <div className="dashboard-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="d-main-title">
              <h3><i className="fa-solid fa-gauge me-3" />Dashboard</h3>
            </div>
          </div>
          <div className="col-md-12">
            <div className="main-card add-organisation-card p-4 mt-5">
              <div className="ocard-left">
                <div className="ocard-avatar">
                  <img src="images/profile-imgs/img-13.jpg" alt />
                </div>
                <div className="ocard-name">
                  <h4>John Doe</h4>
                  <span>My Organisation</span>
                </div>
              </div>
              <div className="ocard-right">
                <button className="pe-4 ps-4 co-main-btn min-width" data-bs-toggle="modal" data-bs-target="#addorganisationModal"><i className="fa-solid fa-plus" />Add Organisation</button>
              </div>
            </div>
            <div className="main-card mt-4">
              <div className="dashboard-wrap-content">
                <div className="d-flex flex-wrap justify-content-between align-items-center p-4">
                  <div className="dashboard-date-wrap d-flex flex-wrap justify-content-between align-items-center">
                    <div className="dashboard-date-arrows">
                      <a href="#" className="before_date"><i className="fa-solid fa-angle-left" /></a>
                      <a href="#" className="after_date disabled"><i className="fa-solid fa-angle-right" /></a>
                    </div>
                    <h5 className="dashboard-select-date">
                      <span>1st April, 2022</span>
                      -
                      <span>30th April, 2022</span>
                    </h5>
                  </div>
                  <div className="rs">
                    <div className="dropdown dropdown-text event-list-dropdown">
                      <button className="dropdown-toggle event-list-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span>Selected Events (1)</span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">1</a></li>
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
                            <span className="card-title fs-6">Revenue (AUD)</span>
                            <span className="card-sub-title fs-3">$550.00</span>
                            <div className="d-flex align-items-center">
                              <span><i className="fa-solid fa-arrow-trend-up" /></span>
                              <span className="text-Light font-12 ms-2 me-2">0.00%</span>
                              <span className="font-12 color-body text-nowrap">From Previous Period</span>
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
                              <span><i className="fa-solid fa-arrow-trend-up" /></span>
                              <span className="text-Light font-12 ms-2 me-2">0.00%</span>
                              <span className="font-12 color-body text-nowrap">From Previous Period</span>
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
                            <span className="card-title fs-6">Page Views</span>
                            <span className="card-sub-title fs-3">30</span>
                            <div className="d-flex align-items-center">
                              <span><i className="fa-solid fa-arrow-trend-up" /></span>
                              <span className="text-Light font-12 ms-2 me-2">0.00%</span>
                              <span className="font-12 color-body text-nowrap">From Previous Period</span>
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
                            <span className="card-title fs-6">Ticket Sales</span>
                            <span className="card-sub-title fs-3">3</span>
                            <div className="d-flex align-items-center">
                              <span><i className="fa-solid fa-arrow-trend-up" /></span>
                              <span className="text-Light font-12 ms-2 me-2">0.00%</span>
                              <span className="font-12 color-body text-nowrap">From Previous Period</span>
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
                    <small className="mt-4">See the graphical representation below</small>
                  </div>
                </div>
                <div className="rs">
                  <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Monthly</label>
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" defaultChecked />
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Weekly</label>
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" />
                    <label className="btn btn-outline-primary" htmlFor="btnradio3">Dailty</label>
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
};

export default AdminDashboard;