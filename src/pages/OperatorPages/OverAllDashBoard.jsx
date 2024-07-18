import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Stack,
  ButtonGroup,
  Button,
  Container,
  Box,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  getAllEventForOtherAPI,
  getEventDetailsAPI,
  getEventAnalysisAPI,
  getEventAllTicketInfoAPI,
  getAllStallCurrentEventAPI,
} from "../../components/services/userServices";
import { formatDate, formatDateTime, PriceFormat } from "../../utils/tools";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const DashBoardTab = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [ticketData, setTicketData] = useState({});
  const [stallData, setStallData] = useState({});

  const chartId = location.state?.chartId;

  useEffect(() => {
    if (chartId) {
      const chartElement = document.getElementById(chartId);
      if (chartElement) {
        chartElement.scrollIntoView({ behavior: "smooth" });
        // You can also add any highlighting logic here if needed
        chartElement.style.border = "2px solid red"; // Example highlighting
      }
    }
  }, [chartId]);

  const fetchEvents = async (page, category, status) => {
    setLoading(true);
    try {
      const response = await getAllEventForOtherAPI(page, 3, category, status);
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
          analysis: eventsWithAnalysis[index],
          status: events[index].status, // Add status from the original events array
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

  const processTicketData = (data) => {
    const ticketCounts = {};
    data.forEach((ticket) => {
      const date = new Date(
        ticket.transaction.transactionDate
      ).toLocaleDateString();
      if (!ticketCounts[date]) {
        ticketCounts[date] = 0;
      }
      ticketCounts[date]++;
    });
    return ticketCounts;
  };

  const processStallData = (data) => {
    const stallCounts = {};
    data.forEach((stall) => {
      const date = new Date(
        stall.transaction.transactionDate
      ).toLocaleDateString();
      if (!stallCounts[date]) {
        stallCounts[date] = 0;
      }
      stallCounts[date]++;
    });
    return stallCounts;
  };

  const fetchTicketData = async (detailId) => {
    try {
      const response = await getEventAllTicketInfoAPI(detailId);
      return response;
    } catch (error) {
      console.error("Error fetching ticket data:", error);
      return [];
    }
  };

  const fetchStallData = async (detailId) => {
    try {
      const response = await getAllStallCurrentEventAPI(detailId);
      return response;
    } catch (error) {
      console.error("Error fetching stall data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllTicketData = async () => {
      const allTicketData = {};
      for (const event of events) {
        for (const detail of event.eventDetail) {
          const ticketData = await fetchTicketData(detail.id);
          allTicketData[detail.id] = processTicketData(ticketData);
        }
      }
      setTicketData(allTicketData);
    };
    if (events.length > 0) {
      fetchAllTicketData();
    }
  }, [events]);

  useEffect(() => {
    const fetchAllStallData = async () => {
      const allStallData = {};
      for (const event of events) {
        for (const detail of event.eventDetail) {
          const stallData = await fetchStallData(detail.id);
          allStallData[detail.id] = processStallData(stallData);
        }
      }
      setStallData(allStallData);
    };
    if (events.length > 0) {
      fetchAllStallData();
    }
  }, [events]);

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

  const generateLineChartData = (data, eventDetails) => {
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString());
    }

    const datasets = eventDetails.map((detail, index) => {
      const dataset = labels.map((label) => data[detail.id]?.[label] || 0);
      return {
        label: `Sự kiện ${formatDate(detail.startDate)}`,
        data: dataset,
        borderColor: `hsl(${index * 60}, 100%, 50%)`,
        backgroundColor: `hsla(${index * 60}, 100%, 50%, 0.5)`,
        fill: false, // Set fill to false to remove the color below the line
      };
    });

    return {
      labels,
      datasets,
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  if (loading) return <div>Đang Xử lí...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container className="wrapper wrapper-body">
      <div className="dashboard-body">
        <Typography variant="h4" component="div" gutterBottom>
          <i className="fa-solid fa-dashboard me-3" />
          <strong>TỔNG QUAN</strong>
        </Typography>

        <div className="main-card">
          <div className="dashboard-wrap-content p-4">
            <h5 className="mb-4">Danh mục Sự kiện</h5>
            <div className="rs ms-auto mt_r4 mb-4">
              <div className="nav custom2-tabs btn-group" role="tablist">
                <button
                  className={`tab-link ${category === null ? "active" : ""}`}
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
                className={`tab-link ${status === "INITIAL" ? "active" : ""}`}
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
                className={`tab-link ${status === "EXECUTE" ? "active" : ""}`}
                onClick={() => handleStatusChange("EXECUTE")}
              >
                TRIỂN KHAI
              </button>
              <button
                className={`tab-link ${status === "POST" ? "active" : ""}`}
                onClick={() => handleStatusChange("POST")}
              >
                HOÀN THÀNH
              </button>
              <button
                className={`tab-link ${status === "CANCELED" ? "active" : ""}`}
                onClick={() => handleStatusChange("CANCELED")}
              >
                ĐÃ HỦY
              </button>
            </div>
          </div>
        </div>

        <div className="event-list">
          <Grid container spacing={3} className="mt-4">
            {events.map((event) => (
              <Grid item xs={12} key={event.id}>
                <Card
                  style={{
                    backgroundColor:
                      event.status === "CANCELED"
                        ? "#9CAFAA"
                        : event.status === "POST"
                        ? "#BFEA7C"
                        : "white",
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <Box
                        component="div"
                        sx={{
                          margin: 2,
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt={event.eventName}
                          height="200"
                          image={
                            event.banner ||
                            "./assets/images/event-imgs/big-2.jpg"
                          }
                        />
                      </Box>
                      <CardContent>
                        <Typography variant="h5">
                          <strong>{event.eventName}</strong>
                        </Typography>
                        {event.eventDetail.map((detail) => (
                          <Box
                            key={detail.id}
                            sx={{
                              mt: 2,
                              ml: 0.4,
                              border: "2px solid #ddd",
                              borderRadius: 2,
                              p: 2,
                            }}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <div className="event-dt-right-icon">
                                <i className="fa-solid fa-calendar-days" />
                              </div>
                              <Box>
                                <Typography variant="h6">Thời gian</Typography>
                                <Typography variant="body2">
                                  {formatDateTime(detail.startDate)} -{" "}
                                  {formatDateTime(detail.endDate)}
                                </Typography>
                              </Box>
                            </Stack>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                              marginTop={2}
                            >
                              <div className="card-icon">
                                <i className="fa-solid fa-money-bill" />
                              </div>
                              <Box>
                                <Typography variant="h6">Giá vé</Typography>
                                <Typography variant="body2">
                                  <PriceFormat price={detail.ticketPrice} />
                                </Typography>
                              </Box>
                            </Stack>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                              marginTop={2}
                            >
                              <div className="card-icon">
                                <i className="fa-solid fa-money-bill" />
                              </div>
                              <Box>
                                <Typography variant="h6">
                                  Giá gian hàng
                                </Typography>
                                <Typography variant="body2">
                                  <PriceFormat price={detail.stallPrice} />
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        ))}
                      </CardContent>
                    </Grid>
                    {event.status !== "CANCELED" && event.analysis && (
                      <Grid item xs={12} md={8}>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                              <Card
                                sx={{
                                  backgroundColor: "#ff7f50",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <CardContent>
                                  <Box display="flex" alignItems="center">
                                    <AttachMoneyIcon sx={{ fontSize: 25 }} />
                                    <Box ml={1}>
                                      <Typography variant="body1" color="white">
                                        Vốn Sự kiện
                                      </Typography>
                                      <Typography variant="h8">
                                        <PriceFormat
                                          price={event.analysis.initialCapital}
                                        />
                                      </Typography>
                                    </Box>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Card
                                sx={{
                                  backgroundColor: "#ff7f55",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <CardContent>
                                  <Box display="flex" alignItems="center">
                                    <MonetizationOnIcon sx={{ fontSize: 20 }} />
                                    <Box ml={1}>
                                      <Typography variant="body1" color="white">
                                        Tài trợ
                                      </Typography>
                                      <Typography variant="h8">
                                        <PriceFormat
                                          price={event.analysis.sponsorCaptital}
                                        />
                                      </Typography>
                                    </Box>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Card
                                sx={{
                                  backgroundColor: "#ff7f55",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <CardContent>
                                  <Box display="flex" alignItems="center">
                                    <MonetizationOnIcon sx={{ fontSize: 20 }} />
                                    <Box ml={1}>
                                      <Typography variant="body1" color="white">
                                        Doanh thu
                                      </Typography>
                                      <Typography variant="h8">
                                        <PriceFormat
                                          price={
                                            event.analysis.ticketIncome +
                                            event.analysis.stallIncome
                                          }
                                        />
                                      </Typography>
                                    </Box>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Card
                                sx={{
                                  backgroundColor: "#450b00",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <CardContent>
                                  <Box display="flex" alignItems="center">
                                    <MoneyOffIcon sx={{ fontSize: 20 }} />
                                    <Box ml={1}>
                                      <Typography variant="body1" color="white">
                                        Chi phí thực tế
                                      </Typography>
                                      <Typography variant="h8">
                                        <PriceFormat
                                          price={event.analysis.actualExpense}
                                        />
                                      </Typography>
                                    </Box>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <div
                                className="chart-container"
                                style={{ height: "300px" }}
                              >
                                <Typography variant="h6">
                                  Số lượng Vé Bán ra và Gian Hàng
                                </Typography>
                                <Bar
                                  data={{
                                    labels: [
                                      "Số vé bán ra",
                                      "Gian hàng bán ra",
                                      "Số người tham gia",
                                    ],
                                    datasets: [
                                      {
                                        label: "Số lượng",
                                        data: [
                                          event.analysis?.numTicketSold || 0,
                                          event.analysis?.numStallSold || 0,
                                          event.analysis?.numTicketCheckedIn ||
                                            0,
                                        ],
                                        backgroundColor: [
                                          "#450b00",
                                          "#450b00",
                                          "#ff7f50",
                                        ],
                                      },
                                    ],
                                  }}
                                  options={{
                                    ...chartOptions,
                                    title: {
                                      display: true,
                                      text: "Tickets and Stalls Sold",
                                    },
                                  }}
                                />
                              </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <div
                                className="chart-container"
                                style={{ height: "300px" }}
                              >
                                <Typography variant="h6">
                                  Doanh thu Bán Vé và Gian hàng
                                </Typography>
                                <Pie
                                  data={{
                                    labels: [
                                      "Dòng tiền Bán vé",
                                      "Dòng tiền Gian hàng",
                                    ],
                                    datasets: [
                                      {
                                        label: "Dòng tiền",
                                        data: [
                                          event.analysis?.ticketIncome || 0,
                                          event.analysis?.stallIncome || 0,
                                        ],
                                        backgroundColor: ["#450b00", "#ff7f50"],
                                      },
                                    ],
                                  }}
                                  options={{
                                    ...chartOptions,
                                    title: {
                                      display: true,
                                      text: "Income Distribution",
                                    },
                                  }}
                                />
                              </div>
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              className="chart-container mt-5"
                              sx={{ height: "300px" }}
                            >
                              <Typography variant="h6">
                                Số lượng Vé Bán ra 7 ngày gần nhất
                              </Typography>
                              <Line
                                data={generateLineChartData(
                                  ticketData,
                                  event.eventDetail
                                )}
                                options={{
                                  ...chartOptions,
                                  title: {
                                    display: true,
                                    text: "Ticket Sales in Last 7 Days",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              className="chart-container mt-5"
                              sx={{ height: "300px" }}
                            >
                              <Typography variant="h6">
                                Số lượng Gian hàng bán ra 7 ngày gần nhất
                              </Typography>
                              <Line
                                data={generateLineChartData(
                                  stallData,
                                  event.eventDetail
                                )}
                                options={{
                                  ...chartOptions,
                                  title: {
                                    display: true,
                                    text: "Stall Sales in Last 7 Days",
                                  },
                                }}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Grid>
                    )}
                  </Grid>
                </Card>
              </Grid>
            ))}
            {events.length === 0 && !loading && (
              <Typography variant="body1">No events found.</Typography>
            )}
          </Grid>
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
        {error && (
          <Typography variant="body1">Error: {error.message}</Typography>
        )}
      </div>
    </Container>
  );
};

export default DashBoardTab;
