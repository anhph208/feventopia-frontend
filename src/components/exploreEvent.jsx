import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllEventAPI } from "../components/services/userServices";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const mixerRef = useRef(null);

  const fetchEvents = async (query) => {
    setLoading(true);
    try {
      const { events } = await getAllEventAPI(1, 12);
      const filteredEvents = events.filter(
        (event) =>
          event.status === "EXECUTE" &&
          event.eventName.toLowerCase().includes(query.toLowerCase())
      );
      const sortedEvents = filteredEvents.sort((a, b) => {
        const categoryA = a.category.toUpperCase();
        const categoryB = b.category.toUpperCase();
        return (
          (CATEGORY_ORDER[categoryA] || 999) -
          (CATEGORY_ORDER[categoryB] || 999)
        );
      });
      setEvents(sortedEvents);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (containerRef.current && events.length > 0 && !mixerRef.current) {
      console.log("Initializing Mixitup");
      mixerRef.current = mixitup(containerRef.current, {
        animation: {
          duration: 250,
        },
      });
    }
    return () => {
      if (mixerRef.current) {
        mixerRef.current.destroy();
        mixerRef.current = null;
      }
    };
  }, [events]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEvents(searchQuery);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="hero-banner">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-8 col-md-10">
                <div className="hero-banner-content">
                  <h2>Discover Events For All The Things You Love</h2>
                  <form
                    onSubmit={handleSearchSubmit}
                    className="search-form main-form"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={10}>
                        <TextField
                          fullWidth
                          label="Search for events..."
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
                          color="primary"
                          style={{ height: "100%" }}
                        >
                          Search
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
                    <div className="row" data-ref="event-filter-content">
                      {loading ? (
                        <div>Loading...</div>
                      ) : error ? (
                        <div>Error loading events.</div>
                      ) : events.length === 0 ? (
                        <div>No events found.</div>
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
                                    <PriceFormat price={event.price} />
                                  </span>
                                  <span className="remaining" />
                                </div>
                              </div>
                              <div className="event-footer">
                                <div className="event-timing">
                                  <div className="publish-date">
                                    <span>
                                      <i className="fa-solid fa-calendar-day me-2" />
                                      {formatDateTime(event.date)}
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
                        See More
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
