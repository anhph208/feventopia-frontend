import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfileAPI,
  getAllEventForVisitorAPI,
  getAllTaskByUsernameAPI,
  putUpdateTaskByUsernameAPI,
  getEventDetailsAPI,
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
  Stack,
  Pagination,
  Typography,
} from "@mui/material";
import { formatDate, formatDateTime, PriceFormat } from "../../utils/tools.js";

const StaffHomeTab = ({ initialProfile }) => {
  const [profile, setProfile] = useState(initialProfile || {});
  const [loading, setLoading] = useState(!initialProfile);
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await getAllEventForVisitorAPI(page, 5);
        const eventsWithDetails = await Promise.all(
          result.events.map(async (event) => {
            const details = await getEventDetailsAPI(event.id);
            return { ...event, eventDetails: details.eventDetail };
          })
        );
        setEvents(eventsWithDetails);
        setLoadingEvents(false);
      } catch (error) {
        setError(error);
        console.error("Error fetching events:", error);
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [page]);

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

  const completedTasks = tasks.filter((task) => task.status === "DONE");

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
            data-bs-target="#completedTasks"
            type="button"
            role="tab"
            aria-controls="completedTasks"
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

          <div className="tab-pane fade" id="completedTasks" role="tabpanel">
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mt-4">
                  <div className="card-top p-4">
                    <div className="card-event-dt">
                      <h5>NHIỆM VỤ HOÀN THÀNH</h5>
                      {loadingTasks ? (
                        <div>Loading tasks...</div>
                      ) : completedTasks.length > 0 ? (
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 820 }}
                            aria-label="completed tasks table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Nhiệm Vụ</TableCell>
                                <TableCell>Chi phí dự kiến</TableCell>
                                <TableCell>Chi phí thực tế</TableCell>
                                <TableCell>Ngày Giao</TableCell>
                                <TableCell>Ngày Cập nhật</TableCell>
                                <TableCell>Trạng thái</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {completedTasks.map((task) => (
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
                  {events.map((event) => (
                    <div key={event.id} className="mb-4">
                      <div className="card-top p-4">
                        <div className="card-event-img">
                          <img src={event.banner} alt={event.eventName} />
                        </div>
                        <div className="card-event-dt">
                          <Typography variant="h5">
                            {event.eventName}
                          </Typography>
                        </div>
                      </div>
                      {event.eventDetails.map((detail) => (
                        <div key={detail.id} className="card-bottom mb-4">
                          <div className="card-bottom-item">
                            <div className="card-icon">
                              <i className="fa-solid fa-calendar-days" />
                            </div>
                            <div className="card-dt-text">
                              <Typography variant="h6">
                                Sự kiện bắt đầu
                              </Typography>
                              <span>{formatDateTime(detail.startDate)}</span>
                            </div>
                          </div>
                          <div className="card-bottom-item">
                            <div className="card-icon">
                              <i className="fa-solid fa-clock" />
                            </div>
                            <div className="card-dt-text">
                              <Typography variant="h6">
                                Sự kiện kết thúc
                              </Typography>
                              <span>{formatDateTime(detail.endDate)}</span>
                            </div>
                          </div>
                          <div className="card-bottom-item">
                            <div className="card-icon">
                              <i className="fa-solid fa-location-dot" />
                            </div>
                            <div className="card-dt-text">
                              <Typography variant="h6">Địa Điểm</Typography>
                              <span>{detail.location.locationName}</span>
                            </div>
                          </div>
                          {tasks.filter(
                            (task) => task.eventDetailId === detail.id
                          ).length > 0 && (
                            <TableContainer component={Paper} sx={{ mt: 2 }}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Plan Cost</TableCell>
                                    <TableCell>Actual Cost</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Created Date</TableCell>
                                    <TableCell>Updated Date</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {tasks
                                    .filter(
                                      (task) => task.eventDetailId === detail.id
                                    )
                                    .map((task) => (
                                      <TableRow key={task.id}>
                                        <TableCell>{task.id}</TableCell>
                                        <TableCell>
                                          {task.description}
                                        </TableCell>
                                        <TableCell>
                                          <PriceFormat price={task.planCost} />
                                        </TableCell>
                                        <TableCell>
                                          <PriceFormat
                                            price={task.actualCost}
                                          />
                                        </TableCell>
                                        <TableCell>{task.status}</TableCell>
                                        <TableCell>
                                          {formatDate(task.createdDate)}
                                        </TableCell>
                                        <TableCell>
                                          {formatDate(task.updatedDate)}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
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
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="INPROGRESS">INPROGRESS</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
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
