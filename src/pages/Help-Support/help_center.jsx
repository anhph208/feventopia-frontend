import React from "react";

function helpCenter() {
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
                        <div className="col-lg-4 col-md-12">
                            <div className="main-card">
                                <a href="help_section_detail_view.html" className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-calendar-days"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>I am an Organiser</h4>
                                        <span>76 Articles</span>
                                    </div>
                                </a>
                                <a href="help_section_detail_view.html" className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-user-tie"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>I am an Attendee</h4>
                                        <span>15 Articles</span>
                                    </div>
                                </a>
                                <a href="help_section_detail_view.html" className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-microphone"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>I am a Speaker</h4>
                                        <span>5 Articles</span>
                                    </div>
                                </a>
                                <a href="help_section_detail_view.html" className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>Promoting an Event</h4>
                                        <span>12 Articles</span>
                                    </div>
                                </a>
                                <a href="help_section_detail_view.html" className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-gear"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>Troubleshooting</h4>
                                        <span>9 Articles</span>
                                    </div>
                                </a>
                                <a href="help_section_detail_view.html" className="help-item d-flex align-center border_bottom">
                                    <div className="help-item-icon">
                                        <i className="fa-solid fa-file-lines"></i>
                                    </div>
                                    <div className="help-item-content">
                                        <h4>I use old Barren</h4>
                                        <span>40 Articles</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12">
                            <div className="help-center-title mt-5 mt-lg-0">
                                <h4 className="border_bottom">Popular Articles</h4>
                                <div className="main-card">
                                    <a href="help_article_detail_view.html" className="help-item-link">Creating an event</a>
                                    <a href="help_article_detail_view.html" className="help-item-link">How do I access the backend of my website (admin section)?</a>
                                    <a href="help_article_detail_view.html" className="help-item-link">Where is my event's name being used?</a>
                                    <a href="help_article_detail_view.html" className="help-item-link">How to build my own survey?</a>
                                    <a href="help_article_detail_view.html" className="help-item-link">Deleting & refunding tickets</a>
                                    <a href="help_article_detail_view.html" className="help-item-link">How to import or add attendees at the backend</a>
                                    <a href="help_article_detail_view.html" className="help-item-link">How to setup a Stripe account</a>
                                    <a href="help_article_detail_view.html" className="help-item-link">Can my events page reflect my company's branding?</a>
                                    <a href="help_article_detail_view.html" className="help-item-link">Do my customers have to make an account with Barren?</a>
                                    <a href="help_article_detail_view.html" className="help-item-link">How do I know who has arrived at my event?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default helpCenter;