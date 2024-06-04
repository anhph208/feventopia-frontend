import React from "react";

function invoice() {
  return (
    <div>
      <div className="invoice clearfix">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-lg-8 col-md-10">
              <div className="invoice-header justify-content-between">
                <div className="invoice-header-logo">
                  <img src="./assets/images/dark-logo.svg" alt="invoice-logo" />
                </div>
                <div className="invoice-header-text">
                  <a href="#" className="download-link">
                    Download
                  </a>
                </div>
              </div>
              <div className="invoice-body">
                <div className="invoice_dts">
                  <div className="row">
                    <div className="col-md-12">
                      <h2 className="invoice_title">Invoice</h2>
                    </div>
                    <div className="col-md-6">
                      <div className="vhls140">
                        <ul>
                          <li>
                            <div className="vdt-list">Invoice to John Doe</div>
                          </li>
                          <li>
                            <div className="vdt-list">140 St Kilda Rd</div>
                          </li>
                          <li>
                            <div className="vdt-list">Melbourne, Victoria</div>
                          </li>
                          <li>
                            <div className="vdt-list">3000, Australia</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="vhls140">
                        <ul>
                          <li>
                            <div className="vdt-list">
                              Invoice ID : YCCURW-000000
                            </div>
                          </li>
                          <li>
                            <div className="vdt-list">
                              Order Date : 10/05/2022
                            </div>
                          </li>
                          <li>
                            <div className="vdt-list">Near MBD Mall,</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-table bt_40">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Event Details</th>
                          <th scope="col">Type</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Unit Price</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <a href="#" target="_blank">
                              Tutorial on Canvas Painting for Beginners
                            </a>
                          </td>
                          <td>Online</td>
                          <td>1</td>
                          <td>$75.00</td>
                          <td>$75.00</td>
                        </tr>
                        <tr>
                          <td colSpan={1} />
                          <td colSpan={5}>
                            <div className="user_dt_trans text-end pe-xl-4">
                              <div className="totalinv2">
                                Invoice Total : USD $36.00
                              </div>
                              <p>Paid via Paypal</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="invoice_footer">
                  <div className="cut-line">
                    <i className="fa-solid fa-scissors" />
                  </div>
                  <div className="main-card">
                    <div className="row g-0">
                      <div className="col-lg-7">
                        <div className="event-order-dt p-4">
                          <div className="event-thumbnail-img">
                            <img src="./assets/images/event-imgs/img-7.jpg" alt />
                          </div>
                          <div className="event-order-dt-content">
                            <h5>Tutorial on Canvas Painting for Beginners</h5>
                            <span>Wed, Jun 01, 2022 5:30 AM. Duration 1h</span>
                            <div className="buyer-name">John Doe</div>
                            <div className="booking-total-tickets">
                              <i className="fa-solid fa-ticket rotate-icon" />
                              <span className="booking-count-tickets mx-2">
                                1
                              </span>
                              x Ticket
                            </div>
                            <div className="booking-total-grand">
                              Total : <span>$75.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="QR-dt p-4">
                          <ul className="QR-counter-type">
                            <li>Online</li>
                            <li>Counter</li>
                            <li>0000000001</li>
                          </ul>
                          <div className="QR-scanner">
                            <img src="./assets/images/qr.png" alt="QR-Ticket-Scanner" />
                          </div>
                          <p>Powered by Barren</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cut-line">
                    <i className="fa-solid fa-scissors" />
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

export default invoice;
