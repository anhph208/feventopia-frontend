import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Toolbar,
  Box,
  Container,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  Group as GroupIcon,
  AccountCircle as AccountCircleIcon,
  ConfirmationNumber as TicketIcon,
  MonetizationOn as TransactionIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";

import OverAll from "../AdminPages/OverAll";
import UserTab from "../AdminPages/UserTab";
import EventTab from "../AdminPages/EventTab";
import TicketAndStallTab from "../AdminPages/TicketAndStallTab";
import TransactionTab from "../AdminPages/TransactionTab";
import LocationTab from "../AdminPages/LocationTab";
import AccountInfo from "../AdminPages/AccountInfo";
import queryString from "query-string";
import EvOAdminHeader from "../../components/EvOAdminHeader"; // Import the header

const drawerWidth = 240;

const AdminMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    if (queryParams.activeTab) {
      setActiveTab(queryParams.activeTab);
    }
  }, [location.search]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileOpen(false); // Close drawer on mobile after selecting an item
    navigate(`?activeTab=${tab}`);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem
          button
          selected={activeTab === "dashboard"}
          onClick={() => handleTabChange("dashboard")}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Tổng quan" />
        </ListItem>
        <ListItem
          button
          selected={activeTab === "user"}
          onClick={() => handleTabChange("user")}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Tài khoản" />
        </ListItem>
        <ListItem
          button
          selected={activeTab === "event"}
          onClick={() => handleTabChange("event")}
        >
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Sự kiện" />
        </ListItem>
        <ListItem
          button
          selected={activeTab === "ticketAndStall"}
          onClick={() => handleTabChange("ticketAndStall")}
        >
          <ListItemIcon>
            <TicketIcon />
          </ListItemIcon>
          <ListItemText primary="Ticket and Stall" />
        </ListItem>
        <ListItem
          button
          selected={activeTab === "transaction"}
          onClick={() => handleTabChange("transaction")}
        >
          <ListItemIcon>
            <TransactionIcon />
          </ListItemIcon>
          <ListItemText primary="Giao dịch" />
        </ListItem>
        <ListItem
          button
          selected={activeTab === "location"}
          onClick={() => handleTabChange("location")}
        >
          <ListItemIcon>
            <LocationIcon />
          </ListItemIcon>
          <ListItemText primary="Địa điểm Tổ chức" />
        </ListItem>
      </List>

      <Divider />

      <ListItem
        button
        selected={activeTab === "account"}
        onClick={() => handleTabChange("account")}
      >
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Thông tin Tài khoản" />
      </ListItem>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <EvOAdminHeader /> {/* Add the header here */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container>
          {activeTab === "dashboard" && <OverAll />}
          {activeTab === "user" && <UserTab />}
          {activeTab === "event" && <EventTab />}
          {activeTab === "ticketAndStall" && <TicketAndStallTab />}
          {activeTab === "transaction" && <TransactionTab />}
          {activeTab === "location" && <LocationTab />}
          {activeTab === "account" && <AccountInfo />}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminMain;
