import React, { useState, useEffect } from "react";
import {
  getEventDetailsAPI,
  createEventDetailsAPI,
  putUpdateEventDetailsAPI,
  getLocationAPI,
  DeleteEventAPI,
} from "../../components/services/userServices";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateTime, PriceFormat } from "../../utils/tools";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  DialogContentText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function EventDetailsOperator() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationCapacity, setLocationCapacity] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [eventDetailToDelete, seteventDetailToDelete] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newEventDetails, setNewEventDetails] = useState({
    eventID: eventId,
    locationID: "",
    startDate: dayjs(),
    endDate: dayjs(),
    ticketForSaleInventory: "",
    stallForSaleInventory: "",
    stallPrice: "",
    ticketPrice: "",
    processModel: "", // Ensure processModel is included
  });
  const [updateEventDetails, setUpdateEventDetails] = useState({
    id: "",
    eventID: eventId,
    locationID: "",
    startDate: dayjs(),
    endDate: dayjs(),
    ticketForSaleInventory: "",
    stallForSaleInventory: "",
    stallPrice: "",
    ticketPrice: "",
    processModel: "", // Ensure processModel is included
  });
  const [originalUpdateDetails, setOriginalUpdateDetails] = useState(null);
  const [errors, setErrors] = useState({
    ticketForSaleInventory: false,
    stallForSaleInventory: false,
    stallPrice: false,
    ticketPrice: false,
  });

  const handleClickOpenAdd = () => {
    if (eventDetails.status !== "PREPARATION") {
      toast.error(
        "Sự kiện chỉ có thể thêm Chi tiết khi chuyển sang  GIAI ĐOẠN CHUẨN BỊ."
      );
      return;
    }
    setOpenAddDialog(true);
  };
  const handleCloseAdd = () => setOpenAddDialog(false);

  const handleClickOpenUpdate = (eventDetail) => {
    if (eventDetails.status !== "PREPARATION") {
      toast.error(
        "Sự kiện chỉ có thể Cập nhật chi tiết khi ở GIAI ĐOẠN CHUẨN BỊ."
      );
      return;
    }
    const detail = {
      id: eventDetail.id,
      eventID: eventId,
      locationID: eventDetail.location.id,
      startDate: dayjs(eventDetail.startDate),
      endDate: dayjs(eventDetail.endDate),
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

    if (value < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: true,
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }

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

  const handleLocationChange = (e, isUpdate = false) => {
    const selectedLocation = locations.find(
      (location) => location.id === e.target.value
    );
    setLocationCapacity(selectedLocation.capacity || 0);
    if (isUpdate) {
      setUpdateEventDetails((prevDetails) => ({
        ...prevDetails,
        locationID: selectedLocation.id,
        ticketForSaleInventory: selectedLocation.capacity || 0,
      }));
    } else {
      setNewEventDetails((prevDetails) => ({
        ...prevDetails,
        locationID: selectedLocation.id,
        ticketForSaleInventory: selectedLocation.capacity || 0,
      }));
    }
  };

  const handleAddNewEventDetails = async () => {
    if (!validateDates(newEventDetails.startDate, newEventDetails.endDate)) {
      return;
    }

    const formattedNewEventDetails = {
      ...newEventDetails,
      startDate: newEventDetails.startDate.format("YYYY-MM-DDTHH:mm:ss"),
      endDate: newEventDetails.endDate.format("YYYY-MM-DDTHH:mm:ss"),
    };

    try {
      await createEventDetailsAPI(formattedNewEventDetails);
      toast.success("Thêm Chi tiết Sự kiện Thành công!");
      handleCloseAdd();
      navigate(0);
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

    const formattedUpdateEventDetails = {
      ...updateEventDetails,
      startDate: updateEventDetails.startDate.format("YYYY-MM-DDTHH:mm:ss"),
      endDate: updateEventDetails.endDate.format("YYYY-MM-DDTHH:mm:ss"),
    };

    try {
      await putUpdateEventDetailsAPI(
        updateEventDetails.id,
        formattedUpdateEventDetails
      );
      toast.success("Cập nhật Chi tiết Sự kiện Thành công!!");
      handleCloseUpdate();
      navigate(0);
    } catch (error) {
      toast.error("Failed to update event details.");
    }
  };

  const validateDates = (startDate, endDate) => {
    const now = dayjs();
    if (startDate.isBefore(now)) {
      toast.error("Ngày Bắt đầu phải từ hôm nay.");
      return false;
    }

    if (endDate.isBefore(startDate)) {
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
        setLocations(locationData);
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };

    fetchEventDetails();
    fetchLocations();
  }, [eventId]);

  const handleDateChange = (date, isUpdate = false, field) => {
    if (isUpdate) {
      setUpdateEventDetails((prevDetails) => ({
        ...prevDetails,
        [field]: date,
      }));
    } else {
      setNewEventDetails((prevDetails) => ({
        ...prevDetails,
        [field]: date,
      }));
    }
  };

  const handleDeleteClick = (eventDetail) => {
    seteventDetailToDelete(eventDetail);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await DeleteEventAPI(eventDetailToDelete.id);
      setDeleteOpen(false);
      seteventDetailToDelete(null);
      toast.success("Xóa Chi tiết Sự kiện Thành công!!");
      navigate(0);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
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
                          <div className="booking-btn mt-2">
                            <button
                              className="main-btn btn-hover w-100 mt-3"
                              type="button"
                              onClick={() => handleDeleteClick(eventDetail)}
                            >
                              <strong>Xóa Chi tiết Sự kiện</strong>
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
          <Grid container spacing={2}
          marginTop={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>

                <TextField
                  select
                  value={newEventDetails.locationID}
                  onChange={(e) => handleLocationChange(e, false)}
                  label="Chọn Địa điểm tổ chức"
                  required
                >
                  {locations.map((location) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.locationName}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Ngày bắt đầu"
                  value={newEventDetails.startDate}
                  onChange={(date) => handleDateChange(date, false, "startDate")}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={dayjs()} // Prevent selecting past dates
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Ngày kết thúc"
                  value={newEventDetails.endDate}
                  onChange={(date) => handleDateChange(date, false, "endDate")}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={newEventDetails.startDate} // Ensure end date is after start date
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="ticketForSaleInventory"
                label="Số lượng vé mở bán"
                type="number"
                fullWidth
                variant="outlined"
                value={newEventDetails.ticketForSaleInventory}
                onChange={(e) => handleChange(e, false)}
                error={errors.ticketForSaleInventory}
                helperText={
                  errors.ticketForSaleInventory
                    ? "Số lượng vé mở bán không thể là số âm"
                    : ""
                }
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
                name="ticketPrice"
                label="Giá bán vé"
                type="number"
                fullWidth
                variant="outlined"
                value={newEventDetails.ticketPrice}
                onChange={(e) => handleChange(e, false)}
                error={errors.ticketPrice}
                helperText={
                  errors.ticketPrice ? "Giá bán vé không thể là số âm" : ""
                }
                required
              />
              <Typography variant="body2">
                Sô tiền nhập:{" "}
                <PriceFormat
                  price={parseInt(newEventDetails.ticketPrice, 10)}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="stallForSaleInventory"
                label="Số lượng gian hàng mở bán"
                type="number"
                fullWidth
                variant="outlined"
                value={newEventDetails.stallForSaleInventory}
                onChange={(e) => handleChange(e, false)}
                error={errors.stallForSaleInventory}
                helperText={
                  errors.stallForSaleInventory
                    ? "Số lượng gian hàng mở bán không thể là số âm"
                    : ""
                }
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
                variant="outlined"
                value={newEventDetails.stallPrice}
                onChange={(e) => handleChange(e, false)}
                error={errors.stallPrice}
                helperText={
                  errors.stallPrice
                    ? "Giá bán Gian hàng không thể là số âm"
                    : ""
                }
                required
              />
              <Typography variant="body2">
                Sô tiền nhập:{" "}
                <PriceFormat price={parseInt(newEventDetails.stallPrice, 10)} />
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAdd}
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            HỦY
          </Button>
          <Button
            onClick={handleAddNewEventDetails}
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            THÊM MỚI
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdateDialog} onClose={handleCloseUpdate}>
        <DialogTitle>CẬP NHẬT CHI TIẾT SỰ KIỆN</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                
                <Select
                  value={updateEventDetails.locationID}
                  onChange={(e) => handleLocationChange(e, true)}
                  label="Chọn Địa điểm tổ chức"
                  required
                >
                  {locations.map((location) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.locationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Ngày bắt đầu"
                  value={updateEventDetails.startDate}
                  onChange={(date) => handleDateChange(date, true, "startDate")}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={dayjs()} // Prevent selecting past dates
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Ngày kết thúc"
                  value={updateEventDetails.endDate}
                  onChange={(date) => handleDateChange(date, true, "endDate")}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={updateEventDetails.startDate} // Ensure end date is after start date
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="ticketForSaleInventory"
                label="Số lượng vé mở bán"
                type="number"
                fullWidth
                variant="outlined"
                value={updateEventDetails.ticketForSaleInventory}
                onChange={(e) => handleChange(e, true)}
                error={errors.ticketForSaleInventory}
                helperText={
                  errors.ticketForSaleInventory
                    ? "Số lượng vé mở bán không thể là số âm"
                    : ""
                }
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
                name="ticketPrice"
                label="Giá bán vé"
                type="number"
                fullWidth
                variant="outlined"
                value={updateEventDetails.ticketPrice}
                onChange={(e) => handleChange(e, true)}
                error={errors.ticketPrice}
                helperText={
                  errors.ticketPrice ? "Giá bán vé không thể là số âm" : ""
                }
                required
              />
              <Typography variant="body2">
                Sô tiền nhập:{" "}
                <PriceFormat
                  price={parseInt(updateEventDetails.ticketPrice, 10)}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="stallForSaleInventory"
                label="Số lượng Gian hàng mở bán"
                type="number"
                fullWidth
                variant="outlined"
                value={updateEventDetails.stallForSaleInventory}
                onChange={(e) => handleChange(e, true)}
                error={errors.stallForSaleInventory}
                helperText={
                  errors.stallForSaleInventory
                    ? "Số lượng gian hàng mở bán không thể là số âm"
                    : ""
                }
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
                variant="outlined"
                value={updateEventDetails.stallPrice}
                onChange={(e) => handleChange(e, true)}
                error={errors.stallPrice}
                helperText={
                  errors.stallPrice
                    ? "Giá bán Gian hàng không thể là số âm"
                    : ""
                }
                required
              />
              <Typography variant="body2">
                Sô tiền nhập:{" "}
                <PriceFormat
                  price={parseInt(updateEventDetails.stallPrice, 10)}
                />
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseUpdate}
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            HỦY
          </Button>
          <Button
            onClick={handleUpdateEventDetails}
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            CẬP NHẬT
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận Hủy sự kiện</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-title">
            Bạn có chắc chắn muốn hủy sự kiện này?
          </DialogContentText>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={handleTermsChange}
                color="primary"
              />
            }
            label="Tôi đồng ý xóa Chi tiết Sự kiện này"
          />
          
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            disabled={!termsAccepted}
            sx={{
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
            onClick={handleConfirmDelete}
          >
            Xác nhận
          </Button>
          <Button
            variant="outlined"
            onClick={() => setDeleteOpen(false)}
            sx={{
              borderColor: "#450b00",
              color: "#450b00",
              "&:hover": {
                borderColor: "#ff7f50",
                color: "#ff7f50",
              },
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventDetailsOperator;
