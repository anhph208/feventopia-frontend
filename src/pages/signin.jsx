import React from "react";

function signin() {
  return (
    <div className="form-wrapper">
      <div className="app-form">
        <div className="app-form-sidebar">
          <div className="sidebar-sign-logo">
            <img src="./assets/images/logo.svg" alt />
          </div>
          <div className="sign_sidebar_text">
            <h1>
              BÙNG NỔ SỰ KIỆN CÙNG FEVENTOPIA
            </h1>
          </div>
        </div>
        <div className="app-form-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-10">
                <div className="app-top-items">
                  <a href="/home">
                    <div className="sign-logo" id="logo">
                      <img src="./assets/images/logo.svg" alt />
                      <img
                        className="logo-inverse"
                        src="./assets/images/dark-logo.svg"
                        alt
                      />
                    </div>
                  </a>
                  <div className="app-top-right-link">
                    Chưa có tài khoản?
                    <a className="sidebar-register-link" href="/signup">
                      Đăng kí
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-7">
                <div className="registration">
                  <form>
                    <h2 className="registration-title"><strong>ĐĂNG NHẬP VÀO FEVENTOPIA</strong></h2>
                    <div className="form-group mt-5">
                      <label className="form-label">Email hoặc Tên đăng nhập*</label>
                      <input
                        className="form-control h_50"
                        type="email"
                        placeholder="Nhập Email hoặc Tên đăng nhập"
                      />
                    </div>
                    <div className="form-group mt-4">
                      <div className="field-password">
                        <label className="form-label">Mật khẩu*</label>
                        <a
                          className="forgot-pass-link"
                          href="forgot_password.html"
                        >
                          Quên mật khẩu?
                        </a>
                      </div>
                      <div className="loc-group position-relative">
                        <input
                          className="form-control h_50"
                          type="password"
                          placeholder="Nhập mật khẩu"
                        />
                        <span className="pass-show-eye">
                          <i className="fas fa-eye-slash" />
                        </span>
                      </div>
                    </div>
                    <button
                      className="main-btn btn-hover w-100 mt-4"
                      type="button"
                      onclick="window.location.href='/home'"
                    >
                      ĐĂNG NHẬP <i className="fas fa-sign-in-alt ms-2" />
                    </button>
                  </form>
                  <div className="new-sign-link">
                    Chưa có tài khoản?
                    <a className="signup-link" href="/signup">
                      Đăng kí
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-footer">
            © 2024, FEventopia. All rights reserved. Powered by FPT University
          </div>
        </div>
      </div>
    </div>
  );
}
export default signin;
