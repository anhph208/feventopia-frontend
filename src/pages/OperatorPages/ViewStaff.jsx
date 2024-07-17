import React, { useEffect, useState } from "react";
import { getAllStafflAPI } from "../../components/services/userServices"; // Make sure the path is correct
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
} from "@mui/material";

const ViewAllStaff = () => {
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const data = await getAllStafflAPI();
        setStaffData(data);
      } catch (error) {
        console.error("There was an error fetching the staff data!", error);
      }
    };

    fetchStaffData();
  }, []);

  return (
    <Box>
      <Box className="d-main-title" marginTop={3} marginBot={3}>
        <Typography variant="h3">
          <i className="fa-solid fa-circle-info me-3"></i>Thông tin Nhân sự
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="staff table" marginTop={3}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Họ Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Vai trò</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>
                  <Avatar
                    src={staff.avatar || "default-avatar-url"}
                    alt={staff.name}
                  />
                </TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>
                  {staff.email || (
                    <Typography color="textSecondary">N/A</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {staff.phoneNumber || (
                    <Typography color="textSecondary">N/A</Typography>
                  )}
                </TableCell>
                <TableCell>{staff.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewAllStaff;
