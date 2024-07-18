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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  getAllEventForOtherAPI,
  getSponsoredCurrentEventAPI,
  getAccountById,
} from "../../components/services/userServices";
import {
  formatDateTime,
  PriceFormat,
  rankSub,
  StatusSub,
} from "../../utils/tools";

const SponsorTab = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventPageNumber, setEventPageNumber] = useState(1);
  const [eventTotalPages, setEventTotalPages] = useState(1);
  const [sponsorPageNumber, setSponsorPageNumber] = useState(1);
  const [sponsorTotalPages, setSponsorTotalPages] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const fetchEvents = async (page) => {
    setLoading(true);
    try {
      const response = await getAllEventForOtherAPI(page, 8, null, null); // Assuming 8 items per page
      const { events, pagination } = response;
      setEvents(events);
      setEventTotalPages(pagination.TotalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error);
      setLoading(false);
    }
  };

  const fetchSponsors = async (eventId, page) => {
    setLoading(true);
    try {
      const response = await getSponsoredCurrentEventAPI(eventId, page, 5); // Assuming 5 items per page
      const { data, pagination } = response;

      const sponsorDetailsPromises = data.map((sponsor) =>
        getAccountById(sponsor.sponsorId)
      );

      const sponsorsDetails = await Promise.all(sponsorDetailsPromises);

      const sponsorsWithDetails = data.map((sponsor, idx) => ({
        ...sponsor,
        sponsorDetails: sponsorsDetails[idx],
      }));

      setSponsors(sponsorsWithDetails);
      setSponsorTotalPages(pagination.TotalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(eventPageNumber);
  }, [eventPageNumber]);

  const handleEventSelection = (eventId) => {
    setSelectedEvent(eventId);
    setDialogOpen(true);
    fetchSponsors(eventId, 1); // Fetch sponsors for the selected event
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
    setSponsors([]);
    setSponsorPageNumber(1); // Reset sponsor page number when dialog is closed
  };

  const handleEventPageChange = (event, value) => {
    setEventPageNumber(value);
  };

  const handleSponsorPageChange = (event, value) => {
    setSponsorPageNumber(value);
    fetchSponsors(selectedEvent, value); // Fetch sponsors for the selected event and new page
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <div className="wrapper wrapper-body">
      <div className="dashboard-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="d-main-title">
                <h3>
                  <i className="fa-solid fa-handshake me-3" />
                  Nhà Tài trợ
                </h3>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main-card">
                <div className="dashboard-wrap-content p-4">
                  <h5 className="mb-4">Tổng quan Tài trợ sự kiện</h5>
                  <div className="event-list">
                    <div className="tab-content">
                      {events.map((event) => (
                        <div
                          key={event.id}
                          className="main-card mt-4"
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
                                  <h5>{event.eventName}</h5>
                                  <h6>{StatusSub(event.status)}</h6>
                                </div>
                              </div>
                              <Button
                                variant="contained"
                                onClick={() => handleEventSelection(event.id)}
                                sx={{
                                  color: "white",
                                  backgroundColor: "#450b00",
                                  "&:hover": {
                                    backgroundColor: "#ff7f50",
                                  },
                                }}
                              >
                                Xem thông tin tài trợ
                              </Button>
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
              </div>
            </div>
            <Stack spacing={2} className="pagination-controls mt-5">
              <Pagination
                count={eventTotalPages}
                page={eventPageNumber}
                onChange={handleEventPageChange}
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
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Sponsors for{" "}
          {events.find((event) => event.id === selectedEvent)?.eventName}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="sponsors table">
              <TableHead>
                <TableRow>
                  <TableCell>Tên Nhà tài trợ</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Cam kết tài trợ</TableCell>
                  <TableCell>Số tiền đã tài trợ</TableCell>
                  <TableCell>Hạng Tài trợ</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sponsors.map((sponsor) => (
                  <TableRow key={sponsor.id}>
                    <TableCell>{sponsor.sponsorDetails.name}</TableCell>
                    <TableCell>
                      {sponsor.sponsorDetails.email || "N/A"}
                    </TableCell>
                    <TableCell>
                      <PriceFormat price={sponsor.pledgeAmount} />
                    </TableCell>
                    <TableCell>
                      <PriceFormat price={sponsor.actualAmount} />
                    </TableCell>
                    <TableCell>{rankSub(sponsor.rank)}</TableCell>
                    <TableCell>{sponsor.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} className="pagination-controls mt-2">
            <Pagination
              count={sponsorTotalPages}
              page={sponsorPageNumber}
              onChange={handleSponsorPageChange}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "black",
                  backgroundColor: "white",
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SponsorTab;
