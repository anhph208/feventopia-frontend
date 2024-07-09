import React from "react";

function payout() {
  return (
    <div>
      <div
        className="modal fade"
        id="bankModal"
        tabIndex={-1}
        aria-labelledby="bankModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="bankModalLabel">
                Add Bank Account
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
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mt-4">
                      <label className="form-label">Account Name*</label>
                      <input
                        className="form-control h_40"
                        type="text"
                        placeholder
                        defaultValue
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mt-4">
                      <label className="form-label">Account Number*</label>
                      <input
                        className="form-control h_40"
                        type="text"
                        placeholder
                        defaultValue
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mt-4">
                      <label className="form-label">Bank Name*</label>
                      <input
                        className="form-control h_40"
                        type="text"
                        placeholder
                        defaultValue
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mt-4">
                      <label className="form-label">BSB code*</label>
                      <input
                        className="form-control h_40"
                        type="text"
                        placeholder="XXY-ZZZ"
                        defaultValue
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mt-4">
                      <label className="form-label">SWIFT/BIC code*</label>
                      <input
                        className="form-control h_40"
                        type="text"
                        placeholder
                        defaultValue
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mt-4">
                      <label className="form-label">ABA Routing*</label>
                      <input
                        className="form-control h_40"
                        type="text"
                        placeholder
                        defaultValue
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group mt-4">
                      <label className="form-label">
                        International Bank Account Number*
                      </label>
                      <input
                        className="form-control h_40"
                        type="text"
                        placeholder
                        defaultValue
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="co-main-btn min-width btn-hover h_40"
                data-bs-target="#aboutModal"
                data-bs-toggle="modal"
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
                    <i className="fa-solid fa-credit-card me-3" />
                    Payouts
                  </h3>
                </div>
              </div>
              <div className="col-md-12">
                <div className="main-card mt-5">
                  <div className="dashboard-wrap-content p-4">
                    <h5 className="mb-4">Added Bank Account (1)</h5>
                    <div className="d-md-flex flex-wrap align-items-center">
                      <div className="dashboard-date-wrap">
                        <div className="form-group">
                          <div className="relative-input position-relative">
                            <input
                              className="form-control h_40"
                              type="text"
                              placeholder="Search by coupon name"
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
                          data-bs-target="#bankModal"
                        >
                          Add Bank Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="all-promotion-list">
                  <div className="main-card mt-4 p-4 pt-0">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="bank-card p-4 mt-4">
                          <h5>Bank Name</h5>
                          <h6>John Doe</h6>
                          <span>****1234</span>
                          <div className="card-actions">
                            <a href="#" className="action-link">
                              <i className="fa-solid fa-pen" />
                            </a>
                            <a href="#" className="action-link">
                              <i className="fa-solid fa-trash-can" />
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
      </div>
    </div>
  );
}

export default payout;
