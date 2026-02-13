import { Link } from "react-router";
import { InfoIcon, PackageIcon, MapPinLineIcon } from "@phosphor-icons/react";
import sbLogo from "../img/sbLogo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="nav-logo-container" to="/">
        <img className="navbar-logo" src={sbLogo} alt="SB Teknik logosu" />
        <a className="nav-logo-text">SB Teknik Malzeme</a>
      </Link>
      <div className="navbar-links">
        <Link className="navbar-links_link" to="/about">
          {" "}
          <InfoIcon size={24} />
          <a className="navbar-link-text"> Hakkımızda</a>
        </Link>
        <Link className="navbar-links_link" to="/services">
          {" "}
          <PackageIcon size={24} />
          <a className="navbar-link-text">Hizmetlerimiz</a>
        </Link>
        <Link className="navbar-links_link" to="/contact">
          {" "}
          <MapPinLineIcon size={24} />
          <a className="navbar-link-text">İletişim</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
