import React, { useState, useEffect } from "react";
import {
  getEventDetailsAPI,
  getAllEventFeedBackAPI,
} from "../components/services/userServices";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Rating,
} from "@mui/material";

function EventDetails() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [pagination, setPagination] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const details = await getEventDetailsAPI(eventId);
        setEventDetails(details);

        // Fetch feedback using the eventDetailID from the event details
        if (details.eventDetail && details.eventDetail.length > 0) {
          const eventDetailID = details.eventDetail[0].id; // Assuming we use the first event detail
          const feedbackData = await getAllEventFeedBackAPI(
            eventDetailID,
            pageNumber,
            pageSize
          );
          setFeedbacks(feedbackData.data);
          setPagination(feedbackData.pagination);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId, pageNumber, pageSize]);

  const handlePreviousPage = () => {
    if (pagination.HasPrevious) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.HasNext) {
      setPageNumber(pageNumber + 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

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
              <div className="col-lg-12 col-md-12">
                <div className="main-event-content">
                  <div className="event-top-dt">
                    <h3 className="event-main-title">
                      {eventDetails.eventName}
                    </h3>
                  </div>
                  <div className="feedback-section">
                    <h2>Đánh giá sự kiện</h2>
                    <Grid container spacing={3}>
                      {feedbacks.map((feedback) => (
                        <Grid item xs={12} sm={6} key={feedback.id}>
                          <Card>
                            <CardContent>
                              <Typography variant="h6">Đánh giá:</Typography>
                              <Rating
                                value={feedback.rate}
                                readOnly
                                precision={0.5}
                                size="large"
                              />
                              <Typography
                                variant="body1"
                                style={{ marginTop: "10px" }}
                              >
                                {feedback.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Pagination Controls */}
                    <div
                      className="pagination-controls"
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        onClick={handlePreviousPage}
                        disabled={!pagination.HasPrevious}
                        variant="contained"
                        color="primary"
                      >
                        Previous
                      </Button>
                      <span>
                        Page {pagination.CurrentPage} of {pagination.TotalPages}
                      </span>
                      <Button
                        onClick={handleNextPage}
                        disabled={!pagination.HasNext}
                        variant="contained"
                        color="primary"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display Feedback */}
    </div>
  );
}

export default EventDetails;
