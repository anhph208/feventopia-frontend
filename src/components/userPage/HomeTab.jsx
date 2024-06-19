import React, { useState } from "react";

const HomeTab = () => {

  return (
    <div className="tab-content" id="myTabContent">
      <div
        className="tab-pane fade active show"
        id="feed"
        role="tabpanel"
        aria-labelledby="feed-tab"
      >
        <div className="nav my-event-tabs mt-4" role="tablist">
          <button
            className="event-link active"
            data-bs-toggle="tab"
            data-bs-target="#saved"
            type="button"
            role="tab"
            aria-controls="saved"
            aria-selected="true"
          >
            <span className="event-count">1</span>
            <span>Saved Events</span>
          </button>
          <button
            className="event-link"
            data-bs-toggle="tab"
            data-bs-target="#attending"
            type="button"
            role="tab"
            aria-controls="attending"
            aria-selected="false"
          >
            <span className="event-count">1</span>
            <span>Attending Events</span>
          </button>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="saved" role="tabpanel">
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mt-4">
                  <div className="card-top p-4">
                    <div className="card-event-img">
                      <img src="./assets/images/event-imgs/img-6.jpg" alt />
                    </div>
                    <div className="card-event-dt">
                      <h5>Step Up Open Mic Show</h5>
                      <div className="evnt-time">Thu, Jun 30, 2022 4:30 AM</div>
                      <div className="event-btn-group">
                        <button className="esv-btn saved-btn me-2">
                          <i className="fa-regular fa-bookmark me-2" />
                          Save
                        </button>
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
          <div className="tab-pane fade" id="attending" role="tabpanel">
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mt-4">
                  <div className="card-top p-4">
                    <div className="card-event-img">
                      <img src="./assets/images/event-imgs/img-6.jpg" alt />
                    </div>
                    <div className="card-event-dt">
                      <h5>Step Up Open Mic Show</h5>
                      <div className="evnt-time">Thu, Jun 30, 2022 4:30 AM</div>
                      <div className="event-btn-group">
                        <button
                          className="esv-btn me-2"
                          onclick="window.location.href='invoice.html'"
                        >
                          <i className="fa-solid fa-arrow-up-from-bracket me-2" />
                          View Ticket
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
  );
};

export default HomeTab;
