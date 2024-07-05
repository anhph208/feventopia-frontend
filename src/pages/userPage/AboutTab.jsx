import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileAPI, putUpdateProfileAPI } from "../../components/services/userServices";
import { storage } from "../../firebase/firebase"; // import storage from your firebaseConfig
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
  const [selectedFile, setSelectedFile] = useState(null); // New state to store the selected file
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
        name: formData.name || placeholders.name,
        phoneNumber: formData.phoneNumber || placeholders.phoneNumber,
        email: formData.email || placeholders.email,
        avatar: avatarUrl || placeholders.avatar,
      };
      await putUpdateProfileAPI(token, updatedProfile);
      toast.success("Profile updated successfully");
      setTimeout(() => {
        navigate(window.location.replace("/userprofile"));
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="tab-pane fade show active"
      id="about"
      role="tabpanel"
      aria-labelledby="about-tab"
    >
      <div className="main-card mt-4">
        <div className="bp-title position-relative">
          <h4>Edit Profile</h4>
        </div>
        <div className="about-details">
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group mt-4">
              <label className="form-label">Name:</label>
              <TextField
                className="form-control"
                name="name"
                value={formData.name}
                placeholder={placeholders.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mt-4">
              <label className="form-label">Phone Number:</label>
              <TextField
                className="form-control"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder={placeholders.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mt-4">
              <label className="form-label">Email:</label>
              <TextField
                className="form-control"
                name="email"
                value={formData.email}
                placeholder={placeholders.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mt-4">
              <label className="form-label">Avatar:</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="mt-2">{selectedFileName}</div>
              <Stack direction="row" spacing={2} mt={2}>
                <Avatar
                  alt="Avatar Preview"
                  src={selectedImage || imageUrl}
                  sx={{ width: 100, height: 100 }}
                />
              </Stack>
            </div>
            <Button
              className="main-btn btn-hover w-100 mt-5"
              type="submit"
              variant="contained"
              color="primary"
            >
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
