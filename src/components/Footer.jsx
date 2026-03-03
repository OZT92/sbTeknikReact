import { InstagramLogoIcon } from "@phosphor-icons/react";

const Footer = () => {
  const tarih = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="social-links">
        <InstagramLogoIcon className="contact-item" size={20} />
      </div>

      <div className="copyright">&#169;{tarih} - SB Teknik Malzeme </div>
    </div>
  );
};

export default Footer;
