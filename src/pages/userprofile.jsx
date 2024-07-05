import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getProfileAPI } from "../components/services/userServices";
import HomeTab from "../components/userPage/HomeTab";
import AboutTab from "../components/userPage/AboutTab";
import SettingTab from "../components/userPage/SettingTab";
import OrdersTab from "../components/userPage/OrdersTab";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>Error fetching profile.</p>;
  }

  return (
    <div className="wrapper">
      <div className="profile-banner">
        <div className="hero-cover-block">
          <div className="hero-cover">
            <div className="hero-cover-img">
              <img
                src="./assets/images/userBackground.jpg"
                alt="User Background"
              />
            </div>
          </div>
        </div>
        <div className="user-dt-block">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-12">
                <div className="main-card user-left-dt">
                  <div className="user-avatar-img">
                    <img
                      src={
                        profile.avatar ||
                        "./assets/images/profile-imgs/img-13.jpg"
                      }
                      alt="User Avatar"
                    />
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
                          <strong>Trang cá nhân</strong>
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
                          <strong>Thông tin tài khoản</strong>
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
                          <strong>Cài đặt mật khẩu</strong>
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
                          <strong>Vé của tôi</strong>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="feed"
                      role="tabpanel"
                      aria-labelledby="feed-tab"
                    >
                      <HomeTab />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="about"
                      role="tabpanel"
                      aria-labelledby="about-tab"
                    >
                      <AboutTab profile={profile} setProfile={setProfile} />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="setting"
                      role="tabpanel"
                      aria-labelledby="setting-tab"
                    >
                      <SettingTab />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="orders"
                      role="tabpanel"
                      aria-labelledby="orders-tab"
                    >
                      <OrdersTab />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
