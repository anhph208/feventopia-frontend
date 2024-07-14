import React, { useState, useEffect } from "react";
import {
  getEventDetailsAPI,
  postPledgeSponsoringAPI,
  getAllSponsorAgreementAPI,
  postSposoringEventAPI,
  getProfileAPI,
} from "../../components/services/userServices";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateTime, PriceFormat } from "../../utils/tools";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";

function EventSponsorship() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sponsorModalIsOpen, setSponsorModalIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [hasPledged, setHasPledged] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const details = await getEventDetailsAPI(eventId);
        setEventDetails(details);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const checkPledgeStatus = async () => {
      try {
        const { sponsorShip } = await getAllSponsorAgreementAPI();
        const existingAgreement = sponsorShip.find(
          (agreement) => agreement.eventId === eventId
        );
        if (existingAgreement) {
          setHasPledged(true);
          setAmount(existingAgreement.pledgeAmount);
        }
      } catch (error) {
        console.error("Error checking pledge status:", error);
      }
    };

    const fetchProfile = async () => {
      try {
        const profile = await getProfileAPI();
        setWalletAmount(profile.creditAmount);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchEventDetails();
    checkPledgeStatus();
    fetchProfile();
  }, [eventId]);

  const handlePledgeSponsor = async () => {
    try {
      const requestBody = {
        eventId: eventId,
        amount: parseInt(amount, 10), // Parse the amount to an integer
      };

      await postPledgeSponsoringAPI(requestBody);
      toast.success("Tạo Cam Kết Tài Trợ Thành Công!");
    } catch (error) {
      console.error("Error pledging sponsorship:", error);
      toast.error("Tạo Cam Kết Tài Trợ thất bại! Hãy thử lại sau.");
    } finally {
      setModalIsOpen(false); // Close the modal
    }
  };

  const handleSponsorEvent = async () => {
    try {
      const requestBody = {
        eventId: eventId,
        amount: parseInt(amount, 10), // Parse the amount to an integer
      };

      await postSposoringEventAPI(requestBody);
      toast.success("Tài Trợ Sự kiện thành công!");
    } catch (error) {
      console.error("Error sponsoring event:", error);
      toast.error("Tài Trợ Sự kiện thất bại! Hãy thử lại sau.");
    } finally {
      setSponsorModalIsOpen(false); // Close the modal
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openSponsorModal = () => {
    setSponsorModalIsOpen(true);
  };

  const closeSponsorModal = () => {
    setSponsorModalIsOpen(false);
  };

  if (loading) return <div>Đang xử</div>;
  if (error) return <div>Error loading event details</div>;
  if (!eventDetails) return <div>No event details found</div>;

  return (
    <div>
      <div className="wrapper">
        <div className="event-dt-block p-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="main-event-dt">
                  <div className="event-img">
                    <img
                      src={
                        eventDetails.banner ||
                        "./assets/images/event-imgs/big-2.jpg"
                      }
                      alt={eventDetails.eventName}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="main-event-content">
                  <div className="event-top-dt">
                    <h3 className="event-main-title">
                      {eventDetails.eventName}
                    </h3>
                  </div>
                  <div
                    className="event-description"
                    dangerouslySetInnerHTML={{
                      __html: eventDetails.eventDescription,
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="event-right-dt">
                  <div className="main-card">
                    <div className="booking-btn mt-4">
                      {hasPledged ? (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={openSponsorModal}
                          sx={{
                            color: "white",
                            backgroundColor: "#450b00",
                            "&:hover": {
                              backgroundColor: "#ff7f50",
                            },
                          }}
                        >
                          Tài Trợ cho Sự kiện này
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={openModal}
                          sx={{
                            color: "white",
                            backgroundColor: "#450b00",
                            "&:hover": {
                              backgroundColor: "#ff7f50",
                            },
                          }}
                        >
                          Tạo Cam kết Tài trợ
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={modalIsOpen} onClose={closeModal}>
        <DialogTitle>Pledge Sponsorship</DialogTitle>
        <DialogContent>
          <p>Vui lòng nhập số tiền bạn muốn cam kết tài trợ sự kiện:</p>
          <TextField
            autoFocus
            margin="dense"
            label="Số Tiền"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {amount && !error && (
            <Typography variant="body2">
              Sô tiền nhập:{" "}
              <PriceFormat price={parseInt(amount, 10)} />
            </Typography>
          )}
          <p>
            Bằng việc cam kết tài trợ, bạn đồng ý hỗ trợ tài chính cho sự kiện
            và tuân thủ các điều khoản và điều kiện do ban tổ chức sự kiện đặt
            ra.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Hủy
          </Button>
          <Button
            onClick={handlePledgeSponsor}
            color="primary"
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Hứa Tài trợ
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={sponsorModalIsOpen} onClose={closeSponsorModal}>
        <DialogTitle>Sponsor Event</DialogTitle>
        <DialogContent>
          <p>
            Bạn sắp tài trợ cho sự kiện này với số tiền đã cam kết là{" "}
            <strong><PriceFormat price={amount}/></strong>.
          </p>
          <TextField
            autoFocus
            margin="dense"
            label="Số Tiền"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {amount && !error && (
            <Typography variant="body2">
              Sô tiền nhập:{" "}
              <PriceFormat price={parseInt(amount, 10)} />
            </Typography>
          )}
          <p>
            Số dư FEventWallet hiện tại của bạn là:{" "}
            <strong>
              <PriceFormat price={walletAmount} />
            </strong>
            .
          </p>
          <p>
            Bằng cách xác nhận tài trợ, bạn đồng ý hỗ trợ tài chính cho sự kiện
            và tuân thủ các điều khoản và điều kiện do ban tổ chức sự kiện đặt
            ra.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSponsorModal} color="secondary">
            Hủy
          </Button>
          <Button
            onClick={handleSponsorEvent}
            color="primary"
            sx={{
              color : "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Xác nhận Tài trợ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventSponsorship;
