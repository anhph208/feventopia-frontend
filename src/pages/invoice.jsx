import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { getProfileAPI, getTicketInforAPI } from "../components/services/userServices";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { formatDateTime, PriceFormat } from "../utils/tools";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: "#f5f5f5",
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  backgroundColor: "#ffffff",
}));

const TicketPage = () => {
  const { ticketId } = useParams();
  const [profile, setProfile] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfileAPI();
        setProfile(profileData);
        const ticketData = await getTicketInforAPI(ticketId);
        setTicketInfo(ticketData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [ticketId]);

  const generatePDF = () => {
    const input = document.getElementById("ticket");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("ticket.pdf");
    });
  };

  if (!profile || !ticketInfo) {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

  const { event, eventDetail, transaction } = ticketInfo;

  return (
    <Container>
      <StyledPaper elevation={3} id="ticket">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/logo%2Flogo.svg?alt=media&token=6e50aaa8-2c91-4596-9b11-e407bb6694e3"
                alt="invoice-logo"
                style={{ maxHeight: 50 }}
              />
            </Box>
            <Box mb={4}>
              <Typography variant="h4" align="center" gutterBottom>
                HÓA ĐƠN THANH TOÁN
              </Typography>
              <Divider />
              <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Thông tin người mua</Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary={profile.name} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Email: ${profile.email}`} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Thông tin hóa đơn</Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary={`Số Hóa đơn: ${transaction.id}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Ngày đặt: ${formatDateTime(transaction.transactionDate)}`} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
            <StyledTableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Thông tin sự kiện</TableCell>
                    <TableCell>Loại</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Đơn giá</TableCell>
                    <TableCell>Tổng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>{event.eventName}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell><PriceFormat price={eventDetail.ticketPrice}/></TableCell>
                    <TableCell><PriceFormat price={eventDetail.ticketPrice}/></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1} />
                    <TableCell colSpan={5}>
                      <Box textAlign="right" pr={4}>
                        <Typography variant="h6">Tổng hóa đơn: <PriceFormat price={eventDetail.ticketPrice}/></Typography>
                        <Typography>Thanh toán qua FEventWallet</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </StyledTableContainer>
            <Box mb={4}>
              <Divider />
              <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Card sx={{ width: '100%', backgroundColor: '#fafafa', marginBottom: 2 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={event.banner}
                    alt="Event Thumbnail"
                  />
                </Card>
              </Box>
              <Box mb={4}>
                <Typography variant="h5" align="center">{event.eventName}</Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary">
                  {formatDateTime(eventDetail.startDate)} - {formatDateTime(eventDetail.endDate)}
                </Typography>
                <Typography align="center">{profile.name}</Typography>
                <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                  <Typography><i className="fa-solid fa-ticket rotate-icon"></i></Typography>
                  <Typography mx={2}>1 x Ticket</Typography>
                </Box>
                <Typography align="center">Tổng: <PriceFormat price={eventDetail.ticketPrice}/></Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={4}>
                <QRCode value={transaction.id} size={200} />
                <Typography mt={2} align="center">
                  Mã QR code được sử dụng để check in tại sự kiện, vui lòng không chia sẻ mã này cho người khác
                </Typography>
                <Typography align="center">Ghế ngồi ngẫu nhiên.</Typography>
              </Box>
              <Divider />
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" color="primary" onClick={generatePDF} sx={{
              color: "white",
              backgroundColor: "#450b00",
              "&:hover": {
                backgroundColor: "#ff7f50",
              },
            }}>
                Tải xuống vé PDF
              </Button>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default TicketPage;
