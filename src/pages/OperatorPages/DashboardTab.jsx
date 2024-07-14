import React, { useState, useEffect } from "react";
import {
  getEventDetailsAPI,
  getAllStallCurrentEventAPI,
  getEventAllTicketInfoAPI,
  getLocationAPI,
} from "../../components/services/userServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateTime, PriceFormat } from "../../utils/tools";
import { Line } from 'react-chartjs-2';
import { registerables, Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'chart.js/auto';

Chart.register(...registerables);

function DashboardTab() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationCapacity, setLocationCapacity] = useState(0);
  const [analysisData, setAnalysisData] = useState({ stalls: [], tickets: [] });
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const [openAnalysisDialog, setOpenAnalysisDialog] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState({ stalls: [], tickets: [] });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const details = await getEventDetailsAPI(eventId);
        setEventDetails(details);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLocations = async () => {
      try {
        const locationData = await getLocationAPI();
        setLocations(
          locationData.map((loc) => ({
            value: loc.id,
            label: loc.locationName,
            capacity: loc.capacity,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };

    fetchEventDetails();
    fetchLocations();
  }, [eventId]);

  const handleViewAnalysis = async (eventDetail) => {
    setIsAnalysisLoading(true);
    setSelectedEventDetail(eventDetail);
    setOpenAnalysisDialog(true);
    try {
      const [stalls, tickets] = await Promise.all([
        getAllStallCurrentEventAPI(eventDetail.id),
        getEventAllTicketInfoAPI(eventDetail.id)
      ]);
      setAnalysisData({ stalls, tickets });
      setFilteredData({ stalls, tickets }); // Initialize with unfiltered data
    } catch (error) {
      toast.error("Failed to load analysis data.");
    } finally {
      setIsAnalysisLoading(false);
    }
  };

  const handleCloseAnalysisDialog = () => {
    setOpenAnalysisDialog(false);
    setAnalysisData({ stalls: [], tickets: [] });
  };

  const handleSubmitDateRange = () => {
    const filterDataByDateRange = (data, dateKey) => {
      return data.filter(item => {
        const date = new Date(item[dateKey]);
        return (!startDate || date >= new Date(startDate)) && (!endDate || date <= new Date(endDate));
      });
    };
    setFilteredData({
      stalls: filterDataByDateRange(analysisData.stalls, "transactionDate"),
      tickets: filterDataByDateRange(analysisData.tickets, "transactionDate")
    });
  };

  const groupByDay = (data, dateKey) => {
    return data.reduce((acc, curr) => {
      const date = new Date(curr[dateKey]);
      if (!isNaN(date)) {
        const day = date.toISOString().split('T')[0];
        if (!acc[day]) acc[day] = [];
        acc[day].push(curr);
      }
      return acc;
    }, {});
  };

  const generateChartData = (data) => {
    const groupedByDay = groupByDay(data, "transactionDate");
    const days = Object.keys(groupedByDay).sort((a, b) => new Date(a) - new Date(b));
    const chartData = days.map(day => groupedByDay[day].length);

    return {
      labels: days,
      datasets: [
        {
          label: "Daily Sales Rate",
          data: chartData,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        }
      ]
    };
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'll',
          displayFormats: {
            day: 'MMM d'
          }
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  useEffect(() => {
    if (filteredData.stalls.length || filteredData.tickets.length) {
      // Trigger a re-render when filteredData changes
      generateChartData(filteredData.stalls);
      generateChartData(filteredData.tickets);
    }
  }, [filteredData]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error loading event details</div>;
  if (!eventDetails) return <div>No event details found</div>;

  const isEventPast = (endDate) => {
    const currentDateTime = new Date();
    const eventEndDate = new Date(endDate);
    return currentDateTime > eventEndDate;
  };

  return (
    <div>
      <div className="wrapper">
        <div className="event-dt-block p-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="main-event-dt">
                  <div className="event-img">
                    <img
                      src={
                        eventDetails.banner ||
                        "./assets/images/event-imgs/big-2.jpg"
                      }
                      alt={eventDetails.eventName}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="main-event-content">
                  <div className="event-top-dt">
                    <h3 className="event-main-title">
                      {eventDetails.eventName}
                    </h3>
                  </div>
                  <div
                    className="event-description"
                    dangerouslySetInnerHTML={{
                      __html: eventDetails.eventDescription,
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                {eventDetails.eventDetail.map((eventDetail) => (
                  <div key={eventDetail.id} className="event-right-dt">
                    <div className="main-card">
                      <div className="event-dt-right-group mt-5">
                        <div className="event-dt-right-icon">
                          <i className="fa-solid fa-calendar-day" />
                        </div>
                        <div className="event-dt-right-content">
                          <h4>Thời gian</h4>
                          <h5>
                            {formatDateTime(eventDetail.startDate)} -{" "}
                            {formatDateTime(eventDetail.endDate)}
                          </h5>
                        </div>
                      </div>
                      <div className="event-dt-right-group">
                        <div className="event-dt-right-icon">
                          <i className="fa-solid fa-location-dot" />
                        </div>
                        <div className="event-dt-right-content">
                          <h4>Địa điểm</h4>
                          <h5 className="mb-0">
                            {eventDetail.location.locationName}
                          </h5>
                        </div>
                      </div>
                      <div className="select-tickets-block">
                        <div className="select-ticket-action">
                          <div className="ticket-price">
                            <h5>Giá vé</h5>
                            <strong>
                              <PriceFormat price={eventDetail.ticketPrice} />
                              <div className="ticket-remaining">
                                <p>
                                  Vé còn lại:{" "}
                                  {eventDetail.ticketForSaleInventory}
                                </p>
                              </div>
                            </strong>
                          </div>
                        </div>
                        <div className="xtotel-tickets-count"></div>
                        <div className="select-ticket-action">
                          <div className="ticket-price mt-4">
                            <h5>Giá gian hàng</h5>
                            <strong>
                              <PriceFormat price={eventDetail.stallPrice} />
                              <div className="stall-remaining">
                                <p>
                                  Gian hàng còn lại:{" "}
                                  {eventDetail.stallForSaleInventory}
                                </p>
                              </div>
                            </strong>
                          </div>
                        </div>
                        <div className="booking-btn mt-2">
                          <Button
                            className="main-btn btn-hover w-100 mt-3"
                            variant="contained"
                            onClick={() => handleViewAnalysis(eventDetail)}
                            sx={{
                              color: "white",
                              backgroundColor: "#450b00",
                              "&:hover": {
                                backgroundColor: "ff7f50",
                              },
                            }}
                          >
                            VIEW ANALYSIS
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openAnalysisDialog} onClose={handleCloseAnalysisDialog} fullWidth maxWidth="md">
        <DialogTitle>Sales Analysis for {selectedEventDetail?.location.locationName}</DialogTitle>
        <DialogContent>
          {isAnalysisLoading ? (
            <CircularProgress />
          ) : (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSubmitDateRange}
                    sx={{ alignSelf: 'center', ml: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </LocalizationProvider>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Stall Sales Rate
                  </Typography>
                  <Line data={generateChartData(filteredData.stalls)} options={chartOptions} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Ticket Sales Rate
                  </Typography>
                  <Line data={generateChartData(filteredData.tickets)} options={chartOptions} />
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAnalysisDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DashboardTab;
