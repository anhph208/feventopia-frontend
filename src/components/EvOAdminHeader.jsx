import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfileAPI } from "../components/services/userServices";
import { toast } from "react-toastify";
import { handleLogout } from "../utils/tools";
import "react-toastify/dist/ReactToastify.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  CalendarToday,
} from "@mui/icons-material";

const EvOAdminHeader = () => {
  const loggedIn = localStorage.getItem("isLogged") === "true";
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      const fetchUserProfile = async () => {
        try {
          const profileData = await getProfileAPI();
          setProfile(profileData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Failed to fetch user profile.");
        } finally {
          setLoading(false);
        }
      };
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [loggedIn]);

  const handleLogoutClick = () => {
    handleLogout(navigate('/signin'));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: "black",
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate("/operatorPages")}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a
            className="navbar-brand"
            href="/operatorPages"
            onClick={(e) => e.preventDefault() || navigate("/operatorPages")}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              component="img"
              sx={{ height: 60 }}
              alt="Logo"
              src="https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/logo%2Flogo.svg?alt=media&token=6e50aaa8-2c91-4596-9b11-e407bb6694e3"
            />
          </a>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CalendarToday />}
          onClick={() => navigate("/create-event")}
          sx={{
            mr: 2,
            color: "white",
            backgroundColor: "#450b00",
            "&:hover": {
              backgroundColor: "#ff7f50",
            },
          }}
        >
          TẠO SỰ KIỆN
        </Button>
        {loggedIn ? (
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                src={
                  profile?.avatar ||
                  "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/avatars%2FOPERATOR%20AVT.png?alt=media&token=3e6f0143-be3c-421b-9169-4514424fadea"
                }
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {profile?.name || "User"}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link
            to="/signin"
            className="create-btn btn-hover"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Login
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default EvOAdminHeader;
