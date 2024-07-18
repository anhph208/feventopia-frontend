import React from "react";

const Contact_us = () => {
    const members = [
        { name: "Phạm Ngọc Bảo (Leader)", id: "SE171066", email: "baopnse171066@fpt.edu.vn" },
        { name: "Phạm Hoàng Anh", id: "SE160124", email: "anhphse160124@fpt.edu.vn" },
        { name: "Nguyễn Võ Anh Kiệt", id: "SE171347", email: "kietnvase171347@fpt.edu.vn" },
        { name: "Phạm Hoàng Thụy An", id: "SE172037", email: "anphtse172037@fpt.edu.vn" },
        { name: "Cao Thuận Phát", id: "SE172611", email: "phatctse172611@fpt.edu.vn" }
    ];

    return (
        <div className="wrapper">
            <div className="breadcrumb-block">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-10">
                            <div className="barren-breadcrumb">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
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
                            <div className="main-title checkout-title text-center">
                                <h3>Contact Us</h3>
                                <p className="mb-0">Here are our contact details.</p>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="main-card mt-5">
                                <div className="contact-info-section p-lg-5 ps-lg-4 pt-lg-4 pb-5 p-4">
                                    <div className="row">
                                        {members.map((member, index) => (
                                            <div key={index} className="col-md-4 col-sm-6">
                                                <div className="contact-detail mt-4">
                                                    <label className="form-label">Name</label>
                                                    <p>{member.name}</p>
                                                </div>
                                                <div className="contact-detail mt-4">
                                                    <label className="form-label">Member ID</label>
                                                    <p>{member.id}</p>
                                                </div>
                                                <div className="contact-detail mt-4">
                                                    <label className="form-label">Email</label>
                                                    <p><a href={`mailto:${member.email}`}>{member.email}</a></p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact_us;
