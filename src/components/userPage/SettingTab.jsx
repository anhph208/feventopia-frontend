import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  changePasswordAPI,
} from "../services/userServices";
import { useNavigate } from "react-router-dom";

const SettingTab= () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });

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
  return (
    <div
      className="tab-pane fade show active"
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
                        <input type="checkbox" defaultChecked />
                        <span className="checkbox-slider" />
                      </label>
                    </div>
                    <p className="mt-1 mb-4">
                      On purchasing an event you will receive an order
                      confirmation email.
                    </p>
                  </div>
                  <div className="setting-step pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="setting-title">
                        Receive communication from event organisers for my
                        purchased events
                      </h3>
                      <label className="btn-switch m-0 ml-2">
                        <input type="checkbox" defaultChecked />
                        <span className="checkbox-slider" />
                      </label>
                    </div>
                    <p className="mt-1 mb-4">
                      The organisations whose events you have bought will be
                      able send you further follow up emails.
                    </p>
                  </div>
                  <div className="setting-step pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="setting-title">
                        Receive event invitations from event organisers sent to
                        my email address
                      </h3>
                      <label className="btn-switch m-0 ml-2">
                        <input type="checkbox" defaultChecked />
                        <span className="checkbox-slider" />
                      </label>
                    </div>
                    <p className="mt-1 mb-4">
                      Organisations will be able to send you Invitations in
                      their events.
                    </p>
                  </div>
                  <div className="setting-step pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="setting-title">
                        Receive reminder from Barren for my purchased events
                      </h3>
                      <label className="btn-switch m-0 ml-2">
                        <input type="checkbox" defaultChecked />
                        <span className="checkbox-slider" />
                      </label>
                    </div>
                    <p className="mt-1 mb-4">
                      After purchasing event you will receive reminder emails
                      before the event starts so that you can get prepared.
                    </p>
                  </div>
                  <div className="setting-step pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="setting-title">
                        Receive critical notifications on Barren service status
                        and product updates
                      </h3>
                      <label className="btn-switch m-0 ml-2">
                        <input type="checkbox" defaultChecked />
                        <span className="checkbox-slider" />
                      </label>
                    </div>
                    <p className="mt-1 mb-4">
                      Get updates on new features and insights so that you can
                      make the best use of Barren.
                    </p>
                  </div>
                  <div className="setting-step pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="setting-title">
                        Receive newsletters from Barren with general and other
                        information
                      </h3>
                      <label className="btn-switch m-0 ml-2">
                        <input type="checkbox" defaultChecked />
                        <span className="checkbox-slider" />
                      </label>
                    </div>
                    <p className="mt-1 mb-4">
                      Get more insights on Barren that can help to boost your
                      event business.
                    </p>
                  </div>
                  <div className="setting-step pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="setting-title">
                        Receive notification when someone follows me
                      </h3>
                      <label className="btn-switch m-0 ml-2">
                        <input type="checkbox" defaultChecked />
                        <span className="checkbox-slider" />
                      </label>
                    </div>
                    <p className="mt-1 mb-4">
                      We will notify you when someone starts following you or
                      your organisation.
                    </p>
                  </div>
                  <div className="setting-step pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="setting-title">
                        Review review notification when someone shares my events
                      </h3>
                      <label className="btn-switch m-0 ml-2">
                        <input type="checkbox" defaultChecked />
                        <span className="checkbox-slider" />
                      </label>
                    </div>
                    <p className="mt-1 mb-0">
                      We will notify you when someone shares event created by
                      your organisation.
                    </p>
                  </div>
                  <div className="setting-step pt-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="setting-title">
                        Receive notification on review related activities
                      </h3>
                      <label className="btn-switch m-0 ml-2">
                        <input type="checkbox" defaultChecked />
                        <span className="checkbox-slider" />
                      </label>
                    </div>
                    <p className="mt-1 mb-0">
                      We will notify you when someone leaves review for your
                      organisation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-02" role="tabpanel">
                <div className="bp-title">
                  <h4>Cài đặt Mật khẩu</h4>
                </div>
                <div className="password-setting p-4">
                  <div className="password-des">
                    <h4>Đổi Mật khẩu</h4>
                    <p>
                      Bạn có thể đổi mật khẩu của mình từ đây. Nếu bạn không nhớ
                      được mật khẩu hiện tại, chỉ cần Đăng xuất và bấm vào Quên
                      mật khẩu.
                    </p>
                  </div>
                  <div className="change-password-form">
                    <form onSubmit={handleChangePassword}>
                      <div className="form-group mt-4">
                        <label className="form-label">Mật khẩu hiện tại*</label>
                        <div className="loc-group position-relative">
                          <input
                            className="form-control h_50"
                            type={passwordVisible.current ? "text" : "password"}
                            placeholder="Nhập Mật khẩu hiện tại"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                          <span
                            className="pass-show-eye"
                            onClick={() => togglePasswordVisibility("current")}
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
                        <label className="form-label">Mật khẩu mới*</label>
                        <div className="loc-group position-relative">
                          <input
                            className="form-control h_50"
                            type={passwordVisible.new ? "text" : "password"}
                            placeholder="Nhập Mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                          <span
                            className="pass-show-eye"
                            onClick={() => togglePasswordVisibility("new")}
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
                            type={passwordVisible.confirm ? "text" : "password"}
                            placeholder="Nhập lại Mật khẩu mới"
                            value={confirmNewPassword}
                            onChange={(e) =>
                              setConfirmNewPassword(e.target.value)
                            }
                            required
                          />
                          <span
                            className="pass-show-eye"
                            onClick={() => togglePasswordVisibility("confirm")}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingTab;
