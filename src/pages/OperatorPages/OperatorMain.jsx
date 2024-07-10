import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  Contacts as ContactsIcon,
  Assessment as AssessmentIcon,
  Group as GroupIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import DashboardTab from "../OperatorPages/DashboardTab";
import EventTab from "../OperatorPages/EventTab";
import ContactListTab from "../OperatorPages/ContactListTab";
import ReportTab from "../OperatorPages/ReportTab";
import MyTeamTab from "../OperatorPages/MyTeamTab";
import queryString from "query-string";
// import EvOAdminHeader from "../../components/EvOAdminHeader";

const drawerWidth = 240;

const OperatorMain = () => {
  const location = useLocation();
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
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          selected={activeTab === "event"}
          onClick={() => handleTabChange("event")}
        >
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Event" />
        </ListItem>
        <ListItem
          button
          selected={activeTab === "contactList"}
          onClick={() => handleTabChange("contactList")}
        >
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText primary="Contact List" />
        </ListItem>
        <ListItem
          button
          selected={activeTab === "report"}
          onClick={() => handleTabChange("report")}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>
        <ListItem
          button
          selected={activeTab === "myTeam"}
          onClick={() => handleTabChange("myTeam")}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="My Team" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="wrapper">


      <nav className="drawer" aria-label="menu items">
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
      </nav>
      <main className="content">
        <div className="toolbar" />
        <div className="wrapper-body">
          <div className="dashboard-body">
            <div className="container-fluid">
              {activeTab === "dashboard" && <DashboardTab />}
              {activeTab === "event" && <EventTab />}
              {activeTab === "contactList" && <ContactListTab />}
              {activeTab === "report" && <ReportTab />}
              {activeTab === "myTeam" && <MyTeamTab />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OperatorMain;
