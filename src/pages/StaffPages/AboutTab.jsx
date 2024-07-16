import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  putUpdateProfileAPI,
  sendconfirmEmailAPI,
} from "../../components/services/userServices"; // Import the new service
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Avatar,
  Stack,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

const AboutTab = ({ profile, setProfile }) => {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    phoneNumber: profile.phoneNumber || "",
    email: profile.email || "",
    avatar: profile.avatar || "",
  });
  const [imageUrl, setImageUrl] = useState(profile.avatar || "");
  const [selectedFileName, setSelectedFileName] = useState("Chưa chọn ảnh");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingEmailButton, setLoadingEmailButton] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const successToastId = "success-toast";
  const errorToastId = "error-toast";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setHasChanges(true);
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
      setHasChanges(true);
    } else {
      setSelectedFileName("Chưa chọn ảnh");
      setSelectedImage(null);
      setSelectedFile(null);
      setHasChanges(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoadingButton(true);
    try {
      let imageUrl = formData.avatar;
      if (selectedFile) {
        const storageRef = ref(storage, `avatars/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const updatedProfile = {
        ...formData,
        avatar: imageUrl,
      };

      await putUpdateProfileAPI(updatedProfile, token);
      setProfile(updatedProfile);
      setHasChanges(false);
      toast.success("Hồ sơ đã được cập nhật thành công!", {
        toastId: successToastId,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.", {
        toastId: errorToastId,
      });
    } finally {
      setLoadingButton(false);
    }
  };

  const handleSendConfirmationEmail = async () => {
    setLoadingEmailButton(true);
    try {
      await sendconfirmEmailAPI();
      toast.success("Email xác nhận đã được gửi thành công!", {
        toastId: successToastId,
      });
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      toast.error("Failed to send confirmation email.", {
        toastId: errorToastId,
      });
    } finally {
      setLoadingEmailButton(false);
    }
  };

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
              placeholder={formData.name}
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
              placeholder={formData.phoneNumber}
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
              placeholder={formData.email}
              onChange={handleChange}
              required
              disabled={profile.emailConfirmed} // Disable the email field if emailConfirmed is true
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={handleSendConfirmationEmail}
                sx={{
                  backgroundColor: "#450b00",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ff7f50",
                  },
                }}
                disabled={loadingEmailButton || profile.emailConfirmed} // Disable the button if emailConfirmed is true
              >
                {loadingEmailButton ? (
                  <CircularProgress size={24} />
                ) : (
                  "GỬI EMAIL XÁC NHẬN"
                )}
              </Button>
            </Stack>
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
                justifyContent="center"
                alignItems="center"
                fullWidth
                style={{ height: "30px" }}
                sx={{
                  mt: 5,
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
                src={selectedImage || formData.avatar}
                sx={{ width: 100, height: 100 }}
              />
            </Stack>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                marginTop: 3,
                marginBottom: 4,
                backgroundColor: "#450b00",
                color: "white",
                "&:hover": {
                  backgroundColor: "#ff7f50",
                },
              }}
              disabled={!hasChanges || loadingButton}
            >
              {loadingButton ? (
                <CircularProgress size={24} />
              ) : (
                "CẬP NHẬT TÀI KHOẢN"
              )}
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default AboutTab;
