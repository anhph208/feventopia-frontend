import React from "react";

function terms_condition() {
  return (
    <div>
      <div className="wrapper">
        <div className="breadcrumb-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-10">
                <div className="barren-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Terms &amp; Conditions
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="event-dt-block p-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <div className="main-card">
                  <div className="bp-title">
                    <h4>Terms &amp; Conditions</h4>
                  </div>
                  <div className="bp-content">
                    <div className="group-terms-tabs">
                      <div
                        className="nav terms-tabs p-2 border-bottom-0 mt-4"
                        role="tablist"
                      >
                        <a
                          className="term-link active"
                          id="sellers-tab"
                          data-bs-toggle="tab"
                          href="#sellers"
                          role="tab"
                          aria-controls="sellers"
                          aria-selected="true"
                        >
                          for Ticket Sellers
                        </a>
                        <a
                          className="term-link"
                          id="buyer-tab"
                          data-bs-toggle="tab"
                          href="#buyer"
                          role="tab"
                          aria-controls="buyer"
                          aria-selected="false"
                        >
                          for Ticket Buyer
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="tab-content pt-0 p-2 mt-5 mt-lg-0">
                  <div
                    className="tab-pane fade show active"
                    id="sellers"
                    role="tabpanel"
                  >
                    <div className="terms-main-title">
                      <h4>Terms &amp; Conditions for Ticket Sellers</h4>
                    </div>
                    <div className="terms-content">
                      <p>
                        By using our ticketing platform to sell tickets,
                        you agree to comply with and be bound by the following terms and conditions.
                      </p>
                      <ol>
                        <li>Who we are and what we do</li>
                      </ol>
                      <p>
                        FEventopia offers the following services to event
                        organisers from FPT university
                      </p>
                      <ol start={2}>
                        <li>Event Listings</li>
                      </ol>
                      <p>
                        You are responsible for providing accurate and complete information about your event,
                        including date, time, location, and any other relevant detail
                      </p>
                      <ol start={3}>
                        <li>Ticket Pricing</li>
                      </ol>
                      <p>
                        You set the ticket prices for your event.
                        However, we may charge a service fee for each ticket sold through our platform.
                      </p>
                      <ol start={4}>
                        <li>Payment and Fees</li>
                      </ol>
                      <p>
                        Payments for ticket sales will be processed through our secure payment system.
                        You will receive your earnings after deducting any applicable service fees and taxes.
                      </p>
                      <ol start={5}>
                        <li>Compliance with Laws</li>
                      </ol>
                      <p>
                        You agree to comply with all applicable laws and regulations related to your event
                        and the sale of tickets.
                      </p>
                      <ol start={6}>
                        <li>Payment</li>
                      </ol>
                      <p>
                        Payments for ticket sales will be processed through our secure payment system.
                        You will receive your earnings after deducting any applicable service fees and taxes.<br />
                        Payouts will be made according to the schedule specified in your account settings.
                      </p>
                      <ol start={7}>
                        <li>Cancelled, varied or postponed events</li>
                      </ol>
                      <ul>
                        <strong>Event Cancellations</strong>
                        <ul>
                          <li>If you cancel an event, you are responsible for notifying all ticket buyers promptly.</li>
                          <li>You must provide a full refund to all ticket buyers for the cancelled event, including any service fees.</li>
                          <li>Refunds must be processed through our platform's secure payment system to ensure buyers receive their refunds in a timely manner.</li>
                        </ul>
                      </ul>
                      <ul>
                        <strong>Event Variations</strong>
                        <ul>
                          <li>If there are any significant changes to the event (e.g., change in venue, date, or time), you must notify all ticket buyers as soon as possible.</li>
                          <li>Ticket buyers have the right to request a refund if they do not agree with the changes. You must honor these refund requests and process them promptly.</li>
                          <li>Any additional costs incurred due to event variations are your responsibility.</li>
                        </ul>
                      </ul>
                      <ul>
                        <strong>Postponed Events</strong>
                        <ul>
                          <li>If an event is postponed, you must inform all ticket buyers immediately, providing the new date and time for the event.</li>
                          <li>Ticket buyers may choose to keep their tickets for the rescheduled date or request a full refund. You must honor and process these refund requests promptly.</li>
                          <li>Clear communication about the rescheduled event details is essential to minimize confusion and ensure a positive experience for ticket buyers.</li>
                        </ul>
                      </ul>
                      <ol start={8}>
                        <li>Contact Information</li>
                      </ol>
                      <p>
                        For any questions or concerns regarding these terms,
                        please contact our support team at
                        <a href="mailto:daihoc.hcm@fpt.edu.vn"> daihoc.hcm@fpt.edu.vn</a>.
                      </p>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="buyer" role="tabpanel">
                    <div className="terms-main-title">
                      <h4>Terms &amp; Conditions for Ticket Buyer</h4>
                    </div>
                    <div className="terms-content">
                      <p>
                        By purchasing tickets through our platform,
                        you agree to comply with and be bound by the following terms and conditions.
                      </p>
                      <ol>
                        <li>Ticket Purchase</li>
                      </ol>
                      <ul>
                        <ul>
                          <li>
                            All ticket sales are final. Ensure that you review your order carefully before completing the purchase.
                          </li>
                          <li>
                            Tickets may be subject to additional service fees and taxes, which will be clearly indicated during the purchase process.
                          </li>
                        </ul>
                      </ul>
                      <ol start={2}>
                        <li>Payment</li>
                      </ol>
                      <p>
                        Payments for tickets must be made through our secure payment system.
                      </p>
                      <ol start={3}>
                        <li>Refunds and Cancellations</li>
                      </ol>
                      <ul>
                        <li>
                          Refunds are subject to the event organizer's refund policy.
                          Please review the specific refund policy for the event before making a purchase.
                        </li>
                        <li>
                          In the event of an event cancellation, you will be entitled to a full refund.
                        </li>
                      </ul>
                      <ol start={4}>
                        <li>
                          Event Changes
                        </li>
                      </ol>
                      <p>
                        Event details, including date, time, and location, are subject to change.
                        We will notify you of any significant changes as soon as possible.
                      </p>
                      <ol start={5}>
                        <li>Limitation of Liability</li>
                      </ol>
                      <p>
                        We are not liable for any damages or losses resulting from event cancellations,
                        changes, or any issues related to the event itself.
                      </p>
                      <ol start={6}>
                        <li>Privacy</li>
                      </ol>
                      <p>
                        We value your privacy. Please review our Privacy Policy to understand
                        how we collect, use, and protect your personal information.
                      </p>
                      <ol start={7}>
                        <li>Contact Information</li>
                      </ol>
                      <p>
                        For any questions or concerns regarding these terms,
                        please contact our support team at
                        <a href="mailto:daihoc.hcm@fpt.edu.vn"> daihoc.hcm@fpt.edu.vn</a>.
                      </p>

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

export default terms_condition;
