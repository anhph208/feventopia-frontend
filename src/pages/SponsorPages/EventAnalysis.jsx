import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
  Stack,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  Group as GroupIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useLocation, useParams } from "react-router-dom";
import {
  getEventDetailsAPI,
  getEventAnalysisAPI,
} from "../../components/services/userServices";
import { formatDateTime, PriceFormat } from "../../utils/tools";
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
  Title
);

const DashBoardTab = () => {
  const location = useLocation();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartId = location.state?.chartId;

  useEffect(() => {
    if (chartId) {
      const chartElement = document.getElementById(chartId);
      if (chartElement) {
        chartElement.scrollIntoView({ behavior: "smooth" });
        chartElement.style.border = "2px solid red"; // Example highlighting
      }
    }
  }, [chartId]);

  useEffect(() => {
    const fetchEventDetails = async (eventID) => {
      setLoading(true);
      try {
        const eventDetails = await getEventDetailsAPI(eventID);
        const eventAnalysis = await getEventAnalysisAPI(eventID);

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

        const processedEvent = {
          ...eventDetails,
          earliestStartDate,
          smallestPrice,
          analysis: eventAnalysis,
          status: eventDetails.status,
        };

        setEvent(processedEvent);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error);
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails(eventId);
    }
  }, [eventId]);

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
  if (!event) return <div>No event found.</div>;

  return (
    <Container className="wrapper wrapper-body">
      <div className="dashboard-body">
        <Typography variant="h4" component="div" gutterBottom>
          <i className="fa-solid fa-dashboard me-3" />
          <strong>TỔNG QUAN</strong>
        </Typography>

        <div className="event-list">
          <Grid container spacing={3} className="mt-4 mb-4">
            <Grid item xs={12} key={event.id} sx={{ mb: 2 }}>
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
                <Grid container sx={{ mb: 2 }}>
                  <Grid item xs={12} md={4} style={{ marginBot: 2 }}>
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
                          event.banner || "./assets/images/event-imgs/big-2.jpg"
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
                                  <GroupIcon sx={{ fontSize: 20 }} />
                                  <Box ml={0.5}>
                                    <Typography variant="body1" color="white">
                                      Số người tham gia
                                    </Typography>
                                    <Typography variant="h8">
                                      {event.analysis.numTicketCheckedIn}
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
                                        event.analysis?.numTicketCheckedIn || 0,
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
                        </Grid>
                      </CardContent>
                    </Grid>
                  )}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default DashBoardTab;
