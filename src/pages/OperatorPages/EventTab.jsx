<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {
  getAllEventForOtherAPI,
  getEventDetailsAPI,
  getEventAnalysisAPI,
  putEventNextPhaseAPI,
} from "../../components/services/userServices";
import { formatDateTime, PriceFormat } from "../../utils/tools"; // Assuming you have a formatDateTime utility

const EventTab = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const fetchEvents = async (page, category) => {
    setLoading(true);
    try {
      const response = await getAllEventForOtherAPI(page, 8, category);
      const { events, pagination } = response;

      const eventDetailsPromises = events.map((event) =>
        getEventDetailsAPI(event.id)
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
          analysis: eventsWithAnalysis[index], // Add the analysis data here
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
    fetchEvents(pageNumber, category);
  }, [pageNumber, category]);

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPageNumber(1); // Reset to first page when changing category
  };

  const handleUpdateNextPhaseClick = (eventId) => {
    setSelectedEventId(eventId);
    setOpen(true);
  };

  const handleConfirmUpdateNextPhase = async () => {
    try {
      await putEventNextPhaseAPI(selectedEventId);
      setOpen(false);
      fetchEvents(pageNumber, category); // Refresh the events
    } catch (error) {
      console.error("Error updating event to the next phase:", error);
      // Handle the error (e.g., show a notification or alert)
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredEvents = category
    ? events.filter((event) => event.category === category)
    : events;

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
              <div className="main-card mt-5">
                <div className="dashboard-wrap-content p-4">
                  <h5 className="mb-4">Events ({filteredEvents.length})</h5>
                  <div className="d-md-flex flex-wrap align-items-center">
                    <div className="dashboard-date-wrap">
                      <div className="form-group">
                        <div className="relative-input position-relative">
                          <input
                            className="form-control h_40"
                            type="text"
                            placeholder="Search by event name, status"
                          />
                          <i className="uil uil-search" />
                        </div>
                      </div>
                    </div>
                    <div className="rs ms-auto mt_r4">
                      <div
                        className="nav custom2-tabs btn-group"
                        role="tablist"
                      >
                        <button
                          className={`tab-link ${
                            category === null ? "active" : ""
                          }`}
                          onClick={() => handleCategoryChange(null)}
                        >
                          Tất cả Sự kiện
                        </button>
                        <button
                          className={`tab-link ${
                            category === "TALKSHOW" ? "active" : ""
                          }`}
                          onClick={() => handleCategoryChange("TALKSHOW")}
                        >
                          Talkshow
                        </button>
                        <button
                          className={`tab-link ${
                            category === "COMPETITION" ? "active" : ""
                          }`}
                          onClick={() => handleCategoryChange("COMPETITION")}
                        >
                          Competition
                        </button>
                        <button
                          className={`tab-link ${
                            category === "FESTIVAL" ? "active" : ""
                          }`}
                          onClick={() => handleCategoryChange("FESTIVAL")}
                        >
                          Festival
                        </button>
                        <button
                          className={`tab-link ${
                            category === "MUSICSHOW" ? "active" : ""
                          }`}
                          onClick={() => handleCategoryChange("MUSICSHOW")}
                        >
                          Music Show
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="event-list">
                <div className="tab-content">
                  {filteredEvents.map((event) => (
                    <div className="main-card mt-4" key={event.id}>
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
                              <h5>{event.eventName}</h5>
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
                              {event.status === "INITIAL" && (
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    handleUpdateNextPhaseClick(event.id)
                                  }
                                >
                                  <i className="fa-solid fa-gear me-3" />
                                  Cập Nhật Trạng thái Sự kiện
                                </button>
                              )}
                              {event.status === "INITIAL" && (
                                <Link
                                  to={`/update-event/${event.id}`}
                                  className="dropdown-item"
                                >
                                  <i className="fa-solid fa-eye me-3" />
                                  Cập nhật Sự kiện
                                </Link>
                              )}
                              <Link
                                to={`/edit-eventdetails/${event.id}`}
                                className="dropdown-item"
                              >
                                <i className="fa-solid fa-clone me-3" />
                                Xem Chi Tiết
                              </Link>
                              <a
                                href="#"
                                className="dropdown-item delete-event"
                              >
                                <i className="fa-solid fa-trash-can me-3" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="bottom d-flex flex-wrap justify-content-between align-items-center p-4">
                          <div className="icon-box">
                            <span className="icon">
                              <i className="fa-solid fa-location-dot" />
                            </span>
                            <p>Trạng thái</p>
                            <h6 className="coupon-status">{event.status}</h6>
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
                  {loading && <div>Loading...</div>}
                  {filteredEvents.length === 0 && !loading && (
                    <div>No events found.</div>
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
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Xác nhận cập nhật trạng thái sự kiện
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn cập nhật trạng thái sự kiện này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button
            onClick={handleConfirmUpdateNextPhase}
            color="primary"
            autoFocus
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
=======
import React from 'react';

const EventTab = () => {
  return (
    <div>
      <h3><i className="fa-solid fa-calendar-days me-3"></i>Event</h3>
      {/* Add your Event content here */}
>>>>>>> 5150c864576aa68fd757bf9d8e2d64a8b1ca23d3
    </div>
  );
};

export default EventTab;
