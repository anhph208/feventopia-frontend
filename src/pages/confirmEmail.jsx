import React from "react";
import { useLocation } from "react-router-dom";

const styles = {
    confirmationDetails: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    confirmationDetailsTh: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f4f4f4'
    },
    confirmationDetailsTd: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd'
    },
    confirmationDetailItem: {
        display: 'table-row'
    },
    btnGroup: {
        justifyContent: 'space-between',
        gap: '10px',
        display: 'flex',
        marginTop: '20px'
    },
    confirmationInfoImg: {
        maxWidth: '20%',
        height: 'auto',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const EmailConfirmation = () => {
    const query = useQuery();

    const email = query.get('Email');
    const status = query.get('Status') === 'True';

    return (
        <div className="confirmation-info-block" style={{ padding: "80px" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-7 col-md-10">
                        <div className="confirmation-info-content">
                            <div className="main-card">
                                <div className="confirmation-info-top text-center">
                                    <div className="confirmation-info-img mt-4" style={{ padding: "30px" }}>
                                        <img
                                            src={
                                                status
                                                    ? "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/transaction-img%2Ftrans-complete.png?alt=media&token=3ff27e0e-9fc6-487b-9b0c-a9f1c4b81521"
                                                    : "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/transaction-img%2Ftrans-fail.png?alt=media&token=bb5ba7b2-e3fd-4016-a90d-5a0332882264"
                                            }
                                            alt="Confirmation Status"
                                            style={styles.confirmationInfoImg}
                                        />
                                    </div>
                                    <h4>XÁC NHẬN EMAIL</h4>
                                </div>
                                <div className="confirmation-info-bottom">
                                    <div className="confirmation-info-bottom-bg" style={{ padding: "10px" }}>
                                        <table style={styles.confirmationDetails}>
                                            <thead>
                                                <tr>
                                                    <th style={styles.confirmationDetailsTh}>THÔNG TIN</th>
                                                    <th style={styles.confirmationDetailsTh}>CHI TIẾT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style={styles.confirmationDetailItem}>
                                                    <td style={styles.confirmationDetailsTd}>
                                                        <strong>Email:</strong>
                                                    </td>
                                                    <td style={styles.confirmationDetailsTd}>{email}</td>
                                                </tr>
                                                <tr style={styles.confirmationDetailItem}>
                                                    <td style={styles.confirmationDetailsTd}>
                                                        <strong>Trạng Thái:</strong>
                                                    </td>
                                                    <td style={styles.confirmationDetailsTd}>
                                                        {status ? "Confirmed" : "Failed"}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="btn-group" style={styles.btnGroup}>                     
                                            <a href="/" className="main-btn btn-hover h_50 w-100">
                                                <i className="fa-solid fa-home me-3"></i>VỀ TRANG CHỦ
                                            </a>
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
};

export default EmailConfirmation;
