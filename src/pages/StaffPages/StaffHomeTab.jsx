import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfileAPI,
  getAllTaskByUsernameAPI,
  putUpdateTaskByUsernameAPI,
  GetAllAssigneeDetailCurrentUserAPI,
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
  Typography,
  Pagination,
  Stack,
} from "@mui/material";
import { formatDate, formatDateTime, PriceFormat } from "../../utils/tools.js";

const StaffHomeTab = ({ initialProfile }) => {
  const [profile, setProfile] = useState(initialProfile || {});
  const [loading, setLoading] = useState(!initialProfile);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({});
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
  const [planCost, setPlanCost] = useState("");
  const [actualCost, setActualCost] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!initialProfile) {
        try {
          const profileData = await getProfileAPI(token);
          setProfile(profileData);
        } catch (error) {
          console.error("Error fetching profile:", error);
          toast.error("Error fetching profile");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [initialProfile, token]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (username) {
        try {
          const tasksData = await getAllTaskByUsernameAPI(username);
          setTasks(tasksData);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error("Error fetching tasks");
        } finally {
          setLoadingTasks(false);
        }
      } else {
        console.error("Username not found in localStorage");
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [username]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await GetAllAssigneeDetailCurrentUserAPI(page, 5);
        const result = response.data;
        setTotalPages(result.TotalPages);

        const tasksByEventDetailId = tasks.reduce((acc, task) => {
          if (!acc[task.eventDetailId]) {
            acc[task.eventDetailId] = [];
          }
          acc[task.eventDetailId].push(task);
          return acc;
        }, {});

        const eventsWithDetails = result.map((item) => ({
          ...item.event,
          eventDetails: item.eventAssigneeModel.map((assignee) => ({
            ...assignee.eventDetail,
            tasks: tasksByEventDetailId[assignee.eventDetail.id] || [],
          })),
        }));

        setEvents(eventsWithDetails);
      } catch (error) {
        setError(error);
        console.error("Error fetching events:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [page, tasks]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleUpdateStatus = async () => {
    if (!selectedTask) return;

    if (status === "DONE" && !actualCost) {
      toast.error("Chi phí thực tế là bắt buộc khi trạng thái là DONE");
      return;
    }

    if (
      (selectedTask.status === "DONE" && status !== "DONE") ||
      (selectedTask.status === "INPROGRESS" && status === "TODO")
    ) {
      toast.error("Bạn không thể quay lại trạng thái trước đó");
      return;
    }

    try {
      await putUpdateTaskByUsernameAPI(selectedTask.id, status, planCost, actualCost);
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? { ...task, status, planCost, actualCost } : task
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
    setPlanCost(task.planCost || "");
    setActualCost(task.actualCost || "");
    setStatus(task.status || "");
    setOpenDialog(true);
  };

  const closeUpdateDialog = () => {
    setSelectedTask(null);
    setPlanCost("");
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
            <span>CHI TIẾT SỰ KIỆN ĐANG THAM GIA</span>
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
                                              ? "#ff1100"
                                              : "#cccccc",
                                        },
                                      }}
                                    >
                                      Cập nhật
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <div>Không có nhiệm vụ nào</div>
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
                        <div>Không có nhiệm vụ nào hoàn thành</div>
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
                    <div className="card-event-dt">
                      <h5>SỰ KIỆN VÀ CHI TIẾT SỰ KIỆN ĐANG THAM GIA</h5>
                      {loadingEvents ? (
                        <div>Loading events...</div>
                      ) : events.length > 0 ? (
                        events.map((event) => (
                          <div className="main-card mt-4" key={event.id}>
                            <div className="card-top p-4">
                              <div className="card-event-img">
                                <img
                                  src={
                                    event.banner && event.banner !== "null"
                                      ? event.banner
                                      : "./assets/images/event-imgs/img-1.jpg"
                                  }
                                  alt={event.eventName}
                                />
                              </div>
                              <div className="card-event-dt">
                                <h5>{event.eventName}</h5>
                              </div>
                            </div>
                            {event.eventDetails.map((detail) => (
                              <div className="card-bottom" key={detail.id}>
                                <div className="card-bottom-item">
                                  <div className="card-icon">
                                    <i className="fa-solid fa-calendar-days" />
                                  </div>
                                  <div className="card-dt-text">
                                    <h6>Sự kiện bắt đầu</h6>
                                    <span>
                                      {formatDateTime(detail.startDate)}
                                    </span>
                                  </div>
                                </div>
                                <div className="card-bottom-item">
                                  <div className="card-icon">
                                    <i className="fa-solid fa-clock" />
                                  </div>
                                  <div className="card-dt-text">
                                    <h6>Sự kiện kết thúc</h6>
                                    <span>
                                      {formatDateTime(detail.endDate)}
                                    </span>
                                  </div>
                                </div>

                                {detail.tasks.length > 0 ? (
                                  <TableContainer component={Paper}>
                                    <Table
                                      sx={{ mt: 1, minWidth: 820 }}
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
                                        {detail.tasks.map((task) => (
                                          <TableRow key={task.id}>
                                            <TableCell>
                                              {task.description}
                                            </TableCell>
                                            <TableCell>
                                              <PriceFormat
                                                price={task.planCost}
                                              />
                                            </TableCell>
                                            <TableCell>
                                              <PriceFormat
                                                price={task.actualCost}
                                              />
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
                                                onClick={() =>
                                                  openUpdateDialog(task)
                                                }
                                                disabled={
                                                  task.status === "DONE"
                                                }
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
                                                        ? "#ff1100"
                                                        : "#cccccc",
                                                  },
                                                }}
                                              >
                                                Cập nhật
                                              </Button>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                ) : (
                                  <div>Không có nhiệm vụ nào</div>
                                )}
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div>Không có sự kiện nào</div>
                      )}
                      <Stack
                        spacing={2}
                        sx={{ mt: 2 }}
                        className="pagination-controls mt-3 mb-2"
                      >
                        <Pagination
                          count={totalPages}
                          page={page}
                          onChange={handleChangePage}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onClose={closeUpdateDialog}>
        <DialogTitle>Cập nhật nhiệm vụ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cập nhật trạng thái và chi phí thực tế cho nhiệm vụ này.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Chi phí dự kiến"
            fullWidth
            type="number"
            value={planCost}
            onChange={(e) => setPlanCost(e.target.value)}
            disabled              
          />
          <TextField
            margin="dense"
            label="Chi phí thực tế"
            fullWidth
            type="number"
            value={actualCost}
            onChange={(e) => setActualCost(e.target.value)}

          />
          <TextField
            margin="dense"
            label="Trạng thái"
            select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="INPROGRESS">INPROGRESS</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog}>Hủy</Button>
          <Button onClick={handleUpdateStatus} color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaffHomeTab;
