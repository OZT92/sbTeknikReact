import { Link } from "react-router-dom";
import { InfoIcon, PackageIcon, MapPinLineIcon } from "@phosphor-icons/react";
import sbLogo from "../img/sbLogo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="nav-logo-container" to="/">
        <img className="navbar-logo" src={sbLogo} alt="SB Teknik logosu" />
        <p className="nav-logo-text">SB Teknik Malzeme</p>
      </Link>
      <div className="navbar-links">
        <Link className="navbar-link" to="/about">
          {" "}
          <InfoIcon size={24} />
          <p className="navbar-link-text"> Hakkımızda</p>
        </Link>
        <Link className="navbar-link" to="/services">
          {" "}
          <PackageIcon size={24} />
          <p className="navbar-link-text">Hizmetlerimiz</p>
        </Link>
        <Link className="navbar-link" to="/contact">
          {" "}
          <MapPinLineIcon size={24} />
          <p className="navbar-link-text">İletişim</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
