import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getProfileAPI,
  changePasswordAPI,
} from "../components/services/userServices";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserProfile = async () => {
      try {
        const profileData = await getProfileAPI(token);
        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to fetch user profile.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Không được để trống các trường Mật khẩu.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Mật khẩu mới đã nhập không khớp!");
      return;
    }

    try {
      await changePasswordAPI(currentPassword, newPassword);
      toast.success("Mật khẩu đã thay đổi thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => {
        navigate(window.location.reload());
      }, 2000);
    
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Mật khẩu hiện tại không đúng");
      } else {
        console.error("Error changing password:", error);
        toast.error("Failed to change password.");
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  if (loading) {
    return <p>Loading...</p>; // Add loading indicator if needed
  }

  if (!profile) {
    return <p>Error fetching profile.</p>; // Handle error case
  }

  return (
    <div>
      <div className="wrapper">
        <div className="profile-banner">
          <div className="hero-cover-block">
            <div className="hero-cover">
              <div className="hero-cover-img">
                <img src="./assets/images/userBackground.jpg" alt />
              </div>
            </div>
          </div>
          <div className="user-dt-block">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-12">
                  <div className="main-card user-left-dt">
                    <div className="user-avatar-img">
                      <img src="./assets/images/profile-imgs/img-13.jpg" alt />
                      <div className="avatar-img-btn">
                        <input type="file" id="avatar-img" />
                        <label htmlFor="avatar-img">
                          <i className="fa-solid fa-camera" />
                        </label>
                      </div>
                    </div>
                    <div className="user-dts">
                      <h4 className="user-name">
                        {profile.name}
                        <span className="verify-badge">
                          <i className="fa-solid fa-circle-check" />
                        </span>
                      </h4>
                      <span className="user-email">{profile.email}</span>
                    </div>

                    <div className="user-description">
                      <p>Tớ là {profile.name}</p>
                    </div>
                    <div className="user-btns">
                      <a
                        href="my_organisation_dashboard.html"
                        className="co-main-btn co-btn-width min-width d-inline-block h_40"
                      >
                        My Organisation
                        <i className="fa-solid fa-right-left ms-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 col-md-12">
                  <div className="right-profile">
                    <div className="profile-tabs">
                      <ul
                        className="nav nav-pills nav-fill p-2 garren-line-tab"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="feed-tab"
                            data-bs-toggle="tab"
                            href="#feed"
                            role="tab"
                            aria-controls="feed"
                            aria-selected="true"
                          >
                            <i className="fa-solid fa-house" />
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="about-tab"
                            data-bs-toggle="tab"
                            href="#about"
                            role="tab"
                            aria-controls="about"
                            aria-selected="false"
                          >
                            <i className="fa-solid fa-circle-info" />
                            About
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="setting-tab"
                            data-bs-toggle="tab"
                            href="#setting"
                            role="tab"
                            aria-controls="setting"
                            aria-selected="false"
                          >
                            <i className="fa-solid fa-gear" />
                            Setting
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="orders-tab"
                            data-bs-toggle="tab"
                            href="#orders"
                            role="tab"
                            aria-controls="orders"
                            aria-selected="false"
                          >
                            <i className="fa-solid fa-box" />
                            My Orders
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade active show"
                          id="feed"
                          role="tabpanel"
                          aria-labelledby="feed-tab"
                        >
                          <div
                            className="nav my-event-tabs mt-4"
                            role="tablist"
                          >
                            <button
                              className="event-link active"
                              data-bs-toggle="tab"
                              data-bs-target="#saved"
                              type="button"
                              role="tab"
                              aria-controls="saved"
                              aria-selected="true"
                            >
                              <span className="event-count">1</span>
                              <span>Saved Events</span>
                            </button>
                            <button
                              className="event-link"
                              data-bs-toggle="tab"
                              data-bs-target="#organised"
                              type="button"
                              role="tab"
                              aria-controls="organised"
                              aria-selected="false"
                            >
                              <span className="event-count">2</span>
                              <span>Organised Events</span>
                            </button>
                            <button
                              className="event-link"
                              data-bs-toggle="tab"
                              data-bs-target="#attending"
                              type="button"
                              role="tab"
                              aria-controls="attending"
                              aria-selected="false"
                            >
                              <span className="event-count">1</span>
                              <span>Attending Events</span>
                            </button>
                          </div>
                          <div className="tab-content">
                            <div
                              className="tab-pane fade show active"
                              id="saved"
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="main-card mt-4">
                                    <div className="card-top p-4">
                                      <div className="card-event-img">
                                        <img
                                          src="./assets/images/event-imgs/img-6.jpg"
                                          alt
                                        />
                                      </div>
                                      <div className="card-event-dt">
                                        <h5>Step Up Open Mic Show</h5>
                                        <div className="evnt-time">
                                          Thu, Jun 30, 2022 4:30 AM
                                        </div>
                                        <div className="event-btn-group">
                                          <button className="esv-btn saved-btn me-2">
                                            <i className="fa-regular fa-bookmark me-2" />
                                            Save
                                          </button>
                                          <button
                                            className="esv-btn me-2"
                                            onclick="window.location.href='online_event_detail_view.html'"
                                          >
                                            <i className="fa-solid fa-arrow-up-from-bracket me-2" />
                                            View
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="organised"
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="main-card mt-4">
                                    <div className="card-top p-4">
                                      <div className="card-event-img">
                                        <img
                                          src="./assets/images/event-imgs/img-6.jpg"
                                          alt
                                        />
                                      </div>
                                      <div className="card-event-dt">
                                        <h5>Step Up Open Mic Show</h5>
                                        <div className="evnt-time">
                                          Thu, Jun 30, 2022 4:30 AM
                                        </div>
                                        <div className="event-btn-group">
                                          <button
                                            className="esv-btn me-2"
                                            onclick="window.location.href='create_online_event.html'"
                                          >
                                            <i className="fa-solid fa-gear me-2" />
                                            Manage Event
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="main-card mt-4">
                                    <div className="card-top p-4">
                                      <div className="card-event-img">
                                        <img
                                          src="./assets/images/event-imgs/img-7.jpg"
                                          alt
                                        />
                                      </div>
                                      <div className="card-event-dt">
                                        <h5>
                                          Tutorial on Canvas Painting for
                                          Beginners
                                        </h5>
                                        <div className="evnt-time">
                                          Sun, Jul 17, 2022 5:30 AM
                                        </div>
                                        <div className="event-btn-group">
                                          <button
                                            className="esv-btn me-2"
                                            onclick="window.location.href='create_online_event.html'"
                                          >
                                            <i className="fa-solid fa-gear me-2" />
                                            Manage Event
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="attending"
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="main-card mt-4">
                                    <div className="card-top p-4">
                                      <div className="card-event-img">
                                        <img
                                          src="./assets/images/event-imgs/img-6.jpg"
                                          alt
                                        />
                                      </div>
                                      <div className="card-event-dt">
                                        <h5>Step Up Open Mic Show</h5>
                                        <div className="evnt-time">
                                          Thu, Jun 30, 2022 4:30 AM
                                        </div>
                                        <div className="event-btn-group">
                                          <button
                                            className="esv-btn me-2"
                                            onclick="window.location.href='invoice.html'"
                                          >
                                            <i className="fa-solid fa-arrow-up-from-bracket me-2" />
                                            View Ticket
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="about"
                          role="tabpanel"
                          aria-labelledby="about-tab"
                        >
                          <div className="main-card mt-4">
                            <div className="bp-title position-relative">
                              <h4>About</h4>
                              <button
                                className="main-btn btn-hover ms-auto edit-btn me-3 pe-4 ps-4 h_40"
                                data-bs-toggle="modal"
                                data-bs-target="#aboutModal"
                              >
                                <i className="fa-regular fa-pen-to-square me-2" />
                                Edit
                              </button>
                            </div>
                            <div className="about-details">
                              <div className="about-step">
                                <h5>Name</h5>
                                <span>Joginder Singh</span>
                              </div>
                              <div className="about-step">
                                <h5>
                                  Tell us about yourself and let people know who
                                  you are
                                </h5>
                                <p className="mb-0">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Ut tincidunt interdum nunc et
                                  auctor. Phasellus quis pharetra sapien.
                                  Integer ligula sem, sodales vitae varius in,
                                  varius eget augue.
                                </p>
                              </div>
                              <div className="about-step">
                                <h5>Find me on</h5>
                                <div className="social-links">
                                  <a
                                    href="#"
                                    className="social-link"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Facebook"
                                  >
                                    <i className="fab fa-facebook-square" />
                                  </a>
                                  <a
                                    href="#"
                                    className="social-link"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Instagram"
                                  >
                                    <i className="fab fa-instagram" />
                                  </a>
                                  <a
                                    href="#"
                                    className="social-link"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Twitter"
                                  >
                                    <i className="fab fa-twitter" />
                                  </a>
                                  <a
                                    href="#"
                                    className="social-link"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="LinkedIn"
                                  >
                                    <i className="fab fa-linkedin-in" />
                                  </a>
                                  <a
                                    href="#"
                                    className="social-link"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Youtube"
                                  >
                                    <i className="fab fa-youtube" />
                                  </a>
                                  <a
                                    href="#"
                                    className="social-link"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Website"
                                  >
                                    <i className="fa-solid fa-globe" />
                                  </a>
                                </div>
                              </div>
                              <div className="about-step">
                                <h5>Address</h5>
                                <p className="mb-0">
                                  00 Challis St, Newport, Victoria, 0000,
                                  Australia
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="setting"
                          role="tabpanel"
                          aria-labelledby="setting-tab"
                        >
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="main-card mt-4 p-0">
                                <div className="nav custom-tabs" role="tablist">
                                  <button
                                    className="tab-link active"
                                    data-bs-toggle="tab"
                                    data-bs-target="#tab-01"
                                    type="button"
                                    role="tab"
                                    aria-controls="tab-01"
                                    aria-selected="true"
                                  >
                                    <i className="fa-solid fa-envelope me-3" />
                                    Email Preferences
                                  </button>
                                  <button
                                    className="tab-link"
                                    data-bs-toggle="tab"
                                    data-bs-target="#tab-02"
                                    type="button"
                                    role="tab"
                                    aria-controls="tab-02"
                                    aria-selected="false"
                                  >
                                    <i className="fa-solid fa-key me-3" />
                                    Password Settings
                                  </button>
                                  <button
                                    className="tab-link"
                                    data-bs-toggle="tab"
                                    data-bs-target="#tab-03"
                                    type="button"
                                    role="tab"
                                    aria-controls="tab-03"
                                    aria-selected="false"
                                  >
                                    <i className="fa-solid fa-gear me-3" />
                                    Privacy Settings
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="main-card mt-4">
                                <div className="tab-content">
                                  <div
                                    className="tab-pane fade show active"
                                    id="tab-01"
                                    role="tabpanel"
                                  >
                                    <div className="bp-title">
                                      <h4>Email Preferences</h4>
                                    </div>
                                    <div className="profile-setting p-4">
                                      <div className="setting-step">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Receive order confirmation
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          On purchasing an event you will
                                          receive an order confirmation email.
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Receive communication from event
                                            organisers for my purchased events
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          The organisations whose events you
                                          have bought will be able send you
                                          further follow up emails.
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Receive event invitations from event
                                            organisers sent to my email address
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          Organisations will be able to send you
                                          Invitations in their events.
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Receive reminder from Barren for my
                                            purchased events
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          After purchasing event you will
                                          receive reminder emails before the
                                          event starts so that you can get
                                          prepared.
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Receive critical notifications on
                                            Barren service status and product
                                            updates
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          Get updates on new features and
                                          insights so that you can make the best
                                          use of Barren.
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Receive newsletters from Barren with
                                            general and other information
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          Get more insights on Barren that can
                                          help to boost your event business.
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Receive notification when someone
                                            follows me
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          We will notify you when someone starts
                                          following you or your organisation.
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Review review notification when
                                            someone shares my events
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-0">
                                          We will notify you when someone shares
                                          event created by your organisation.
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Receive notification on review
                                            related activities
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-0">
                                          We will notify you when someone leaves
                                          review for your organisation.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="tab-02"
                                    role="tabpanel"
                                  >
                                    <div className="bp-title">
                                      <h4>Cài đặt Mật khẩu</h4>
                                    </div>
                                    <div className="password-setting p-4">
                                      <div className="password-des">
                                        <h4>Đổi Mật khẩu</h4>
                                        <p>
                                          Bạn có thể đổi mật khẩu của mình
                                          từ đây. Nếu bạn không nhớ được mật
                                          khẩu hiện tại, chỉ cần Đăng xuất và
                                          bấm vào Quên mật khẩu.
                                        </p>
                                      </div>
                                      <div className="change-password-form">
                                        <form onSubmit={handleChangePassword}>
                                          <div className="form-group mt-4">
                                            <label className="form-label">
                                              Mật khẩu hiện tại*
                                            </label>
                                            <div className="loc-group position-relative">
                                              <input
                                                className="form-control h_50"
                                                type={
                                                  passwordVisible.current
                                                    ? "text"
                                                    : "password"
                                                }
                                                placeholder="Nhập Mật khẩu hiện tại"
                                                value={currentPassword}
                                                onChange={(e) =>
                                                  setCurrentPassword(
                                                    e.target.value
                                                  )
                                                }
                                                required
                                              />
                                              <span
                                                className="pass-show-eye"
                                                onClick={() =>
                                                  togglePasswordVisibility(
                                                    "current"
                                                  )
                                                }
                                              >
                                                <i
                                                  className={
                                                    passwordVisible.current
                                                      ? "fas fa-eye"
                                                      : "fas fa-eye-slash"
                                                  }
                                                />
                                              </span>
                                            </div>
                                          </div>
                                          <div className="form-group mt-4">
                                            <label className="form-label">
                                              Mật khẩu mới*
                                            </label>
                                            <div className="loc-group position-relative">
                                              <input
                                                className="form-control h_50"
                                                type={
                                                  passwordVisible.new
                                                    ? "text"
                                                    : "password"
                                                }
                                                placeholder="Nhập Mật khẩu mới"
                                                value={newPassword}
                                                onChange={(e) =>
                                                  setNewPassword(e.target.value)
                                                }
                                                required
                                              />
                                              <span
                                                className="pass-show-eye"
                                                onClick={() =>
                                                  togglePasswordVisibility(
                                                    "new"
                                                  )
                                                }
                                              >
                                                <i
                                                  className={
                                                    passwordVisible.new
                                                      ? "fas fa-eye"
                                                      : "fas fa-eye-slash"
                                                  }
                                                />
                                              </span>
                                            </div>
                                          </div>
                                          <div className="form-group mt-4">
                                            <label className="form-label">
                                              Xác nhận Mật khẩu mới*
                                            </label>
                                            <div className="loc-group position-relative">
                                              <input
                                                className="form-control h_50"
                                                type={
                                                  passwordVisible.confirm
                                                    ? "text"
                                                    : "password"
                                                }
                                                placeholder="Nhập lại Mật khẩu mới"
                                                value={confirmNewPassword}
                                                onChange={(e) =>
                                                  setConfirmNewPassword(
                                                    e.target.value
                                                  )
                                                }
                                                required
                                              />
                                              <span
                                                className="pass-show-eye"
                                                onClick={() =>
                                                  togglePasswordVisibility(
                                                    "confirm"
                                                  )
                                                }
                                              >
                                                <i
                                                  className={
                                                    passwordVisible.confirm
                                                      ? "fas fa-eye"
                                                      : "fas fa-eye-slash"
                                                  }
                                                />
                                              </span>
                                            </div>
                                          </div>
                                          <button
                                            className="main-btn btn-hover w-100 mt-5"
                                            type="submit"
                                          >
                                            <strong>ĐỔI MẬT KHẨU</strong>
                                          </button>
                                        </form>
                                      </div>
                                    </div>
                                    <ToastContainer />
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="tab-03"
                                    role="tabpanel"
                                  >
                                    <div className="bp-title">
                                      <h4>Privacy Settings</h4>
                                    </div>
                                    <div className="privacy-setting p-4">
                                      <div className="setting-step">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Lock my user profile
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input type="checkbox" />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          Locking profile hides all kinds of
                                          user information, activities and
                                          interaction from public profile
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Allow people to contact me
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input type="checkbox" />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          People will be able to send you emails
                                          through Barren who visits your profile
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Allow people to find and invite me
                                            to relevant events
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          Based on your preferences event
                                          organisers will be able to send you
                                          invitations in their events
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Allow people to follow me
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input type="checkbox" />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          People will be able to follow you
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Allow people to see my followings
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input type="checkbox" />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          People will be able to see whom and
                                          which organisations you are following
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Allow people to see my join date
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input type="checkbox" />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          People will be able to see when you
                                          have started using Barren
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Allow people to see the events I
                                            attend
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input type="checkbox" />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-4">
                                          People will be able to see the events
                                          you have purchased
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Allow people to see the events I
                                            join as speaker
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input type="checkbox" />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-0">
                                          People will be able to see the events
                                          you have joined as Speaker
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Allow people to see the events I
                                            share
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-0">
                                          People will be able to see the events
                                          you have shared in Barren
                                        </p>
                                      </div>
                                      <div className="setting-step pt-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <h3 className="setting-title">
                                            Hide review interactions from public
                                          </h3>
                                          <label className="btn-switch m-0 ml-2">
                                            <input type="checkbox" />
                                            <span className="checkbox-slider" />
                                          </label>
                                        </div>
                                        <p className="mt-1 mb-0">
                                          The reviews and ratings given by you
                                          will not appear in your public profile
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="orders"
                          role="tabpanel"
                          aria-labelledby="orders-tab"
                        >
                          <div className="main-card mt-4">
                            <div className="card-top p-4">
                              <div className="card-event-img">
                                <img
                                  src="./assets/images/event-imgs/img-7.jpg"
                                  alt
                                />
                              </div>
                              <div className="card-event-dt">
                                <h5>
                                  Tutorial on Canvas Painting for Beginners
                                </h5>
                                <div className="invoice-id">
                                  Invoice ID : <span>BRCCRW-11111111</span>
                                </div>
                              </div>
                            </div>
                            <div className="card-bottom">
                              <div className="card-bottom-item">
                                <div className="card-icon">
                                  <i className="fa-solid fa-calendar-days" />
                                </div>
                                <div className="card-dt-text">
                                  <h6>Event Starts on</h6>
                                  <span>01 June 2022</span>
                                </div>
                              </div>
                              <div className="card-bottom-item">
                                <div className="card-icon">
                                  <i className="fa-solid fa-ticket" />
                                </div>
                                <div className="card-dt-text">
                                  <h6>Total Tickets</h6>
                                  <span>1</span>
                                </div>
                              </div>
                              <div className="card-bottom-item">
                                <div className="card-icon">
                                  <i className="fa-solid fa-money-bill" />
                                </div>
                                <div className="card-dt-text">
                                  <h6>Paid Amount</h6>
                                  <span>AUD $50.00</span>
                                </div>
                              </div>
                              <div className="card-bottom-item">
                                <div className="card-icon">
                                  <i className="fa-solid fa-money-bill" />
                                </div>
                                <div className="card-dt-text">
                                  <h6>Invoice</h6>
                                  <a href="invoice.html">Download</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
};

export default UserProfile;
