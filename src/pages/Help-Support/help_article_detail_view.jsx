import React from "react";

function helpArticleDetailView() {
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
                        <div className="col-xl-4 col-lg-12 col-md-12">
                            <div className="main-card">
                                <div className="bp-title">
                                    <h4>FAQ</h4>
                                </div>
                                <div className="help-faq-content">
                                    <a href="help_article_detail_view.html" className="help-faq-link">Does the new Barren affect my current events or attendees?</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">How do I transfer to the new platform?</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">How can I log into my old Barren account?</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">How do I know who has arrived at my event?</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">How do I access the backend of my website (admin section)?</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">Does it take long to set up my account?</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">Can I easily share my events page?</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">How often will I get paid the ticket sales?</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">Do my customers have to make an account with Barren?</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">Are payments made via Barren secure?</a>
                                </div>
                            </div>
                            <div className="main-card mt-4">
                                <div className="bp-title">
                                    <h4>Related Articles</h4>
                                </div>
                                <div className="help-faq-content">
                                    <a href="help_article_detail_view.html" className="help-faq-link">How to import or add attendees at the backend</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">How do I switch my website on / off?</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">How to add, edit & delete users</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">Scanning tickets from the app</a>
                                    <a href="help_article_detail_view.html" className="help-faq-link">How to setup a Stripe account</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-12 col-md-12">
                            <div className="help-center-title mt-5 mt-xl-0">
                                <h4 className="border_bottom">How do I access the backend of my website (admin section)?</h4>
                                <div className="main-card help-v-content p-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare sagittis mi. Sed ac accumsan ex. Nam pellentesque ultrices augue, at vestibulum elit feugiat at. In ac blandit justo, non elementum est. Praesent posuere magna in eleifend vestibulum. Duis non mauris accumsan, vestibulum purus at, suscipit magna. Proin nec hendrerit turpis. Vivamus tincidunt leo at urna sodales lobortis. Curabitur aliquet, eros eu imperdiet vehicula, orci augue elementum massa, id aliquet ex est ut quam.</p>
                                    <p>Mauris arcu est, malesuada bibendum facilisis a, pellentesque a urna. Nullam bibendum mi posuere mi convallis hendrerit. Phasellus tellus lacus, tincidunt sollicitudin elementum eget, efficitur non nisi. Phasellus vel eros ligula. Praesent vulputate convallis nibh non venenatis. Proin rhoncus non ante quis bibendum. Cras a varius risus. Nullam sed scelerisque urna, sit amet sodales est. Duis sagittis, ex in mollis lacinia, turpis eros volutpat erat, id cursus neque arcu vitae nulla. Nunc consectetur lorem velit, vel commodo eros ultricies eu. Sed eget eros at sapien efficitur convallis in eget elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc vitae est at lorem porta dignissim. Mauris vulputate quis massa vitae imperdiet.</p>
                                    <p>Nam consectetur non odio ut lacinia. Morbi non imperdiet dui. Proin lacus eros, tempus non purus eu, mattis gravida enim. Morbi ornare et ante ut iaculis. Phasellus ut enim feugiat est volutpat convallis. Phasellus consectetur tempus varius. Nullam tincidunt a erat et finibus.</p>
                                    <div className="help-v-footer border_top">
                                        <div className="helful-feedback">
                                            <span className="helful-title">Helpful?</span>
                                            <a href="#" className="helpful-btn">
                                                <i className="fa-solid fa-thumbs-up"></i>
                                                <span>5</span>
                                            </a>
                                            <a href="#" className="helpful-btn">
                                                <i className="fa-solid fa-thumbs-down fa-flip-horizontal"></i>
                                                <span>0</span>
                                            </a>
                                        </div>
                                        <div className="help-publish-date">
                                            <span>Updated: 5 days ago</span>
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

export default helpArticleDetailView;