import React, { useState } from "react";
import { createEventAPI } from "../../services/userServices";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "../../../firebase/firebase"; // import storage from your firebaseConfig
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const Input = styled("input")({
  display: "none",
});

function OnlineEvent() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    banner: "",
    initialCapital: "",
    category: 0,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log("Event created successfully:", response);
      toast.success("Event created successfully");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    }
  };

  return (
    <Box className="wrapper">
      <Box className="event-dt-block p-80">
        <Box className="container">
          <Box className="row justify-content-center">
            <Box className="col-lg-12 col-md-12">
              <Box className="main-title text-center">
                <Typography variant="h3">Create Online Event</Typography>
              </Box>
            </Box>
            <Box className="col-xl-8 col-lg-9 col-md-12">
              <Box className="wizard-steps-block">
                <Box id="add-event-tab" className="step-app">
                  <Box className="step-steps">
                    <Box className="active">
                      <Typography component="a" href="#tab_step1">
                        <span className="number" />
                        <span className="step-name">Details</span>
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
                              Details
                            </Typography>
                          </Box>
                          <Box className="p-4 bp-form main-form">
                            <form onSubmit={handleSubmit}>
                              <Box className="row">
                                <Box className="col-lg-12 col-md-12">
                                  <Box className="form-group border_bottom pb_30">
                                    <Typography className="form-label fs-16">
                                      Give your event a name.*
                                    </Typography>
                                    <Typography className="mt-2 d-block fs-14 mb-3">
                                      See how your name appears on the event
                                      page and a list of all places where your
                                      event name will be used.{" "}
                                      <Typography
                                        component="a"
                                        href="#"
                                        className="a-link"
                                      >
                                        Learn more
                                      </Typography>
                                    </Typography>
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      name="eventName"
                                      value={formData.eventName}
                                      onChange={handleChange}
                                      placeholder="Enter event name here"
                                      required
                                    />
                                  </Box>
                                  <Box className="form-group border_bottom pt_30 pb_30">
                                    <Typography className="form-label fs-16">
                                      Choose a category for your event.*
                                    </Typography>
                                    <Typography className="mt-2 d-block fs-14 mb-3">
                                      Choosing relevant categories helps to
                                      improve the discoverability of your event.{" "}
                                      <Typography
                                        component="a"
                                        href="#"
                                        className="a-link"
                                      >
                                        Learn more
                                      </Typography>
                                    </Typography>
                                    <TextField
                                      select
                                      fullWidth
                                      variant="outlined"
                                      name="category"
                                      value={formData.category}
                                      onChange={handleChange}
                                      required
                                    >
                                      <MenuItem value={0}>TALKSHOW</MenuItem>
                                      <MenuItem value={1}>ÂM NHẠC</MenuItem>
                                      <MenuItem value={2}>FESTIVAL</MenuItem>
                                      <MenuItem value={3}>CUỘC THI</MenuItem>
                                    </TextField>
                                  </Box>
                                  <Box className="form-group border_bottom pt_30 pb_30">
                                    <Typography className="form-label fs-16">
                                      Initial Capital*
                                    </Typography>
                                    <Typography className="mt-2 fs-14 d-block mb-3">
                                      Enter the initial capital required for
                                      your event.
                                    </Typography>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      variant="outlined"
                                      name="initialCapital"
                                      value={formData.initialCapital}
                                      onChange={handleChange}
                                      placeholder="Enter initial capital"
                                      required
                                    />
                                  </Box>
                                  <Box className="form-group pt_30 pb_30">
                                    <Typography className="form-label fs-16">
                                      Add a few images to your event banner.
                                    </Typography>
                                    <Typography className="mt-2 fs-14 d-block mb-3 pe_right">
                                      Upload colorful and vibrant images as the
                                      banner for your event! See how beautiful
                                      images help your event details page.{" "}
                                      <Typography
                                        component="a"
                                        href="#"
                                        className="a-link"
                                      >
                                        Learn more
                                      </Typography>
                                    </Typography>
                                    <Box className="content-holder mt-4">
                                      <Box className="default-event-thumb">
                                        <label htmlFor="banner-upload">
                                          <Input
                                            accept="image/*"
                                            id="banner-upload"
                                            type="file"
                                            onChange={handleFileChange}
                                            required
                                          />
                                          <Button
                                            variant="contained"
                                            component="span"
                                          >
                                            Upload Image
                                          </Button>
                                        </label>
                                        {formData.banner && (
                                          <img
                                            src={formData.banner}
                                            alt="Event Banner"
                                            style={{
                                              width: "100%",
                                              height: "auto",
                                            }}
                                          />
                                        )}
                                      </Box>
                                    </Box>
                                  </Box>
                                  <Box className="form-group border_bottom pb_30">
                                    <Typography className="form-label fs-16">
                                      Please describe your event.
                                    </Typography>
                                    <Typography className="mt-2 fs-14 d-block mb-3">
                                      Write a few words below to describe your
                                      event and provide any extra information
                                      such as schedules, itinerary or any
                                      special instructions required to attend
                                      your event.
                                    </Typography>
                                    <ReactQuill
                                      theme="snow"
                                      value={formData.eventDescription}
                                      onChange={handleDescriptionChange}
                                      placeholder="Enter event description here"
                                      required
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            </form>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="step-footer step-tab-pager mt-4">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                      >
                        Create
                      </Button>
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

export default OnlineEvent;
