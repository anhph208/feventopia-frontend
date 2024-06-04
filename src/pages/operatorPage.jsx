import React from "react";

function operatorDashboard() {
  return (
    <div>
      <nav className="vertical_nav">
        <div className="left_section menu_left" id="js-menu">
          <div className="left_section">
            <ul>
              <li className="menu--item">
                <a
                  href="my_organisation_dashboard.html"
                  className="menu--link active"
                  title="Dashboard"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className="fa-solid fa-gauge menu--icon" />
                  <span className="menu--label">Dashboard</span>
                </a>
              </li>
              <li className="menu--item">
                <a
                  href="my_organisation_dashboard_events.html"
                  className="menu--link"
                  title="Events"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className="fa-solid fa-calendar-days menu--icon" />
                  <span className="menu--label">Events</span>
                </a>
              </li>
              <li className="menu--item">
                <a
                  href="my_organisation_dashboard_promotion.html"
                  className="menu--link"
                  title="Promotion"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className="fa-solid fa-rectangle-ad menu--icon" />
                  <span className="menu--label">Promotion</span>
                </a>
              </li>
              <li className="menu--item">
                <a
                  href="my_organisation_dashboard_contact_lists.html"
                  className="menu--link"
                  title="Contact List"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className="fa-regular fa-address-card menu--icon" />
                  <span className="menu--label">Contact List</span>
                </a>
              </li>
              <li className="menu--item">
                <a
                  href="my_organisation_dashboard_payout.html"
                  className="menu--link"
                  title="Payouts"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className="fa-solid fa-credit-card menu--icon" />
                  <span className="menu--label">Payouts</span>
                </a>
              </li>
              <li className="menu--item">
                <a
                  href="my_organisation_dashboard_reports.html"
                  className="menu--link"
                  title="Reports"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className="fa-solid fa-chart-pie menu--icon" />
                  <span className="menu--label">Reports</span>
                </a>
              </li>
              <li className="menu--item">
                <a
                  href="my_organisation_dashboard_subscription.html"
                  className="menu--link"
                  title="Subscription"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className="fa-solid fa-bahai menu--icon" />
                  <span className="menu--label">Subscription</span>
                </a>
              </li>
              <li className="menu--item">
                <a
                  href="my_organisation_dashboard_conversion_setup.html"
                  className="menu--link"
                  title="Conversion Setup"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className="fa-solid fa-square-plus menu--icon" />
                  <span className="menu--label">Conversion Setup</span>
                </a>
              </li>
              <li className="menu--item">
                <a
                  href="my_organisation_dashboard_about.html"
                  className="menu--link"
                  title="About"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className="fa-solid fa-circle-info menu--icon" />
                  <span className="menu--label">About</span>
                </a>
              </li>
              <li className="menu--item">
                <a
                  href="my_organisation_dashboard_my_team.html"
                  className="menu--link team-lock"
                  title="My Team"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className="fa-solid fa-user-group menu--icon" />
                  <span className="menu--label">My Team</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default operatorDashboard;
