import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/tools";
import { getProfileAPI } from "../components/services/userServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../components/Cart/CartContext";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Header = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const { token, logout } = useAuth(); // Use the useAuth hook

  useEffect(() => {
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const profileData = await getProfileAPI();
          setProfile(profileData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          if (error.response && error.response.status === 401) {
            // Handle session expiration
            handleSessionExp();
          } else {
            console.error("Trang người dùng hết hạn.");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleLogoutClick = () => {
    logout(); // Use the logout function from AuthContext
    clearCart();
    toast.success("Đăng xuât thành công.", {
      onClose: () => setTimeout(() => navigate("/signin"), 1000),
    });
  };

  const handleSessionExp = () => {
    logout();
    clearCart(); // Use the logout function from AuthContext
    toast.success("Phiên đã hết hạn. Vui lòng Đăng nhập lại.", {
      onClose: () => setTimeout(() => navigate("/signin"), 1000),
    });
  };

  const handleClickLogo = () => {
    navigate("/");
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
                <img
                  className="logo-inverse"
                  src="./assets/images/dark-logo.svg"
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
                  <img src="./assets/images/logo-icon.svg" alt="Logo" />
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
                <div className="offcanvas-top-area">
                  <div className="create-bg">
                    <a href="create.html" className="offcanvas-create-btn">
                      <i className="fa-solid fa-calendar-days" />
                      <span>
                        <strong>MUA VÉ NGAY</strong>
                      </span>
                    </a>
                  </div>
                </div>
                <ul className="navbar-nav justify-content-end flex-grow-1 pe_5">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">
                      <strong>TRANG CHỦ</strong>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/explored"
                    >
                      <strong>TÌM KIẾM SỰ KIỆN</strong>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <strong>ĐÁNH GIÁ</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <a className="dropdown-item" href="our_blog.html">
                          SỰ KIỆN THÚ VỊ
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="blog_detail_view.html"
                        >
                          TÌM KIẾM ĐÁNH GIÁ
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <strong>HỖ TRỢ</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <a className="dropdown-item" href="/faq">
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/helpCenter">
                          TRUNG TÂM TRỢ GIÚP
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/Contact">
                          LIÊN HỆ FEVENTOPIA
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="offcanvas-footer">
                <div className="offcanvas-social">
                  <h5>
                    <strong>THEO DÕI MẠNG XÃ HỘI</strong>
                  </h5>
                  <ul className="social-links">
                    <li>
                      <a
                        href="https://www.facebook.com/FPTU.HCM/"
                        className="social-link"
                      >
                        <i className="fab fa-facebook-square" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/fptuniversityhcm/"
                        className="social-link"
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/channel/UCfNrlxNgcTZDJ3jZeSSSJxg"
                        className="social-link"
                      >
                        <i className="fab fa-youtube" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="right-header order-2">
              <ul className="align-self-stretch">
                <li>
                  <a href="/explored" className="create-btn btn-hover">
                    <i className="fa-solid fa-calendar-days" />
                    <span>
                      <strong>MUA VÉ NGAY</strong>
                    </span>
                  </a>
                </li>
                {token ? (
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
                        src={
                          profile?.avatar ||
                          "./assets/images/profile-imgs/img-13.jpg"
                        }
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
                              src={
                                profile?.avatar ||
                                "./assets/images/profile-imgs/img-13.jpg"
                              }
                              alt="User Avatar"
                            />
                          </div>
                        </div>
                      </li>
                      <li className="profile-link">
                        <Link
                          to="/userprofile?activeTab=orders"
                          className="link-item"
                        >
                          Vé đã mua
                        </Link>
                        <Link
                          to={
                            profile?.role === "SPONSOR"
                              ? "/sponsorProfile"
                              : "/userprofile"
                          }
                          className="link-item"
                        >
                          Trang cá nhân
                        </Link>
                        <button
                          className="link-item"
                          onClick={handleLogoutClick}
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li>
                    <Link to="/signin" className="create-btn btn-hover">
                      <strong>ĐĂNG NHẬP</strong>
                    </Link>
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

export default Header;
