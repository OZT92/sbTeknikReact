import { InstagramLogoIcon } from "@phosphor-icons/react";
import "./Footer.css";

const Footer = () => {
  const tarih = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="social-links">
        <a
          href="https://www.instagram.com/sbteknikmalzeme/"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        <InstagramLogoIcon className="footer-social-icon" size={20} />
      </div>

      <div className="copyright">&#169;{tarih} - SB Teknik Malzeme </div>
    </div>
  );
};

export default Footer;
