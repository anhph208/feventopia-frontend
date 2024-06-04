import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <nav className="navbar navbar-expand-lg bg-barren barren-head navbar fixed-top justify-content-sm-start pt-0 pb-0">
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
              href="/home"
            >
              <div className="res-main-logo">
                <img src="./assets/images/logo-fav.png" alt />
              </div>
              <div className="main-logo" id="logo">
                <img src="./assets/images/logo.svg" alt />
                <img
                  className="logo-inverse"
                  src="./assets/images/dark-logo.svg"
                  alt
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
                  <img src="./assets/images/logo-icon.svg" alt />
                </div>
                <button
                  type="button"
                  className="close-btn"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <div className="offcanvas-body">
                <div className="offcanvas-top-area">
                  <div className="create-bg">
                    <a href="create.html" className="offcanvas-create-btn">
                      <i className="fa-solid fa-calendar-days" />
                      <span><strong>MUA VÉ NGAY</strong></span>
                    </a>
                  </div>
                </div>
                <ul className="navbar-nav justify-content-end flex-grow-1 pe_5">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/home"
                    >
                      <strong>TRANG CHỦ</strong>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="index.html"
                    >
                      <strong>KHÁM PHÁ SỰ KIỆN</strong>
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
                        <a className="dropdown-item" href="faq.html">
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="help_center.html">
                          TRUNG TÂM TRỢ GIÚP
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="contact_us.html">
                          LIÊN HỆ FEVENTOPIA
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="offcanvas-footer">
                <div className="offcanvas-social">
                  <h5><strong>THEO DÕI MẠNG XÃ HỘI</strong></h5>
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
                  <a href="create.html" className="create-btn btn-hover">
                    <i className="fa-solid fa-calendar-days" />
                    <span><strong>MUA VÉ NGAY</strong></span>
                  </a>
                </li>
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
                    <img src="./assets/images/profile-imgs/img-13.jpg" alt />
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
                            src="./assets/images/profile-imgs/img-13.jpg"
                            alt
                          />
                        </div>
                        <h5>John Doe</h5>
                        <p>johndoe@example.com</p>
                      </div>
                    </li>
                    <li className="profile-link">
                      <a
                        href="my_organisation_dashboard.html"
                        className="link-item"
                      >
                        Vé đã mua
                      </a>
                      <a
                        href="/userprofile"
                        className="link-item"
                      >
                        Trang cá nhân
                      </a>
                      <a href="/signin" className="link-item">
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="night_mode_switch__btn">
                    <div id="night-mode" className="fas fa-moon fa-sun" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="overlay" />
      </div>
    </header>
  );
}

export default Header;
