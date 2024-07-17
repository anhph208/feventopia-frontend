import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Stack,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
} from "@mui/material";
import {
  getAllEventForOtherAPI,
  getEventDetailsAPI,
  getAllEventAssigneeAPI,
  getAccountById,
  getAccountStaffAPI,
  postRangeEventAssignee,
  getTasksByEventDetailIdAPI,
  postAddTaskAPI,
  putUpdateTaskAPI,
} from "../../components/services/userServices";
import {
  formatDateTime,
  PriceFormat,
  formatDate,
  StatusSub,
} from "../../utils/tools";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TaskIcon from "@mui/icons-material/Task";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditNoteIcon from "@mui/icons-material/EditNote";

const AssigneeTab = () => {
  const [events, setEvents] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [assignees, setAssignees] = useState({});
  const [tasks, setTasks] = useState({});
  const [openAddAssigneeDialog, setOpenAddAssigneeDialog] = useState(false);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountIds, setSelectedAccountIds] = useState([]);
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPlanCost, setTaskPlanCost] = useState("");
  const [taskActualCost, setTaskActualCost] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [selectedTaskStaffId, setSelectedTaskStaffId] = useState("");

  const [openUpdateTaskDialog, setOpenUpdateTaskDialog] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [currentEventDetailId, setCurrentEventDetailId] = useState(null);

  const fetchEvents = async (page, category, status) => {
    setLoading(true);
    try {
      const response = await getAllEventForOtherAPI(page, 3, category, status);
      const { events, pagination } = response;

      const eventDetailsPromises = events.map((event) =>
        getEventDetailsAPI(event.id)
      );
      const eventsWithDetails = await Promise.all(eventDetailsPromises);

      const processedEvents = eventsWithDetails.map((eventDetails, index) => {
        const earliestStartDate =
          eventDetails.eventDetail.length > 0
            ? eventDetails.eventDetail.reduce((earliest, current) =>
                new Date(current.startDate) < new Date(earliest.startDate)
                  ? current
                  : earliest
              ).startDate
            : null;

        const smallestPrice =
          eventDetails.eventDetail.length > 0
            ? Math.min(
                ...eventDetails.eventDetail.map((detail) => detail.ticketPrice)
              )
            : null;

        return {
          ...eventDetails,
          earliestStartDate,
          smallestPrice,
          status: events[index].status,
        };
      });

      setEvents(processedEvents);
      setTotalPages(pagination.TotalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error);
      setLoading(false);
      toast.error("Error fetching events.");
    }
  };

  const fetchAssignees = async (eventDetailId) => {
    try {
      const response = await getAllEventAssigneeAPI(eventDetailId, 1);
      const assigneesWithDetails = await Promise.all(
        response.assignee.map(async (assignee) => {
          const accountDetails = await getAccountById(assignee.accountId);
          return { ...assignee, ...accountDetails };
        })
      );
      return assigneesWithDetails;
    } catch (error) {
      console.error("Error fetching assignees:", error);
      throw error;
    }
  };

  const fetchTasks = async (eventDetailId) => {
    try {
      const response = await getTasksByEventDetailIdAPI(eventDetailId);
      const tasksByAssignee = response.reduce((acc, task) => {
        if (!acc[task.staffID]) {
          acc[task.staffID] = [];
        }
        acc[task.staffID].push(task);
        return acc;
      }, {});
      return tasksByAssignee;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  const fetchAccounts = async () => {
    try {
      const allAccounts = await getAccountStaffAPI();
      setAccounts(allAccounts);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
      toast.error("Failed to fetch accounts.");
    }
  };

  const handleAddAssignee = async () => {
    if (selectedAccountIds.length === 0) {
      toast.warn("Please select at least one account.");
      return;
    }

    try {
      await postRangeEventAssignee(selectedAccountIds, selectedEventDetail.id);
      toast.success("Thêm Nhân sự Thành công!");
      handleCloseAddAssignee();
      await fetchAssignees(selectedEventDetail.id);
      await fetchEvents(pageNumber, category, status);
    } catch (error) {
      console.error("Failed to add assignees:", error);
      toast.error("Failed to add assignees.");
    }
  };

  const handleAddTask = async () => {
    if (!selectedTaskStaffId || !taskDescription || !taskStatus) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    const taskData = {
      staffID: selectedTaskStaffId,
      eventDetailId: selectedEventDetail.id,
      description: taskDescription,
      planCost: taskPlanCost,
      actualCost: taskActualCost,
      status: taskStatus,
    };

    try {
      await postAddTaskAPI(taskData);
      toast.success("Thêm Nhiệm Vụ mới thành công!");
      handleCloseAddTask();
      await fetchTasks(selectedEventDetail.id);
      await fetchEvents(pageNumber, category, status);
    } catch (error) {
      console.error("Failed to add task:", error);
      toast.error("Failed to add task.");
    }
  };

  const handleUpdateTask = async () => {
    if (
      !taskToUpdate.staffID ||
      !taskToUpdate.description ||
      !taskToUpdate.status
    ) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    const taskData = {
      staffID: taskToUpdate.staffID,
      eventDetailId: taskToUpdate.eventDetailId,
      description: taskToUpdate.description,
      planCost: taskToUpdate.planCost,
      actualCost: taskToUpdate.actualCost,
      status: taskToUpdate.status,
    };

    try {
      await putUpdateTaskAPI(taskToUpdate.id, taskData);
      toast.success("Cập nhật Thành công!");
      handleCloseUpdateTask();
      fetchTasks(selectedEventDetail.id);
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task.");
    }
  };

  const handleClickOpenAddAssignee = async (eventDetail) => {
    setSelectedEventDetail(eventDetail);
    setOpenAddAssigneeDialog(true);

    try {
      await fetchAccounts();
      const assigneesForEventDetail = await fetchAssignees(eventDetail.id);

      const filtered = accounts.filter(
        (account) =>
          !assigneesForEventDetail.some(
            (assignee) => assignee.accountId === account.id
          )
      );

      setFilteredAccounts(filtered);
    } catch (error) {
      console.error("Failed to prepare add assignee dialog:", error);
      toast.error("Failed to prepare add assignee dialog.");
    }
  };

  const handleClickOpenAddTask = async (eventDetail) => {
    await fetchAssignees(eventDetail.id);
    setSelectedEventDetail(eventDetail);
    setCurrentEventDetailId(eventDetail.id);
    setOpenAddTaskDialog(true);
  };

  const handleClickOpenUpdateTask = async (task, eventDetail) => {
    setSelectedEventDetail(eventDetail);
    const assignees = await fetchAssignees(eventDetail.id);
    setAssignees((prevAssignees) => ({
      ...prevAssignees,
      [eventDetail.id]: assignees,
    }));
    setTaskToUpdate(task);
    setOpenUpdateTaskDialog(true);
    await fetchAccounts();
  };

  const handleCloseAddAssignee = () => {
    setOpenAddAssigneeDialog(false);
    setSelectedAccountIds([]);
  };

  const handleCloseAddTask = () => {
    setOpenAddTaskDialog(false);
  };

  const handleCloseUpdateTask = () => {
    setOpenUpdateTaskDialog(false);
  };

  const handleSelectAccount = (accountId) => {
    setSelectedAccountIds((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    );
  };

  useEffect(() => {
    fetchEvents(pageNumber, category, status);
  }, [pageNumber, category, status]);

  useEffect(() => {
    const fetchAllAssigneesAndTasks = async () => {
      const allAssignees = {};
      const allTasks = {};
      for (const event of events) {
        for (const detail of event.eventDetail) {
          const assigneeData = await fetchAssignees(detail.id);
          const taskData = await fetchTasks(detail.id);
          allAssignees[detail.id] = assigneeData;
          allTasks[detail.id] = taskData;
        }
      }
      setAssignees(allAssignees);
      setTasks(allTasks);
    };
    if (events.length > 0) {
      fetchAllAssigneesAndTasks();
    }
  }, [events]);

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPageNumber(1);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPageNumber(1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container className="wrapper wrapper-body">
      <div className="dashboard-body">
        <Typography variant="h4" component="div" gutterBottom>
          <i className="fa-solid fa-user me-3" />
          <strong>TỔNG QUAN NHÂN SỰ</strong>
        </Typography>

        <div className="main-card">
          <div className="dashboard-wrap-content p-4">
            <h5 className="mb-4">Danh mục Sự kiện</h5>

            <div className="rs ms-auto mt_r4 mb-4">
              <div className="nav custom2-tabs btn-group" role="tablist">
                <button
                  className={`tab-link ${category === null ? "active" : ""}`}
                  onClick={() => handleCategoryChange(null)}
                >
                  Tất cả Sự kiện
                </button>
                <button
                  className={`tab-link ${
                    category === "TALKSHOW" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("TALKSHOW")}
                >
                  Talkshow
                </button>
                <button
                  className={`tab-link ${
                    category === "COMPETITION" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("COMPETITION")}
                >
                  Competition
                </button>
                <button
                  className={`tab-link ${
                    category === "FESTIVAL" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("FESTIVAL")}
                >
                  Festival
                </button>
                <button
                  className={`tab-link ${
                    category === "MUSICSHOW" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("MUSICSHOW")}
                >
                  Music Show
                </button>
              </div>
            </div>

            <h5 className="mb-4">Trạng thái Sự kiện</h5>
            <div className="nav custom2-tabs btn-group" role="tablist">
              <button
                className={`tab-link ${status === null ? "active" : ""}`}
                onClick={() => handleStatusChange(null)}
              >
                Tất cả
              </button>
              <button
                className={`tab-link ${status === "INITIAL" ? "active" : ""}`}
                onClick={() => handleStatusChange("INITIAL")}
              >
                KHỞI ĐỘNG
              </button>
              <button
                className={`tab-link ${
                  status === "FUNDRAISING" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("FUNDRAISING")}
              >
                GỌI TÀI TRỢ
              </button>
              <button
                className={`tab-link ${
                  status === "PREPARATION" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("PREPARATION")}
              >
                CHUẨN BỊ
              </button>
              <button
                className={`tab-link ${status === "EXECUTE" ? "active" : ""}`}
                onClick={() => handleStatusChange("EXECUTE")}
              >
                TRIỂN KHAI
              </button>
              <button
                className={`tab-link ${status === "POST" ? "active" : ""}`}
                onClick={() => handleStatusChange("POST")}
              >
                HOÀN THÀNH
              </button>
              <button
                className={`tab-link ${status === "CANCELED" ? "active" : ""}`}
                onClick={() => handleStatusChange("CANCELED")}
              >
                ĐÃ HỦY
              </button>
            </div>
          </div>
        </div>

        <div className="event-list">
          <Grid container spacing={3} className="mt-4">
            {events.map((event) => (
              <Grid item xs={12} key={event.id}>
                <Card
                  style={{
                    backgroundColor:
                      event.status === "CANCELED"
                        ? "#9CAFAA"
                        : event.status === "POST"
                        ? "#BFEA7C"
                        : "white",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box
                        component="div"
                        sx={{
                          margin: 2,
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt={event.eventName}
                          height="200"
                          image={
                            event.banner ||
                            "./assets/images/event-imgs/big-2.jpg"
                          }
                        />
                      </Box>
                      <CardContent>
                        <Typography variant="h5">
                          <strong>{event.eventName}</strong>
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          marginTop="16px"
                        >
                          <div className="card-icon">
                            <i className="fa-solid fa-location-dot" />
                          </div>
                          <Box>
                            <Typography variant="h7">Trạng thái</Typography>
                            <Typography variant="h6">
                              {StatusSub(event.status)}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Grid>
                    {event.status !== "CANCELED" && (
                      <Grid item xs={12} md={8}>
                        <CardContent>
                          {event.eventDetail.map((detail) => (
                            <div key={detail.id}>
                              <Box
                                key={detail.id}
                                sx={{
                                  mb: 2.2,
                                  ml: 0.4,
                                  border: "2px solid #450b00",
                                  borderRadius: 2,
                                  p: 2,
                                }}
                              >
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  alignItems="center"
                                >
                                  <div className="event-dt-right-icon">
                                    <i className="fa-solid fa-calendar-days" />
                                  </div>
                                  <Box>
                                    <Typography variant="h6">
                                      <strong>Thời gian</strong>
                                    </Typography>
                                    <Typography variant="body1">
                                      {formatDateTime(detail.startDate)} -{" "}
                                      {formatDateTime(detail.endDate)}
                                    </Typography>
                                  </Box>
                                </Stack>

                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "16px",
                                  }}
                                >
                                  <Typography variant="h6" mb={1}>
                                    Nhân sự
                                  </Typography>
                                  {[
                                    "PREPARATION",
                                    "INITIAL",
                                    "FUNDRAISING",
                                  ].includes(event.status) && (
                                    <Button
                                      variant="contained"
                                      startIcon={<GroupAddIcon />}
                                      onClick={() =>
                                        handleClickOpenAddAssignee(detail)
                                      }
                                      sx={{
                                        color: "white",
                                        backgroundColor: "#450b00",
                                        "&:hover": {
                                          backgroundColor: "#ff7f50",
                                        },
                                      }}
                                    >
                                      Thêm Nhân sự mới
                                    </Button>
                                  )}
                                </Box>
                                <TableContainer
                                  component={Paper}
                                  sx={{ mb: 5 }}
                                >
                                  <Table aria-label="assignee table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Họ Tên</TableCell>
                                        <TableCell>Vai trò</TableCell>
                                        <TableCell>Ngày Thêm</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {assignees[detail.id] &&
                                      assignees[detail.id].length > 0 ? (
                                        assignees[detail.id].map((assignee) => (
                                          <TableRow key={assignee.id}>
                                            <TableCell>
                                              {assignee.name}
                                            </TableCell>
                                            <TableCell>
                                              {assignee.role}
                                            </TableCell>
                                            <TableCell>
                                              {formatDateTime(
                                                assignee.createdDate
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        ))
                                      ) : (
                                        <TableRow>
                                          <TableCell colSpan={2}>
                                            Không có Nhân sự nào.
                                          </TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
                                </TableContainer>

                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "16px",
                                  }}
                                >
                                  <Typography variant="h6" mb={1}>
                                    Nhiệm vụ
                                  </Typography>
                                  {[
                                    "PREPARATION",
                                    "INITIAL",
                                    "FUNDRAISING",
                                  ].includes(event.status) && (
                                    <Button
                                      variant="contained"
                                      startIcon={<TaskIcon />}
                                      onClick={() =>
                                        handleClickOpenAddTask(detail)
                                      }
                                      sx={{
                                        color: "white",
                                        backgroundColor: "#450b00",
                                        "&:hover": {
                                          backgroundColor: "#ff7f50",
                                        },
                                      }}
                                    >
                                      Thêm Nhiệm vụ mới
                                    </Button>
                                  )}
                                </Box>
                                <TableContainer
                                  component={Paper}
                                  sx={{ mb: 2 }}
                                >
                                  <Table aria-label="task table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Nhiệm vụ</TableCell>
                                        <TableCell>Họ Tên</TableCell>
                                        <TableCell>
                                          Trạng thái Nhiệm vụ
                                        </TableCell>
                                        <TableCell>Ngày Giao</TableCell>
                                        <TableCell>Ngày Cập nhật</TableCell>
                                        <TableCell>Hành động</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {assignees[detail.id] &&
                                      assignees[detail.id].length > 0 ? (
                                        assignees[detail.id].flatMap(
                                          (assignee) =>
                                            tasks[detail.id] &&
                                            tasks[detail.id][assignee.id] &&
                                            tasks[detail.id][assignee.id]
                                              .length > 0
                                              ? tasks[detail.id][
                                                  assignee.id
                                                ].map((task) => (
                                                  <TableRow key={task.id}>
                                                    <TableCell>
                                                      {task.description}
                                                    </TableCell>
                                                    <TableCell>
                                                      {assignee.name}
                                                    </TableCell>
                                                    <TableCell>
                                                      {task.status}
                                                    </TableCell>
                                                    <TableCell>
                                                      {formatDate(
                                                        task.createdDate
                                                      )}
                                                    </TableCell>
                                                    <TableCell>
                                                      {formatDate(
                                                        task.updatedDate
                                                      )}
                                                    </TableCell>
                                                    <TableCell>
                                                      <Button
                                                        variant="contained"
                                                        startIcon={
                                                          <EditNoteIcon />
                                                        }
                                                        onClick={() =>
                                                          handleClickOpenUpdateTask(
                                                            task,
                                                            detail
                                                          )
                                                        }
                                                        disabled={
                                                          event.status !==
                                                          "PREPARATION"
                                                        }
                                                        sx={{
                                                          color:
                                                            event.status ===
                                                            "PREPARATION"
                                                              ? "white"
                                                              : "gray",
                                                          backgroundColor:
                                                            event.status ===
                                                            "PREPARATION"
                                                              ? "#450b00"
                                                              : "#cccccc",
                                                          "&:hover": {
                                                            backgroundColor:
                                                              event.status ===
                                                              "PREPARATION"
                                                                ? "#ff7f50"
                                                                : "#aaaaaa",
                                                          },
                                                        }}
                                                      >
                                                        SỬA
                                                      </Button>
                                                    </TableCell>
                                                  </TableRow>
                                                ))
                                              : []
                                        )
                                      ) : (
                                        <TableRow>
                                          <TableCell colSpan={5}>
                                            Không có Nhiệm vụ nào.
                                          </TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </div>
                          ))}
                        </CardContent>
                      </Grid>
                    )}
                  </Grid>
                </Card>
              </Grid>
            ))}

            {events.length === 0 && !loading && (
              <Typography variant="body1">No events found.</Typography>
            )}
          </Grid>
        </div>
        <Stack spacing={2} className="pagination-controls mt-5">
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
        {error && (
          <Typography variant="body1">Error: {error.message}</Typography>
        )}
      </div>

      <Dialog open={openAddAssigneeDialog} onClose={handleCloseAddAssignee}>
        <DialogTitle>Thêm Nhân sự mới</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="account table">
              <TableHead>
                <TableRow>
                  <TableCell>Chọn</TableCell>
                  <TableCell>Họ Tên</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedAccountIds.includes(account.id)}
                        onChange={() => handleSelectAccount(account.id)}
                      />
                    </TableCell>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{account.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
            Thêm Nhân sự
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddTaskDialog} onClose={handleCloseAddTask}>
        <DialogTitle>Thêm Nhiệm vụ mới</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              select
              label="Chọn Nhân sự"
              fullWidth
              variant="outlined"
              margin="normal"
              value={selectedTaskStaffId}
              onChange={(e) => setSelectedTaskStaffId(e.target.value)}
            >
              {assignees[selectedEventDetail?.id]?.map((assignee) => (
                <MenuItem key={assignee.id} value={assignee.accountId}>
                  {assignee.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <TextField
            margin="normal"
            label="Nhiệm vụ"
            fullWidth
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Chi phí Dự kiến"
            fullWidth
            type="number"
            value={taskPlanCost}
            onChange={(e) => setTaskPlanCost(Number(e.target.value))}
          />
          <TextField
            margin="normal"
            label="Chi phí thực tế"
            fullWidth
            type="number"
            value={taskActualCost}
            onChange={(e) => setTaskActualCost(Number(e.target.value))}
          />
          <FormControl fullWidth margin="normal">
            <TextField
              select
              label="Trạng thái"
              fullWidth
              variant="outlined"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              margin="normal"
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="INPROGRESS">INPROGRESS</MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
            </TextField>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddTask}>Hủy</Button>
          <Button
            onClick={handleAddTask}
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Thêm Nhiệm vụ mới
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdateTaskDialog} onClose={handleCloseUpdateTask}>
        <DialogTitle>Cập nhật Nhiệm vụ</DialogTitle>
        <DialogContent>
          {taskToUpdate && (
            <>
              <FormControl fullWidth margin="normal">
                <TextField
                  select
                  label="Chọn Nhân sự"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={taskToUpdate.staffID}
                  onChange={(e) =>
                    setTaskToUpdate({
                      ...taskToUpdate,
                      staffID: e.target.value,
                    })
                  }
                >
                  {assignees[selectedEventDetail?.id]?.map((assignee) => (
                    <MenuItem key={assignee.id} value={assignee.accountId}>
                      {assignee.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <TextField
                margin="normal"
                label="Nhiệm Vụ"
                fullWidth
                value={taskToUpdate.description}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    description: e.target.value,
                  })
                }
              />
              <TextField
                margin="normal"
                label="Chi phí dự kiến"
                fullWidth
                type="number"
                value={taskToUpdate.planCost}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    planCost: Number(e.target.value),
                  })
                }
              />
              <TextField
                margin="normal"
                label="Chi phí thực tế"
                fullWidth
                type="number"
                value={taskToUpdate.actualCost}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    actualCost: Number(e.target.value),
                  })
                }
              />
              <FormControl fullWidth margin="normal">
                <TextField
                  select
                  label="Trạng thái"
                  fullWidth
                  variant="outlined"
                  value={taskToUpdate.status}
                  onChange={(e) =>
                    setTaskToUpdate({ ...taskToUpdate, status: e.target.value })
                  }
                >
                  <MenuItem value="TODO">TODO</MenuItem>
                  <MenuItem value="INPROGRESS">INPROGRESS</MenuItem>
                  <MenuItem value="DONE">DONE</MenuItem>
                </TextField>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateTask}>Hủy</Button>
          <Button
            onClick={handleUpdateTask}
            sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}
          >
            Cập nhật Nhiệm vụ
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AssigneeTab;
