import React from "react";

function sponsorlist() {
  return (
    <div>
      <div
        className="modal fade"
        id="addContactlistModal"
        tabIndex={-1}
        aria-labelledby="addContactlistModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addContactlistModalLabel">
                Create New List
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
                  <label className="form-label">Name*</label>
                  <input
                    className="form-control h_40"
                    type="text"
                    placeholder
                    defaultValue
                  />
                </div>
                <div className="form-group mt-30">
                  <label className="form-label">How you know them*</label>
                  <div className="text-editor mt-4">
                    <div id="ld_editor" />
                  </div>
                </div>
                <div className="add-contact-area mt-30">
                  <div className="row">
                    <div className="col-12">
                      <div className="add-contact-title">
                        <h4 className="border_bottom">Add Contacts</h4>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="form-group mt-30">
                        <input
                          className="form-control h_40"
                          type="text"
                          placeholder="Enter full name"
                          defaultValue
                        />
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="form-group mt-30">
                        <input
                          className="form-control h_40"
                          type="email"
                          placeholder="Enter email"
                          defaultValue
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <button className="main-btn btn-hover h_40 mt-30 w-100">
                        Add
                      </button>
                    </div>
                    <div className="col-12">
                      <div className="table-card mt-30">
                        <div className="main-table">
                          <div className="table-responsive">
                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th scope="col">Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Rock Smith</td>
                                  <td>rocksmith@example.com</td>
                                  <td>
                                    <span className="action-btn">
                                      <i className="fa-solid fa-trash-can" />
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Jassica William</td>
                                  <td>jassicawilliam@example.com</td>
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
                Save
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
                    <i className="fa-regular fa-address-card me-3" />
                    Contact Lists
                  </h3>
                </div>
              </div>
              <div className="col-md-12">
                <div className="main-card mt-5">
                  <div className="dashboard-wrap-content p-4">
                    <h5 className="mb-4">Contact Lists (2)</h5>
                    <div className="d-md-flex flex-wrap align-items-center">
                      <div className="dashboard-date-wrap">
                        <div className="form-group">
                          <div className="relative-input position-relative">
                            <input
                              className="form-control h_40"
                              type="text"
                              placeholder="Search by name"
                              defaultValue
                            />
                            <i className="uil uil-search" />
                          </div>
                        </div>
                      </div>
                      <div className="rs ms-auto mt_r4">
                        <button
                          className="main-btn btn-hover h_40 w-100"
                          data-bs-toggle="modal"
                          data-bs-target="#addContactlistModal"
                        >
                          Create Contact List
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="all-promotion-list">
                  <div className="main-card mt-4">
                    <div className="contact-list coupon-active">
                      <div className="top d-flex flex-wrap justify-content-between align-items-center p-4 border_bottom">
                        <div className="icon-box coupon-icon-box-8606">
                          <span className="icon-big icon icon-purple">
                            <i className="fa-solid fa-users" />
                          </span>
                          <h5 className="font-18 mb-1 mt-1 f-weight-medium">
                            Custom Title
                          </h5>
                          <p className="text-gray-50 m-0">Custom Description</p>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="dropdown dropdown-default dropdown-text dropdown-icon-item">
                            <button
                              className="option-btn-1"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="fa-solid fa-ellipsis-vertical" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="#" className="dropdown-item">
                                <i className="fa-regular fa-address-card me-3" />
                                View Contact List
                              </a>
                              <a href="#" className="dropdown-item">
                                <i className="fa-solid fa-pen me-3" />
                                Edit
                              </a>
                              <a href="#" className="dropdown-item">
                                <i className="fa-solid fa-trash-can me-3" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bottom d-flex flex-wrap justify-content-between align-items-center p-4">
                        <div className="icon-box">
                          <span className="icon">
                            <i className="fa-solid fa-address-card" />
                          </span>
                          <p>Contacts</p>
                          <h6 className="coupon-status">0</h6>
                        </div>
                        <div className="icon-box">
                          <span className="icon">
                            <i className="fa-solid fa-calendar-days" />
                          </span>
                          <p>Created on</p>
                          <h6 className="coupon-status">Apr 04 , 2022</h6>
                        </div>
                        <div className="icon-box">
                          <span className="icon">
                            <i className="fa-solid fa-envelope" />
                          </span>
                          <p>Unsubscribed contacts</p>
                          <h6 className="coupon-status">0</h6>
                        </div>
                        <div className="icon-box">
                          <span className="icon">
                            <i className="fa-solid fa-certificate" />
                          </span>
                          <p>Quality</p>
                          <h6 className="coupon-status">0</h6>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: "0%" }}
                              aria-valuenow={40}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main-card mt-4">
                    <div className="contact-list coupon-active">
                      <div className="top d-flex flex-wrap justify-content-between align-items-center p-4 border_bottom">
                        <div className="icon-box coupon-icon-box-8606">
                          <span className="icon-big icon icon-yellow">
                            <i className="fa-solid fa-users" />
                          </span>
                          <h5 className="font-18 mb-1 mt-1 f-weight-medium">
                            People I exclude from my email campaigns
                          </h5>
                          <p className="text-gray-50 m-0">
                            People whom I do not wish to send out email from any
                            of my email campaigns
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="dropdown dropdown-default dropdown-text dropdown-icon-item">
                            <button
                              className="option-btn-1"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="fa-solid fa-ellipsis-vertical" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="#" className="dropdown-item">
                                <i className="fa-regular fa-address-card me-3" />
                                View Contact List
                              </a>
                              <a href="#" className="dropdown-item">
                                <i className="fa-solid fa-pen me-3" />
                                Edit
                              </a>
                              <a href="#" className="dropdown-item">
                                <i className="fa-solid fa-trash-can me-3" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bottom d-flex flex-wrap justify-content-between align-items-center p-4">
                        <div className="icon-box">
                          <span className="icon">
                            <i className="fa-solid fa-address-card" />
                          </span>
                          <p>Contacts</p>
                          <h6 className="coupon-status">0</h6>
                        </div>
                        <div className="icon-box">
                          <span className="icon">
                            <i className="fa-solid fa-calendar-days" />
                          </span>
                          <p>Created on</p>
                          <h6 className="coupon-status">Apr 04 , 2022</h6>
                        </div>
                        <div className="icon-box">
                          <span className="icon">
                            <i className="fa-solid fa-envelope" />
                          </span>
                          <p>Unsubscribed contacts</p>
                          <h6 className="coupon-status">0</h6>
                        </div>
                        <div className="icon-box">
                          <span className="icon">
                            <i className="fa-solid fa-certificate" />
                          </span>
                          <p>Quality</p>
                          <h6 className="coupon-status">0</h6>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: "0%" }}
                              aria-valuenow={40}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
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

export default sponsorlist;
