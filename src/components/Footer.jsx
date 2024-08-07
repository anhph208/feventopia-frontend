import React from "react";

function Footer() {
  return (
    <footer className="footer mt-auto">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-content">
                <h4><strong>VỀ CHÚNG TÔI</strong></h4>
                <ul className="footer-link-list">
                  <li>
                    <a href="/About_us" className="footer-link">
                      Thông tin
                    </a>
                  </li>
                  <li>
                    <a href="/helpCenter" className="footer-link">
                      Trung tâm hỗ trợ
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="footer-link">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="/Contact" className="footer-link">
                      Liên Hệ FEventopia
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-content">
                <h4><strong>DỊCH VỤ</strong></h4>
                <ul className="footer-link-list">
                  <li>
                    <a href="create.html" className="footer-link">
                      Sự kiện nổi bật
                    </a>
                  </li>
                  <li>
                    <a href="sell_tickets_online.html" className="footer-link">
                      Mua vé sự kiện
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="footer-link">
                      Chính sách Bảo mật
                    </a>
                  </li>
                  <li>
                    <a href="/Terms_condition" className="footer-link">
                      Điều khoản &amp; Dịch vụ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-content">
                <h4><strong>TRƯỜNG ĐẠI HỌC FPT</strong></h4>
                <ul className="footer-link-list">
                  <li>
                    <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+FPT+TP.+HCM/@10.8410472,106.8073398,17.41z/data=!4m14!1m7!3m6!1s0x31752731176b07b1:0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!8m2!3d10.8411276!4d106.809883!16s%2Fg%2F11j2zx_fz_!3m5!1s0x31752731176b07b1:0xb752b24b379bae5e!8m2!3d10.8411276!4d106.809883!16s%2Fg%2F11j2zx_fz_?hl=vi-VN&entry=ttu" className="footer-link">
                    Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức, TP.HCM.
                    </a>
                  </li>
                  <li>
                    <a className="phone" href="tel:(028)73005588">
                      (028) 7300 5588
                    </a>
                  </li>
                  <li>
                    <a className="mail" href="mailto:daihoc.hcm@fpt.edu.vn">
                      daihoc.hcm@fpt.edu.vn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-content">
                <h4><strong>THEO DÕI MẠNG XÃ HỘI</strong></h4>
                <ul className="social-links">
                  <li>
                    <a href="https://www.facebook.com/FPTU.HCM/" className="social-link">
                      <i className="fab fa-facebook-square" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/fptuniversityhcm/" className="social-link">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UCfNrlxNgcTZDJ3jZeSSSJxg" className="social-link">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-copyright-text">
                <p className="mb-0">
                  © 2024, <strong>FEventopia</strong>. All rights reserved. Powered
                  by FPT University.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
