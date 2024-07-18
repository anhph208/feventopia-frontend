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
} from "@mui/icons-material";

import OverAll from "../OperatorPages/OverAllDashBoard";
import EventTab from "../OperatorPages/EventTab";
import MyTeamTab from "../OperatorPages/MyTeamTab";
import AccountInfo from "../OperatorPages/AccountInfo";
import StaffInfo from "../OperatorPages/ViewStaff";
import EventSponsor from "../OperatorPages/EventSponsor";
import queryString from "query-string";
import EvOAdminHeader from "../../components/EvOAdminHeader"; // Import the header

const drawerWidth = 240;

const OperatorMain = () => {
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
          selected={activeTab === "myTeam"}
          onClick={() => handleTabChange("myTeam")}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Nhân sự Sự kiện" />
        </ListItem>
        <ListItem
          button
          selected={activeTab === "staffInfo"}
          onClick={() => handleTabChange("staffInfo")}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Thông tin Nhân sự" />
        </ListItem>
      </List>

      <Divider />

      <ListItem
        button
        selected={activeTab === "sponsor"}
        onClick={() => handleTabChange("sponsor")}
      >
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Danh sách nhà tài trợ" />
      </ListItem>

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
          {activeTab === "event" && <EventTab />}
          {activeTab === "myTeam" && <MyTeamTab />}
          {activeTab === "staffInfo" && <StaffInfo />}

          {activeTab === "sponsor" && <EventSponsor />}
          {activeTab === "account" && <AccountInfo />}
        </Container>
      </Box>
    </Box>
  );
};

export default OperatorMain;
