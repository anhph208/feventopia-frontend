import React from "react";

function signup() {
  return (
    <div className="form-wrapper">
      <div className="app-form">
        <div className="app-form-sidebar">
          <div className="sidebar-sign-logo">
            <img src="./assets/images/logo.svg" alt />
          </div>
          <div className="sign_sidebar_text">
            <h1>
              The Easiest Way to Create Events and Sell More Tickets Online
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
                      <img src="images/logo.svg" alt />
                      <img
                        className="logo-inverse"
                        src="images/dark-logo.svg"
                        alt
                      />
                    </div>
                  </a>
                  <div className="app-top-right-link">
                    Đã có tài khoản?
                    <a className="sidebar-register-link" href="/signin">
                      Đăng nhập
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-7">
                <div className="registration">
                  <form>
                    <h2 className="registration-title">
                      <strong>ĐĂNG KÍ VÀO FEVENTOPIA</strong>
                    </h2>
                    <div className="row mt-3">
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">Họ*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            placeholder="Nhập Họ"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">Tên*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            placeholder="Nhập Tên"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">Email*</label>
                          <input
                            className="form-control h_50"
                            type="email"
                            placeholder="Nhập Email"
                          />
                        </div>
                        <div className="form-group mt-4">
                          <label className="form-label">Số điện thoại*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            placeholder="Nhập Số điện thoại"
                          />
                        </div>
                        <div className="form-group mt-4">
                          <label className="form-label">Tên đăng nhập*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            placeholder="Nhập Tên đăng nhập"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group mt-4">
                          <div className="field-password">
                            <label className="form-label">Mật khẩu*</label>
                          </div>
                          <div className="loc-group position-relative">
                            <input
                              className="form-control h_50"
                              type="password"
                              placeholder="Nhập Mật khẩu"
                            />
                            <span className="pass-show-eye">
                              <i className="fas fa-eye-slash" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <button
                          className="main-btn btn-hover w-100 mt-4"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="agree-text">
                    Bằng việc "Đăng kí", bạn đồng ý với FEvetopia{" "}
                    <a href="#">Điều khoản &amp; Dịch vụ</a> và{" "}
                    <a href="#">Chính sách Bảo mật</a>.
                  </div>
                  <div className="new-sign-link">
                    Đã có tài khoản?
                    <a className="signup-link" href="/signin">
                      Đăng nhập
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
export default signup;
