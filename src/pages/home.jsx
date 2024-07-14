import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import {
  getAllEventForVisitorAPI,
  getAllEventForOtherAPI,
  getEventDetailsAPI,
} from "../components/services/userServices";
import HomeSlider from "../components/HomeSlider";
import FeatureSlider from "../components/featureSlider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { formatDateTime, PriceFormat } from "../utils/tools";

// Define slider items for the home page
const sliderItems = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-banner%2FHackAthon.jfif?alt=media&token=2beb5b41-6760-4f39-81e4-1e2e0c54d5a8",
    altText: "Hackathon 2024",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-banner%2FTichtichtinhtang.jfif?alt=media&token=35a49e1a-67b5-4638-915d-37a7ca574932",
    altText: "TTTT 2024",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-banner%2FLookOnme.jpg?alt=media&token=c2b558e1-8aa3-4ba0-99ba-d5c5b7e7da82",
    altText: "LOOKONME 2024",
  },
];

// Define sponsor items for the home page
const sponsorItems = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-images%2F2020-FPT%20Edu-White.png?alt=media&token=451c0887-9a56-4e0c-b4c6-7c3a1a375959",
    altText: "Sponsor 1",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-images%2FFAT-abt%20(1).png?alt=media&token=3547e3ae-f81b-4298-9a47-73c62d6c1a0d",
    altText: "Sponsor 2",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-images%2FFPT-Retail-Ngang-white.png?alt=media&token=eb9ab319-0aa3-4e87-923d-fa73b826c203",
    altText: "Sponsor 3",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-images%2FFPTU%20GLobal%20trang%20png-05.png?alt=media&token=0e176912-1871-4998-a5c5-0b9184c22d48",
    altText: "Sponsor 4",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-images%2FLOGO-FSB-02%20white.png?alt=media&token=67dd5e22-332f-418c-bd3d-a874b607ff30",
    altText: "Sponsor 5",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-images%2FLogo_White-01.png?alt=media&token=a1bc452a-a59d-4be8-b294-0076777aaec6",
    altText: "Sponsor 6",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/event-images%2Flogo-white.png?alt=media&token=ffaa7243-6303-4060-bdf3-7896a714f687",
    altText: "Sponsor 7",
  },
];

// Define feature items for the home page
const featureItems = [
  {
    image: "./assets/images/icons/venue-events.png",
    altText: "Venue Events",
    title: "Venue Events",
    description:
      "Create outstanding event page for your venue events, attract attendees and sell more tickets.",
  },
  {
    image: "./assets/images/icons/webinar.png",
    altText: "Webinar",
    title: "Webinar",
    description:
      "Webinars tend to be one-way events. Barren helps to make them more engaging.",
  },
  {
    image: "./assets/images/icons/training-workshop.png",
    altText: "Training & Workshop",
    title: "Training & Workshop",
    description:
      "Create and host profitable workshops and training sessions online, sell tickets and earn money.",
  },
  {
    image: "./assets/images/icons/online-class.png",
    altText: "Online Class",
    title: "Online Class",
    description:
      "Try our e-learning template to create a fantastic e-learning event page and drive engagement.",
  },
  {
    image: "./assets/images/icons/talk-show.png",
    altText: "Talk Show",
    title: "Talk Show",
    description:
      "Use our intuitive built-in event template to create and host an engaging Talk Show.",
  },
];

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState(null);
  const role = localStorage.getItem("role");

  // Function to fetch events based on role and category
  const fetchEvents = async (page, category) => {
    setLoading(true);
    try {
      const apiFunction =
        !role || role === "VISITOR"
          ? getAllEventForVisitorAPI
          : (page, pageSize, category) =>
              getAllEventForOtherAPI(page, pageSize, category, "FUNDRAISING");

      const response = await apiFunction(page, 8, category);
      console.log("API Response:", response);

      const { events, pagination } = response;
      console.log("Events:", events);
      console.log("Pagination:", pagination);

      // Fetch details for each event
      const eventDetailsPromises = events.map((event) =>
        getEventDetailsAPI(event.id)
      );
      const eventsWithDetails = await Promise.all(eventDetailsPromises);
      console.log("Events with Details:", eventsWithDetails);

      // Process the details to get the earliest start date and smallest price
      const processedEvents = eventsWithDetails.map((eventDetails) => {
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
        };
      });

      console.log("Processed Events:", processedEvents);

      // Update state with new pagination values and events
      setEvents(processedEvents);
      setTotalPages(pagination.TotalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error);
      setLoading(false);
    }
  };

  // Fetch events when component mounts or page/category changes
  useEffect(() => {
    fetchEvents(pageNumber, category);
  }, [pageNumber, category]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPageNumber(1); // Reset to first page when changing category
  };

  return (
    <div className="wrapper">
      <div className="slider-container">
        <HomeSlider
          items={sliderItems}
          autoplayTimeout={3000}
          loop={true}
          margin={0}
          smartSpeed={700}
        />
      </div>
      <div className="explore-events p-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="main-title">
                <h3>SỰ KIỆN MỚI NHẤT</h3>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="event-filter-items">
                <div className="featured-controls mt-2">
                  <div className="controls">
                    <button
                      type="button"
                      className={`control ${category === null ? "active" : ""}`}
                      onClick={() => handleCategoryChange(null)}
                    >
                      TẤT CẢ
                    </button>
                    <button
                      type="button"
                      className={`control ${
                        category === "TALKSHOW" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange("TALKSHOW")}
                    >
                      TALKSHOW
                    </button>
                    <button
                      type="button"
                      className={`control ${
                        category === "COMPETITION" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange("COMPETITION")}
                    >
                      CUỘC THI
                    </button>
                    <button
                      type="button"
                      className={`control ${
                        category === "FESTIVAL" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange("FESTIVAL")}
                    >
                      FESTIVAL
                    </button>
                    <button
                      type="button"
                      className={`control ${
                        category === "MUSICSHOW" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange("MUSICSHOW")}
                    >
                      ÂM NHẠC
                    </button>
                  </div>
                  <div className="row">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className={`col-xl-3 col-lg-4 col-md-6 col-sm-12`}
                      >
                        <div className="main-card mt-4">
                          <div className="event-thumbnail">
                            <Link
                              to={
                                role === "SPONSOR"
                                  ? `/sponsor-event/${event.id}`
                                  : `/event/${event.id}`
                              }
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
                            <span className="bookmark-icon" title="Bookmark" />
                          </div>
                          <div className="event-content">
                            <Link
                              to={
                                role === "SPONSOR"
                                  ? `/sponsor-event/${event.id}`
                                  : `/event/${event.id}`
                              }
                              className="event-title"
                            >
                              {event.eventName}
                            </Link>
                            {event.status === "POST" ? (
                              <div className="event-ended">
                                <strong>Sự kiện đã kết thúc</strong>
                              </div>
                            ) : (
                              <div className="duration-price-remaining">
                                <span className="duration-price">
                                  GIÁ VÉ TỪ{" "}
                                  <strong>
                                    <PriceFormat price={event.smallestPrice} />
                                  </strong>
                                </span>
                                <span className="remaining" />
                              </div>
                            )}
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
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {loading && <div>Đang xử lí...</div>}
                  {events.length === 0 && !loading && (
                    <div>No events found.</div>
                  )}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="host-engaging-event-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="main-title">
                <h3>Host Engaging Online and Venue Events with Barren</h3>
                <p>
                  Organise venue events and host online events with unlimited
                  possibilities using our built-in virtual event platform. Build
                  a unique event experience for you and your attendees.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="engaging-block">
                <FeatureSlider
                  items={featureItems}
                  autoplayTimeout={3000}
                  loop={true}
                  margin={10}
                  smartSpeed={700}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="host-step-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="main-title">
                <h3>KHÔNG BỎ LỠ BẤT KÌ SỰ KIỆN NÀO VỚI FEVENTOPIA</h3>
                <p>
                  Thông tin nhanh chóng, dễ dàng thanh toán và bảo mật cao cùng
                  các sự kiện hấp dẫn
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="easy-steps-tab">
                <div className="nav step-tabs" role="tablist">
                  <button
                    className="step-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#step-01"
                    type="button"
                    role="tab"
                    aria-controls="step-01"
                    aria-selected="true"
                  >
                    BƯỚC 01<span>LỰA CHỌN SỰ KIỆN</span>
                  </button>
                  <button
                    className="step-link"
                    data-bs-toggle="tab"
                    data-bs-target="#step-02"
                    type="button"
                    role="tab"
                    aria-controls="step-02"
                    aria-selected="false"
                  >
                    BƯỚC 02<span>MUA VÉ</span>
                  </button>
                  <button
                    className="step-link"
                    data-bs-toggle="tab"
                    data-bs-target="#step-03"
                    type="button"
                    role="tab"
                    aria-controls="step-03"
                    aria-selected="false"
                  >
                    BƯỚC 03<span>THAM GIA SỰ KIỆN</span>
                  </button>
                  <button
                    className="step-link"
                    data-bs-toggle="tab"
                    data-bs-target="#step-04"
                    type="button"
                    role="tab"
                    aria-controls="step-04"
                    aria-selected="false"
                  >
                    BƯỚC 04<span>GỬI ĐÁNH GIÁ VÀ TIẾP TỤC THÔI</span>
                  </button>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="step-01"
                    role="tabpanel"
                  >
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-1.png"
                              alt
                            />
                          </div>
                          <h4>Đăng kí miễn phí</h4>
                          <p>
                            Đăng kí dễ dàng bằng email của bạn trong thời gian
                            ngắn nhất.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-2.png"
                              alt
                            />
                          </div>
                          <h4>Đa dạng danh mục sự kiện</h4>
                          <p>
                            Các trang sự kiện được tạo trực quan dễ dàng nắm bắt
                            thông tin.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="step-02" role="tabpanel">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-5.png"
                              alt
                            />
                          </div>
                          <h4>Vé được quản lí một cách dễ dàng</h4>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-6.png"
                              alt
                            />
                          </div>
                          <h4>
                            Thanh toán nhanh chóng và bảo mật với FEventWallet
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="step-03" role="tabpanel">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-7.png"
                              alt
                            />
                          </div>
                          <h4>Đảm bảo dễ dàng tham gia sự kiện</h4>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-9.png"
                              alt
                            />
                          </div>
                          <h4>
                            Kết nối cùng với những người tham gia khác và Ban tổ
                            chức sự kiện
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="step-04" role="tabpanel">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-10.png"
                              alt
                            />
                          </div>
                          <h4>Tiếp tục những chuỗi sự kiện diễn ra sau đó.</h4>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-11.png"
                              alt
                            />
                          </div>
                          <h4>Đánh giá sự kiện một cách trực quan</h4>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="step-item">
                          <div className="step-icon">
                            <img
                              src="./assets/images/icons/step-icon-12.png"
                              alt
                            />
                          </div>
                          <h4>Ban tổ chức sẵn sàng hỗ trợ mọi thắc mắc</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="our-organisations-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-title text-center">
                <h3>CÙNG NHIỀU NHÀ TẠI TRỢ UY TÍN</h3>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="organisations-area">
                <Slider
                  items={sponsorItems}
                  autoplayTimeout={3000}
                  loop={true}
                  margin={25}
                  smartSpeed={700}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
