import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { searchEventAPI, getEventDetailsAPI } from "./services/userServices";
import { formatDateTime, PriceFormat } from "../utils/tools";
import mixitup from "mixitup";
import { TextField, Button, Grid } from "@mui/material";

const CATEGORY_ORDER = {
  TALKSHOW: 1,
  COMPETITION: 2,
  FESTIVAL: 3,
  MUSICSHOW: 4,
};

function ExploreEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const mixerRef = useRef(null);

  const searchEvents = async (query) => {
    setLoading(true);
    try {
      const events = await searchEventAPI(query);
      const filteredEvents = events.filter((event) => event.status === "EXECUTE");

      // Fetch details for each event
      const eventDetailsPromises = filteredEvents.map((event) =>
        getEventDetailsAPI(event.id)
      );
      const eventsWithDetails = await Promise.all(eventDetailsPromises);

      // Process the details to get the earliest start date and smallest price
      const processedEvents = eventsWithDetails.map((eventDetails) => {
        const earliestStartDate = eventDetails.eventDetail.reduce(
          (earliest, current) =>
            new Date(current.startDate) < new Date(earliest.startDate)
              ? current
              : earliest
        ).startDate;

        const smallestPrice = Math.min(
          ...eventDetails.eventDetail.map((detail) => detail.ticketPrice)
        );

        return {
          ...eventDetails,
          earliestStartDate,
          smallestPrice: smallestPrice !== Infinity ? smallestPrice : null, // Handle case where no prices are found
        };
      });

      const sortedEvents = processedEvents.sort((a, b) => {
        const categoryA = a.category.toUpperCase();
        const categoryB = b.category.toUpperCase();
        return (CATEGORY_ORDER[categoryA] || 999) - (CATEGORY_ORDER[categoryB] || 999);
      });

      setEvents(sortedEvents);
      setLoading(false);

      // Initialize Mixitup after setting events
      if (containerRef.current && !mixerRef.current) {
        mixerRef.current = mixitup(containerRef.current, {
          animation: {
            duration: 250,
          },
        });
      } else if (mixerRef.current) {
        mixerRef.current.destroy();
        mixerRef.current = mixitup(containerRef.current, {
          animation: {
            duration: 250,
          },
        });
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchEvents(searchQuery);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="hero-banner">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-8 col-md-10">
                <div className="hero-banner-content">
                  <h2>KHÁM PHÁ TẤT CẢ SỰ KIỆN TẠI ĐÂY</h2>
                  <form
                    onSubmit={handleSearchSubmit}
                    className="search-form main-form"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={10}>
                        <TextField
                          fullWidth
                          label="TÌM KIẾM SỰ KIỆN"
                          variant="outlined"
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          fullWidth
                          type="submit"
                          variant="contained"
                          style={{ height: "100%" ,backgroundColor: "#450b00"}}
                          
                        >
                          TÌM KIẾM
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="explore-events p-80">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="event-filter-items">
                  <div className="featured-controls">
                    <div className="controls">
                      <button type="button" className="control" data-filter="all">
                        TẤT CẢ
                      </button>
                      <button
                        type="button"
                        className="control"
                        data-filter=".talkshow"
                      >
                        TALKSHOW
                      </button>
                      <button
                        type="button"
                        className="control"
                        data-filter=".competition"
                      >
                        CUỘC THI
                      </button>
                      <button
                        type="button"
                        className="control"
                        data-filter=".festival"
                      >
                        FESTIVAL
                      </button>
                      <button
                        type="button"
                        className="control"
                        data-filter=".musicshow"
                      >
                        ÂM NHẠC
                      </button>
                    </div>
                    <div className="row" ref={containerRef} data-ref="event-filter-content">
                      {loading ? (
                        <div>Đang xử lí...</div>
                      ) : error ? (
                        <div>Error loading events.</div>
                      ) : events.length === 0 ? (
                        <div>Không có Sự kiện nào được tìm kiếm.</div>
                      ) : (
                        events.map((event) => (
                          <div
                            key={event.id}
                            className={`col-xl-3 col-lg-4 col-md-6 col-sm-12 mix ${event.category.toLowerCase()}`}
                            data-ref="mixitup-target"
                          >
                            <div className="main-card mt-4">
                              <div className="event-thumbnail">
                                <Link
                                  to={`/event/${event.id}`}
                                  className="thumbnail-img"
                                >
                                  <img
                                    src={
                                      event.banner && event.banner !== "null"
                                        ? event.banner
                                        : "./assets/images/event-imgs/img-1.jpg"
                                    }
                                    alt={event.eventName}
                                  />
                                </Link>
                                <span
                                  className="bookmark-icon"
                                  title="Bookmark"
                                />
                              </div>
                              <div className="event-content">
                                <Link
                                  to={`/event/${event.id}`}
                                  className="event-title"
                                >
                                  {event.eventName}
                                </Link>
                                <div className="duration-price-remaining">
                                  <span className="duration-price">
                                    Giá vé từ <strong><PriceFormat price={event.smallestPrice} /></strong>
                                  </span>
                                  <span className="remaining" />
                                </div>
                              </div>
                              <div className="event-footer">
                                <div className="event-timing">
                                  <div className="publish-date">
                                    <span>
                                      <i className="fa-solid fa-calendar-day me-2" />
                                      {formatDateTime(event.earliestStartDate)}
                                    </span>
                                    <span className="dot">
                                      <i className="fa-solid fa-circle" />
                                    </span>
                                  </div>
                                  <span className="publish-time">
                                    <i className="fa-solid fa-clock me-2" />
                                    {event.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="browse-btn">
                      <a href="#" className="main-btn btn-hover ">
                        Xem Thêm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreEvent;
