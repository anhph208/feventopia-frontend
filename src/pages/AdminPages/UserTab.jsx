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
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import {
  getAllAccountAPI,
  signupInternalAPI,
  unactivateAccountAPI,
  reactivateAccountAPI,
  updateAllAccountlAPI,
} from "../../components/services/userServices"; // Adjust the import based on your actual API file
import { PriceFormat } from "../../utils/tools";
import { toast } from "react-toastify";

function UserTab() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
  });
  const [updateAccount, setUpdateAccount] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
    avatar: "",
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

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

  const handleUpdateOpen = (account) => {
    setUpdateAccount(account);
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
    setUpdateAccount({
      id: "",
      name: "",
      phoneNumber: "",
      email: "",
      avatar: "null",
    });
  };

  const handleUpdateSave = async () => {
    try {
      await updateAllAccountlAPI(updateAccount.id, {
        name: updateAccount.name,
        phoneNumber: updateAccount.phoneNumber,
        email: updateAccount.email,
        avatar: updateAccount.avatar,
      });
      fetchAccounts(pageNumber, rowsPerPage);
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateAccount({ ...updateAccount, [name]: value });
  };

  const handleStatusChange = async (accountId, isActive) => {
    setSelectedAccountId(accountId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    try {
      if (selectedAccountId !== null) {
        const account = accounts.find((acc) => acc.id === selectedAccountId);
        if (account) {
          if (account.deleteFlag) {
            await reactivateAccountAPI(selectedAccountId);
          } else {
            await unactivateAccountAPI(selectedAccountId);
          }
          fetchAccounts(pageNumber, rowsPerPage);
        }
      }
    } catch (error) {
      const status = error.response.status;
      if (status === 401) {
        toast.error("Bạn không thể Hủy kích hoạt tài khoản chính mình!");
      } else if (status === 500) {
        toast.error("Lỗi hệ thống. Vui lòng thử lại.");
      } else {
        toast.error("Lỗi. Vui lòng thử lại");
      }
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setSelectedAccountId(null);
  };

  const roleColors = {
    EVENTOPERATOR: "#2196f3",
    VISITOR: "#4caf50",
    ADMIN: "#f44336",
    CHECKINGSTAFF: "#ff9800",
    SPONSOR: "#9c27b0",
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
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
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
                  <TableCell>
                    {account.deleteFlag ? (
                      <Cancel style={{ color: "red" }} />
                    ) : (
                      <CheckCircle style={{ color: "green" }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateOpen(account)}
                      sx={{
                        mt: 1,
                        color: "white",
                        backgroundColor: "#450b00",
                        "&:hover": {
                          backgroundColor: "#ff7f50",
                        },
                      }}
                    >
                      SỬA
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        handleStatusChange(account.id, !account.deleteFlag)
                      }
                      sx={{
                        color: "white",
                        backgroundColor: account.deleteFlag
                          ? "#4caf50"
                          : "#f44336", // Green for "Kích hoạt lại", Red for "Hủy kích hoạt"
                        "&:hover": {
                          backgroundColor: account.deleteFlag
                            ? "#388e3c"
                            : "#d32f2f", // Darker shades for hover effect
                        },
                      }}
                    >
                      {account.deleteFlag ? "Kích hoạt lại" : "Hủy kích hoạt"}
                    </Button>
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

      <Dialog open={openUpdate} onClose={handleUpdateClose}>
        <DialogTitle>Cập Nhật tài khoản</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Họ Tên"
            type="text"
            fullWidth
            value={updateAccount.name}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="dense"
            name="phoneNumber"
            label="Số điện thoại"
            type="text"
            fullWidth
            value={updateAccount.phoneNumber}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={updateAccount.email}
            onChange={handleUpdateChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdateClose}
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
            onClick={handleUpdateSave}
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

      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>
          {selectedAccountId !== null &&
          accounts.find((acc) => acc.id === selectedAccountId) &&
          accounts.find((acc) => acc.id === selectedAccountId).deleteFlag
            ? "Confirm Reactivate Account"
            : "Confirm Unactivate Account"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {selectedAccountId !== null &&
            accounts.find((acc) => acc.id === selectedAccountId) &&
            accounts.find((acc) => acc.id === selectedAccountId).deleteFlag
              ? "Bạn có chắc chắn muốn kích hoạt lại tài khoản này không?"
              : "Bạn có chắc chắn muốn hủy kích hoạt tài khoản này không?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirmDialog}
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
            onClick={handleConfirmStatusChange}
            color="primary"
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Xác Nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserTab;
