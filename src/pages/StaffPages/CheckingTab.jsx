import React, { useState, useEffect } from "react";
import {
  getAllEventForVisitorAPI,
  getEventDetailsAPI,
  checkinEventAPI,
} from "../../components/services/userServices";
import {
  Pagination,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { formatDateTime } from "../../utils/tools";
import { toast } from "react-toastify";
import QrScanner from "react-qr-scanner";

function CheckingTab() {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [checkinEvent, setCheckinEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const fetchEvents = async (page = 1, category = null, status = null) => {
    try {
      setLoading(true);
      const result = await getAllEventForVisitorAPI(page, 5, category, status);
      const eventsWithDetails = await Promise.all(
        result.events.map(async (event) => {
          const details = await getEventDetailsAPI(event.id);
          return { ...event, eventDetails: details.eventDetail };
        })
      );
      setEvents(eventsWithDetails);
      setPagination(result.pagination);
    } catch (error) {
      setError(error);
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
    const interval = setInterval(() => {
      setEvents((prevEvents) => [...prevEvents]); // Force re-render
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCheckinClick = (eventId, eventDetailId) => {
    const selectedEvent = events.find((event) => event.id === eventId);

    if (!selectedEvent) {
      console.error("Không tìm thấy sự kiện.");
      return;
    }

    const selectedEventDetail = selectedEvent.eventDetails.find(
      (eventDetail) => eventDetail.id === eventDetailId
    );

    if (!selectedEventDetail) {
      console.error("Event detail not found.");
      return;
    }

    const selectedEventData = {
      eventId: selectedEventDetail.id,
      eventName: selectedEvent.eventName,
      startDate: selectedEventDetail.startDate,
      endDate: selectedEventDetail.endDate,
      location: selectedEventDetail.location.locationName,
      eventBanner: selectedEvent.banner,
    };

    setCheckinEvent(selectedEventData);
    setIsDialogOpen(true);
  };

  const handleCheckinConfirm = async () => {
    if (!ticketId) {
      toast.error("Please enter a ticket ID.");
      return;
    }

    try {
      setLoading(true);
      await checkinEventAPI(ticketId, checkinEvent.eventId);
      toast.success("VÉ ĐÃ CHECK-IN THÀNH CÔNG!");
      setIsDialogOpen(false);
      setTicketId("");
    } catch (error) {
      console.error("Check-in failed:", error);
      toast.error("VÉ CHECK-IN THẤT BẠI! VUI LÒNG THỬ LẠI!");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTicketId("");
  };

  const handleScan = (data) => {
    if (data) {
      setTicketId(data.text); // Extracting text property
      toast.success("QR Code quét thành công!");
    }
  };

  const handleError = (err) => {
    console.error("Lỗi quét QR code:", err);
    toast.error("Error scanning QR code.");
  };

  const isEventActive = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return now >= start && now <= end;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading events: {error.message}</div>;

  return (
    <div
      className="tab-pane fade show active"
      id="orders"
      role="tabpanel"
      aria-labelledby="orders-tab"
    >
      <style>
        {`
          .active-event {
            background-color: #ff7f50 !important;
            color: white !important;
            cursor: pointer;
          }
          .inactive-event {
            background-color: #cccccc !important;
            color: #666666 !important;
            cursor: not-allowed;
          }
        `}
      </style>
      {events.length > 0 ? (
        <>
          {events.map((event) => (
            <div className="main-card mt-4" key={event.id}>
              <div className="card-top p-4">
                <div className="card-event-img">
                  <img src={event.banner} alt={event.eventName} />
                </div>
                <div className="card-event-dt">
                  <h5>{event.eventName}</h5>
                </div>
              </div>
              {event.eventDetails.map((detail) => (
                <div className="card-bottom" key={detail.id}>
                  <div className="card-bottom-item">
                    <div className="card-icon">
                      <i className="fa-solid fa-calendar-days" />
                    </div>
                    <div className="card-dt-text">
                      <h6>Sự kiện bắt đầu</h6>
                      <span>{formatDateTime(detail.startDate)}</span>
                    </div>
                  </div>
                  <div className="card-bottom-item">
                    <div className="card-icon">
                      <i className="fa-solid fa-clock" />
                    </div>
                    <div className="card-dt-text">
                      <h6>Sự kiện kết thúc</h6>
                      <span>{formatDateTime(detail.endDate)}</span>
                    </div>
                  </div>
                  <div className="card-bottom-item">
                    <div className="card-icon">
                      <i className="fa-solid fa-location-dot" />
                    </div>
                    <div className="card-dt-text">
                      <h6>Địa Điểm</h6>
                      <span>{detail.location.locationName}</span>
                    </div>
                  </div>
                  <div className="card-bottom-item">
                    <button
                      className={`main-btn btn-hover ${
                        isEventActive(detail.startDate, detail.endDate)
                          ? "active-event"
                          : "inactive-event"
                      }`}
                      onClick={() => {
                        if (isEventActive(detail.startDate, detail.endDate)) {
                          handleCheckinClick(event.id, detail.id);
                        }
                      }}
                      disabled={
                        !isEventActive(detail.startDate, detail.endDate)
                      }
                    >
                      Check in
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <Stack
            spacing={2}
            sx={{ mt: 2 }}
            className="pagination-controls mt-3 mb-2"
          >
            <Pagination
              count={pagination.TotalPages}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
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
        </>
      ) : (
        <div>No events available</div>
      )}

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Check-in Sự kiện</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="MÃ VÉ CHECK-IN"
            type="text"
            fullWidth
            value={ticketId}
            onChange={(event) => setTicketId(event.target.value)}
          />
          <div style={{ marginTop: "10px" }}>
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              mt: 3,
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleCheckinConfirm}
            color="primary"
            sx={{
              mt: 3,
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Check-In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CheckingTab;
