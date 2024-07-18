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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Stack,
  Pagination,
  Avatar,
  Typography,
  Icon,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import {
  getAllAccountAPI,
  signupInternalAPI,
} from "../../components/services/userServices"; // Adjust the import based on your actual API file
import { PriceFormat } from "../../utils/tools";

function UserTab() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchAccounts(pageNumber, rowsPerPage);
  }, [pageNumber, rowsPerPage]);

  const fetchAccounts = async (pageNumber, pageSize) => {
    setLoading(true);
    try {
      const { data, pagination } = await getAllAccountAPI(pageNumber, pageSize);
      setAccounts(data);
      setTotalRows(pagination.TotalCount);
      setTotalPages(pagination.TotalPages);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
    setLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewAccount({ name: "", username: "", email: "", role: "" });
  };

  const handleSave = async () => {
    try {
      await signupInternalAPI(newAccount.role, {
        name: newAccount.name,
        username: newAccount.username,
        email: newAccount.email,
      });
      fetchAccounts(pageNumber, rowsPerPage);
      handleClose();
    } catch (error) {
      console.error("Error saving account:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(1);
  };

  const roleColors = {
    EVENTOPERATOR: "#2196f3", // Blue
    VISITOR: "#4caf50", // Green
    ADMIN: "#f44336", // Orange
    CHECKINGSTAFF: "#ff9800", // Red
    SPONSOR: "#9c27b0", // Purple
  };

  return (
    <div>
      <Typography variant="h4" component="div" gutterBottom margin={3}>
        <i className="fa-solid fa-user" />
        <strong>TÀI KHOẢN</strong>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          color: "white",
          backgroundColor: "#450b00",
          "&:hover": {
            backgroundColor: "#ff7f50",
          },
        }}
      >
        THÊM MỚI TÀI KHOẢN
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Họ Tên</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số Dư ví</TableCell>
                <TableCell>Vai trò</TableCell>
                <TableCell>Xác nhận Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <Avatar src={account.avatar || "default-avatar-url"} />
                  </TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.phoneNumber}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>
                    <PriceFormat price={account.creditAmount} />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      style={{
                        color: roleColors[account.role] || "black",
                        fontWeight: "bold",
                      }}
                    >
                      {account.role}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {account.emailConfirmed ? (
                      <CheckCircle style={{ color: "green" }} />
                    ) : (
                      <Cancel style={{ color: "red" }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Stack spacing={2} className="pagination-controls mt-4 mb-4">
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
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>THÊM MỚI TÀI KHOẢN</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Họ Tên"
            type="text"
            fullWidth
            value={newAccount.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={newAccount.username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={newAccount.email}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Vai trò</InputLabel>
            <Select name="role" value={newAccount.role} onChange={handleChange}>
              <MenuItem value="EVENTOPERATOR">Event Operator</MenuItem>
              <MenuItem value="VISITOR">Visitor</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="CHECKINGSTAFF">Checking Staff</MenuItem>
              <MenuItem value="SPONSOR">Sponsor</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserTab;
