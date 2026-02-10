import { Link } from "react-router";
import { InfoIcon, PackageIcon, MapPinLineIcon } from "@phosphor-icons/react";
import sbLogo from "../img/sbLogo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="navbar-logo" src={sbLogo} alt="SB Teknik logosu" />
      </Link>
      <div className="navbar-links">
        <Link className="navbar-links_link" to="/about">
          {" "}
          <InfoIcon size={22} />
          Hakkımızda
        </Link>
        <Link className="navbar-links_link" to="/services">
          {" "}
          <PackageIcon size={22} />
          Hizmetlerimiz
        </Link>
        <Link className="navbar-links_link" to="/contact">
          {" "}
          <MapPinLineIcon size={22} />
          İletişim
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
