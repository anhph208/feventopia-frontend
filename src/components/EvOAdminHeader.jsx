import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfileAPI } from "../components/services/userServices";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
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
import { Menu as MenuIcon, CalendarToday } from "@mui/icons-material";

const EvOAdminHeader = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { token, logout } = useAuth(); // Use the useAuth hook

  useEffect(() => {
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const profileData = await getProfileAPI();
          setProfile(profileData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          if (error.response && error.response.status === 401) {
            // Handle session expiration
            handleSessionExp();
          } else {
            console.error("Failed to fetch user profile.");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleLogoutClick = () => {
    logout(); // Use the logout function from AuthContext
    toast.success("Đăng xuất thành công.");
    navigate("/signin")
  };

  const handleSessionExp = () => {
    logout(); // Use the logout function from AuthContext
    toast.success("Phiên đã hết hạn. Vui lòng Đăng nhập lại.")
    navigate("/signin")
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getHomePath = () => {
    if (profile?.role === "ADMIN") {
      return "/adminPages";
    } else if (profile?.role === "EVENTOPERATOR") {
      return "/operatorPages";
    } else if (profile?.role === "CHECKINGSTAFF") {
      return "/checkingPages";
    }
    return "/"; // Default path
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

          onClick={() => navigate(getHomePath())}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a
            className="navbar-brand"

            href={getHomePath()}
            onClick={(e) => e.preventDefault() || navigate(getHomePath())}
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

        {profile?.role === "EVENTOPERATOR" && (
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
        )}
        {token ? (
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
              <MenuItem onClick={handleLogoutClick}>ĐĂNG XUẤT</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link
            to="/signin"
            className="create-btn btn-hover"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            ĐĂNG NHẬP
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default EvOAdminHeader;
