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
  CircularProgress,
  Stack,
  Pagination,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import {
  getAllAccountAPI,
  getAllUserTransactionAPI,
} from "../../components/services/userServices"; // Adjust the import based on your actual API file
import { formatDateTime, PriceFormat } from "../../utils/tools";
import { toast } from "react-toastify";

function TransactionTab() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedAccountTransactions, setSelectedAccountTransactions] = useState([]);
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
  const [transactionPageNumber, setTransactionPageNumber] = useState(1);
  const [transactionRowsPerPage, setTransactionRowsPerPage] = useState(10);
  const [transactionTotalPages, setTransactionTotalPages] = useState(0);
  const [transactionTotalRows, setTransactionTotalRows] = useState(0);

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
      toast.error("Error fetching accounts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(1);
  };

  const handleViewTransactions = async (accountId, page, pageSize) => {
    try {
      const { data, pagination } = await getAllUserTransactionAPI(accountId, page, pageSize);
      setSelectedAccountTransactions(data);
      setTransactionTotalRows(pagination.TotalCount);
      setTransactionTotalPages(pagination.TotalPages);
      setTransactionPageNumber(page);
      setTransactionRowsPerPage(pageSize);
      setTransactionDialogOpen(true);
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      toast.error("Error fetching user transactions. Please try again.");
    }
  };

  const handleTransactionPageChange = (event, newPage) => {
    setTransactionPageNumber(newPage);
    loadTransactionData(newPage, transactionRowsPerPage);
  };

  const handleTransactionRowsPerPageChange = (event) => {
    const pageSize = parseInt(event.target.value, 10);
    setTransactionRowsPerPage(pageSize);
    setTransactionPageNumber(1);
    loadTransactionData(1, pageSize);
  };

  const loadTransactionData = async (page, pageSize) => {
    try {
      const { data, pagination } = await getAllUserTransactionAPI(
        selectedAccountTransactions[0].accountID, // Use the correct account ID
        page,
        pageSize
      );
      setSelectedAccountTransactions(data);
      setTransactionTotalRows(pagination.TotalCount);
      setTransactionTotalPages(pagination.TotalPages);
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      toast.error("Error fetching user transactions. Please try again.");
    }
  };

  const handleCloseTransactionDialog = () => {
    setTransactionDialogOpen(false);
    setSelectedAccountTransactions([]);
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
      <Typography variant="h4" component="div" gutterBottom>
        <i className="fa-solid fa-user" />
        <strong>GIAO DỊCH CỦA TÀI KHOẢN</strong>
      </Typography>

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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewTransactions(account.id, 1, 10)}
                      sx={{
                        mt: 1,
                        color: "white",
                        backgroundColor: "#450b00",
                        "&:hover": {
                          backgroundColor: "#ff7f50",
                        },
                      }}
                    >
                      XEM GIAO DỊCH
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

      <Dialog
        open={transactionDialogOpen}
        onClose={handleCloseTransactionDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Thông tin giao dịch</DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Loại giao dịch</TableCell>
                  <TableCell>Số tiền</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Ngày giao dịch</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedAccountTransactions.map((transaction, index) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{transaction.transactionType}</TableCell>
                    <TableCell>
                      <PriceFormat price={transaction.amount} />
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{formatDateTime(transaction.transactionDate)}</TableCell>
                    <TableCell>
                      {transaction.status ? (
                        <CheckCircle style={{ color: "green" }} />
                      ) : (
                        <Cancel style={{ color: "red" }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} className="pagination-controls mt-4 mb-4">
            <Pagination
              count={transactionTotalPages}
              page={transactionPageNumber}
              onChange={handleTransactionPageChange}
              rowsPerPageOptions={[5, 10, 20]}
              rowsPerPage={transactionRowsPerPage}
              onRowsPerPageChange={handleTransactionRowsPerPageChange}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTransactionDialog} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TransactionTab;
