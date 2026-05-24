import { useState } from "react";
import { Link, NavLink } from "react-router";
import { InfoIcon, PackageIcon, MapPinLineIcon, List, X } from "@phosphor-icons/react";
import sbLogo from "../img/sbLogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="navbar">
      <Link className="nav-logo-container" to="/" onClick={closeMenu}>
        <img className="navbar-logo" src={sbLogo} alt="SB Teknik logosu" />
        <p className="nav-logo-text">SB Teknik Malzeme</p>
      </Link>

      {/* Mobile Toggle Button */}
      <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menüyü aç/kapat">
        {isOpen ? <X size={32} /> : <List size={32} />}
      </button>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <NavLink className="navbar-links_link" to="/about" onClick={closeMenu}>
          <InfoIcon size={24} />
          <p className="navbar-link-text">Hakkımızda</p>
        </NavLink>
        <NavLink className="navbar-links_link" to="/services" onClick={closeMenu}>
          <PackageIcon size={24} />
          <p className="navbar-link-text">Hizmetlerimiz</p>
        </NavLink>
        <NavLink className="navbar-links_link" to="/contact" onClick={closeMenu}>
          <MapPinLineIcon size={24} />
          <p className="navbar-link-text">İletişim</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
