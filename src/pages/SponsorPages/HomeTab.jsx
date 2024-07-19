import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfileAPI,
  rechargeAPI,
  getAllProfileTransactionAPI,
  getAllSponsorAgreementAPI,
} from "../../components/services/userServices";
import { toast } from "react-toastify";
import RechargeModal from "../../components/rechargeModal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Stack,
} from "@mui/material";
import { formatDateTime, PriceFormat, rankSub } from "../../utils/tools.js";
import { Cancel, CheckCircle } from "@mui/icons-material";

const HomeTab = ({ initialProfile }) => {
  const [profile, setProfile] = useState(initialProfile || {});
  const [loading, setLoading] = useState(!initialProfile);
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [sponsorAgreements, setSponsorAgreements] = useState([]);
  const [loadingAgreements, setLoadingAgreements] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [agreementPage, setAgreementPage] = useState(1);
  const [totalAgreementPages, setTotalAgreementPages] = useState(1);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialProfile) {
      const fetchProfile = async () => {
        try {
          const profileData = await getProfileAPI(token);
          setProfile(profileData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setLoading(false);
          toast.error("Error fetching profile");
        }
      };

      fetchProfile();
    }
  }, [initialProfile, token]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { transactions, pagination } = await getAllProfileTransactionAPI(
          page,
          10
        ); // Fetch 10 transactions per page
        setTransactions(transactions);
        setTotalPages(pagination.TotalPages);
        setLoadingTransactions(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoadingTransactions(false);
        toast.error("Error fetching transactions");
      }
    };

    fetchTransactions();
  }, [page]);

  useEffect(() => {
    const fetchSponsorAgreements = async () => {
      try {
        const { sponsorShip, pagination } = await getAllSponsorAgreementAPI(
          agreementPage,
          5
        );
        setSponsorAgreements(sponsorShip);
        setTotalAgreementPages(pagination.TotalPages);
        setLoadingAgreements(false);
      } catch (error) {
        console.error("Error fetching sponsor agreements:", error);
        setLoadingAgreements(false);
        toast.error("Error fetching sponsor agreements");
      }
    };

    fetchSponsorAgreements();
  }, [agreementPage]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeAgreementPage = (event, newPage) => {
    setAgreementPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tab-content" id="myTabContent">
      <div
        className="tab-pane fade active show"
        id="feed"
        role="tabpanel"
        aria-labelledby="feed-tab"
      >
        <div className="nav my-event-tabs mt-4" role="tablist">
          <button
            className="event-link active"
            data-bs-toggle="tab"
            data-bs-target="#wallet"
            type="button"
            role="tab"
            aria-controls="wallet"
            aria-selected="true"
          >
            <span>Ví của tôi</span>
          </button>
          <button
            className="event-link"
            data-bs-toggle="tab"
            data-bs-target="#allTransactions"
            type="button"
            role="tab"
            aria-controls="allTransactions"
            aria-selected="false"
          >
            <span>Xem tất cả Giao dịch</span>
          </button>
          <button
            className="event-link"
            data-bs-toggle="tab"
            data-bs-target="#sponsorAgreements"
            type="button"
            role="tab"
            aria-controls="sponsorAgreements"
            aria-selected="false"
          >
            <span>Thỏa thuận tài trợ của tôi</span>
          </button>
        </div>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="wallet"
            role="tabpanel"
          >
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mt-4">
                  <div className="card-top p-4">
                    <div className="card-event-img">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/logo%2Fwallet-logo.png?alt=media&token=4dee7f36-0aff-493b-8fe0-05b43483cb5c"
                        alt="Event"
                      />
                    </div>
                    <div className="card-event-dt">
                      <h5>VÍ CỦA TÔI</h5>
                      <div className="evnt-time">
                        SỐ DƯ VÍ: <PriceFormat price={profile.creditAmount} />
                      </div>
                      <div className="event-btn-group">
                        <button className="esv-btn me-2" onClick={handleShow}>
                          <i className="fa-solid fa-wallet me-2" />
                          Nạp Tiền vào Ví
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-pane fade" id="allTransactions" role="tabpanel">
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mt-4">
                  <div className="card-top p-4">
                    <div className="card-event-dt">
                      <h5>TẤT CẢ GIAO DỊCH</h5>
                      {loadingTransactions ? (
                        <div>Loading transactions...</div>
                      ) : transactions.length > 0 ? (
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 750 }}
                            aria-label="transactions table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>MÃ GD</TableCell>
                                <TableCell>LOẠI GD</TableCell>
                                <TableCell>SỐ TIỀN</TableCell>
                                <TableCell>CHI TIẾT</TableCell>
                                <TableCell>NGÀY THỰC HIỆN</TableCell>
                                <TableCell>TRẠNG THÁI</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                  <TableCell>{transaction.id}</TableCell>
                                  <TableCell>
                                    {transaction.transactionType}
                                  </TableCell>
                                  <TableCell>
                                    <PriceFormat price={transaction.amount} />
                                  </TableCell>
                                  <TableCell>
                                    {transaction.description}
                                  </TableCell>
                                  <TableCell>
                                    {formatDateTime(
                                      transaction.transactionDate
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {transaction.status ? (
                                      <CheckCircle style={{ color: "green" }} />
                                    ) : (
                                      <Cancel style={{ color: "red" }} />
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Stack
                            spacing={2}
                            sx={{ mt: 2 }}
                            className="pagination-controls mt-2 mb-2"
                          >
                            <Pagination
                              count={totalPages}
                              page={page}
                              onChange={handleChangePage}
                              variant="outlined"
                              shape="rounded"
                              sx={{
                                "& .MuiPaginationItem-root": {
                                  color: "white",
                                  backgroundColor: "#450b00",
                                  "&.Mui-selected": {
                                    backgroundColor: "#ff7f50",
                                  },
                                  "&:hover": {
                                    backgroundColor: "#450b00",
                                  },
                                },
                              }}
                            />
                          </Stack>
                        </TableContainer>
                      ) : (
                        <div>Không có giao dịch nào.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="sponsorAgreements"
            role="tabpanel"
          >
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mt-4">
                  <div className="card-top p-4">
                    <div className="card-event-dt">
                      <h5>THỎA THUẬN TÀI TRỢ CỦA TÔI</h5>
                      {loadingAgreements ? (
                        <div>Loading agreements...</div>
                      ) : sponsorAgreements.length > 0 ? (
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 750 }}
                            aria-label="agreements table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>MÃ THỎA THUẬN</TableCell>
                                <TableCell>TÊN SỰ KIỆN</TableCell>
                                <TableCell>HẠNG</TableCell>
                                <TableCell>SỐ TIỀN CAM KẾT</TableCell>
                                <TableCell>SỐ TIỀN THỰC TẾ</TableCell>
                                <TableCell>TRẠNG THÁI</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {sponsorAgreements.map((agreement) => (
                                <TableRow key={agreement.id}>
                                  <TableCell>{agreement.id}</TableCell>
                                  <TableCell>{agreement.event.eventName}</TableCell>
                                  <TableCell>{rankSub(agreement.rank)}</TableCell>
                                  <TableCell>
                                    <PriceFormat price={agreement.pledgeAmount} />
                                  </TableCell>
                                  <TableCell>
                                    <PriceFormat price={agreement.actualAmount} />
                                  </TableCell>
                                  <TableCell>{agreement.status}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Stack
                            spacing={2}
                            sx={{ mt: 2 }}
                            className="pagination-controls mt-2 mb-2"
                          >
                            <Pagination
                              count={totalAgreementPages}
                              page={agreementPage}
                              onChange={handleChangeAgreementPage}
                              variant="outlined"
                              shape="rounded"
                              sx={{
                                "& .MuiPaginationItem-root": {
                                  color: "white",
                                  backgroundColor: "#450b00",
                                  "&.Mui-selected": {
                                    backgroundColor: "#ff7f50",
                                  },
                                  "&:hover": {
                                    backgroundColor: "#450b00",
                                  },
                                },
                              }}
                            />
                          </Stack>
                        </TableContainer>
                      ) : (
                        <div>Không có thỏa thuận tài trợ nào.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RechargeModal
        show={showModal}
        handleClose={handleClose}
        handleRecharge={handleRecharge}
      />
    </div>
  );
};

export default HomeTab;
