import React from "react";
import { useLocation } from "react-router-dom";
import { PriceFormat } from "../utils/tools";


const styles = {
    transactionDetails: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    transactionDetailsTh: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f4f4f4'
    },
    transactionDetailsTd: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd'
    },
    transactionDetailItem: {
        display: 'table-row'
    },
    btnGroup: {
        justifyContent: 'space-between',
        gap: '10px',
        display: 'flex',
        marginTop: '20px'
    },
    transactionInfoImg: {
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


const TransactionInfo = () => {
    const query = useQuery();

    const id = query.get('Id');
    const accountID = query.get('AccountID');
    const transactionType = query.get('TransactionType');
    const amount = query.get('Amount');
    const description = query.get('Description');
    const transactionDate = query.get('TransactionDate');
    const status = query.get('Status') === 'True';

  return (
    <div className="transaction-info-block" style={{ padding: "80px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-7 col-md-10">
            <div className="transaction-info-content">
              <div className="main-card">
                <div className="transaction-info-top text-center">
                  <div className="transaction-info-img mt-4"
                  style={{ padding: "30px" }}>
                    <img
                      src={
                        status
                          ? "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/transaction-img%2Ftrans-complete.png?alt=media&token=3ff27e0e-9fc6-487b-9b0c-a9f1c4b81521"
                          : "https://firebasestorage.googleapis.com/v0/b/feventopia-app.appspot.com/o/transaction-img%2Ftrans-fail.png?alt=media&token=bb5ba7b2-e3fd-4016-a90d-5a0332882264"
                      }
                      alt="Transaction Status"
                      style={styles.transactionInfoImg}
                    />
                  </div>
                  <h4>THÔNG TIN THANH TOÁN</h4>
                  <p className="ps-lg-4 pe-lg-4">
                    
                  </p>
                </div>
                <div className="transaction-info-bottom">
                  <div
                    className="transaction-info-bottom-bg"
                    style={{ padding: "10px" }}
                  >
                    <table style={styles.transactionDetails}>
                      <thead>
                        <tr>
                          <th style={styles.transactionDetailsTh}>THÔNG TIN</th>
                          <th style={styles.transactionDetailsTh}>CHI TIẾT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={styles.transactionDetailItem}>
                          <td style={styles.transactionDetailsTd}>
                            <strong>Mã Giao Dịch:</strong>
                          </td>
                          <td style={styles.transactionDetailsTd}>{id}</td>
                        </tr>
                        <tr style={styles.transactionDetailItem}>
                          <td style={styles.transactionDetailsTd}>
                            <strong>Tài Khoản:</strong>
                          </td>
                          <td style={styles.transactionDetailsTd}>
                            {accountID}
                          </td>
                        </tr>
                        <tr style={styles.transactionDetailItem}>
                          <td style={styles.transactionDetailsTd}>
                            <strong>Loại Giao Dịch:</strong>
                          </td>
                          <td style={styles.transactionDetailsTd}>
                            {transactionType}
                          </td>
                        </tr>
                        <tr style={styles.transactionDetailItem}>
                          <td style={styles.transactionDetailsTd}>
                            <strong>Số Tiền:</strong>
                          </td>
                          <td style={styles.transactionDetailsTd}><PriceFormat price={amount}/></td>
                        </tr>
                        <tr style={styles.transactionDetailItem}>
                          <td style={styles.transactionDetailsTd}>
                            <strong>Thông tin GD:</strong>
                          </td>
                          <td style={styles.transactionDetailsTd}>
                            {decodeURIComponent(description)}
                          </td>
                        </tr>
                        <tr style={styles.transactionDetailItem}>
                          <td style={styles.transactionDetailsTd}>
                            <strong>Ngày Giao Dịch:</strong>
                          </td>
                          <td style={styles.transactionDetailsTd}>
                            {transactionDate}
                          </td>
                        </tr>
                        <tr style={styles.transactionDetailItem}>
                          <td style={styles.transactionDetailsTd}>
                            <strong>Trạng Thái:</strong>
                          </td>
                          <td style={styles.transactionDetailsTd}>
                            {status ? "Completed" : "Pending"}
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

export default TransactionInfo;
