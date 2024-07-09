import React, { useState, useEffect } from "react";
import { getAllProfileTicketAPI } from "../../components/services/userServices"; // Import the API service
import { toast } from "react-toastify";
import { Pagination, Stack } from "@mui/material";
import { formatDateTime, PriceFormat } from "../../utils/tools";

const OrdersTab = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { tickets, pagination } = await getAllProfileTicketAPI(page, 5); // Fetch 5 tickets per page
        setTickets(tickets || []); // Update to directly set the response data
        setTotalPages(pagination.TotalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
        toast.error("Error fetching tickets");
      }
    };

    fetchTickets();
  }, [page, token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="tab-pane fade show active"
      id="orders"
      role="tabpanel"
      aria-labelledby="orders-tab"
    >
      {tickets.length > 0 ? (
        <>
          {tickets.map((ticket) => (
            <div className="main-card mt-4" key={ticket.id}>
              <div className="card-top p-4">
                <div className="card-event-img">
                  <img src={ticket.event.banner} alt="Event" />
                </div>
                <div className="card-event-dt">
                  <h5>{ticket.event.eventName}</h5>
                  <div className="invoice-id">
                    Mã Hóa đơn : <span>{ticket.transaction.id}</span>
                  </div>
                  <div className="invoice-id">
                    Ngày thực hiện:{" "}
                    <span>
                      {formatDateTime(ticket.transaction.transactionDate)}
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
                    <h6>Sự kiện bắt đầu</h6>
                    <span>{formatDateTime(ticket.eventDetail.startDate)}</span>
                  </div>
                </div>
                <div className="card-bottom-item">
                  <div className="card-icon">
                    <i className="fa-solid fa-ticket" />
                  </div>
                  <div className="card-dt-text">
                    <h6>Tổng số vé</h6>
                    <span>1</span>
                  </div>
                </div>
                <div className="card-bottom-item">
                  <div className="card-icon">
                    <i className="fa-solid fa-money-bill" />
                  </div>
                  <div className="card-dt-text">
                    <h6>Số tiền</h6>
                    <span>
                      <PriceFormat price={ticket.transaction.amount} />
                    </span>
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
        <div>Không có vé đã mua</div>
      )}
    </div>
  );
};

export default OrdersTab;
