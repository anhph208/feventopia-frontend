import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProfileAPI } from "../components/services/userServices"; // Import the getProfileAPI function
import { toast } from "react-toastify"; // Import Toastify for notifications
import { handleLogout } from "../utils/tools"; // Import the handleLogout function
import "react-toastify/dist/ReactToastify.css";

const EvOAdminHeader = () => {
  const loggedIn = localStorage.getItem("isLogged") === "true";
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      const fetchUserProfile = async () => {
        try {
          const profileData = await getProfileAPI();
          setProfile(profileData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Failed to fetch user profile.");
        } finally {
          setLoading(false);
        }
      };
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [loggedIn]);

  const handleLogoutClick = () => {
    handleLogout(navigate);
  };

  const handleClickLogo = () => {
    navigate("/operatorPages");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <header className="header">
      <div className="header-inner">
        <nav className="navbar navbar-expand-lg bg-barren barren-head navbar fixed-top pt-0 pb-0">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon">
                <i className="fa-solid fa-bars" />
              </span>
            </button>
            <a
              className="navbar-brand order-1 order-lg-0 ml-lg-0 ml-2 me-auto"
              href="/"
              onClick={(e) => e.preventDefault() || handleClickLogo()}
            >
              <div className="main-logo" id="logo">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/logo%2Flogo.svg?alt=media&token=6e50aaa8-2c91-4596-9b11-e407bb6694e3"
                  alt="Logo"
                />              
              </div>
            </a>
            <div
              className="offcanvas offcanvas-start"
              tabIndex={-1}
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <div className="offcanvas-logo" id="offcanvasNavbarLabel">
                  <img src="images/logo-icon.svg" alt="Logo" />
                </div>
                <button
                  type="button"
                  className="close-btn"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={handleClickLogo}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe_5">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">
                      <strong>My Home</strong>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/explored">
                      <strong>Explore Events</strong>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="offcanvas-footer">
                <div className="offcanvas-social">
                  <h5><strong>Follow Us</strong></h5>
                  <ul className="social-links">
                    <li><a href="#" className="social-link"><i className="fab fa-facebook-square" /></a></li>
                    <li><a href="#" className="social-link"><i className="fab fa-instagram" /></a></li>
                    <li><a href="#" className="social-link"><i className="fab fa-twitter" /></a></li>
                    <li><a href="#" className="social-link"><i className="fab fa-linkedin-in" /></a></li>
                    <li><a href="#" className="social-link"><i className="fab fa-youtube" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="right-header order-2">
              <ul className="align-self-stretch">
                <li>
                  <a href="/createEvent" className="create-btn btn-hover">
                    <i className="fa-solid fa-calendar-days" />
                    <span><strong>TẠO SỰ KIỆN</strong></span>
                  </a>
                </li>
                {loggedIn ? (
                  <li className="dropdown account-dropdown">
                    <a
                      href="#"
                      className="account-link"
                      role="button"
                      id="accountClick"
                      data-bs-auto-close="outside"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={profile?.avatar || "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/avatars%2FOPERATOR%20AVT.png?alt=media&token=3e6f0143-be3c-421b-9169-4514424fadea"}
                        alt="User Avatar"
                      />
                      <i className="fas fa-caret-down arrow-icon" />
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-account dropdown-menu-end"
                      aria-labelledby="accountClick"
                    >
                      <li>
                        <div className="dropdown-account-header">
                          <div className="account-holder-avatar">
                            <img
                              src={profile?.avatar || "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/avatars%2FOPERATOR%20AVT.png?alt=media&token=3e6f0143-be3c-421b-9169-4514424fadea"}
                              alt="User Avatar"
                            />
                          </div>
                        </div>
                      </li>
                      <li className="profile-link">
                        <Link to="/signin" className="link-item" onClick={handleLogoutClick}>Đăng Xuất</Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li>
                    <Link to="/signin" className="create-btn btn-hover">Đăng Nhập</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className="overlay" />
      </div>
    </header>
  );
};

export default EvOAdminHeader;
