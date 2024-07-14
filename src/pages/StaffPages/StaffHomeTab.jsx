import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfileAPI,
  getAllProfileTransactionAPI,
  getAllTaskByUsernameAPI,
  putUpdateTaskByUsernameAPI,
} from "../../components/services/userServices";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { formatDate, PriceFormat } from "../../utils/tools.js";

const StaffHomeTab = ({ initialProfile }) => {
  const [profile, setProfile] = useState(initialProfile || {});
  const [loading, setLoading] = useState(!initialProfile);
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [actualCost, setActualCost] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!initialProfile) {
      const fetchProfile = async () => {
        try {
          const profileData = await getProfileAPI(token);
          setProfile(profileData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setLoading(false);
          toast.error("Error fetching profile");
        }
      };

      fetchProfile();
    }
  }, [initialProfile, token]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { transactions, pagination } = await getAllProfileTransactionAPI(
          page,
          10
        );
        setTransactions(transactions);
        setTotalPages(pagination.TotalPages);
        setLoadingTransactions(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoadingTransactions(false);
        toast.error("Error fetching transactions");
      }
    };

    fetchTransactions();
  }, [page]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getAllTaskByUsernameAPI(username);
        setTasks(tasksData);
        setLoadingTasks(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoadingTasks(false);
        toast.error("Error fetching tasks");
      }
    };

    if (username) {
      fetchTasks();
    } else {
      console.error("Username not found in localStorage");
      setLoadingTasks(false);
    }
  }, [username]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleUpdateStatus = async () => {
    if (!selectedTask) return;

    // Validate actualCost if status is "DONE"
    if (status === "DONE" && !actualCost) {
      toast.error("Chi phí thực tế là bắt buộc khi trạng thái là DONE");
      return;
    }

    // Prevent status reversal or invalid status updates
    if (
      (selectedTask.status === "DONE" && status !== "DONE") ||
      (selectedTask.status === "INPROGRESS" && status === "TODO")
    ) {
      toast.error("Bạn không thể quay lại trạng thái trước đó");
      return;
    }

    try {
      await putUpdateTaskByUsernameAPI(selectedTask.id, status, actualCost);
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? { ...task, status, actualCost } : task
        )
      );
      toast.success("Cập nhật trạng thái nhiệm vụ thành công!");
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Error updating task status");
    }
  };

  const openUpdateDialog = (task) => {
    setSelectedTask(task);
    setActualCost(task.actualCost || "");
    setStatus(task.status || "");
    setOpenDialog(true);
  };

  const closeUpdateDialog = () => {
    setSelectedTask(null);
    setActualCost("");
    setStatus("");
    setOpenDialog(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tab-content" id="myTabContent">
      <div
        className="tab-pane fade active show"
        id="feed"
        role="tabpanel"
        aria-labelledby="feed-tab"
      >
        <div className="nav my-event-tabs mt-4" role="tablist">
          <button
            className="event-link active"
            data-bs-toggle="tab"
            data-bs-target="#wallet"
            type="button"
            role="tab"
            aria-controls="wallet"
            aria-selected="true"
          >
            <span>NHIỆM VỤ</span>
          </button>
          <button
            className="event-link"
            data-bs-toggle="tab"
            data-bs-target="#allTransactions"
            type="button"
            role="tab"
            aria-controls="allTransactions"
            aria-selected="false"
          >
            <span>NHIỆM VỤ HOÀN THÀNH</span>
          </button>
          <button
            className="event-link"
            data-bs-toggle="tab"
            data-bs-target="#feedback"
            type="button"
            role="tab"
            aria-controls="feedback"
            aria-selected="false"
          >
            <span>SỰ KIỆN VÀ VÉ ĐÃ CHECKIN</span>
          </button>
        </div>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="wallet"
            role="tabpanel"
          >
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mt-4">
                  <div className="card-top p-4">
                    <div className="card-event-dt">
                      <h5>NHIỆM VỤ ĐƯỢC GIAO</h5>
                      {loadingTasks ? (
                        <div>Loading tasks...</div>
                      ) : tasks.length > 0 ? (
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 820 }}
                            aria-label="tasks table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Nhiệm Vụ</TableCell>
                                <TableCell>Chi phí dự kiến</TableCell>
                                <TableCell>Chi phí thực tế</TableCell>
                                <TableCell>Ngày Giao</TableCell>
                                <TableCell>Ngày Cập nhật</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Hành động</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {tasks.map((task) => (
                                <TableRow key={task.id}>
                                  <TableCell>{task.description}</TableCell>
                                  <TableCell>
                                    <PriceFormat price={task.planCost} />
                                  </TableCell>
                                  <TableCell>
                                    <PriceFormat price={task.actualCost} />
                                  </TableCell>
                                  <TableCell>
                                    {formatDate(task.createdDate)}
                                  </TableCell>
                                  <TableCell>
                                    {formatDate(task.updatedDate)}
                                  </TableCell>
                                  <TableCell>{task.status}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => openUpdateDialog(task)}
                                      disabled={task.status === "DONE"}
                                      sx={{
                                        color:
                                          task.status !== "DONE"
                                            ? "white"
                                            : "gray",
                                        backgroundColor:
                                          task.status !== "DONE"
                                            ? "#450b00"
                                            : "#cccccc",
                                        "&:hover": {
                                          backgroundColor:
                                            task.status !== "DONE"
                                              ? "#ff7f50"
                                              : "#aaaaaa",
                                        },
                                      }}
                                    >
                                      Cập Nhật
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <div>Không có Nhiệm vụ nào.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-pane fade" id="feedback" role="tabpanel">
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mt-4">
                  <div className="card-top p-4">
                    <div className="card-event-img">
                      <img
                        src="./assets/images/event-imgs/img-6.jpg"
                        alt="Event"
                      />
                    </div>
                    <div className="card-event-dt">
                      <h5>Step Up Open Mic Show</h5>
                      <div className="evnt-time">Thu, Jun 30, 2022 4:30 AM</div>
                      <div className="event-btn-group">
                        <button
                          className="esv-btn me-2"
                          onClick={() =>
                            (window.location.href = "feedback_detail.html")
                          }
                        >
                          <i className="fa-solid fa-comments me-2" />
                          View Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={closeUpdateDialog}>
        <DialogTitle>Cập Nhật Nhiệm Vụ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng cập nhật chi phí thực tế và trạng thái của nhiệm vụ.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Chi phí thực tế"
            type="number"
            fullWidth
            variant="outlined"
            value={actualCost}
            onChange={(e) => setActualCost(e.target.value)}
          />
          <TextField
            select
            label="Trạng thái"
            fullWidth
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
          >
            <MenuItem value="0">TODO</MenuItem>
            <MenuItem value="1">INPROGRESS</MenuItem>
            <MenuItem value="2">DONE</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeUpdateDialog}
            color="primary"
            variant="outlined"
            sx={{
              color: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleUpdateStatus}
            color="primary"
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaffHomeTab;
