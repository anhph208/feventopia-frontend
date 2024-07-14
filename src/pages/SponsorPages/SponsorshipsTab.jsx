import React, { useState, useEffect } from "react";
import {
  getSponsoredEventByUserAPI,
  getEventDetailsAPI
} from "../../components/services/userServices"; // Import the API service
import { toast } from "react-toastify";
import { Pagination, Stack } from "@mui/material";
import { formatDateTime, PriceFormat } from "../../utils/tools";

const SponsoredEvent = () => {
  const [sponsoredEvents, setSponsoredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSponsoredEvents = async () => {
      try {
        setLoading(true);
        const { data, pagination } = await getSponsoredEventByUserAPI(page, 5); // Fetch 5 events per page
        const eventDetailsPromises = data.map((sponsoredEvent) =>
          getEventDetailsAPI(sponsoredEvent.eventID)
        );
        const eventDetails = await Promise.all(eventDetailsPromises);

        // Combine the event details with the sponsored event data
        const combinedData = data.map((sponsoredEvent, index) => ({
          ...sponsoredEvent,
          event: eventDetails[index]
        }));

        setSponsoredEvents(combinedData || []); // Update to directly set the response data
        setTotalPages(pagination.TotalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sponsored events:", error);
        setLoading(false);
        toast.error("Error fetching sponsored events");
      }
    };

    fetchSponsoredEvents();
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
            <div className="main-card mt-4" key={sponsoredEvent.id}>
              <div className="card-top p-4">
                <div className="card-event-img">
                  <img
                    src={
                      sponsoredEvent.event.banner ||
                      "./assets/images/default-event.jpg"
                    }
                    alt="Event"
                  />
                </div>
                <div className="card-event-dt">
                  <h5>{sponsoredEvent.event.eventName}</h5>
                  <div className="invoice-id">
                    Mã Hóa đơn : <span>{sponsoredEvent.transaction.id}</span>
                  </div>
                  <div className="invoice-id">
                    Ngày thực hiện:{" "}
                    <span>
                      {formatDateTime(sponsoredEvent.transaction.transactionDate)}
                    </span>
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
                    <i className="fa-solid fa-money-bill" />
                  </div>
                  <div className="card-dt-text">
                    <h6>Số tiền tài trợ</h6>
                    <span>
                      <PriceFormat price={sponsoredEvent.transaction.amount} />
                    </span>
                  </div>
                </div>
                <div className="card-bottom-item">
                  <div className="card-icon">
                    <i className="fa-solid fa-info-circle" />
                  </div>
                  <div className="card-dt-text">
                    <h6>Trạng thái sự kiện</h6>
                    <span>{sponsoredEvent.event.status}</span>
                  </div>
                </div>
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
