import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileAPI, rechargeAPI } from "../../components/services/userServices";
import { toast } from "react-toastify";
import RechargeModal from "./rechargeModal";

const HomeTab = ({ initialProfile }) => {
  const [profile, setProfile] = useState(initialProfile || {});
  const [loading, setLoading] = useState(!initialProfile);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialProfile) {
      const fetchProfile = async () => {
        try {
          const profileData = await getProfileAPI(token);
          setProfile(profileData);
          setLoading(false);
          toast.success("Profile loaded successfully");
        } catch (error) {
          console.error("Error fetching profile:", error);
          setLoading(false);
          toast.error("Error fetching profile");
        }
      };

      fetchProfile();
    }
  }, [initialProfile, token]);

  const handleWithdraw = () => {
    alert("Withdraw functionality to be implemented");
    toast.success("Withdraw request initiated");
  };

  const handleRecharge = async (amount) => {
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    try {
      const response = await rechargeAPI({ amount }, token);

      if (response.data) {
        // Redirect to the URL provided in the API response
        window.location.href = response.data;
        toast.success("Redirecting to payment...");
      } else {
        toast.error("Unexpected response from the server");
      }
    } catch (error) {
      console.error("Error during recharge:", error);
      toast.error("Error during recharge");
    } finally {
      handleClose(); // Close modal after handling recharge
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tab-content" id="myTabContent">
      <div className="tab-pane fade active show" id="feed" role="tabpanel" aria-labelledby="feed-tab">
        <div className="nav my-event-tabs mt-4" role="tablist">
          <button className="event-link active" data-bs-toggle="tab" data-bs-target="#wallet" type="button" role="tab" aria-controls="wallet" aria-selected="true">
            <span>Ví của tôi</span>
          </button>
          <button className="event-link" data-bs-toggle="tab" data-bs-target="#allTransactions" type="button" role="tab" aria-controls="feedback" aria-selected="false">
            <span>Xem tất cả Giao dịch</span>
          </button>
          <button className="event-link" data-bs-toggle="tab" data-bs-target="#feedback" type="button" role="tab" aria-controls="feedback" aria-selected="false">
            <span>Xem đánh giá sự kiện đã tham gia</span>
          </button>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="wallet" role="tabpanel">
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mt-4">
                  <div className="card-top p-4">
                    <div className="card-event-img">
                      <img src="https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/logo%2Fwallet-logo.png?alt=media&token=4dee7f36-0aff-493b-8fe0-05b43483cb5c" alt="Event" />
                    </div>
                    <div className="card-event-dt">
                      <h5>My Wallet</h5>
                      <div className="evnt-time">
                        Credit Amount: ${profile.creditAmount}
                      </div>
                      <div className="event-btn-group">
                        <button className="esv-btn me-2" onClick={handleShow}>
                          <i className="fa-solid fa-wallet me-2" />
                          Recharge
                        </button>
                        <button className="esv-btn me-2" onClick={handleWithdraw}>
                          <i className="fa-solid fa-arrow-up-from-bracket me-2" />
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-pane fade" id="feedback" role="tabpanel">
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mt-4">
                  <div className="card-top p-4">
                    <div className="card-event-img">
                      <img src="./assets/images/event-imgs/img-6.jpg" alt="Event" />
                    </div>
                    <div className="card-event-dt">
                      <h5>Step Up Open Mic Show</h5>
                      <div className="evnt-time">Thu, Jun 30, 2022 4:30 AM</div>
                      <div className="event-btn-group">
                        <button className="esv-btn me-2" onClick={() => (window.location.href = "feedback_detail.html")}>
                          <i className="fa-solid fa-comments me-2" />
                          View Feedback
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
      <RechargeModal show={showModal} handleClose={handleClose} handleRecharge={handleRecharge} />
    </div>
  );
};

export default HomeTab;
