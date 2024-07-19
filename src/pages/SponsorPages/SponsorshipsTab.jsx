import React, { useState, useEffect } from "react";
import {
  getSponsoredEventByUserAPI,
  getEventDetailsAPI,
} from "../../components/services/userServices"; // Import the API service
import { toast } from "react-toastify";
import { Button, Pagination, Stack } from "@mui/material";
import { formatDateTime, PriceFormat, StatusSub } from "../../utils/tools";
import { useNavigate } from "react-router-dom";

const SponsoredEvent = () => {
  const [sponsoredEvents, setSponsoredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSponsoredEvents = async () => {
      try {
        setLoading(true);

        const response = await getSponsoredEventByUserAPI(page, 5); // Fetch 5 events per page

        if (response && response.data && response.pagination) {
          const { data, pagination } = response;

          // Handle cases where event details are already included in the initial response
          const eventDetailsPromises = data.map((sponsoredEvent) => {
            if (sponsoredEvent.event) {
              return Promise.resolve(sponsoredEvent.event); // Event details already present
            }
            return getEventDetailsAPI(sponsoredEvent.eventID).catch((error) => {
              if (error.response && error.response.status === 204) {
                return null; // No content, handle gracefully
              }
              throw error; // Rethrow other errors
            });
          });

          const eventDetails = await Promise.all(eventDetailsPromises);

          // Combine the event details with the sponsored event data, filtering out nulls
          const combinedData = data
            .map((sponsoredEvent, index) => ({
              ...sponsoredEvent,
              event: eventDetails[index] || sponsoredEvent.event,
            }))
            .filter((event) => event.event !== null);

          // Group by event and aggregate sponsorships
          const groupedEvents = combinedData.reduce((acc, sponsoredEvent) => {
            const { event, transaction } = sponsoredEvent;
            if (!acc[event.id]) {
              acc[event.id] = {
                event,
                totalSponsorship: 0,
                transactions: [],
              };
            }
            acc[event.id].totalSponsorship += transaction.amount;
            acc[event.id].transactions.push(transaction);
            return acc;
          }, {});

          const eventsArray = Object.values(groupedEvents);
          setSponsoredEvents(eventsArray);
          setTotalPages(pagination.TotalPages);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching sponsored events:", error);
        toast.error("Error fetching sponsored events");
      } finally {
        setLoading(false);
      }
    };

    fetchSponsoredEvents();
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleViewInvoice = (eventId) => {
    navigate(`/analysis/${eventId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="tab-pane fade show active"
      id="sponsoredEvents"
      role="tabpanel"
      aria-labelledby="sponsoredEvents-tab"
    >
      {sponsoredEvents.length > 0 ? (
        <>
          {sponsoredEvents.map((sponsoredEvent) => (
            <div className="main-card mt-4" key={sponsoredEvent.event.id}>
              <div className="card-top p-4">
                <div className="card-event-img">
                  <img
                    src={
                      sponsoredEvent.event.banner ||
                      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/avatars%2FproBanner.jpg?alt=media&token=6bf520da-4091-4615-a193-6bb8fbfb490b"
                    }
                    alt="Event"
                  />
                </div>
                <div className="card-event-dt">
                  <h5>{sponsoredEvent.event.eventName}</h5>
                  <div className="invoice-id">
                    <strong>Tổng Số Tiền Tài Trợ:{" "}
                    <span>
                      <PriceFormat price={sponsoredEvent.totalSponsorship} />
                    </span>
                    </strong>
                  </div>
                  <div className="invoice-id">
                    Số lượng giao dịch:{" "}
                    <span>{sponsoredEvent.transactions.length}</span>
                  </div>
                </div>
              </div>
              <div className="card-bottom">
                <div className="card-bottom-item">
                  <div className="card-icon">
                    <i className="fa-solid fa-calendar-days" />
                  </div>
                  <div className="card-dt-text">
                    <h6>Loại sự kiện</h6>
                    <span>{sponsoredEvent.event.category}</span>
                  </div>
                </div>
                <div className="card-bottom-item">
                  <div className="card-icon">
                    <i className="fa-solid fa-info-circle" />
                  </div>
                  <div className="card-dt-text">
                    <h6>Trạng thái sự kiện</h6>
                    <span>{StatusSub(sponsoredEvent.event.status)}</span>
                  </div>
                </div>
                <div className="card-bottom-item">
                  <Button
                    className="btn btn-primary"
                    onClick={() => handleViewInvoice(sponsoredEvent.event.id)}
                    sx={{
                      color: "white",
                      backgroundColor: "#450b00",
                      "&:hover": {
                        backgroundColor: "#ff7f50",
                      },
                    }}
                  >
                    Xem Thống kê Sự kiện
                  </Button>
                </div>
              </div>
              <div className="card-bottom">
                {sponsoredEvent.transactions.map((transaction, index) => (
                  <div className="card-bottom-item" key={index}>
                    <div className="card-icon">
                      <i className="fa-solid fa-money-bill" />
                    </div>
                    <div className="card-dt-text">
                      <h6>Số tiền tài trợ</h6>
                      <span>
                        <PriceFormat price={transaction.amount} />
                      </span>
                      <div>
                        <span>
                          {formatDateTime(transaction.transactionDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Stack
            spacing={2}
            sx={{ mt: 2 }}
            className="pagination-controls mt-3 mb-2"
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
        </>
      ) : (
        <div>Không có sự kiện tài trợ nào</div>
      )}
    </div>
  );
};

export default SponsoredEvent;
