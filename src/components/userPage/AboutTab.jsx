import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileAPI, putUpdateProfileAPI } from "../services/userServices";
import { storage } from "../../firebase/firebase"; // import storage from your firebaseConfig
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Avatar,
  Stack,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AboutTab = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    avatar: "",
  });
  const [placeholders, setPlaceholders] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    avatar: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("Chưa chọn ảnh");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileAPI(token);
        setFormData({
          name: profileData.name || "",
          phoneNumber: profileData.phoneNumber || "",
          email: profileData.email || "",
          avatar: profileData.avatar || "",
        });
        setPlaceholders({
          name: profileData.name || "",
          phoneNumber: profileData.phoneNumber || "",
          email: profileData.email || "",
          avatar: profileData.avatar || "",
        });
        setImageUrl(profileData.avatar || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName("Chưa chọn ảnh");
      setSelectedImage(null);
      setSelectedFile(null);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    let avatarUrl = formData.avatar;

    if (selectedFile) {
      const storageRef = ref(storage, `avatars/${selectedFile.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, selectedFile);
        avatarUrl = await getDownloadURL(snapshot.ref);
        toast.success("Avatar uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload avatar");
      }
    }

    try {
      const updatedProfile = {
        ...formData,
        avatar: avatarUrl || placeholders.avatar,
      };

      await putUpdateProfileAPI(updatedProfile, token);
      toast.success("Profile updated successfully");
      setTimeout(() => {
        navigate("/userprofile");
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div
      className="tab-pane fade show active"
      id="about"
      role="tabpanel"
      aria-labelledby="about-tab"
    >
      <div className="main-card mt-4">
        <Container component="main" maxWidth="sm">
          <Typography component="h1" variant="h5" align="center" marginTop={4}>
            <strong>THÔNG TIN TÀI KHOẢN</strong>
          </Typography>
          <form onSubmit={handleUpdateProfile}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Họ Tên"
              name="name"
              value={formData.name}
              placeholder={placeholders.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Số Điện Thoại"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder={placeholders.phoneNumber}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Email"
              name="email"
              value={formData.email}
              placeholder={placeholders.email}
              onChange={handleChange}
              required
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                fullWidth
                style={{ height: "30px" }}
                sx={{
                  backgroundColor: "#450b00",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ff7f50",
                  },
                }}
              >
                CẬP NHẬT AVATAR
              </Button>
            </label>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              marginTop={2}
            >
              {selectedFileName}
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              marginTop={2}
            >
              <Avatar
                alt="Avatar Preview"
                src={selectedImage || imageUrl}
                sx={{ width: 100, height: 100 }}
              />
            </Stack>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                marginTop: 3,
                marginBottom: 4, // Corrected marginBottom placement
                backgroundColor: "#450b00",
                color: "white",
                "&:hover": {
                  backgroundColor: "#ff7f50",
                },
              }}
            >
              CẬP NHẬT TÀI KHOẢN
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default AboutTab;
