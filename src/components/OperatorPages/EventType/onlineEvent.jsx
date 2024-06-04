import React from "react";

function onlineEvent() {
  return (
    <div>
      <div className="wrapper">
        <div className="breadcrumb-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-10">
                <div className="barren-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="create.html">Create</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Create Online Event
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="event-dt-block p-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 col-md-12">
                <div className="main-title text-center">
                  <h3>Create Online Event</h3>
                </div>
              </div>
              <div className="col-xl-8 col-lg-9 col-md-12">
                <div className="wizard-steps-block">
                  <div id="add-event-tab" className="step-app">
                    <ul className="step-steps">
                      <li className="active">
                        <a href="#tab_step1">
                          <span className="number" />
                          <span className="step-name">Details</span>
                        </a>
                      </li>
                      <li>
                        <a href="#tab_step2">
                          <span className="number" />
                          <span className="step-name">Tickets</span>
                        </a>
                      </li>
                      <li>
                        <a href="#tab_step3">
                          <span className="number" />
                          <span className="step-name">Setting</span>
                        </a>
                      </li>
                    </ul>
                    <div className="step-content">
                      <div
                        className="step-tab-panel step-tab-info active"
                        id="tab_step1"
                      >
                        <div className="tab-from-content">
                          <div className="main-card">
                            <div className="bp-title">
                              <h4>
                                <i className="fa-solid fa-circle-info step_icon me-3" />
                                Details
                              </h4>
                            </div>
                            <div className="p-4 bp-form main-form">
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group border_bottom pb_30">
                                    <label className="form-label fs-16">
                                      Give your event a name.*
                                    </label>
                                    <p className="mt-2 d-block fs-14 mb-3">
                                      See how your name appears on the event
                                      page and a list of all places where your
                                      event name will be used.{" "}
                                      <a href="#" className="a-link">
                                        Learn more
                                      </a>
                                    </p>
                                    <input
                                      className="form-control h_50"
                                      type="text"
                                      placeholder="Enter event name here"
                                      defaultValue
                                    />
                                  </div>
                                  <div className="form-group border_bottom pt_30 pb_30">
                                    <label className="form-label fs-16">
                                      Choose a category for your event.*
                                    </label>
                                    <p className="mt-2 d-block fs-14 mb-3">
                                      Choosing relevant categories helps to
                                      improve the discoverability of your event.{" "}
                                      <a href="#" className="a-link">
                                        Learn more
                                      </a>
                                    </p>
                                    <select
                                      className="selectpicker"
                                      multiple
                                      data-selected-text-format="count > 4"
                                      data-size={5}
                                      title="Select category"
                                      data-live-search="true"
                                    >
                                      <option value={"Arts"}>Arts</option>
                                      <option value={"Business"}>Business</option>
                                      <option value={"Coaching and Consulting"}>
                                        Coaching and Consulting
                                      </option>
                                      <option value={"Community and Culture"}>
                                        Community and Culture
                                      </option>
                                      <option value={"Entrepreneurship"}>
                                        Entrepreneurship
                                      </option>
                                      <option value={"Education and Training"}>
                                        Education and Training
                                      </option>
                                      <option value={"Family and Friends"}>
                                        Family and Friends
                                      </option>
                                      <option value={"Fashion and Beauty"}>
                                        Fashion and Beauty
                                      </option>
                                      <option value={"Film and Entertainment"}>
                                        Film and Entertainment
                                      </option>
                                      <option value={"Food and Drink"}>Food and Drink</option>
                                      <option value={"Government and Politics"}>
                                        Government and Politics
                                      </option>
                                      <option value={"Health and Wellbeing"}>
                                        Health and Wellbeing
                                      </option>
                                      <option value={"Hobbies and Interest"}>
                                        Hobbies and Interest
                                      </option>
                                      <option value={"Music and Theater"}>
                                        Music and Theater
                                      </option>
                                      <option value={"Religion and Spirituality"}>
                                        Religion and Spirituality
                                      </option>
                                      <option value={"Science and Technology"}>
                                        Science and Technology
                                      </option>
                                      <option value={"Sports and Fitness"}>
                                        Sports and Fitness
                                      </option>
                                      <option value={"Travel and Outdoor"}>
                                        Travel and Outdoor
                                      </option>
                                      <option value={"Visual Arts"}>Visual Arts</option>
                                      <option value={"Others"}>Others</option>
                                    </select>
                                  </div>
                                  <div className="form-group border_bottom pt_30 pb_30">
                                    <label className="form-label fs-16">
                                      When is your event?*
                                    </label>
                                    <p className="mt-2 fs-14 d-block mb-3">
                                      Tell your attendees when your event starts
                                      so they can get ready to attend.
                                    </p>
                                    <div className="row g-2">
                                      <div className="col-md-6">
                                        <label className="form-label mt-3 fs-6">
                                          Event Date.*
                                        </label>
                                        <div className="loc-group position-relative">
                                          <input
                                            className="form-control h_50 datepicker-here"
                                            data-language="en"
                                            type="text"
                                            placeholder="MM/DD/YYYY"
                                            defaultValue
                                          />
                                          <span className="absolute-icon">
                                            <i className="fa-solid fa-calendar-days" />
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="row g-2">
                                          <div className="col-md-6">
                                            <div className="clock-icon">
                                              <label className="form-label mt-3 fs-6">
                                                Time
                                              </label>
                                              <select
                                                className="selectpicker"
                                                data-size={5}
                                                data-live-search="true"
                                              >
                                                <option value="00:00">
                                                  12:00 AM
                                                </option>
                                                <option value="00:15">
                                                  12:15 AM
                                                </option>
                                                <option value="00:30">
                                                  12:30 AM
                                                </option>
                                                <option value="00:45">
                                                  12:45 AM
                                                </option>
                                                <option value="01:00">
                                                  01:00 AM
                                                </option>
                                                <option value="01:15">
                                                  01:15 AM
                                                </option>
                                                <option value="01:30">
                                                  01:30 AM
                                                </option>
                                                <option value="01:45">
                                                  01:45 AM
                                                </option>
                                                <option value="02:00">
                                                  02:00 AM
                                                </option>
                                                <option value="02:15">
                                                  02:15 AM
                                                </option>
                                                <option value="02:30">
                                                  02:30 AM
                                                </option>
                                                <option value="02:45">
                                                  02:45 AM
                                                </option>
                                                <option value="03:00">
                                                  03:00 AM
                                                </option>
                                                <option value="03:15">
                                                  03:15 AM
                                                </option>
                                                <option value="03:30">
                                                  03:30 AM
                                                </option>
                                                <option value="03:45">
                                                  03:45 AM
                                                </option>
                                                <option value="04:00">
                                                  04:00 AM
                                                </option>
                                                <option value="04:15">
                                                  04:15 AM
                                                </option>
                                                <option value="04:30">
                                                  04:30 AM
                                                </option>
                                                <option value="04:45">
                                                  04:45 AM
                                                </option>
                                                <option value="05:00">
                                                  05:00 AM
                                                </option>
                                                <option value="05:15">
                                                  05:15 AM
                                                </option>
                                                <option value="05:30">
                                                  05:30 AM
                                                </option>
                                                <option value="05:45">
                                                  05:45 AM
                                                </option>
                                                <option value="06:00">
                                                  06:00 AM
                                                </option>
                                                <option value="06:15">
                                                  06:15 AM
                                                </option>
                                                <option value="06:30">
                                                  06:30 AM
                                                </option>
                                                <option value="06:45">
                                                  06:45 AM
                                                </option>
                                                <option value="07:00">
                                                  07:00 AM
                                                </option>
                                                <option value="07:15">
                                                  07:15 AM
                                                </option>
                                                <option value="07:30">
                                                  07:30 AM
                                                </option>
                                                <option value="07:45">
                                                  07:45 AM
                                                </option>
                                                <option value="08:00">
                                                  08:00 AM
                                                </option>
                                                <option value="08:15">
                                                  08:15 AM
                                                </option>
                                                <option value="08:30">
                                                  08:30 AM
                                                </option>
                                                <option value="08:45">
                                                  08:45 AM
                                                </option>
                                                <option value="09:00">
                                                  09:00 AM
                                                </option>
                                                <option value="09:15">
                                                  09:15 AM
                                                </option>
                                                <option value="09:30">
                                                  09:30 AM
                                                </option>
                                                <option value="09:45">
                                                  09:45 AM
                                                </option>
                                                <option
                                                  value="10:00"
                                                  selected="selected"
                                                >
                                                  10:00 AM
                                                </option>
                                                <option value="10:15">
                                                  10:15 AM
                                                </option>
                                                <option value="10:30">
                                                  10:30 AM
                                                </option>
                                                <option value="10:45">
                                                  10:45 AM
                                                </option>
                                                <option value="11:00">
                                                  11:00 AM
                                                </option>
                                                <option value="11:15">
                                                  11:15 AM
                                                </option>
                                                <option value="11:30">
                                                  11:30 AM
                                                </option>
                                                <option value="11:45">
                                                  11:45 AM
                                                </option>
                                                <option value="12:00">
                                                  12:00 PM
                                                </option>
                                                <option value="12:15">
                                                  12:15 PM
                                                </option>
                                                <option value="12:30">
                                                  12:30 PM
                                                </option>
                                                <option value="12:45">
                                                  12:45 PM
                                                </option>
                                                <option value="13:00">
                                                  01:00 PM
                                                </option>
                                                <option value="13:15">
                                                  01:15 PM
                                                </option>
                                                <option value="13:30">
                                                  01:30 PM
                                                </option>
                                                <option value="13:45">
                                                  01:45 PM
                                                </option>
                                                <option value="14:00">
                                                  02:00 PM
                                                </option>
                                                <option value="14:15">
                                                  02:15 PM
                                                </option>
                                                <option value="14:30">
                                                  02:30 PM
                                                </option>
                                                <option value="14:45">
                                                  02:45 PM
                                                </option>
                                                <option value="15:00">
                                                  03:00 PM
                                                </option>
                                                <option value="15:15">
                                                  03:15 PM
                                                </option>
                                                <option value="15:30">
                                                  03:30 PM
                                                </option>
                                                <option value="15:45">
                                                  03:45 PM
                                                </option>
                                                <option value="16:00">
                                                  04:00 PM
                                                </option>
                                                <option value="16:15">
                                                  04:15 PM
                                                </option>
                                                <option value="16:30">
                                                  04:30 PM
                                                </option>
                                                <option value="16:45">
                                                  04:45 PM
                                                </option>
                                                <option value="17:00">
                                                  05:00 PM
                                                </option>
                                                <option value="17:15">
                                                  05:15 PM
                                                </option>
                                                <option value="17:30">
                                                  05:30 PM
                                                </option>
                                                <option value="17:45">
                                                  05:45 PM
                                                </option>
                                                <option value="18:00">
                                                  06:00 PM
                                                </option>
                                                <option value="18:15">
                                                  06:15 PM
                                                </option>
                                                <option value="18:30">
                                                  06:30 PM
                                                </option>
                                                <option value="18:45">
                                                  06:45 PM
                                                </option>
                                                <option value="19:00">
                                                  07:00 PM
                                                </option>
                                                <option value="19:15">
                                                  07:15 PM
                                                </option>
                                                <option value="19:30">
                                                  07:30 PM
                                                </option>
                                                <option value="19:45">
                                                  07:45 PM
                                                </option>
                                                <option value="20:00">
                                                  08:00 PM
                                                </option>
                                                <option value="20:15">
                                                  08:15 PM
                                                </option>
                                                <option value="20:30">
                                                  08:30 PM
                                                </option>
                                                <option value="20:45">
                                                  08:45 PM
                                                </option>
                                                <option value="21:00">
                                                  09:00 PM
                                                </option>
                                                <option value="21:15">
                                                  09:15 PM
                                                </option>
                                                <option value="21:30">
                                                  09:30 PM
                                                </option>
                                                <option value="21:45">
                                                  09:45 PM
                                                </option>
                                                <option value="22:00">
                                                  10:00 PM
                                                </option>
                                                <option value="22:15">
                                                  10:15 PM
                                                </option>
                                                <option value="22:30">
                                                  10:30 PM
                                                </option>
                                                <option value="22:45">
                                                  10:45 PM
                                                </option>
                                                <option value="23:00">
                                                  11:00 PM
                                                </option>
                                                <option value="23:15">
                                                  11:15 PM
                                                </option>
                                                <option value="23:30">
                                                  11:30 PM
                                                </option>
                                                <option value="23:45">
                                                  11:45 PM
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <label className="form-label mt-3 fs-6">
                                              Duration
                                            </label>
                                            <select
                                              className="selectpicker"
                                              data-size={5}
                                              data-live-search="true"
                                            >
                                              <option value={15}>15m</option>
                                              <option value={30}>30m</option>
                                              <option value={45}>45m</option>
                                              <option
                                                value={60}
                                                selected="selected"
                                              >
                                                1h
                                              </option>
                                              <option value={75}>1h 15m</option>
                                              <option value={90}>1h 30m</option>
                                              <option value={105}>
                                                1h 45m
                                              </option>
                                              <option value={120}>2h</option>
                                              <option value={135}>
                                                2h 15m
                                              </option>
                                              <option value={150}>
                                                2h 30m
                                              </option>
                                              <option value={165}>
                                                2h 45m
                                              </option>
                                              <option value={180}>3h</option>
                                              <option value={195}>
                                                3h 15m
                                              </option>
                                              <option value={210}>
                                                3h 30m
                                              </option>
                                              <option value={225}>
                                                3h 45m
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group pt_30 pb_30">
                                    <label className="form-label fs-16">
                                      Add a few images to your event banner.
                                    </label>
                                    <p className="mt-2 fs-14 d-block mb-3 pe_right">
                                      Upload colorful and vibrant images as the
                                      banner for your event! See how beautiful
                                      images help your event details page.{" "}
                                      <a href="#" className="a-link">
                                        Learn more
                                      </a>
                                    </p>
                                    <div className="content-holder mt-4">
                                      <div className="default-event-thumb">
                                        <div className="default-event-thumb-btn">
                                          <div className="thumb-change-btn">
                                            <input type="file" id="thumb-img" />
                                            <label htmlFor="thumb-img">
                                              Change Image
                                            </label>
                                          </div>
                                        </div>
                                        <img
                                          src="./assets/images/banners/custom-img.jpg"
                                          alt
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group border_bottom pb_30">
                                    <label className="form-label fs-16">
                                      Please describe your event.
                                    </label>
                                    <p className="mt-2 fs-14 d-block mb-3">
                                      Write a few words below to describe your
                                      event and provide any extra information
                                      such as schedules, itinerary or any
                                      special instructions required to attend
                                      your event.
                                    </p>
                                    <div className="text-editor mt-4">
                                      <div id="pd_editor" />
                                    </div>
                                  </div>
                                  <div className="form-group pt_30 pb-2">
                                    <label className="form-label fs-16">
                                      What type of online event are you
                                      hosting?*
                                    </label>
                                    <p className="mt-2 fs-14 d-block mb-3">
                                      Choosing the type of your event helps us
                                      to create a more tailored experience for
                                      you.{" "}
                                      <a href="#" className="a-link">
                                        Learn more
                                      </a>
                                    </p>
                                    <div className="stepper-data-set">
                                      <div className="content-holder template-selector">
                                        <div className="row g-3">
                                          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div className="template-item mt-3">
                                              <input
                                                id="standard_webinar"
                                                type="radio"
                                                name="template_id"
                                                defaultValue="standard webinar"
                                              />
                                              <label
                                                className="template sw-template"
                                                htmlFor="standard_webinar"
                                              >
                                                <img
                                                  src="./assets/images/icons/standard-webinar.png"
                                                  alt
                                                />
                                              </label>
                                              <h6 className="hosting-title fs-14 mt-2 mb-0">
                                                Standard Webinar
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div className="template-item mt-3">
                                              <input
                                                id="traning_workshop"
                                                type="radio"
                                                name="template_id"
                                                defaultValue="traning workshop"
                                              />
                                              <label
                                                className="template tw-template"
                                                htmlFor="traning_workshop"
                                              >
                                                <img
                                                  src="./assets/images/icons/health-and-welbeing.png"
                                                  alt
                                                />
                                              </label>
                                              <h6 className="hosting-title fs-14 mt-2 mb-0">
                                                Training and Workshop
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div className="template-item mt-3">
                                              <input
                                                id="online_classes"
                                                type="radio"
                                                name="template_id"
                                                defaultValue="online classes"
                                              />
                                              <label
                                                className="template oc-template"
                                                htmlFor="online_classes"
                                              >
                                                <img
                                                  src="./assets/images/icons/e-learning.png"
                                                  alt
                                                />
                                              </label>
                                              <h6 className="hosting-title fs-14 mt-2 mb-0">
                                                Online Classes
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div className="template-item mt-3">
                                              <input
                                                id="talk_show"
                                                type="radio"
                                                name="template_id"
                                                defaultValue="talk show"
                                              />
                                              <label
                                                className="template ts-template"
                                                htmlFor="talk_show"
                                              >
                                                <img
                                                  src="./assets/images/icons/talk-show-1.png"
                                                  alt
                                                />
                                              </label>
                                              <h6 className="hosting-title fs-14 mt-2 mb-0">
                                                Talk Show
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="step-tab-panel step-tab-gallery"
                        id="tab_step2"
                      >
                        <div className="tab-from-content">
                          <div className="main-card">
                            <div className="bp-title">
                              <h4>
                                <i className="fa-solid fa-ticket step_icon me-3" />
                                Tickets
                              </h4>
                            </div>
                            <div className="p-4 bp-form main-form">
                              <div className="form-group border_bottom pb_30">
                                <div className="ticket-section">
                                  <label className="form-label fs-16">
                                    Let's create tickets!
                                  </label>
                                  <p className="mt-2 fs-14 d-block mb-3 pe_right">
                                    Add the ticket price and the number of your
                                    attendees. For free events, keep the price
                                    at $0.
                                  </p>
                                  <div className="content-holder">
                                    <div className="row g-3">
                                      <div className="col-md-6 disabled-action">
                                        <label className="form-label mt-3 fs-6">
                                          Price*
                                        </label>
                                        <div className="loc-group position-relative input-group">
                                          <input
                                            className="form-control h_50"
                                            type="text"
                                            placeholder
                                            defaultValue={10.0}
                                          />
                                          <div className="pp-select">
                                            <select className="selectpicker dropdown-no-bg">
                                              <option
                                                value="AUD"
                                                selected="selected"
                                              >
                                                AUD
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label className="form-label mt-3 fs-6">
                                          Total number of tickets available*
                                        </label>
                                        <div className="input-number">
                                          <input
                                            className="form-control h_50"
                                            type="number"
                                            placeholder
                                            defaultValue={5}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="free-event pt_30">
                                  <div className="content-holder">
                                    <div className="form-group">
                                      <div className="d-flex align-items-start">
                                        <label className="btn-switch m-0 me-3">
                                          <input
                                            type="checkbox"
                                            className
                                            id="free-event-ticketing"
                                            defaultValue
                                          />
                                          <span className="checkbox-slider" />
                                        </label>
                                        <div className="d-flex flex-column">
                                          <label className="color-black fs-14 fw-bold mb-1">
                                            Tickets are free
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="stepper-data-set pt_30 disabled-action">
                                <div className="content-holder">
                                  <div className="form-group">
                                    <div className="d-flex align-items-start">
                                      <label className="btn-switch m-0 me-3">
                                        <input
                                          type="checkbox"
                                          className
                                          id="bird-discount"
                                          defaultValue
                                        />
                                        <span className="checkbox-slider" />
                                      </label>
                                      <div className="d-flex flex-column">
                                        <label className="color-black mb-1">
                                          I want to offer early bird discount.
                                        </label>
                                        <p className="mt-2 fs-14 d-block mb-3">
                                          Enabling this discount lets your
                                          attendees get all the regular tickets
                                          features at a discounted price.{" "}
                                          <a href="#" className="a-link">
                                            Learn more
                                          </a>
                                        </p>
                                      </div>
                                    </div>
                                    <div
                                      className="online-event-discount-wrapper"
                                      style={{ display: "none" }}
                                    >
                                      <div className="row g-3">
                                        <div className="col-md-3">
                                          <label className="form-label mt-3 fs-6">
                                            Discount*
                                          </label>
                                          <input
                                            className="form-control h_50"
                                            type="text"
                                            placeholder={0}
                                            defaultValue
                                          />
                                        </div>
                                        <div className="col-md-3">
                                          <label className="form-label mt-3 fs-6">
                                            Price*
                                          </label>
                                          <select className="selectpicker">
                                            <option value="Percentage" selected>
                                              Percent(%)
                                            </option>
                                            <option value="Fixed">
                                              Fixed($)
                                            </option>
                                          </select>
                                        </div>
                                        <div className="col-md-3">
                                          <label className="form-label mt-3 fs-6">
                                            Discount ends on*
                                          </label>
                                          <div className="loc-group position-relative">
                                            <input
                                              className="form-control h_50 datepicker-here"
                                              data-language="en"
                                              type="text"
                                              placeholder="MM/DD/YYYY"
                                              defaultValue
                                            />
                                            <span className="absolute-icon">
                                              <i className="fa-solid fa-calendar-days" />
                                            </span>
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="clock-icon">
                                            <label className="form-label mt-3 fs-6">
                                              Time
                                            </label>
                                            <select
                                              className="selectpicker"
                                              data-size={5}
                                              data-live-search="true"
                                            >
                                              <option value="00:00">
                                                12:00 AM
                                              </option>
                                              <option value="00:15">
                                                12:15 AM
                                              </option>
                                              <option value="00:30">
                                                12:30 AM
                                              </option>
                                              <option value="00:45">
                                                12:45 AM
                                              </option>
                                              <option value="01:00">
                                                01:00 AM
                                              </option>
                                              <option value="01:15">
                                                01:15 AM
                                              </option>
                                              <option value="01:30">
                                                01:30 AM
                                              </option>
                                              <option value="01:45">
                                                01:45 AM
                                              </option>
                                              <option value="02:00">
                                                02:00 AM
                                              </option>
                                              <option value="02:15">
                                                02:15 AM
                                              </option>
                                              <option value="02:30">
                                                02:30 AM
                                              </option>
                                              <option value="02:45">
                                                02:45 AM
                                              </option>
                                              <option value="03:00">
                                                03:00 AM
                                              </option>
                                              <option value="03:15">
                                                03:15 AM
                                              </option>
                                              <option value="03:30">
                                                03:30 AM
                                              </option>
                                              <option value="03:45">
                                                03:45 AM
                                              </option>
                                              <option value="04:00">
                                                04:00 AM
                                              </option>
                                              <option value="04:15">
                                                04:15 AM
                                              </option>
                                              <option value="04:30">
                                                04:30 AM
                                              </option>
                                              <option value="04:45">
                                                04:45 AM
                                              </option>
                                              <option value="05:00">
                                                05:00 AM
                                              </option>
                                              <option value="05:15">
                                                05:15 AM
                                              </option>
                                              <option value="05:30">
                                                05:30 AM
                                              </option>
                                              <option value="05:45">
                                                05:45 AM
                                              </option>
                                              <option value="06:00">
                                                06:00 AM
                                              </option>
                                              <option value="06:15">
                                                06:15 AM
                                              </option>
                                              <option value="06:30">
                                                06:30 AM
                                              </option>
                                              <option value="06:45">
                                                06:45 AM
                                              </option>
                                              <option value="07:00">
                                                07:00 AM
                                              </option>
                                              <option value="07:15">
                                                07:15 AM
                                              </option>
                                              <option value="07:30">
                                                07:30 AM
                                              </option>
                                              <option value="07:45">
                                                07:45 AM
                                              </option>
                                              <option value="08:00">
                                                08:00 AM
                                              </option>
                                              <option value="08:15">
                                                08:15 AM
                                              </option>
                                              <option value="08:30">
                                                08:30 AM
                                              </option>
                                              <option value="08:45">
                                                08:45 AM
                                              </option>
                                              <option value="09:00">
                                                09:00 AM
                                              </option>
                                              <option value="09:15">
                                                09:15 AM
                                              </option>
                                              <option value="09:30">
                                                09:30 AM
                                              </option>
                                              <option value="09:45">
                                                09:45 AM
                                              </option>
                                              <option
                                                value="10:00"
                                                selected="selected"
                                              >
                                                10:00 AM
                                              </option>
                                              <option value="10:15">
                                                10:15 AM
                                              </option>
                                              <option value="10:30">
                                                10:30 AM
                                              </option>
                                              <option value="10:45">
                                                10:45 AM
                                              </option>
                                              <option value="11:00">
                                                11:00 AM
                                              </option>
                                              <option value="11:15">
                                                11:15 AM
                                              </option>
                                              <option value="11:30">
                                                11:30 AM
                                              </option>
                                              <option value="11:45">
                                                11:45 AM
                                              </option>
                                              <option value="12:00">
                                                12:00 PM
                                              </option>
                                              <option value="12:15">
                                                12:15 PM
                                              </option>
                                              <option value="12:30">
                                                12:30 PM
                                              </option>
                                              <option value="12:45">
                                                12:45 PM
                                              </option>
                                              <option value="13:00">
                                                01:00 PM
                                              </option>
                                              <option value="13:15">
                                                01:15 PM
                                              </option>
                                              <option value="13:30">
                                                01:30 PM
                                              </option>
                                              <option value="13:45">
                                                01:45 PM
                                              </option>
                                              <option value="14:00">
                                                02:00 PM
                                              </option>
                                              <option value="14:15">
                                                02:15 PM
                                              </option>
                                              <option value="14:30">
                                                02:30 PM
                                              </option>
                                              <option value="14:45">
                                                02:45 PM
                                              </option>
                                              <option value="15:00">
                                                03:00 PM
                                              </option>
                                              <option value="15:15">
                                                03:15 PM
                                              </option>
                                              <option value="15:30">
                                                03:30 PM
                                              </option>
                                              <option value="15:45">
                                                03:45 PM
                                              </option>
                                              <option value="16:00">
                                                04:00 PM
                                              </option>
                                              <option value="16:15">
                                                04:15 PM
                                              </option>
                                              <option value="16:30">
                                                04:30 PM
                                              </option>
                                              <option value="16:45">
                                                04:45 PM
                                              </option>
                                              <option value="17:00">
                                                05:00 PM
                                              </option>
                                              <option value="17:15">
                                                05:15 PM
                                              </option>
                                              <option value="17:30">
                                                05:30 PM
                                              </option>
                                              <option value="17:45">
                                                05:45 PM
                                              </option>
                                              <option value="18:00">
                                                06:00 PM
                                              </option>
                                              <option value="18:15">
                                                06:15 PM
                                              </option>
                                              <option value="18:30">
                                                06:30 PM
                                              </option>
                                              <option value="18:45">
                                                06:45 PM
                                              </option>
                                              <option value="19:00">
                                                07:00 PM
                                              </option>
                                              <option value="19:15">
                                                07:15 PM
                                              </option>
                                              <option value="19:30">
                                                07:30 PM
                                              </option>
                                              <option value="19:45">
                                                07:45 PM
                                              </option>
                                              <option value="20:00">
                                                08:00 PM
                                              </option>
                                              <option value="20:15">
                                                08:15 PM
                                              </option>
                                              <option value="20:30">
                                                08:30 PM
                                              </option>
                                              <option value="20:45">
                                                08:45 PM
                                              </option>
                                              <option value="21:00">
                                                09:00 PM
                                              </option>
                                              <option value="21:15">
                                                09:15 PM
                                              </option>
                                              <option value="21:30">
                                                09:30 PM
                                              </option>
                                              <option value="21:45">
                                                09:45 PM
                                              </option>
                                              <option value="22:00">
                                                10:00 PM
                                              </option>
                                              <option value="22:15">
                                                10:15 PM
                                              </option>
                                              <option value="22:30">
                                                10:30 PM
                                              </option>
                                              <option value="22:45">
                                                10:45 PM
                                              </option>
                                              <option value="23:00">
                                                11:00 PM
                                              </option>
                                              <option value="23:15">
                                                11:15 PM
                                              </option>
                                              <option value="23:30">
                                                11:30 PM
                                              </option>
                                              <option value="23:45">
                                                11:45 PM
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="step-tab-panel step-tab-location"
                        id="tab_step3"
                      >
                        <div className="tab-from-content">
                          <div className="main-card">
                            <div className="bp-title">
                              <h4>
                                <i className="fa-solid fa-gear step_icon me-3" />
                                Setting
                              </h4>
                            </div>
                            <div className="p_30 bp-form main-form">
                              <div className="form-group">
                                <div className="ticket-section">
                                  <label className="form-label fs-16">
                                    Let's configure a few additional options for
                                    your event!
                                  </label>
                                  <p className="mt-2 fs-14 d-block mb-3 pe_right">
                                    Change the following settings based on your
                                    preferences to customise your event
                                    accordingly.
                                  </p>
                                  <div className="content-holder">
                                    <div className="setting-item border_bottom pb_30 pt-4">
                                      <div className="d-flex align-items-start">
                                        <label className="btn-switch m-0 me-3">
                                          <input
                                            type="checkbox"
                                            className
                                            id="booking-start-time-btn"
                                            defaultValue
                                            defaultChecked
                                          />
                                          <span className="checkbox-slider" />
                                        </label>
                                        <div className="d-flex flex-column">
                                          <label className="color-black fw-bold mb-1">
                                            I want the bookings to start
                                            immediately.
                                          </label>
                                          <p className="mt-2 fs-14 d-block mb-0">
                                            Disable this option if you want to
                                            start your booking from a specific
                                            date and time.
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className="booking-start-time-holder"
                                        style={{ display: "none" }}
                                      >
                                        <div className="form-group pt_30">
                                          <label className="form-label fs-16">
                                            Booking starts on
                                          </label>
                                          <p className="mt-2 fs-14 d-block mb-0">
                                            Specify the date and time when you
                                            want the booking to start.
                                          </p>
                                          <div className="row g-3">
                                            <div className="col-md-6">
                                              <label className="form-label mt-3 fs-6">
                                                Event Date.*
                                              </label>
                                              <div className="loc-group position-relative">
                                                <input
                                                  className="form-control h_50 datepicker-here"
                                                  data-language="en"
                                                  type="text"
                                                  placeholder="MM/DD/YYYY"
                                                  defaultValue
                                                />
                                                <span className="absolute-icon">
                                                  <i className="fa-solid fa-calendar-days" />
                                                </span>
                                              </div>
                                            </div>
                                            <div className="col-md-6">
                                              <div className="clock-icon">
                                                <label className="form-label mt-3 fs-6">
                                                  Time
                                                </label>
                                                <select
                                                  className="selectpicker"
                                                  data-size={5}
                                                  data-live-search="true"
                                                >
                                                  <option value="00:00">
                                                    12:00 AM
                                                  </option>
                                                  <option value="00:15">
                                                    12:15 AM
                                                  </option>
                                                  <option value="00:30">
                                                    12:30 AM
                                                  </option>
                                                  <option value="00:45">
                                                    12:45 AM
                                                  </option>
                                                  <option value="01:00">
                                                    01:00 AM
                                                  </option>
                                                  <option value="01:15">
                                                    01:15 AM
                                                  </option>
                                                  <option value="01:30">
                                                    01:30 AM
                                                  </option>
                                                  <option value="01:45">
                                                    01:45 AM
                                                  </option>
                                                  <option value="02:00">
                                                    02:00 AM
                                                  </option>
                                                  <option value="02:15">
                                                    02:15 AM
                                                  </option>
                                                  <option value="02:30">
                                                    02:30 AM
                                                  </option>
                                                  <option value="02:45">
                                                    02:45 AM
                                                  </option>
                                                  <option value="03:00">
                                                    03:00 AM
                                                  </option>
                                                  <option value="03:15">
                                                    03:15 AM
                                                  </option>
                                                  <option value="03:30">
                                                    03:30 AM
                                                  </option>
                                                  <option value="03:45">
                                                    03:45 AM
                                                  </option>
                                                  <option value="04:00">
                                                    04:00 AM
                                                  </option>
                                                  <option value="04:15">
                                                    04:15 AM
                                                  </option>
                                                  <option value="04:30">
                                                    04:30 AM
                                                  </option>
                                                  <option value="04:45">
                                                    04:45 AM
                                                  </option>
                                                  <option value="05:00">
                                                    05:00 AM
                                                  </option>
                                                  <option value="05:15">
                                                    05:15 AM
                                                  </option>
                                                  <option value="05:30">
                                                    05:30 AM
                                                  </option>
                                                  <option value="05:45">
                                                    05:45 AM
                                                  </option>
                                                  <option value="06:00">
                                                    06:00 AM
                                                  </option>
                                                  <option value="06:15">
                                                    06:15 AM
                                                  </option>
                                                  <option value="06:30">
                                                    06:30 AM
                                                  </option>
                                                  <option value="06:45">
                                                    06:45 AM
                                                  </option>
                                                  <option value="07:00">
                                                    07:00 AM
                                                  </option>
                                                  <option value="07:15">
                                                    07:15 AM
                                                  </option>
                                                  <option value="07:30">
                                                    07:30 AM
                                                  </option>
                                                  <option value="07:45">
                                                    07:45 AM
                                                  </option>
                                                  <option value="08:00">
                                                    08:00 AM
                                                  </option>
                                                  <option value="08:15">
                                                    08:15 AM
                                                  </option>
                                                  <option value="08:30">
                                                    08:30 AM
                                                  </option>
                                                  <option value="08:45">
                                                    08:45 AM
                                                  </option>
                                                  <option value="09:00">
                                                    09:00 AM
                                                  </option>
                                                  <option value="09:15">
                                                    09:15 AM
                                                  </option>
                                                  <option value="09:30">
                                                    09:30 AM
                                                  </option>
                                                  <option value="09:45">
                                                    09:45 AM
                                                  </option>
                                                  <option
                                                    value="10:00"
                                                    selected="selected"
                                                  >
                                                    10:00 AM
                                                  </option>
                                                  <option value="10:15">
                                                    10:15 AM
                                                  </option>
                                                  <option value="10:30">
                                                    10:30 AM
                                                  </option>
                                                  <option value="10:45">
                                                    10:45 AM
                                                  </option>
                                                  <option value="11:00">
                                                    11:00 AM
                                                  </option>
                                                  <option value="11:15">
                                                    11:15 AM
                                                  </option>
                                                  <option value="11:30">
                                                    11:30 AM
                                                  </option>
                                                  <option value="11:45">
                                                    11:45 AM
                                                  </option>
                                                  <option value="12:00">
                                                    12:00 PM
                                                  </option>
                                                  <option value="12:15">
                                                    12:15 PM
                                                  </option>
                                                  <option value="12:30">
                                                    12:30 PM
                                                  </option>
                                                  <option value="12:45">
                                                    12:45 PM
                                                  </option>
                                                  <option value="13:00">
                                                    01:00 PM
                                                  </option>
                                                  <option value="13:15">
                                                    01:15 PM
                                                  </option>
                                                  <option value="13:30">
                                                    01:30 PM
                                                  </option>
                                                  <option value="13:45">
                                                    01:45 PM
                                                  </option>
                                                  <option value="14:00">
                                                    02:00 PM
                                                  </option>
                                                  <option value="14:15">
                                                    02:15 PM
                                                  </option>
                                                  <option value="14:30">
                                                    02:30 PM
                                                  </option>
                                                  <option value="14:45">
                                                    02:45 PM
                                                  </option>
                                                  <option value="15:00">
                                                    03:00 PM
                                                  </option>
                                                  <option value="15:15">
                                                    03:15 PM
                                                  </option>
                                                  <option value="15:30">
                                                    03:30 PM
                                                  </option>
                                                  <option value="15:45">
                                                    03:45 PM
                                                  </option>
                                                  <option value="16:00">
                                                    04:00 PM
                                                  </option>
                                                  <option value="16:15">
                                                    04:15 PM
                                                  </option>
                                                  <option value="16:30">
                                                    04:30 PM
                                                  </option>
                                                  <option value="16:45">
                                                    04:45 PM
                                                  </option>
                                                  <option value="17:00">
                                                    05:00 PM
                                                  </option>
                                                  <option value="17:15">
                                                    05:15 PM
                                                  </option>
                                                  <option value="17:30">
                                                    05:30 PM
                                                  </option>
                                                  <option value="17:45">
                                                    05:45 PM
                                                  </option>
                                                  <option value="18:00">
                                                    06:00 PM
                                                  </option>
                                                  <option value="18:15">
                                                    06:15 PM
                                                  </option>
                                                  <option value="18:30">
                                                    06:30 PM
                                                  </option>
                                                  <option value="18:45">
                                                    06:45 PM
                                                  </option>
                                                  <option value="19:00">
                                                    07:00 PM
                                                  </option>
                                                  <option value="19:15">
                                                    07:15 PM
                                                  </option>
                                                  <option value="19:30">
                                                    07:30 PM
                                                  </option>
                                                  <option value="19:45">
                                                    07:45 PM
                                                  </option>
                                                  <option value="20:00">
                                                    08:00 PM
                                                  </option>
                                                  <option value="20:15">
                                                    08:15 PM
                                                  </option>
                                                  <option value="20:30">
                                                    08:30 PM
                                                  </option>
                                                  <option value="20:45">
                                                    08:45 PM
                                                  </option>
                                                  <option value="21:00">
                                                    09:00 PM
                                                  </option>
                                                  <option value="21:15">
                                                    09:15 PM
                                                  </option>
                                                  <option value="21:30">
                                                    09:30 PM
                                                  </option>
                                                  <option value="21:45">
                                                    09:45 PM
                                                  </option>
                                                  <option value="22:00">
                                                    10:00 PM
                                                  </option>
                                                  <option value="22:15">
                                                    10:15 PM
                                                  </option>
                                                  <option value="22:30">
                                                    10:30 PM
                                                  </option>
                                                  <option value="22:45">
                                                    10:45 PM
                                                  </option>
                                                  <option value="23:00">
                                                    11:00 PM
                                                  </option>
                                                  <option value="23:15">
                                                    11:15 PM
                                                  </option>
                                                  <option value="23:30">
                                                    11:30 PM
                                                  </option>
                                                  <option value="23:45">
                                                    11:45 PM
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="setting-item border_bottom pb_30 pt_30">
                                      <div className="d-flex align-items-start">
                                        <label className="btn-switch m-0 me-3">
                                          <input
                                            type="checkbox"
                                            className
                                            id="booking-end-time-btn"
                                            defaultValue
                                            defaultChecked
                                          />
                                          <span className="checkbox-slider" />
                                        </label>
                                        <div className="d-flex flex-column">
                                          <label className="color-black fw-bold mb-1">
                                            I want the bookings to continue
                                            until my event ends.
                                          </label>
                                          <p className="mt-2 fs-14 d-block mb-0">
                                            Disable this option if you want to
                                            end your booking from a specific
                                            date and time.
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className="booking-end-time-holder"
                                        style={{ display: "none" }}
                                      >
                                        <div className="form-group pt_30">
                                          <label className="form-label fs-16">
                                            Booking ends on
                                          </label>
                                          <p className="mt-2 fs-14 d-block mb-0">
                                            Specify the date and time when you
                                            want the booking to start.
                                          </p>
                                          <div className="row g-3">
                                            <div className="col-md-6">
                                              <label className="form-label mt-3 fs-6">
                                                Event Date.*
                                              </label>
                                              <div className="loc-group position-relative">
                                                <input
                                                  className="form-control h_50 datepicker-here"
                                                  data-language="en"
                                                  type="text"
                                                  placeholder="MM/DD/YYYY"
                                                  defaultValue
                                                />
                                                <span className="absolute-icon">
                                                  <i className="fa-solid fa-calendar-days" />
                                                </span>
                                              </div>
                                            </div>
                                            <div className="col-md-6">
                                              <div className="clock-icon">
                                                <label className="form-label mt-3 fs-6">
                                                  Time
                                                </label>
                                                <select
                                                  className="selectpicker"
                                                  data-size={5}
                                                  data-live-search="true"
                                                >
                                                  <option value="00:00">
                                                    12:00 AM
                                                  </option>
                                                  <option value="00:15">
                                                    12:15 AM
                                                  </option>
                                                  <option value="00:30">
                                                    12:30 AM
                                                  </option>
                                                  <option value="00:45">
                                                    12:45 AM
                                                  </option>
                                                  <option value="01:00">
                                                    01:00 AM
                                                  </option>
                                                  <option value="01:15">
                                                    01:15 AM
                                                  </option>
                                                  <option value="01:30">
                                                    01:30 AM
                                                  </option>
                                                  <option value="01:45">
                                                    01:45 AM
                                                  </option>
                                                  <option value="02:00">
                                                    02:00 AM
                                                  </option>
                                                  <option value="02:15">
                                                    02:15 AM
                                                  </option>
                                                  <option value="02:30">
                                                    02:30 AM
                                                  </option>
                                                  <option value="02:45">
                                                    02:45 AM
                                                  </option>
                                                  <option value="03:00">
                                                    03:00 AM
                                                  </option>
                                                  <option value="03:15">
                                                    03:15 AM
                                                  </option>
                                                  <option value="03:30">
                                                    03:30 AM
                                                  </option>
                                                  <option value="03:45">
                                                    03:45 AM
                                                  </option>
                                                  <option value="04:00">
                                                    04:00 AM
                                                  </option>
                                                  <option value="04:15">
                                                    04:15 AM
                                                  </option>
                                                  <option value="04:30">
                                                    04:30 AM
                                                  </option>
                                                  <option value="04:45">
                                                    04:45 AM
                                                  </option>
                                                  <option value="05:00">
                                                    05:00 AM
                                                  </option>
                                                  <option value="05:15">
                                                    05:15 AM
                                                  </option>
                                                  <option value="05:30">
                                                    05:30 AM
                                                  </option>
                                                  <option value="05:45">
                                                    05:45 AM
                                                  </option>
                                                  <option value="06:00">
                                                    06:00 AM
                                                  </option>
                                                  <option value="06:15">
                                                    06:15 AM
                                                  </option>
                                                  <option value="06:30">
                                                    06:30 AM
                                                  </option>
                                                  <option value="06:45">
                                                    06:45 AM
                                                  </option>
                                                  <option value="07:00">
                                                    07:00 AM
                                                  </option>
                                                  <option value="07:15">
                                                    07:15 AM
                                                  </option>
                                                  <option value="07:30">
                                                    07:30 AM
                                                  </option>
                                                  <option value="07:45">
                                                    07:45 AM
                                                  </option>
                                                  <option value="08:00">
                                                    08:00 AM
                                                  </option>
                                                  <option value="08:15">
                                                    08:15 AM
                                                  </option>
                                                  <option value="08:30">
                                                    08:30 AM
                                                  </option>
                                                  <option value="08:45">
                                                    08:45 AM
                                                  </option>
                                                  <option value="09:00">
                                                    09:00 AM
                                                  </option>
                                                  <option value="09:15">
                                                    09:15 AM
                                                  </option>
                                                  <option value="09:30">
                                                    09:30 AM
                                                  </option>
                                                  <option value="09:45">
                                                    09:45 AM
                                                  </option>
                                                  <option
                                                    value="10:00"
                                                    selected="selected"
                                                  >
                                                    10:00 AM
                                                  </option>
                                                  <option value="10:15">
                                                    10:15 AM
                                                  </option>
                                                  <option value="10:30">
                                                    10:30 AM
                                                  </option>
                                                  <option value="10:45">
                                                    10:45 AM
                                                  </option>
                                                  <option value="11:00">
                                                    11:00 AM
                                                  </option>
                                                  <option value="11:15">
                                                    11:15 AM
                                                  </option>
                                                  <option value="11:30">
                                                    11:30 AM
                                                  </option>
                                                  <option value="11:45">
                                                    11:45 AM
                                                  </option>
                                                  <option value="12:00">
                                                    12:00 PM
                                                  </option>
                                                  <option value="12:15">
                                                    12:15 PM
                                                  </option>
                                                  <option value="12:30">
                                                    12:30 PM
                                                  </option>
                                                  <option value="12:45">
                                                    12:45 PM
                                                  </option>
                                                  <option value="13:00">
                                                    01:00 PM
                                                  </option>
                                                  <option value="13:15">
                                                    01:15 PM
                                                  </option>
                                                  <option value="13:30">
                                                    01:30 PM
                                                  </option>
                                                  <option value="13:45">
                                                    01:45 PM
                                                  </option>
                                                  <option value="14:00">
                                                    02:00 PM
                                                  </option>
                                                  <option value="14:15">
                                                    02:15 PM
                                                  </option>
                                                  <option value="14:30">
                                                    02:30 PM
                                                  </option>
                                                  <option value="14:45">
                                                    02:45 PM
                                                  </option>
                                                  <option value="15:00">
                                                    03:00 PM
                                                  </option>
                                                  <option value="15:15">
                                                    03:15 PM
                                                  </option>
                                                  <option value="15:30">
                                                    03:30 PM
                                                  </option>
                                                  <option value="15:45">
                                                    03:45 PM
                                                  </option>
                                                  <option value="16:00">
                                                    04:00 PM
                                                  </option>
                                                  <option value="16:15">
                                                    04:15 PM
                                                  </option>
                                                  <option value="16:30">
                                                    04:30 PM
                                                  </option>
                                                  <option value="16:45">
                                                    04:45 PM
                                                  </option>
                                                  <option value="17:00">
                                                    05:00 PM
                                                  </option>
                                                  <option value="17:15">
                                                    05:15 PM
                                                  </option>
                                                  <option value="17:30">
                                                    05:30 PM
                                                  </option>
                                                  <option value="17:45">
                                                    05:45 PM
                                                  </option>
                                                  <option value="18:00">
                                                    06:00 PM
                                                  </option>
                                                  <option value="18:15">
                                                    06:15 PM
                                                  </option>
                                                  <option value="18:30">
                                                    06:30 PM
                                                  </option>
                                                  <option value="18:45">
                                                    06:45 PM
                                                  </option>
                                                  <option value="19:00">
                                                    07:00 PM
                                                  </option>
                                                  <option value="19:15">
                                                    07:15 PM
                                                  </option>
                                                  <option value="19:30">
                                                    07:30 PM
                                                  </option>
                                                  <option value="19:45">
                                                    07:45 PM
                                                  </option>
                                                  <option value="20:00">
                                                    08:00 PM
                                                  </option>
                                                  <option value="20:15">
                                                    08:15 PM
                                                  </option>
                                                  <option value="20:30">
                                                    08:30 PM
                                                  </option>
                                                  <option value="20:45">
                                                    08:45 PM
                                                  </option>
                                                  <option value="21:00">
                                                    09:00 PM
                                                  </option>
                                                  <option value="21:15">
                                                    09:15 PM
                                                  </option>
                                                  <option value="21:30">
                                                    09:30 PM
                                                  </option>
                                                  <option value="21:45">
                                                    09:45 PM
                                                  </option>
                                                  <option value="22:00">
                                                    10:00 PM
                                                  </option>
                                                  <option value="22:15">
                                                    10:15 PM
                                                  </option>
                                                  <option value="22:30">
                                                    10:30 PM
                                                  </option>
                                                  <option value="22:45">
                                                    10:45 PM
                                                  </option>
                                                  <option value="23:00">
                                                    11:00 PM
                                                  </option>
                                                  <option value="23:15">
                                                    11:15 PM
                                                  </option>
                                                  <option value="23:30">
                                                    11:30 PM
                                                  </option>
                                                  <option value="23:45">
                                                    11:45 PM
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="setting-item border_bottom pb_30 pt_30">
                                      <div className="d-flex align-items-start">
                                        <label className="btn-switch m-0 me-3">
                                          <input
                                            type="checkbox"
                                            className
                                            id="passing-service-charge-btn"
                                            defaultValue
                                            defaultChecked
                                          />
                                          <span className="checkbox-slider" />
                                        </label>
                                        <div className="d-flex flex-column">
                                          <label className="color-black fw-bold mb-1">
                                            I want my customers to pay the
                                            applicable service fees at the time
                                            when they make the bookings.
                                          </label>
                                          <p className="mt-2 fs-14 d-block mb-0 pe_right">
                                            Passing your service charge means
                                            your attendees will pay your service
                                            charge in addition to the ticket
                                            price.{" "}
                                            <a href="#" className="a-link">
                                              Learn more
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="setting-item border_bottom pb_30 pt_30">
                                      <div className="d-flex align-items-start">
                                        <label className="btn-switch m-0 me-3">
                                          <input
                                            type="checkbox"
                                            className
                                            id="refund-policies-btn"
                                            defaultValue
                                            defaultChecked
                                          />
                                          <span className="checkbox-slider" />
                                        </label>
                                        <div className="d-flex flex-column">
                                          <label className="color-black fw-bold mb-1">
                                            I do not wish to offer my customers
                                            with option to cancel their orders
                                            and receive refund.
                                          </label>
                                          <p className="mt-2 fs-14 d-block mb-0">
                                            Disable this slider if you want to
                                            let your customers cancel their
                                            order and select a refund policy.
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className="refund-policies-holder"
                                        style={{ display: "none" }}
                                      >
                                        <div className="refund-policies-content border_top mt-4">
                                          <div className="row grid-padding-8">
                                            <div className="col-md-12 mb-6">
                                              <div className="refund-method">
                                                <div className="form-group mb-0">
                                                  <label className="brn-checkbox-radio mb-0 mt-4">
                                                    <input
                                                      type="radio"
                                                      required
                                                      name="refund_policy_id"
                                                      defaultValue="refund-id-1"
                                                      className="form-check-input br-checkbox refund-policy1"
                                                      defaultChecked
                                                    />
                                                    <span className="fs-14 fw-bold ms-xl-2">
                                                      I wish to offer my
                                                      customers with option to
                                                      cancel their orders.
                                                      However, I will handle
                                                      refund manually.
                                                    </span>
                                                    <span className="ms-xl-4 d-block sub-label mt-2 mb-4">
                                                      Select this option if you
                                                      want to refund your
                                                      customer manually.
                                                    </span>
                                                  </label>
                                                  <div
                                                    className="refund-input-content"
                                                    data-method="refund-id-1"
                                                  >
                                                    <div className="input-content mb-3">
                                                      <label className="color-black mb-2 fs-14 fw-bold">
                                                        Cancellation must be
                                                        made
                                                        <span className="red">
                                                          *
                                                        </span>
                                                      </label>
                                                      <div className="d-block d-md-flex align-items-center flex-wrap flex-lg-wrap-reverse">
                                                        <div className="col-md-4 pl-0">
                                                          <div className="input-group mr-3 mx-width-135 input-number">
                                                            <input
                                                              type="number"
                                                              min={0}
                                                              max={30}
                                                              className="form-control"
                                                              placeholder
                                                            />
                                                          </div>
                                                        </div>
                                                        <div className="input-sign ms-md-3 mt-3 mb-3">
                                                          days before the event
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="refund-method">
                                                <label className="brn-checkbox-radio mb-0 mt-4">
                                                  <input
                                                    type="radio"
                                                    name="refund_policy_id"
                                                    defaultValue="refund-id-2"
                                                    className="form-check-input br-checkbox refund-polic-2"
                                                  />
                                                  <span className="fs-14 fw-bold ms-xl-2">
                                                    I wish to offer my customers
                                                    with option to cancel their
                                                    orders and receive refund
                                                    automatically.
                                                  </span>
                                                  <span className="ms-xl-4 d-block sub-label mt-2 mb-4">
                                                    Select this option if you
                                                    want to refund your customer
                                                    automatically.
                                                  </span>
                                                </label>
                                                <div
                                                  className="refund-input-content"
                                                  data-method="refund-id-2"
                                                >
                                                  <div className="input-content mb-3">
                                                    <label className="color-black mb-2 fs-14 fw-bold">
                                                      Cancellation must be made{" "}
                                                      <span className="red">
                                                        *
                                                      </span>
                                                    </label>
                                                    <div className="d-block d-md-flex align-items-center flex-wrap flex-lg-wrap-reverse">
                                                      <div className="col-md-4">
                                                        <div className="input-group input-number">
                                                          <input
                                                            type="number"
                                                            min={0}
                                                            max={30}
                                                            className="form-control"
                                                            placeholder
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="input-sign ms-md-3 mt-3 mb-3">
                                                        days before the event
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="input-content mb-3">
                                                    <label className="color-black mb-2 fs-14 fw-bold">
                                                      Refund amount{" "}
                                                      <span className="red">
                                                        *
                                                      </span>
                                                    </label>
                                                    <div className="d-block d-md-flex align-items-center flex-wrap flex-lg-wrap-reverse">
                                                      <div className="col-md-4">
                                                        <div className="input-group loc-group position-relative">
                                                          <input
                                                            type="text"
                                                            defaultValue
                                                            className="form-control"
                                                            placeholder
                                                          />
                                                          <span className="percentage-icon">
                                                            <i className="fa-solid fa-percent" />
                                                          </span>
                                                        </div>
                                                      </div>
                                                      <div className="input-sign ms-md-3 mt-3 mb-3">
                                                        days before the event
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="setting-item border_bottom pb_30 pt_30">
                                      <div className="d-flex align-items-start">
                                        <label className="btn-switch m-0 me-3">
                                          <input
                                            type="checkbox"
                                            className
                                            id="ticket-instructions-btn"
                                            defaultValue
                                            defaultChecked
                                          />
                                          <span className="checkbox-slider" />
                                        </label>
                                        <div className="d-flex flex-column">
                                          <label className="color-black fw-bold mb-1">
                                            I do not require adding any special
                                            instructions on the tickets.
                                          </label>
                                          <p className="mt-2 fs-14 d-block mb-0">
                                            Use this space to provide any last
                                            minute checklists your attendees
                                            must know in order to attend your
                                            event. Anything you provide here
                                            will be printed on your ticket.
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className="ticket-instructions-holder"
                                        style={{ display: "none" }}
                                      >
                                        <div className="ticket-instructions-content mt-4">
                                          <textarea
                                            className="form-textarea"
                                            placeholder="About"
                                            defaultValue={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="setting-item pb-0 pt_30">
                                      <div className="d-flex align-items-start">
                                        <label className="btn-switch m-0 me-3">
                                          <input
                                            type="checkbox"
                                            className
                                            id="tags-btn"
                                            defaultValue
                                            defaultChecked
                                          />
                                          <span className="checkbox-slider" />
                                        </label>
                                        <div className="d-flex flex-column">
                                          <label className="color-black fw-bold mb-1">
                                            I do not want to add tags in my
                                            event
                                          </label>
                                          <p className="mt-2 fs-14 d-block mb-0">
                                            Use relevant words as your tags to
                                            improve the discoverability of your
                                            event.{" "}
                                            <a href="#" className="a-link">
                                              Learn more
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className="tags-holder"
                                        style={{ display: "none" }}
                                      >
                                        <div className="ticket-instructions-content tags-container mt-4">
                                          <input
                                            className="form-control tags-input"
                                            type="text"
                                            placeholder="Type your tags and press enter"
                                          />
                                          <div className="tags-list">
                                            {/* keywords go here */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="step-footer step-tab-pager mt-4">
                      <button
                        data-direction="prev"
                        className="btn btn-default btn-hover steps_btn"
                      >
                        Previous
                      </button>
                      <button
                        data-direction="next"
                        className="btn btn-default btn-hover steps_btn"
                      >
                        Next
                      </button>
                      <button
                        data-direction="finish"
                        className="btn btn-default btn-hover steps_btn"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default onlineEvent;
