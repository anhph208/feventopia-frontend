import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
  CircularProgress,
  Stack,
  Container,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  getProfileAPI,
  putUpdateProfileAPI,
  sendconfirmEmailAPI,
} from "../../components/services/userServices";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";

const AccountInfo = () => {
  const [openProfileUpdate, setOpenProfileUpdate] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFileName, setSelectedFileName] = useState("Chưa chọn ảnh");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingEmailButton, setLoadingEmailButton] = useState(false);
  const { token } = useAuth();
  const successToastId = "success-toast";
  const errorToastId = "error-toast";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getProfileAPI(token);
        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to fetch user profile.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
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
      let imageUrl = profile.avatar;
      if (selectedFile) {
        const storageRef = ref(storage, `avatars/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const updatedProfile = {
        ...profile,
        avatar: imageUrl,
      };

      await putUpdateProfileAPI(updatedProfile, token);
      setProfile(updatedProfile);
      setHasChanges(false);
      toast.success("Tài khoản đã được cập nhật thành công!", {
        toastId: successToastId,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Cập nhật tài khoản thất bại. Vui lòng thử lại sau", {
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
      toast.error("Chưa gửi được Email xác nhận. Vui lòng thử lại", {
        toastId: errorToastId,
      });
    } finally {
      setLoadingEmailButton(false);
    }
  };

  return (
    <Box>
      <Box className="d-main-title">
        <Typography variant="h3">
          <i className="fa-solid fa-circle-info me-3"></i>Thông tin Tài Khoản
        </Typography>
      </Box>
      <Box className="conversion-setup">
        <Box className="main-card mt-5">
          <Box className="bp-title position-relative">
            <Typography variant="h4">Thông tin</Typography>
            <Box className="profile-edit-btn">
              <Button onClick={() => setOpenProfileUpdate(true)}>
                <i className="fa-solid fa-pen"></i>
              </Button>
              <Button onClick={() => setOpenPrivacy(true)}>
                <i className="fa-solid fa-gear"></i>
              </Button>
            </Box>
          </Box>
          <Box className="about-details">
            <Box className="about-step text-center">
              <Avatar
                src={profile?.avatar || "images/profile-imgs/img-13.jpg"}
                alt="Profile"
                sx={{ width: 100, height: 100, margin: "0 auto" }}
              />
              <Box className="user-dts">
                <Typography variant="h4" className="user-name">
                  {profile?.name} <i className="fa-solid fa-circle-check"></i>
                </Typography>
                <Typography variant="body1" className="user-email">
                  {profile?.email}
                </Typography>
              </Box>
            </Box>
            <Box className="about-step">
              <Typography variant="h5">Trường Đại học FPT TP.HCM</Typography>
              <Typography variant="body2" className="mb-0">
                Không gian xanh trong lành, kích thích sinh viên học tập, khơi
                nguồn cảm hứng sáng tạo. Trường Đại học FPT tiên phong sử dụng
                công nghệ hiện đại trong giảng dạy và học tập. Các khu vực giải
                trí, tiện ích, thể thao tích hợp giúp sinh viên phát triển cá
                nhân toàn diện.
              </Typography>
            </Box>
            <Box className="about-step">
              <Box className="social-links">
                <Button
                  href="https://www.facebook.com/FPTU.HCM/"
                  className="social-link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  href="https://www.instagram.com/fptuniversityhcm/"
                  className="social-link"
                >
                  <i className="fab fa-instagram"></i>
                </Button>
                <Button
                  href="https://www.youtube.com/channel/UCfNrlxNgcTZDJ3jZeSSSJxg"
                  className="social-link"
                >
                  <i className="fab fa-youtube"></i>
                </Button>
                <Button
                  href="https://university.fpt.edu.vn/hcm/"
                  className="social-link"
                >
                  <i className="fa-solid fa-globe"></i>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Dialog for Profile Update */}
      <Dialog
        open={openProfileUpdate}
        onClose={() => setOpenProfileUpdate(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Cập Nhật Tài Khoản
          <Button onClick={() => setOpenProfileUpdate(false)}>
            <i className="uil uil-multiply"></i>
          </Button>
        </DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="sm">
            <Typography
              component="h1"
              variant="h5"
              align="center"
              marginTop={4}
            >
              <strong>THÔNG TIN TÀI KHOẢN</strong>
            </Typography>
            <form onSubmit={handleUpdateProfile}>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="Họ Tên"
                name="name"
                value={profile?.name || ""}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="Số Điện Thoại"
                name="phoneNumber"
                value={profile?.phoneNumber || ""}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="Email"
                name="email"
                value={profile?.email || ""}
                onChange={handleChange}
                required
                disabled={profile?.emailConfirmed} // Disable the email field if emailConfirmed is true
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
                  disabled={loadingEmailButton || profile?.emailConfirmed} // Disable the button if emailConfirmed is true
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
                  src={selectedImage || profile?.avatar || ""}
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
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AccountInfo;
