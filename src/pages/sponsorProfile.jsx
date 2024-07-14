import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { getProfileAPI } from "../components/services/userServices";
import HomeTab from "./SponsorPages/HomeTab";
import SponsorshipsTab from "../pages/SponsorPages/SponsorshipsTab";
import AboutTab from "../pages/SponsorPages/AboutTab";
import SettingTab from "../pages/SponsorPages/SettingTab";
import queryString from "query-string";

const SponsorProfile = () => {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("feed");

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    if (queryParams.activeTab) {
      setActiveTab(queryParams.activeTab);
    }
  }, [location.search]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchSponsorProfile = async () => {
      try {
        const profileData = await getProfileAPI(token);
        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sponsor profile:", error);
        toast.error("Failed to fetch sponsor profile.");
        setLoading(false);
      }
    };

    fetchSponsorProfile();
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
                alt="Sponsor Background"
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
                      alt="Sponsor Avatar"
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
                    <p>I am {profile.name}, a proud sponsor.</p>
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
                        <button
                          className={`nav-link ${
                            activeTab === "feed" ? "active" : ""
                          }`}
                          id="feed-tab"
                          onClick={() => setActiveTab("feed")}
                        >
                          <i className="fa-solid fa-house" />
                          <strong>Trang cá nhân</strong>
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "about" ? "active" : ""
                          }`}
                          id="about-tab"
                          onClick={() => setActiveTab("about")}
                        >
                          <i className="fa-solid fa-circle-info" />
                          <strong>Thông tin tài khoản</strong>
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "setting" ? "active" : ""
                          }`}
                          id="setting-tab"
                          onClick={() => setActiveTab("setting")}
                        >
                          <i className="fa-solid fa-gear" />
                          <strong>Cài đặt mật khẩu</strong>
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "sponsorships" ? "active" : ""
                          }`}
                          id="sponsorships-tab"
                          onClick={() => setActiveTab("sponsorships")}
                        >
                          <i className="fa-solid fa-handshake" />
                          <strong>Sự kiện đã Tài trợ</strong>
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="tab-content">
                    {activeTab === "feed" && (
                      <div
                        className="tab-pane fade show active"
                        id="feed"
                        role="tabpanel"
                        aria-labelledby="feed-tab"
                      >
                        <HomeTab />
                      </div>
                    )}
                    {activeTab === "about" && (
                      <div
                        className="tab-pane fade show active"
                        id="about"
                        role="tabpanel"
                        aria-labelledby="about-tab"
                      >
                        <AboutTab profile={profile} setProfile={setProfile} />
                      </div>
                    )}
                    {activeTab === "setting" && (
                      <div
                        className="tab-pane fade show active"
                        id="setting"
                        role="tabpanel"
                        aria-labelledby="setting-tab"
                      >
                        <SettingTab />
                      </div>
                    )}

                    {activeTab === "sponsorships" && (
                      <div
                        className="tab-pane fade show active"
                        id="sponsorships"
                        role="tabpanel"
                        aria-labelledby="sponsorships-tab"
                      >
                        <SponsorshipsTab />
                      </div>
                    )}
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

export default SponsorProfile;
