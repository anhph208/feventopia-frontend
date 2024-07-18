import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import {
  getAllEventForOtherAPI,
  getEventByIdOperatorAPI,
  deleteEventAPI,
  getEventAnalysisAPI,
} from "../../components/services/userServices";
import { formatDateTime, PriceFormat, StatusSub } from "../../utils/tools";
import { toast } from "react-toastify";

const AdminEventTab = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const fetchEvents = async (page, category, status) => {
    setLoading(true);
    try {
      const response = await getAllEventForOtherAPI(page, 8, category, status);
      const { events, pagination } = response;

      const eventDetailsPromises = events.map((event) =>
        getEventByIdOperatorAPI(event.id)
      );
      const eventsWithDetails = await Promise.all(eventDetailsPromises);

      const eventAnalysisPromises = eventsWithDetails.map((eventDetails) =>
        getEventAnalysisAPI(eventDetails.id)
      );
      const eventsWithAnalysis = await Promise.all(eventAnalysisPromises);

      const processedEvents = eventsWithDetails.map((eventDetails, index) => {
        const earliestStartDate =
          eventDetails.eventDetail.length > 0
            ? eventDetails.eventDetail.reduce((earliest, current) =>
                new Date(current.startDate) < new Date(earliest.startDate)
                  ? current
                  : earliest
              ).startDate
            : null;

        const smallestPrice =
          eventDetails.eventDetail.length > 0
            ? Math.min(
                ...eventDetails.eventDetail.map((detail) => detail.ticketPrice)
              )
            : null;

        return {
          ...eventDetails,
          earliestStartDate,
          smallestPrice,
          analysis: eventsWithAnalysis[index],
          status: events[index].status,
        };
      });

      setEvents(processedEvents);
      setTotalPages(pagination.TotalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(pageNumber, category, status);
  }, [pageNumber, category, status]);

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPageNumber(1);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPageNumber(1);
  };

  const handleDeleteClick = (eventId) => {
    setEventToDelete(eventId);
    setDeleteOpen(true);
  };

  const handleConfirmCancellation = async () => {
    try {
      await deleteEventAPI(eventToDelete);
      setDeleteOpen(false);
      toast.success("Xóa Sự kiện thành công!");
      setEventToDelete(null);
      fetchEvents(pageNumber, category, status);
    } catch (error) {
      toast.error("Xóa Sự kiện thất bại! Thử lại sau.");
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="wrapper wrapper-body">
      <div className="dashboard-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="d-main-title">
                <h3>
                  <i className="fa-solid fa-calendar-days me-3" />
                  Sự Kiện
                </h3>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main-card">
                <div className="dashboard-wrap-content p-4">
                  <h5 className="mb-4">Danh mục Sự kiện</h5>
                  <div className="rs ms-auto mt_r4 mb-4">
                    <div className="nav custom2-tabs btn-group" role="tablist">
                      <button
                        className={`tab-link ${
                          category === null ? "active" : ""
                        }`}
                        onClick={() => handleCategoryChange(null)}
                      >
                        Tất cả
                      </button>
                      <button
                        className={`tab-link ${
                          category === "TALKSHOW" ? "active" : ""
                        }`}
                        onClick={() => handleCategoryChange("TALKSHOW")}
                      >
                        TALKSHOW
                      </button>
                      <button
                        className={`tab-link ${
                          category === "COMPETITION" ? "active" : ""
                        }`}
                        onClick={() => handleCategoryChange("COMPETITION")}
                      >
                        CUỘC THI
                      </button>
                      <button
                        className={`tab-link ${
                          category === "FESTIVAL" ? "active" : ""
                        }`}
                        onClick={() => handleCategoryChange("FESTIVAL")}
                      >
                        FESTIVAL
                      </button>
                      <button
                        className={`tab-link ${
                          category === "MUSICSHOW" ? "active" : ""
                        }`}
                        onClick={() => handleCategoryChange("MUSICSHOW")}
                      >
                        ÂM NHẠC
                      </button>
                    </div>
                  </div>
                  <h5 className="mb-4">Trạng thái Sự kiện</h5>
                  <div className="nav custom2-tabs btn-group" role="tablist">
                    <button
                      className={`tab-link ${status === null ? "active" : ""}`}
                      onClick={() => handleStatusChange(null)}
                    >
                      Tất cả
                    </button>
                    <button
                      className={`tab-link ${
                        status === "INITIAL" ? "active" : ""
                      }`}
                      onClick={() => handleStatusChange("INITIAL")}
                    >
                      KHỞI ĐỘNG
                    </button>
                    <button
                      className={`tab-link ${
                        status === "FUNDRAISING" ? "active" : ""
                      }`}
                      onClick={() => handleStatusChange("FUNDRAISING")}
                    >
                      GỌI TÀI TRỢ
                    </button>
                    <button
                      className={`tab-link ${
                        status === "PREPARATION" ? "active" : ""
                      }`}
                      onClick={() => handleStatusChange("PREPARATION")}
                    >
                      CHUẨN BỊ
                    </button>
                    <button
                      className={`tab-link ${
                        status === "EXECUTE" ? "active" : ""
                      }`}
                      onClick={() => handleStatusChange("EXECUTE")}
                    >
                      TRIỂN KHAI
                    </button>
                    <button
                      className={`tab-link ${
                        status === "POST" ? "active" : ""
                      }`}
                      onClick={() => handleStatusChange("POST")}
                    >
                      HOÀN THÀNH
                    </button>
                    <button
                      className={`tab-link ${
                        status === "CANCELED" ? "active" : ""
                      }`}
                      onClick={() => handleStatusChange("CANCELED")}
                    >
                      ĐÃ HỦY
                    </button>
                  </div>
                </div>
              </div>
              <div className="event-list">
                <div className="tab-content">
                  {events.map((event) => (
                    <div
                      className="main-card mt-4"
                      key={event.id}
                      style={{
                        backgroundColor:
                          event.status === "CANCELED"
                            ? "#9CAFAA"
                            : event.status === "POST"
                            ? "#BFEA7C"
                            : "white",
                      }}
                    >
                      <div className="contact-list">
                        <div className="card-top event-top p-4 align-items-center top d-md-flex flex-wrap justify-content-between">
                          <div className="d-md-flex align-items-center event-top-info">
                            <div className="card-event-img">
                              <img
                                src={
                                  event.banner ||
                                  "./assets/images/event-imgs/big-2.jpg"
                                }
                                alt={event.eventName}
                              />
                            </div>
                            <div className="card-event-dt">
                              <Link to={`/edit-eventdetails/${event.id}`}>
                                <h5>{event.eventName}</h5>
                              </Link>
                              <h6>
                                <PriceFormat price={event.smallestPrice} />
                              </h6>
                              <h6>{formatDateTime(event.earliestStartDate)}</h6>
                            </div>
                          </div>
                          <div className="dropdown">
                            <button
                              className="option-btn"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="fa-solid fa-ellipsis-vertical" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              {(event.status === "INITIAL" ||
                                event.status === "FUNDRAISING" ||
                                event.status === "PREPARATION") && (
                                <Link
                                  to={`/update-event/${event.id}`}
                                  className="dropdown-item"
                                >
                                  <i className="fa-solid fa-eye me-3" />
                                  Cập nhật Sự kiện tổng
                                </Link>
                              )}
                              <Link
                                to={`/edit-eventdetails/${event.id}`}
                                className="dropdown-item"
                              >
                                <i className="fa-solid fa-clone me-3" />
                                Xem Chi Tiết
                              </Link>
                              <button
                                className="dropdown-item delete-event"
                                onClick={() => handleDeleteClick(event.id)}
                              >
                                <i className="fa-solid fa-trash-can me-3" />
                                Xóa Sự kiện
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="bottom d-flex flex-wrap justify-content-between align-items-center p-4">
                          <div className="icon-box">
                            <span className="icon">
                              <i className="fa-solid fa-location-dot" />
                            </span>
                            <p>Trạng thái</p>
                            <h6 className="coupon-status">
                              {StatusSub(event.status)}
                            </h6>
                          </div>
                          {event.analysis && (
                            <>
                              <div className="icon-box">
                                <span className="icon">
                                  <i className="fa-solid fa-dollar-sign" />
                                </span>
                                <p>Vốn Sự kiện</p>
                                <h6 className="coupon-status">
                                  <PriceFormat
                                    price={event.analysis.initialCapital}
                                  />
                                </h6>
                              </div>
                              <div className="icon-box">
                                <span className="icon">
                                  <i className="fa-solid fa-ticket" />
                                </span>
                                <p>Vé đã bán</p>
                                <h6 className="coupon-status">
                                  {event.analysis.numTicketSold}
                                </h6>
                              </div>
                              <div className="icon-box">
                                <span className="icon">
                                  <i className="fa-solid fa-tag" />
                                </span>
                                <p>Vé đã check-in</p>
                                <h6 className="coupon-status">
                                  {event.analysis.numTicketCheckedIn}
                                </h6>
                              </div>
                              <div className="icon-box">
                                <span className="icon">
                                  <i className="fa-solid fa-dollar-sign" />
                                </span>
                                <p>Dòng tiền Bán Vé</p>
                                <h6 className="coupon-status">
                                  <PriceFormat
                                    price={event.analysis.ticketIncome}
                                  />
                                </h6>
                              </div>
                              <div className="icon-box">
                                <span className="icon">
                                  <i className="fa-solid fa-dollar-sign" />
                                </span>
                                <p>Dòng tiền Gian hàng</p>
                                <h6 className="coupon-status">
                                  <PriceFormat
                                    price={event.analysis.stallIncome}
                                  />
                                </h6>
                              </div>
                              <div className="icon-box">
                                <span className="icon">
                                  <i className="fa-solid fa-dollar-sign" />
                                </span>
                                <p>Dòng tiền Tài trợ</p>
                                <h6 className="coupon-status">
                                  <PriceFormat
                                    price={event.analysis.sponsorCaptital}
                                  />
                                </h6>
                              </div>
                              <div className="icon-box">
                                <span className="icon">
                                  <i className="fa-solid fa-store" />
                                </span>
                                <p>Gian hàng đã bán</p>
                                <h6 className="coupon-status">
                                  {event.analysis.numStallSold}
                                </h6>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && <div>Đang xử lí...</div>}
                  {events.length === 0 && !loading && (
                    <div>Không tìm thấy thông tin.</div>
                  )}
                </div>
              </div>
            </div>
            <Stack spacing={2} className="pagination-controls mt-5">
              <Pagination
                count={totalPages}
                page={pageNumber}
                onChange={handlePageChange}
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
            {error && <div>Error: {error.message}</div>}
          </div>
        </div>
      </div>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận Xóa sự kiện</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-title">
            Bạn có chắc chắn muốn xóa sự kiện này?
          </DialogContentText>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                color="primary"
              />
            }
            label="Tôi đồng ý xóa Sự kiện này"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            disabled={!termsAccepted}
            sx={{
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
            onClick={handleConfirmCancellation}
          >
            Xác nhận
          </Button>
          <Button
            variant="outlined"
            onClick={() => setDeleteOpen(false)}
            sx={{
              borderColor: "#450b00",
              color: "#450b00",
              "&:hover": {
                borderColor: "#ff7f50",
                color: "#ff7f50",
              },
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminEventTab;
