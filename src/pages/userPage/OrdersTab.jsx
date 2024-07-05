import React, { useState } from "react";
import { getProfileAPI } from "../../components/services/userServices"

const OrdersTab = ({ onChangePassword }) => {

  return (
    <div
      className="tab-pane fade show active"
      id="orders"
      role="tabpanel"
      aria-labelledby="orders-tab"
    >
      <div className="main-card mt-4">
        <div className="card-top p-4">
          <div className="card-event-img">
            <img src="./assets/images/event-imgs/img-7.jpg" alt />
          </div>
          <div className="card-event-dt">
            <h5>Tutorial on Canvas Painting for Beginners</h5>
            <div className="invoice-id">
              Invoice ID : <span>BRCCRW-11111111</span>
            </div>
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-bottom-item">
            <div className="card-icon">
              <i className="fa-solid fa-calendar-days" />
            </div>
            <div className="card-dt-text">
              <h6>Event Starts on</h6>
              <span>01 June 2022</span>
            </div>
          </div>
          <div className="card-bottom-item">
            <div className="card-icon">
              <i className="fa-solid fa-ticket" />
            </div>
            <div className="card-dt-text">
              <h6>Total Tickets</h6>
              <span>1</span>
            </div>
          </div>
          <div className="card-bottom-item">
            <div className="card-icon">
              <i className="fa-solid fa-money-bill" />
            </div>
            <div className="card-dt-text">
              <h6>Paid Amount</h6>
              <span>AUD $50.00</span>
            </div>
          </div>
          <div className="card-bottom-item">
            <div className="card-icon">
              <i className="fa-solid fa-money-bill" />
            </div>
            <div className="card-dt-text">
              <h6>Invoice</h6>
              <a href="/Invoice">Download</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTab;
