import React, { useState, useEffect } from "react";
import {
  getEventDetailsAPI,
  createEventDetailsAPI,
  putUpdateEventDetailsAPI,
  getLocationAPI,
} from "../../components/services/userServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateTime, PriceFormat } from "../../utils/tools";
import Select from "react-select";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import Datetime from "react-datetime";
import dayjs from "dayjs";
import "react-datetime/css/react-datetime.css";

function EventDetailsOperator() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationCapacity, setLocationCapacity] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [newEventDetails, setNewEventDetails] = useState({
    eventID: eventId,
    locationID: "",
    startDate: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    endDate: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    ticketForSaleInventory: 0,
    stallForSaleInventory: 0,
    stallPrice: 0,
    ticketPrice: 0,
    processModel: "", // Ensure processModel is included
  });
  const [updateEventDetails, setUpdateEventDetails] = useState({
    id: "",
    eventID: eventId,
    locationID: "",
    startDate: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    endDate: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    ticketForSaleInventory: 0,
    stallForSaleInventory: 0,
    stallPrice: 0,
    ticketPrice: 0,
    processModel: "", // Ensure processModel is included
  });
  const [originalUpdateDetails, setOriginalUpdateDetails] = useState(null);

  const handleClickOpenAdd = () => {
    if (eventDetails.status !== "PREPARATION") {
      toast.error(
        "Sự kiện chỉ có thể thêm Chi tiết khi chuyển sang trạng thái PREPARATION."
      );
      return;
    }
    setOpenAddDialog(true);
  };
  const handleCloseAdd = () => setOpenAddDialog(false);

  const handleClickOpenUpdate = (eventDetail) => {
    if (eventDetails.status !== "PREPARATION") {
      toast.error(
        "Sự kiện chỉ có thể Cập nhật chi tiết khi ở trạng thái PREPARATION."
      );
      return;
    }
    const detail = {
      id: eventDetail.id,
      eventID: eventId,
      locationID: eventDetail.location.id,
      startDate: dayjs(eventDetail.startDate).format("YYYY-MM-DDTHH:mm:ss"),
      endDate: dayjs(eventDetail.endDate).format("YYYY-MM-DDTHH:mm:ss"),
      ticketForSaleInventory: eventDetail.ticketForSaleInventory,
      stallForSaleInventory: eventDetail.stallForSaleInventory,
      stallPrice: eventDetail.stallPrice,
      ticketPrice: eventDetail.ticketPrice,
      processModel: eventDetail.processModel || "", // Ensure processModel is included
    };
    setUpdateEventDetails(detail);
    setOriginalUpdateDetails(detail);
    setOpenUpdateDialog(true);
  };
  const handleCloseUpdate = () => setOpenUpdateDialog(false);

  const handleChange = (e, isUpdate = false) => {
    const { name, value } = e.target;
    if (isUpdate) {
      setUpdateEventDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    } else {
      setNewEventDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleLocationChange = (selectedOption, isUpdate = false) => {
    const selectedLocation = locations.find(
      (location) => location.value === selectedOption.value
    );
    setLocationCapacity(selectedLocation.capacity || 0);
    if (isUpdate) {
      setUpdateEventDetails((prevDetails) => ({
        ...prevDetails,
        locationID: selectedOption.value,
        ticketForSaleInventory: selectedLocation.capacity || 0,
      }));
    } else {
      setNewEventDetails((prevDetails) => ({
        ...prevDetails,
        locationID: selectedOption.value,
        ticketForSaleInventory: selectedLocation.capacity || 0,
      }));
    }
  };

  const handleAddNewEventDetails = async () => {
    if (!validateDates(newEventDetails.startDate, newEventDetails.endDate)) {
      return;
    }

    try {
      await createEventDetailsAPI(newEventDetails);
      toast.success("Event details added successfully!");
      handleCloseAdd();
    } catch (error) {
      toast.error("Failed to add event details.");
    }
  };

  const handleUpdateEventDetails = async () => {
    if (
      !validateDates(updateEventDetails.startDate, updateEventDetails.endDate)
    ) {
      return;
    }

    if (
      JSON.stringify(updateEventDetails) ===
      JSON.stringify(originalUpdateDetails)
    ) {
      toast.info("No changes detected.");
      return;
    }

    try {
      await putUpdateEventDetailsAPI(updateEventDetails.id, updateEventDetails);
      toast.success("Event details updated successfully!");
      handleCloseUpdate();
    } catch (error) {
      toast.error("Failed to update event details.");
    }
  };

  const validateDates = (startDate, endDate) => {
    const now = dayjs();
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (start.isBefore(now)) {
      toast.error("Ngày Bắt đầu phải từ hôm nay.");
      return false;
    }

    if (end.isBefore(start)) {
      toast.error("Ngày Kết thúc phải sau ngày bắt đầu.");
      return false;
    }

    return true;
  };

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

  const handleDateChange = (date, isUpdate = false, field) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
    if (isUpdate) {
      setUpdateEventDetails((prevDetails) => ({
        ...prevDetails,
        [field]: formattedDate,
      }));
    } else {
      setNewEventDetails((prevDetails) => ({
        ...prevDetails,
        [field]: formattedDate,
      }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading event details</div>;
  if (!eventDetails) return <div>No event details found</div>;

  const isEventPast = (endDate) => {
    const currentDateTime = dayjs();
    const eventEndDate = dayjs(endDate);
    return currentDateTime.isAfter(eventEndDate);
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
                <div className="container mt-4">
                  <Button
                    className="main-btn btn-hover w-100 mt-3"
                    variant="contained"
                    onClick={handleClickOpenAdd}
                    sx={{
                      color: "white",
                      backgroundColor: "#450b00",
                      "&:hover": {
                        backgroundColor: "#ff7f50",
                      },
                    }}
                  >
                    THÊM CHI TIẾT SỰ KIỆN
                  </Button>
                </div>
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
                            <button
                              className="main-btn btn-hover w-100 mt-3"
                              type="button"
                              onClick={() => handleClickOpenUpdate(eventDetail)}
                            >
                              <strong>Cập nhật Chi tiết Sự kiện</strong>
                            </button>
                          </div>
                        </div>
                      )}
                      {isEventPast(eventDetail.endDate) && (
                        <div className="select-tickets-block">
                          <div className="booking-btn mt-2">
                            <button
                              className="main-btn btn-hover w-100 mt-3"
                              type="button"
                              onClick={() => handleClickOpenUpdate(eventDetail)}
                            >
                              <strong>CẬP NHẬT CHI TIẾT SỰ KIỆN</strong>
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

      <Dialog open={openAddDialog} onClose={handleCloseAdd}>
        <DialogTitle>THÊM MỚI CHI TIẾT SỰ KIỆN</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                options={locations}
                onChange={(option) => handleLocationChange(option, false)}
                value={locations.find(
                  (option) => option.value === newEventDetails.locationID
                )}
                placeholder="Select Location"
                required
                styles={{
                  control: (base) => ({
                    ...base,
                    marginTop: "16px",
                  }),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Datetime
                value={dayjs(newEventDetails.startDate).toDate()}
                onChange={(date) => handleDateChange(date, false, "startDate")}
                dateFormat="DD/MM/YYYY"
                timeFormat="HH:mm"
                inputProps={{ placeholder: "HH:mm DD/MM/YYYY" }}
                closeOnSelect
              />
            </Grid>
            <Grid item xs={12}>
              <Datetime
                value={dayjs(newEventDetails.endDate).toDate()}
                onChange={(date) => handleDateChange(date, false, "endDate")}
                dateFormat="DD/MM/YYYY"
                timeFormat="HH:mm"
                inputProps={{ placeholder: "HH:mm DD/MM/YYYY" }}
                closeOnSelect
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="ticketForSaleInventory"
                label="Số lượng vé mở bán"
                type="number"
                fullWidth
                variant="standard"
                value={newEventDetails.ticketForSaleInventory}
                onChange={(e) => handleChange(e, false)}
                InputProps={{
                  inputProps: {
                    max: locationCapacity,
                  },
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="stallForSaleInventory"
                label="Số lượng gian hàng mở bán"
                type="number"
                fullWidth
                variant="standard"
                value={newEventDetails.stallForSaleInventory}
                onChange={(e) => handleChange(e, false)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="stallPrice"
                label="Giá bán Gian hàng"
                type="number"
                fullWidth
                variant="standard"
                value={newEventDetails.stallPrice}
                onChange={(e) => handleChange(e, false)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="ticketPrice"
                label="Giá bán vé"
                type="number"
                fullWidth
                variant="standard"
                value={newEventDetails.ticketPrice}
                onChange={(e) => handleChange(e, false)}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>HỦY</Button>
          <Button onClick={handleAddNewEventDetails}>THÊM MỚI</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdateDialog} onClose={handleCloseUpdate}>
        <DialogTitle>CẬP NHẬT CHI TIẾT SỰ KIỆN</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                options={locations}
                onChange={(option) => handleLocationChange(option, true)}
                value={locations.find(
                  (option) => option.value === updateEventDetails.locationID
                )}
                placeholder="Select Location"
                required
                styles={{
                  control: (base) => ({
                    ...base,
                    marginTop: "16px",
                  }),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Datetime
                value={dayjs(updateEventDetails.startDate).toDate()}
                onChange={(date) => handleDateChange(date, true, "startDate")}
                dateFormat="DD/MM/YYYY"
                timeFormat="HH:mm"
                inputProps={{ placeholder: "HH:mm DD/MM/YYYY" }}
                closeOnSelect
              />
            </Grid>
            <Grid item xs={12}>
              <Datetime
                value={dayjs(updateEventDetails.endDate).toDate()}
                onChange={(date) => handleDateChange(date, true, "endDate")}
                dateFormat="DD/MM/YYYY"
                timeFormat="HH:mm"
                inputProps={{ placeholder: "HH:mm DD/MM/YYYY" }}
                closeOnSelect
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="ticketForSaleInventory"
                label="Số lượng vé mở bán"
                type="number"
                fullWidth
                variant="standard"
                value={updateEventDetails.ticketForSaleInventory}
                onChange={(e) => handleChange(e, true)}
                InputProps={{
                  inputProps: {
                    max: locationCapacity,
                  },
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="stallForSaleInventory"
                label="Số lượng Gian hàng mở bán"
                type="number"
                fullWidth
                variant="standard"
                value={updateEventDetails.stallForSaleInventory}
                onChange={(e) => handleChange(e, true)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="stallPrice"
                label="Giá bán Gian hàng"
                type="number"
                fullWidth
                variant="standard"
                value={updateEventDetails.stallPrice}
                onChange={(e) => handleChange(e, true)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="ticketPrice"
                label="Giá bán vé"
                type="number"
                fullWidth
                variant="standard"
                value={updateEventDetails.ticketPrice}
                onChange={(e) => handleChange(e, true)}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>HỦY</Button>
          <Button onClick={handleUpdateEventDetails}>CẬP NHẬT</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventDetailsOperator;
