import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  getLocationAPI,
  addLocationAPI,
  updateLocationAPI,
} from "../../components/services/userServices";

function LocationTab() {
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    id: null,
    locationName: "",
    locationDescription: "",
    capacity: "",
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const data = await getLocationAPI();
    setLocations(data);
  };

  const handleOpen = (
    location = {
      id: null,
      locationName: "",
      locationDescription: "",
      capacity: "",
    }
  ) => {
    setCurrentLocation(location);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentLocation({
      id: null,
      locationName: "",
      locationDescription: "",
      capacity: "",
    });
  };

  const handleSave = async () => {
    if (currentLocation.id) {
      await updateLocationAPI(currentLocation);
    } else {
      await addLocationAPI(currentLocation);
    }
    fetchLocations();
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentLocation({ ...currentLocation, [name]: value });
  };

  return (
    <div>
      <Typography variant="h4" component="div" gutterBottom margin={3}>
        <i className="fa-solid fa-dashboard" />
        <strong>ĐỊA ĐIỂM TỔ CHỨC</strong>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{
          color: "white",
          backgroundColor: "#450b00",
          "&:hover": {
            backgroundColor: "#ff7f50",
          },
        }}
      >
        THÊM ĐỊA ĐIỂM MỚI
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã Địa Điểm</TableCell>
              <TableCell>Tên Địa Điểm</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Sức chứa tối đa</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.id}>
                <TableCell>{location.id}</TableCell>
                <TableCell>{location.locationName}</TableCell>
                <TableCell>{location.locationDescription}</TableCell>
                <TableCell>{location.capacity}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(location)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentLocation.id ? "Cập nhật Địa điểm" : "Thêm Địa điểm mới"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="locationName"
            label="Tên Địa Điểm"
            type="text"
            fullWidth
            value={currentLocation.locationName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="locationDescription"
            label="Mô Tả"
            type="text"
            fullWidth
            value={currentLocation.locationDescription}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="capacity"
            label="Sức chứa tối đa"
            type="number"
            fullWidth
            value={currentLocation.capacity}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LocationTab;
