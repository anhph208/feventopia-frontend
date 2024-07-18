import React, { useState, useEffect } from "react";
import {
  getEventDetailsAPI,
  getAllEventAssigneeAPI,
  getAccountById,
  getAccountStaffAPI,
  postAddEventAssignee,
  getTasksByEventDetailIdAPI,
  postAddTaskAPI,
  putUpdateTaskAPI,
} from "../../components/services/userServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateTime, formatDate, PriceFormat } from "../../utils/tools";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import TaskIcon from "@mui/icons-material/Task";
import EditNoteIcon from "@mui/icons-material/EditNote";

function ViewEventAssignee() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAssigneeDialog, setOpenAssigneeDialog] = useState(false);
  const [openAddAssigneeDialog, setOpenAddAssigneeDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [openUpdateTaskDialog, setOpenUpdateTaskDialog] = useState(false);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const [assignees, setAssignees] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPlanCost, setTaskPlanCost] = useState("");
  const [taskActualCost, setTaskActualCost] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [selectedTaskStaffId, setSelectedTaskStaffId] = useState("");

  const handleClickOpenAssignee = async (eventDetail) => {
    setSelectedEventDetail(eventDetail);
    setOpenAssigneeDialog(true);
    fetchAssignees(eventDetail.id);
  };

  const handleCloseAssignee = () => {
    setOpenAssigneeDialog(false);
  };

  const handleClickOpenAddAssignee = async (eventDetail) => {
    setSelectedEventDetail(eventDetail);
    setOpenAddAssigneeDialog(true);
    fetchAccounts();
  };

  const handleCloseAddAssignee = () => {
    setOpenAddAssigneeDialog(false);
  };

  const handleClickOpenTask = async (eventDetail) => {
    setSelectedEventDetail(eventDetail);
    setOpenTaskDialog(true);
    fetchTasks(eventDetail.id);
  };

  const handleCloseTask = () => {
    setOpenTaskDialog(false);
  };

  const handleClickOpenAddTask = () => {
    setOpenAddTaskDialog(true);
  };

  const handleCloseAddTask = () => {
    setOpenAddTaskDialog(false);
    setTaskDescription("");
    setTaskPlanCost("");
    setTaskActualCost("");
    setTaskStatus("");
    setSelectedTaskStaffId("");
  };

  const handleClickOpenUpdateTask = (task) => {
    setTaskToUpdate(task);
    setOpenUpdateTaskDialog(true);
  };

  const handleCloseUpdateTask = () => {
    setOpenUpdateTaskDialog(false);
    setTaskToUpdate(null);
  };

  const fetchAssignees = async (eventDetailId) => {
    try {
      const { assignee } = await getAllEventAssigneeAPI(eventDetailId);
      const assigneesWithDetails = await Promise.all(
        assignee.map(async (assignee) => {
          const accountDetails = await getAccountById(assignee.accountId);
          return { ...assignee, ...accountDetails };
        })
      );
      setAssignees(assigneesWithDetails);
    } catch (error) {
      toast.error("Failed to fetch assignees.");
    }
  };

  const fetchAccounts = async () => {
    try {
      const allAccounts = await getAccountStaffAPI();
      setAccounts(allAccounts);
    } catch (error) {
      toast.error("Failed to fetch accounts.");
    }
  };

  const handleAddAssignee = async () => {
    if (!selectedAccountId) {
      toast.error("Please select an account.");
      return;
    }

    try {
      await postAddEventAssignee(selectedAccountId, selectedEventDetail.id);
      toast.success("Assignee added successfully!");
      handleCloseAddAssignee();
      fetchAssignees(selectedEventDetail.id);
    } catch (error) {
      toast.error("Failed to add assignee.");
    }
  };

  const fetchTasks = async (eventDetailId) => {
    try {
      const response = await getTasksByEventDetailIdAPI(eventDetailId);
      setTasks(response);
    } catch (error) {
      toast.error("Failed to fetch tasks.");
    }
  };

  const handleAddTask = async () => {
    if (!taskDescription || !taskStatus || !selectedTaskStaffId) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const taskData = {
      eventDetailId: selectedEventDetail.id,
      description: taskDescription,
      planCost: taskPlanCost,
      actualCost: taskActualCost,
      status: taskStatus,
      staffID: selectedTaskStaffId,
    };

    try {
      await postAddTaskAPI(taskData);
      toast.success("Task added successfully!");
      handleCloseAddTask();
      fetchTasks(selectedEventDetail.id);
    } catch (error) {
      toast.error("Failed to add task.");
    }
  };

  const handleUpdateTask = async () => {
    if (
      !taskToUpdate ||
      !taskToUpdate.description ||
      !taskToUpdate.status ||
      !taskToUpdate.staffID
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await putUpdateTaskAPI(taskToUpdate.id, taskToUpdate);
      toast.success("Task updated successfully!");
      handleCloseUpdateTask();
      fetchTasks(selectedEventDetail.id);
    } catch (error) {
      toast.error("Failed to update task.");
    }
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

    fetchEventDetails();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading event details</div>;
  if (!eventDetails) return <div>No event details found</div>;

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
                      <div className="select-tickets-block">
                        <div className="booking-btn mt-2">
                          <Button
                            className="main-btn btn-hover w-100 mt-3"
                            variant="contained"
                            startIcon={<GroupsIcon />}
                            onClick={() => handleClickOpenAssignee(eventDetail)}
                            sx={{
                              color: "white",
                              backgroundColor: "#450b00",
                              "&:hover": {
                                backgroundColor: "#ff7f50",
                              },
                            }}
                          >
                            <strong>Xem Thành viên</strong>
                          </Button>
                          <Button
                            className="main-btn btn-hover w-100 mt-3"
                            variant="contained"
                            startIcon={<TaskIcon />}
                            onClick={() => handleClickOpenTask(eventDetail)}
                            sx={{
                              color: "white",
                              backgroundColor: "#450b00",
                              "&:hover": {
                                backgroundColor: "#ff7f50",
                              },
                            }}
                          >
                            <strong>Xem Nhiệm vụ</strong>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openAssigneeDialog} onClose={handleCloseAssignee}>
        <DialogTitle>Xem Nhân sự</DialogTitle>
        <DialogContent>
          {selectedEventDetail && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<GroupAddIcon />}
                  onClick={() =>
                    handleClickOpenAddAssignee(selectedEventDetail)
                  }
                  sx={{
                    color: "white",
                    backgroundColor: "#450b00",
                    "&:hover": {
                      backgroundColor: "#ff7f50",
                    },
                    mb: 2,
                  }}
                >
                  Thêm Nhân sự mới
                </Button>
                <TableContainer component={Paper} sx={{ mb: 5 }}>
                  <Table aria-label="assignee table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Họ Tên</TableCell>
                        <TableCell>Vai trò</TableCell>
                        <TableCell>Ngày thêm</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignees.length > 0 ? (
                        assignees.map((assignee) => (
                          <TableRow key={assignee.id}>
                            <TableCell>{assignee.name}</TableCell>
                            <TableCell>{assignee.role}</TableCell>
                            <TableCell>
                              {formatDateTime(assignee.createdDate)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3}>
                            Không có Nhân sự nào.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignee}>Đóng</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddAssigneeDialog} onClose={handleCloseAddAssignee}>
        <DialogTitle>Thêm Thành viên mới</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Chọn Thành viên</InputLabel>
            <Select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
            >
              {accounts.map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddAssignee}>Hủy</Button>
          <Button
            onClick={handleAddAssignee}
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTaskDialog} onClose={handleCloseTask}>
        <DialogTitle>Nhiệm vụ</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table aria-label="task table">
              <TableHead>
                <TableRow>
                  <TableCell>Mô tả Nhiệm vụ</TableCell>
                  <TableCell>Chi phí Dự kiến</TableCell>
                  <TableCell>Chi phí Thực tế</TableCell>
                  <TableCell>Trạng thái Nhiệm vụ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.description}</TableCell>
                      <TableCell><PriceFormat price={task.planCost}/></TableCell>
                      <TableCell><PriceFormat price={task.actualCost}/></TableCell>
                      <TableCell>{task.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>Không có Nhiệm vụ nào.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTask}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewEventAssignee;
