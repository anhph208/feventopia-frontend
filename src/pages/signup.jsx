import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupAPI } from "../components/services/userServices";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không giống nhau!!!");
      return;
    }

    const fullName = `${formData.firstName} ${formData.lastName}`;
    const signupData = {
      name: fullName,
      phoneNumber: formData.phone,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      const response = await signupAPI(signupData);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Đăng kí thành công");
        setTimeout(() => {
          navigate(window.location.replace("/signin"));
        }, 2000);
      } else {
        toast.error(response.message || "Lỗi hệ thống. Đăng kí thất bại!");
      }
    } catch (err) {
      toast.error(err.message);
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
            <img src="./assets/images/logo.svg" alt="Logo" />
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
                  <a href="/home">
                    <div className="sign-logo" id="logo">
                      <img src="./assets/images/logo.svg" alt="Logo" />
                      <img
                        className="logo-inverse"
                        src="images/dark-logo.svg"
                        alt="Logo Inverse"
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
                  <form onSubmit={handleSubmit}>
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
                            name="firstName"
                            placeholder="Nhập Họ"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">Tên*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            name="lastName"
                            placeholder="Nhập Tên"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">Email*</label>
                          <input
                            className="form-control h_50"
                            type="email"
                            name="email"
                            placeholder="Nhập Email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group mt-4">
                          <label className="form-label">Số điện thoại*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            name="phone"
                            placeholder="Nhập Số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group mt-4">
                          <label className="form-label">Tên đăng nhập*</label>
                          <input
                            className="form-control h_50"
                            type="text"
                            name="username"
                            placeholder="Nhập Tên đăng nhập"
                            value={formData.username}
                            onChange={handleChange}
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
                              type={passwordVisible ? "text" : "password"}
                              name="password"
                              placeholder="Nhập Mật khẩu"
                              value={formData.password}
                              onChange={handleChange}
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
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group mt-4">
                          <label className="form-label">
                            Xác nhận mật khẩu*
                          </label>
                          <input
                            className="form-control h_50"
                            type={passwordVisible ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Xác nhận Mật khẩu"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <button
                          className="main-btn btn-hover w-100 mt-4"
                          type="submit"
                        >
                          <strong>ĐĂNG KÍ</strong>
                        </button>
                      </div>
                    </div>
                  </form>
                  <ToastContainer />
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

export default Signup;
