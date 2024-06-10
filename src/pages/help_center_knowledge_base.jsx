import React from "react";

function helpCenterKnowledgeBase() {
    return (
        <div className="wrapper">
            <div className="hero-banner">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-12">
                            <div className="hero-banner-content text-center">
                                <h2>How can we help?</h2>
                                <p className="ps-0">Search our knowledge base or submit a ticket.</p>
                                <div className="">
                                    <input className="form-control h_50 w-100" type="text" placeholder="Search articles" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="explore-events p-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <a href="help_section_detail_view.html" className="main-card kb-card mt-0 mt-lg-0 mt-md-0">
                                <div className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-calendar-days"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>I am an Organiser</h4>
                                        <span>76 Articles</span>
                                    </div>
                                </div>
                                <div className="kb-content p-4">
                                    <p>Find everything you need to be an organiser</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <a href="help_section_detail_view.html" className="main-card kb-card mt-4 mt-lg-0 mt-md-0">
                                <div className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-user-tie"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>I am an Attendee</h4>
                                        <span>15 Articles</span>
                                    </div>
                                </div>
                                <div className="kb-content p-4">
                                    <p>Find everything you need to be an attendee on Barren.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <a href="help_section_detail_view.html" className="main-card kb-card mt-4 mt-lg-0">
                                <div className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-microphone"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>I am a Speaker</h4>
                                        <span>5 Articles</span>
                                    </div>
                                </div>
                                <div className="kb-content p-4">
                                    <p>Find everything you need to be a speaker</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <a href="help_section_detail_view.html" className="main-card kb-card mt-4">
                                <div className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>Promoting an Event</h4>
                                        <span>12 Articles</span>
                                    </div>
                                </div>
                                <div className="kb-content p-4">
                                    <p>Quick advice and tips on how to promote your event</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <a href="help_section_detail_view.html" className="main-card kb-card mt-4">
                                <div className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-gear"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>Troubleshooting</h4>
                                        <span>9 Articles</span>
                                    </div>
                                </div>
                                <div className="kb-content p-4">
                                    <p>Facing an issue using our platform? See if your problem matches any of them.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <a href="help_section_detail_view.html" className="main-card kb-card mt-4">
                                <div className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-file-lines"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>I use old Barren</h4>
                                        <span>40 Articles</span>
                                    </div>
                                </div>
                                <div className="kb-content p-4">
                                    <p>Click here if you are using old platform.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default helpCenterKnowledgeBase;