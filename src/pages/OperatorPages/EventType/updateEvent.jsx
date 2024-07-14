import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventDetailsAPI, putUpdateEventAPI } from "../../../components/services/userServices";
import { TextField, Button, MenuItem, Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "../../../firebase/firebase"; // import storage from your firebaseConfig
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

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
  }
};

function UpdateEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    banner: "",
    initialCapital: "",
    category: "",
  });

  const [placeholders, setPlaceholders] = useState({
    eventName: "",
    eventDescription: "",
    banner: "",
    initialCapital: "",
    category: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false); // Add this state for submit button loading
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetcheventInfor = async () => {
      try {
        setLoading(true);
        const eventInfor = await getEventDetailsAPI(eventId);
        setFormData({
          eventName: eventInfor.eventName,
          eventDescription: eventInfor.eventDescription,
          banner: eventInfor.banner,
          initialCapital: eventInfor.initialCapital,
          category: eventInfor.category,
        });
        setPlaceholders({
          eventName: eventInfor.eventName,
          eventDescription: eventInfor.eventDescription,
          banner: eventInfor.banner,
          initialCapital: eventInfor.initialCapital,
          category: eventInfor.category,
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetcheventInfor();
  }, [eventId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true); // Start loading when form is submitted
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

      // Send the updated event data
      await putUpdateEventAPI(eventData, eventId, formData.category);
      toast.success("Event updated successfully");
      navigate(`/edit-eventdetails/${eventId}`);
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    } finally {
      setSubmitLoading(false); // Stop loading after submission is done
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading event details</div>;

  return (
    <Box className="wrapper">
      <Box className="event-dt-block p-80">
        <Box className="container">
          <Box className="row justify-content-center">
            <Box className="col-lg-12 col-md-12">
              <Box className="main-title text-center">
                <Typography variant="h3">CẬP NHẬT SỰ KIỆN</Typography>
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
                                      placeholder={placeholders.eventName}
                                      required
                                    />
                                  </Box>
                                  <Box className="form-group border_bottom pt_30 pb_30">
                                    <Typography className="form-label fs-16">
                                      Danh mục*
                                    </Typography>
                                    <TextField
                                      select
                                      fullWidth
                                      variant="outlined"
                                      name="category"
                                      value={formData.category}
                                      onChange={handleChange}
                                      placeholder={placeholders.initialCapital}
                                      required
                                    >
                                      <MenuItem value="TALKSHOW">TALKSHOW</MenuItem>
                                      <MenuItem value="ÂM NHẠC">ÂM NHẠC</MenuItem>
                                      <MenuItem value="FESTIVAL">FESTIVAL</MenuItem>
                                      <MenuItem value="CUỘC THI">CUỘC THI</MenuItem>
                                    </TextField>
                                  </Box>
                                  <Box className="form-group border_bottom pt_30 pb_30">
                                    <Typography className="form-label fs-16">
                                      Vốn Sự kiện*
                                    </Typography>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      variant="outlined"
                                      name="initialCapital"
                                      value={formData.initialCapital}
                                      onChange={handleChange}
                                      placeholder={placeholders.initialCapital}
                                      required
                                    />
                                  </Box>
                                  <Box className="form-group pt_30 pb_30">
                                    <Typography className="form-label fs-16">
                                      Banner Sự kiện
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
                                  </Box>
                                  <Box className="form-group border_bottom pb_30">
                                    <Typography className="form-label fs-16">
                                      Chi tiết Sự kiện
                                    </Typography>
                                    <ReactQuill
                                      theme="snow"
                                      value={formData.eventDescription}
                                      onChange={handleDescriptionChange}
                                      placeholder={placeholders.eventDescription}
                                      required
                                      modules={modules}
                                      style={{ height: "400px" }} // Adjust the height as needed
                                    />
                                  </Box>
                                </Box>
                              </Box>
                              <Box className="step-footer step-tab-pager mt-4">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  disabled={submitLoading} // Disable button when loading
                                  startIcon={submitLoading && <CircularProgress size={20} />} // Add CircularProgress when loading
                                >
                                  {submitLoading ? "ĐANG CẬP NHẬT..." : "CẬP NHẬT SỰ KIỆN"}
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
}

export default UpdateEvent;
