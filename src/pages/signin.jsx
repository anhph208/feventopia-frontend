import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI } from "../components/services/userServices";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginAPI(emailOrUsername, password);
      const jwtToken = response.headers["json-web-token"];
      if (jwtToken) {
        localStorage.setItem("token", jwtToken);
        const decoded = jwtDecode(jwtToken);
        const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const userEmail = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (role === "EVENTOPERATOR") {
          window.location.replace("/operatorPages");
        } else {
          window.location.replace("/");
        }

        localStorage.setItem("isLogged", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("email", userEmail);
        localStorage.setItem("role", role);
        toast.success("Đăng nhập thành công!!!");
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        if (status === 401) {
          toast.error("Email/Tên tài khoản hoặc Mật khẩu không đúng");
        } else if (status === 500) {
          toast.error("Lỗi hệ thống. Vui lòng thử lại.");
        } else {
          toast.error("Lỗi. Vui lòng thử lại");
        }
      } else if (err.request) {
        toast.error("Sự cố kết nối. Vui lòng kiểm tra kết nối mạng!");
      } else {
        console.error("Error signing in:", err.message);
      }
      localStorage.removeItem("token");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="form-wrapper">
      <div className="app-form">
        <div className="app-form-sidebar">
          <div className="sidebar-sign-logo">
            <a href="/home">
              <img src="./assets/images/logo.svg" alt="logo" />
            </a>
          </div>
          <div className="sign_sidebar_text">
            <h1>BÙNG NỔ SỰ KIỆN CÙNG FEVENTOPIA</h1>
          </div>
        </div>
        <div className="app-form-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-10">
                <div className="app-top-items">
                  <a href="/">
                    <div className="sign-logo" id="logo">
                      <img src="./assets/images/logo.svg" alt="logo" />
                      <img
                        className="logo-inverse"
                        src="./assets/images/dark-logo.svg"
                        alt="dark-logo"
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
                  <form onSubmit={handleSubmit}>
                    <h2 className="registration-title">
                      <strong>ĐĂNG NHẬP VÀO FEVENTOPIA</strong>
                    </h2>
                    <div className="form-group mt-5">
                      <label className="form-label">
                        Email hoặc Tên đăng nhập*
                      </label>
                      <input
                        className="form-control h_50"
                        type="text"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        placeholder="Nhập Email hoặc Tên đăng nhập"
                        required
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
                          type={passwordVisible ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Nhập mật khẩu"
                          required
                        />
                        <span
                          className="pass-show-eye"
                          onClick={togglePasswordVisibility}
                        >
                          <i
                            className={
                              passwordVisible
                                ? "fas fa-eye"
                                : "fas fa-eye-slash"
                            }
                          ></i>
                        </span>
                      </div>
                    </div>
                    <button
                      className="main-btn btn-hover w-100 mt-4"
                      type="submit"
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
};

export default SignIn;
