import React, { useState, useEffect } from "react";
import {
  getEventDetailsAPI,
  getAllEventAssigneeAPI,
  getAccountStaffAPI,
  postAddEventAssignee,
} from "../../components/services/userServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateTime } from "../../utils/tools";
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
  TablePagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';

function ViewEventAssignee() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAssigneeDialog, setOpenAssigneeDialog] = useState(false);
  const [openAddAssigneeDialog, setOpenAddAssigneeDialog] = useState(false);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const [assignees, setAssignees] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagination, setPagination] = useState({});

  const handleClickOpenAssignee = async (eventDetail) => {
    setSelectedEventDetail(eventDetail);
    setOpenAssigneeDialog(true);
    fetchAssignees(eventDetail.id, page + 1, rowsPerPage);
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

  const fetchAssignees = async (eventDetailId, pageNumber, pageSize) => {
    try {
      const { assignee, pagination } = await getAllEventAssigneeAPI(
        eventDetailId,
        pageNumber,
        pageSize
      );
      setAssignees(assignee);
      setPagination(pagination);
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
      fetchAssignees(selectedEventDetail.id, page + 1, rowsPerPage);
    } catch (error) {
      toast.error("Failed to add assignee.");
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    if (selectedEventDetail) {
      fetchAssignees(selectedEventDetail.id, newPage + 1, rowsPerPage);
    }
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    if (selectedEventDetail) {
      fetchAssignees(selectedEventDetail.id, 1, newRowsPerPage);
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
                            startIcon = {<GroupsIcon />}
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
                            startIcon = {<GroupAddIcon />}
                            onClick={() =>
                              handleClickOpenAddAssignee(eventDetail)
                            }
                            sx={{
                              color: "white",
                              backgroundColor: "#450b00",
                              "&:hover": {
                                backgroundColor: "#ff7f50",
                              },
                            }}
                          >
                            <strong>Thêm Thành viên</strong>
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
        <DialogTitle>View Assignee</DialogTitle>
        <DialogContent>
          {selectedEventDetail && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h4>Event Detail ID: {selectedEventDetail.id}</h4>
              </Grid>
              <Grid item xs={12}>
                <h4>
                  Start Date: {formatDateTime(selectedEventDetail.startDate)}
                </h4>
              </Grid>
              <Grid item xs={12}>
                <h4>End Date: {formatDateTime(selectedEventDetail.endDate)}</h4>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Account ID</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Add Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignees.map((assignee) => (
                        <TableRow key={assignee.id}>
                          <TableCell>{assignee.id}</TableCell>
                          <TableCell>{assignee.accountId}</TableCell>
                          <TableCell>{assignee.role}</TableCell>
                          <TableCell>
                            {formatDateTime(assignee.createdDate)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={pagination.TotalCount || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignee}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddAssigneeDialog} onClose={handleCloseAddAssignee}>
        <DialogTitle>Add New Assignee</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select Account</InputLabel>
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
          <Button onClick={handleCloseAddAssignee}>Cancel</Button>
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
            Thêm{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewEventAssignee;
