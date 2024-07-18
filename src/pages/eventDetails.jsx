import React, { useState, useEffect, useContext } from "react";
import {
  getEventDetailsAPI,
  getAllStallCurrentEvent,
} from "../components/services/userServices";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../components/Cart/CartContext";
import { useAuth } from "../context/AuthContext";
import Cart from "../components/Cart/Cart";
import { toast } from "react-toastify";
import { formatDateTime, PriceFormat } from "../utils/tools";
import Select from "react-select";

const globalSelectedStalls = {};

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { token } = useAuth();

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketCounts, setTicketCounts] = useState({});
  const [selectedStalls, setSelectedStalls] = useState({});
  const [soldStalls, setSoldStalls] = useState([]);

  const decreaseCount = (id) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0,
    }));
  };

  const increaseCount = (id) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const handleAction = (action, eventId, additionalData = {}) => {
    if (!token) {
      toast.error("Please log in to continue!", {
        onClose: () => navigate("/signin"),
      });
      return;
    }
    action(eventId, additionalData);
  };

  const handleBookNow = (id) => {
    const selectedEventDetail = eventDetails.eventDetail.find(
      (event) => event.id === id
    );

    if (!selectedEventDetail) {
      console.error("Event not found.");
      return;
    }

    const ticketCount = ticketCounts[id] || 0;
    if (ticketCount === 0) {
      toast.error("Please select at least 1 ticket!");
      return;
    } else if (ticketCount > 3) {
      toast.error("You can only buy a maximum of 3 tickets!");
      return;
    }

    const selectedEvent = {
      eventId: selectedEventDetail.id,
      eventName: eventDetails.eventName,
      startDate: selectedEventDetail.startDate,
      endDate: selectedEventDetail.endDate,
      location: selectedEventDetail.location.locationName,
      ticketCount: ticketCount,
      ticketPrice: selectedEventDetail.ticketPrice,
    };

    toast.success("Redirecting to checkout page...", {
      onClose: () => {
        navigate("/checkout", {
          state: {
            eventDetail: selectedEvent,
            ticketCount: ticketCount,
            eventBanner: eventDetails.banner,
            checkoutType: "bookNow",
          },
        });
      },
    });
  };

  const handleBuyStall = (id) => {
    const selectedEventDetail = eventDetails.eventDetail.find(
      (event) => event.id === id
    );

    if (!selectedEventDetail) {
      console.error("Event not found.");
      return;
    }

    const selectedStall = selectedStalls[id];
    if (!selectedStall) {
      toast.error("Please select a stall!");
      return;
    }

    const selectedEvent = {
      eventId: selectedEventDetail.id,
      eventName: eventDetails.eventName,
      startDate: selectedEventDetail.startDate,
      endDate: selectedEventDetail.endDate,
      location: selectedEventDetail.location.locationName,
      stallNumber: selectedStall.value,
      stallPrice: selectedEventDetail.stallPrice,
    };

    globalSelectedStalls[id] = selectedStall.value;

    toast.success("Redirecting to checkout page...", {
      onClose: () => {
        navigate("/checkoutStall", {
          state: {
            eventDetail: selectedEvent,
            selectedStall: selectedStall.value,
            eventBanner: eventDetails.banner,
            checkoutType: "buyStall",
          },
        });
      },
    });
  };

  const handleAddToCart = (id) => {
    const selectedEventDetail = eventDetails.eventDetail.find(
      (event) => event.id === id
    );

    if (!selectedEventDetail) {
      console.error("Event not found.");
      return;
    }

    const ticketCount = ticketCounts[id] || 0;
    if (ticketCount === 0) {
      toast.error("Please select at least 1 ticket!");
      return;
    } else if (ticketCount > 3) {
      toast.error("You can only buy a maximum of 3 tickets!");
      return;
    }

    const cartItem = {
      eventId: selectedEventDetail.id,
      eventName: eventDetails.eventName,
      startDate: selectedEventDetail.startDate,
      endDate: selectedEventDetail.endDate,
      location: selectedEventDetail.location.locationName,
      ticketCount: ticketCount,
      ticketPrice: selectedEventDetail.ticketPrice,
      eventBanner: eventDetails.banner,
    };

    addToCart(cartItem);
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      console.log("Fetching event details...");
      try {
        setLoading(true);

        const details = await getEventDetailsAPI(eventId);

        setEventDetails(details);

        if (details?.eventDetail && details.eventDetail.length > 0) {
          for (const eventDetailItem of details.eventDetail) {
            const stallsData = await getAllStallCurrentEvent(
              eventDetailItem.id
            );

            const soldStallNumbers = stallsData.map(
              (stall) => stall.stallNumber
            );

            setSoldStalls((prevSoldStalls) => [
              ...prevSoldStalls,
              ...soldStallNumbers,
            ]);
          }
        } else {
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleStallChange = (eventId, value) => {
    setSelectedStalls((prevStalls) => ({
      ...prevStalls,
      [eventId]: value,
    }));
  };

  const generateStallOptions = (stallCount, eventId) => {
    console.log("Generating stall options:", {
      stallCount,
      eventId,
      soldStalls,
    });
    const options = [];
    let currentStallNumber = 1;

    while (options.length < stallCount) {
      const stallValue = `A${currentStallNumber}`;
      if (
        !soldStalls.includes(stallValue) &&
        (!globalSelectedStalls[eventId] ||
          globalSelectedStalls[eventId] === stallValue)
      ) {
        options.push({ value: stallValue, label: stallValue });
      }
      currentStallNumber++;

      // Safety check to prevent infinite loop
      if (currentStallNumber > stallCount + soldStalls.length + 5) {
        console.error("Failed to generate enough stall options");
        break;
      }
    }

    console.log("Generated options:", options);
    return options;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading event details</div>;
  if (!eventDetails) return <div>No event details found</div>;

  const isEventPast = (startDate) => {
    const currentDateTime = new Date();
    const eventstartDate = new Date(startDate);
    return currentDateTime > eventstartDate;
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
                      {!isEventPast(eventDetail.endDate) && (
                        <div className="select-tickets-block">
                          {eventDetail.ticketForSaleInventory !== 0 && (
                            <div>
                              <div className="select-ticket-action">
                                <div className="ticket-price">
                                  <h5>Giá vé</h5>
                                  <strong>
                                    <PriceFormat
                                      price={eventDetail.ticketPrice}
                                    />
                                    <div className="ticket-remaining">
                                      <p>
                                        Vé còn lại:{" "}
                                        {eventDetail.ticketForSaleInventory}
                                      </p>
                                    </div>
                                  </strong>
                                </div>
                                <div className="quantity">
                                  <div className="counter">
                                    <span
                                      className="down"
                                      onClick={() =>
                                        decreaseCount(eventDetail.id)
                                      }
                                    >
                                      -
                                    </span>
                                    <input
                                      type="text"
                                      value={ticketCounts[eventDetail.id] || 0}
                                      readOnly
                                    />
                                    <span
                                      className="up"
                                      onClick={() =>
                                        increaseCount(eventDetail.id)
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="xtotel-tickets-count">
                                <div className="x-title">
                                  {ticketCounts[eventDetail.id] || 0}x Ticket(s)
                                </div>
                                <h4>
                                  <span>
                                    <PriceFormat
                                      price={
                                        (ticketCounts[eventDetail.id] || 0) *
                                        eventDetail.ticketPrice
                                      }
                                    />
                                  </span>
                                </h4>
                              </div>

                              <div className="booking-btn d-flex justify-content-between mt-4">
                                <button
                                  className="main-btn btn-hover w-50 me-1"
                                  type="button"
                                  onClick={() =>
                                    handleAction(handleBookNow, eventDetail.id)
                                  }
                                >
                                  <strong>Mua Vé!</strong>
                                </button>
                                <button
                                  className="main-btn btn-hover w-50 ms-1"
                                  type="button"
                                  onClick={() =>
                                    handleAction(
                                      handleAddToCart,
                                      eventDetail.id
                                    )
                                  }
                                >
                                  <strong>Thêm giỏ hàng</strong>
                                </button>
                              </div>
                            </div>
                          )}
                          {eventDetail.ticketForSaleInventory === 0 && (
                            <div className="booking-btn mt-2">
                              <button
                                className="main-end-btn w-100"
                                type="button"
                                disabled
                              >
                                <strong>Đã hết Vé</strong>
                              </button>
                            </div>
                          )}
                          {eventDetail.stallForSaleInventory !== 0 && (
                            <div>
                              <div className="select-ticket-action">
                                <div className="ticket-price mt-4">
                                  <h5>Giá gian hàng</h5>
                                  <strong>
                                    <PriceFormat
                                      price={eventDetail.stallPrice}
                                    />
                                    <div className="stall-remaining">
                                      <p>
                                        Gian hàng còn lại:{" "}
                                        {eventDetail.stallForSaleInventory}
                                      </p>
                                    </div>
                                  </strong>
                                </div>
                                <div className="quantity">
                                  <Select
                                    isClearable
                                    onChange={(value) =>
                                      handleStallChange(eventDetail.id, value)
                                    }
                                    options={generateStallOptions(
                                      eventDetail.stallForSaleInventory,
                                      eventDetail.id
                                    )}
                                    placeholder="Chọn gian hàng"
                                    value={
                                      selectedStalls[eventDetail.id] || null
                                    }
                                  />
                                </div>
                              </div>
                              <div className="xtotel-tickets-count">
                                <div className="x-title">
                                  {selectedStalls[eventDetail.id]?.label || "0"}
                                  x Gian Hàng
                                </div>
                                <h4>
                                  <span>
                                    <PriceFormat
                                      price={
                                        selectedStalls[eventDetail.id]
                                          ? eventDetail.stallPrice
                                          : 0
                                      }
                                    />
                                  </span>
                                </h4>
                              </div>
                              <div className="booking-btn mt-2">
                                <button
                                  className="main-btn btn-hover w-100 mt-3"
                                  type="button"
                                  onClick={() =>
                                    handleAction(handleBuyStall, eventDetail.id)
                                  }
                                >
                                  <strong>Mua gian hàng</strong>
                                </button>
                              </div>
                            </div>
                          )}
                          {eventDetail.stallForSaleInventory === 0 && (
                            <div className="booking-btn mt-2">
                              <button
                                className="main-end-btn w-100"
                                type="button"
                                disabled
                              >
                                <strong>Đã hết Gian hàng</strong>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      {isEventPast(eventDetail.endDate) && (
                        <div className="select-tickets-block">
                          <div className="booking-btn mt-2">
                            <button
                              className="main-end-btn w-100"
                              type="button"
                              disabled
                            >
                              <strong>SỰ KIỆN ĐÃ NGỪNG BÁN</strong>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cart />
    </div>
  );
}

export default EventDetails;
