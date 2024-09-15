import React from "react";
import "./footer.css";
import Logo from "../../assets/Logoss.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="top">
        <div className="pages">
          <ul>
            <img className="logossss" src={Logo} alt="Indo Teknik Logo" />
            <p className="conFoot">Perusahaan Automotive terlengkap di Indonesia</p>
          </ul>
          <ul>
            <h3>Karir</h3>
            <li><a style={{ color: "#342e2e" }} href="/">Apply Online</a></li>
            <li><a style={{ color: "#342e2e" }} href="/">Available Positions</a></li>
          </ul>
          <ul>
            <h3>Tentang kami</h3>
            <li><a style={{ color: "#342e2e" }} href="/">Meet Our Team</a></li>
            <li><a style={{ color: "#342e2e" }} href="/">Our Responsibilities</a></li>
            <li><a style={{ color: "#342e2e" }} href="/">Our Codes</a></li>
            <li><a style={{ color: "#342e2e" }} href="/">Our Values</a></li>
          </ul>
        </div>
        <div className="newsletter">
          <h3>Hubungi Customer Service kami!</h3>
          <span className="cs">
            <a className="cs" href="https://api.whatsapp.com/send?phone=628117521881" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
              <p className="nomor">0811 7521 881</p>
            </a>
          </span>
        </div>
      </div>
      <div className="social">
        <i className="fab fa-linkedin"></i>
        <i className="fab fa-facebook"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-youtube"></i>
      </div>
      <div className="info">
        <div className="copyright">
          <p>2023 &copy; PT. ITech Persada Nusantara</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
