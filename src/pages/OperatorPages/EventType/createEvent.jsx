import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createEventAPI } from "../../../components/services/userServices";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { storage } from "../../../firebase/firebase"; // import storage from your firebaseConfig
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles for react-quill
import { formatDateTime, PriceFormat } from "../../../utils/tools"; // Assuming this is the correct path

const Input = styled("input")({
  display: "none",
});
const modules = {
  toolbar: {
    container: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']                                         
    ],
    handlers: {
      image: function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files[0];
          const formData = new FormData();
          formData.append('image', file);

          // Perform the image upload logic here, for example, uploading to Firebase
          const storageRef = ref(storage, `event-images/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const imageUrl = await getDownloadURL(snapshot.ref);

          // Insert the image into the editor
          const quill = this.quill;
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', imageUrl);
        };
      }
    }
  }}

const formats = [
  'font',
  'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'header', 'blockquote', 'code-block',
  'list', 'bullet',
  'direction', 'align',
  'link', 'image', 'video'
];


// Custom toolbar options
const CreateEvent = () => {
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    banner: "",
    initialCapital: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    initialCapital: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          banner: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      eventDescription: value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.eventName = formData.eventName ? "" : "Tên sự kiện là bắt buộc";
    tempErrors.initialCapital =
      formData.initialCapital && formData.initialCapital >= 0
        ? ""
        : "Vốn sự kiện không thể là số âm";
    tempErrors.category = formData.category ? "" : "Danh mục là bắt buộc";
    tempErrors.eventDescription = formData.eventDescription
      ? ""
      : "Mô tả sự kiện là bắt buộc";
    tempErrors.banner = formData.banner ? "" : "Banner sự kiện là bắt buộc";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      let bannerUrl = formData.banner;

      if (selectedFile) {
        const storageRef = ref(storage, `event-banner/${selectedFile.name}`);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        bannerUrl = await getDownloadURL(snapshot.ref);
      }

      const eventData = {
        ...formData,
        banner: bannerUrl,
      };

      const response = await createEventAPI(eventData, formData.category);
      toast.success("Sự kiện được tạo thành công", {
        onClose: () => {
          navigate(`/edit-eventdetails/${response.id}`);
        },
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Tạo sự kiện thất bại, vui lòng thử lại");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Box className="wrapper">
      <Box className="event-dt-block p-80">
        <Box className="container">
          <Box className="row justify-content-center">
            <Box className="col-lg-12 col-md-12">
              <Box className="main-title text-center">
                <Typography variant="h3">TẠO SỰ KIỆN MỚI</Typography>
              </Box>
            </Box>
            <Box className="col-xl-8 col-lg-9 col-md-12">
              <Box className="wizard-steps-block">
                <Box id="add-event-tab" className="step-app">
                  <Box className="step-steps">
                    <Box className="active">
                      <Typography component="a" href="#tab_step1">
                        <span className="number" />
                        <span className="step-name">Chi tiết</span>
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="step-content">
                    <Box
                      className="step-tab-panel step-tab-info active"
                      id="tab_step1"
                    >
                      <Box className="tab-from-content">
                        <Box className="main-card">
                          <Box className="bp-title">
                            <Typography variant="h4">
                              <i className="fa-solid fa-circle-info step_icon me-3" />
                              CHI TIẾT
                            </Typography>
                          </Box>
                          <Box className="p-4 bp-form main-form">
                            <form onSubmit={handleSubmit}>
                              <Box className="row">
                                <Box className="col-lg-12 col-md-12">
                                  <Box className="form-group border_bottom pb_30">
                                    <Typography className="form-label fs-16">
                                      Tên sự kiện*
                                    </Typography>
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      name="eventName"
                                      value={formData.eventName}
                                      onChange={handleChange}
                                      placeholder="Nhập tên Sự kiện"
                                      required
                                      error={!!errors.eventName}
                                      helperText={errors.eventName}
                                    />
                                  </Box>
                                  <Box className="form-group border_bottom pt_30 pb_30">
                                    <Typography className="form-label fs-16">
                                      Chọn danh mục cho Sự kiện.*
                                    </Typography>
                                    <Typography className="mt-2 d-block fs-14 mb-3">
                                      Việc lựa chọn các danh mục phù hợp sẽ giúp
                                      cải thiện khả năng nhận diện Sự kiện.
                                    </Typography>
                                    <TextField
                                      select
                                      fullWidth
                                      variant="outlined"
                                      name="category"
                                      value={formData.category}
                                      onChange={handleChange}
                                      required
                                      error={!!errors.category}
                                      helperText={errors.category}
                                    >
                                      <MenuItem value="0">TALKSHOW</MenuItem>
                                      <MenuItem value="1">CUỘC THI</MenuItem>
                                      <MenuItem value="2">FESTIVAL</MenuItem>
                                      <MenuItem value="3">ÂM NHẠC</MenuItem>
                                    </TextField>
                                  </Box>
                                  <Box className="form-group border_bottom pt_30 pb_30">
                                    <Typography className="form-label fs-16">
                                      Vốn Sự kiện*
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      className="mt-2 d-block fs-14 mb-3"
                                    >
                                      Hãy nhập số vốn dự tính cần thiết cho Sự
                                      kiện.
                                    </Typography>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      variant="outlined"
                                      name="initialCapital"
                                      value={formData.initialCapital}
                                      onChange={handleChange}
                                      placeholder="Nhập Vốn Sự kiện"
                                      required
                                      error={!!errors.initialCapital}
                                      helperText={errors.initialCapital}
                                    />
                                    <Typography variant="body2">
                                      Số tiền nhập:{" "}
                                      <PriceFormat
                                        price={parseInt(
                                          formData.initialCapital,
                                          10
                                        )}
                                      />
                                    </Typography>
                                  </Box>
                                  <Box className="form-group pt_30 pb_30">
                                    <Typography className="form-label fs-16">
                                      Banner Sự kiện.*
                                    </Typography>
                                    <Box className="content-holder mt-4">
                                      <Box className="default-event-thumb">
                                        <label htmlFor="banner-upload">
                                          <Input
                                            accept="image/*"
                                            id="banner-upload"
                                            type="file"
                                            onChange={handleFileChange}
                                          />
                                          <Button
                                            variant="contained"
                                            component="span"
                                            sx={{
                                              color: "white",
                                              backgroundColor: "#450b00",
                                              "&:hover": {
                                                backgroundColor: "#ff7f50",
                                              },
                                            }}
                                          >
                                            Tải Ảnh lên
                                          </Button>
                                        </label>
                                        {formData.banner && (
                                          <img
                                            src={formData.banner}
                                            alt="Event Banner"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                            }}
                                          />
                                        )}
                                      </Box>
                                    </Box>
                                    {errors.banner && (
                                      <Typography color="error">
                                        {errors.banner}
                                      </Typography>
                                    )}
                                  </Box>
                                  <Box
                                    className="form-group border_bottom pb_30"
                                    style={{ height: 400 }}
                                  >
                                    <Typography className="form-label fs-16">
                                      Chi tiết Sự kiện*
                                    </Typography>
                                    <ReactQuill
                                      ref={quillRef}
                                      value={formData.eventDescription}
                                      onChange={handleDescriptionChange}
                                      modules={modules}
                                      formats={formats}
                                      style={{ height: "300px" }}
                                    />
                                    {errors.eventDescription && (
                                      <Typography color="error">
                                        {errors.eventDescription}
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                              </Box>
                              <Box className="step-footer step-tab-pager mt-4">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  disabled={submitLoading}
                                  startIcon={
                                    submitLoading && (
                                      <CircularProgress size={20} />
                                    )
                                  }
                                  sx={{
                                    color: "white",
                                    backgroundColor: "#450b00",
                                    "&:hover": {
                                      backgroundColor: "#ff7f50",
                                    },
                                  }}
                                >
                                  {submitLoading
                                    ? "ĐANG TẠO SỰ KIỆN..."
                                    : "TẠO SỰ KIỆN"}
                                </Button>
                              </Box>
                            </form>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateEvent;
