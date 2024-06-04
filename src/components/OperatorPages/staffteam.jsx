import React from "react";

function staffteam() {
  return (
    <div>
      <div
        className="modal fade"
        id="inviteTeamModal"
        tabIndex={-1}
        aria-labelledby="inviteTeamModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="inviteTeamModalLabel">
                Invite a Team Member
              </h5>
              <button
                type="button"
                className="close-model-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="uil uil-multiply" />
              </button>
            </div>
            <div className="modal-body">
              <div className="model-content main-form">
                <div className="form-group mt-30">
                  <label className="form-label">
                    Which team members do you wish to invite?*
                  </label>
                  <input
                    className="form-control h_40"
                    type="text"
                    placeholder="Enter email"
                    defaultValue
                  />
                </div>
                <div className="form-group mt-30">
                  <label className="form-label">
                    What role do you wish to assign?*
                  </label>
                  <select className="selectpicker" title="Select Role">
                    <option value={1}>Account owner</option>
                    <option value={2}>Basic access</option>
                    <option value={3}>Finance</option>
                    <option value={4}>Power user</option>
                    <option value={5}>Producer access</option>
                  </select>
                </div>
                <div className="form-group mt-30">
                  <div className="d-flex align-items-start">
                    <label className="btn-switch m-0 me-3">
                      <input
                        type="checkbox"
                        className
                        id="bird-discount"
                        defaultValue
                      />
                      <span className="checkbox-slider" />
                    </label>
                    <div className="d-flex flex-column">
                      <label className="color-black fw-bold mb-0">
                        Send system emails to this team member
                      </label>
                      <p className="mt-2 fs-14 d-block mb-0">
                        System emails provide information about events created,
                        as well as updates to the system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="co-main-btn min-width btn-hover h_40"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="main-btn min-width btn-hover h_40"
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper wrapper-body">
        <div className="dashboard-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="d-main-title">
                  <h3>
                    <i className="fa-solid fa-user-group me-3" />
                    Team Members
                  </h3>
                </div>
              </div>
              <div className="col-md-12">
                <div className="conversion-setup">
                  <div className="main-card mt-5">
                    <div className="dashboard-wrap-content p-4">
                      <div className="d-md-flex flex-wrap align-items-center">
                        <div
                          className="nav custom2-tabs btn-group"
                          role="tablist"
                        >
                          <button
                            className="tab-link ms-0 active"
                            data-bs-toggle="tab"
                            data-bs-target="#overview-tab"
                            type="button"
                            role="tab"
                            aria-controls="overview-tab"
                            aria-selected="true"
                          >
                            Overview
                          </button>
                          <button
                            className="tab-link"
                            data-bs-toggle="tab"
                            data-bs-target="#role-tab"
                            type="button"
                            role="tab"
                            aria-controls="role-tab"
                            aria-selected="false"
                          >
                            Role
                          </button>
                        </div>
                        <div className="rs ms-auto mt_r4">
                          <button
                            className="main-btn btn-hover h_40 w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#inviteTeamModal"
                          >
                            Invite a Team Member
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade active show"
                      id="overview-tab"
                      role="tabpanel"
                    >
                      <div className="table-card mt-4">
                        <div className="main-table">
                          <div className="table-responsive">
                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th scope="col">Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Role</th>
                                  <th scope="col">Last Login</th>
                                  <th scope="col">2FA Enable</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>John Doe</td>
                                  <td>johndoe@example.com</td>
                                  <td>Account Owner</td>
                                  <td>20 May 22, 10.27 AM</td>
                                  <td>No</td>
                                  <td>
                                    <span className="action-btn disabled">
                                      <i className="fa-solid fa-lock" />
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Rock Smith</td>
                                  <td>rocksmith@example.com</td>
                                  <td>Basic access</td>
                                  <td>20 May 22, 11.15 AM</td>
                                  <td>No</td>
                                  <td>
                                    <span className="action-btn">
                                      <i className="fa-solid fa-trash-can" />
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Jassica William</td>
                                  <td>jassicawilliam@example.com</td>
                                  <td>Finance</td>
                                  <td>20 May 22, 11.45 AM</td>
                                  <td>No</td>
                                  <td>
                                    <span className="action-btn">
                                      <i className="fa-solid fa-trash-can" />
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Lizzy Wizzy</td>
                                  <td>lizzywizzy@example.com</td>
                                  <td>Power User</td>
                                  <td>20 May 22, 12.20 PM</td>
                                  <td>No</td>
                                  <td>
                                    <span className="action-btn">
                                      <i className="fa-solid fa-trash-can" />
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="role-tab"
                      role="tabpanel"
                    >
                      <div className="role-slider-content mt-4">
                        <div className="owl-carousel role-slider owl-theme">
                          <div className="item">
                            <div className="main-card">
                              <div className="role-header">
                                <h6>Account Owner</h6>
                                <span>1 per account</span>
                              </div>
                              <div className="role-body-content">
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Banking</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Team members</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Events</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Reports</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Customer service</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Amend bookings</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Gift certificates</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Marketing tools</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Integration tools</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Scanning app</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="item">
                            <div className="main-card">
                              <div className="role-header">
                                <h6>Power user</h6>
                                <span>Unlimited</span>
                              </div>
                              <div className="role-body-content">
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Banking</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Team members</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Events</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Reports</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Customer service</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Amend bookings</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Gift certificates</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Marketing tools</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Integration tools</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Scanning app</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="item">
                            <div className="main-card">
                              <div className="role-header">
                                <h6>Finance</h6>
                                <span>Unlimited</span>
                              </div>
                              <div className="role-body-content">
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Banking</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Team members</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Events</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Reports</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Customer service</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Amend bookings</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark" />
                                  <span>Gift certificates</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Marketing tools</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Integration tools</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Scanning app</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="item">
                            <div className="main-card">
                              <div className="role-header">
                                <h6>Basic access</h6>
                                <span>Unlimited</span>
                              </div>
                              <div className="role-body-content">
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Banking</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Team members</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Events</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Reports</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Customer service</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Amend bookings</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Gift certificates</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Marketing tools</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Integration tools</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Scanning app</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="item">
                            <div className="main-card">
                              <div className="role-header">
                                <h6>Producer access</h6>
                                <span>1 per event</span>
                              </div>
                              <div className="role-body-content">
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Banking</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Team members</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Events</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Reports</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Customer service</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Amend bookings</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Gift certificates</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Marketing tools</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-xmark i-disabled" />
                                  <span>Integration tools</span>
                                </div>
                                <div className="role-item">
                                  <i className="fa-solid fa-check" />
                                  <span>Scanning app</span>
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

export default staffteam;
