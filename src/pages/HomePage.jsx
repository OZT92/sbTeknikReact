import { Link } from "react-router";
import { motion } from "motion/react";

import Navbar from "../components/Navbar";
import heroVideo from "../video/sb-hero-video-1.mp4";
import BrandSlider from "../components/BrandSlider";

import logo1 from "../img/brandLogos/1.png";
import logo2 from "../img/brandLogos/2.png";
import logo3 from "../img/brandLogos/3.png";
import logo4 from "../img/brandLogos/4.png";
import logo5 from "../img/brandLogos/5.png";
import logo6 from "../img/brandLogos/6.png";
import logo7 from "../img/brandLogos/7.png";
import logo8 from "../img/brandLogos/8.png";
import logo9 from "../img/brandLogos/9.png";
import logo10 from "../img/brandLogos/10.png";
import logo11 from "../img/brandLogos/11.png";
import logo12 from "../img/brandLogos/12.png";
import logo13 from "../img/brandLogos/13.png";
import logo14 from "../img/brandLogos/14.png";
import logo15 from "../img/brandLogos/15.png";
import logo16 from "../img/brandLogos/16.png";
import logo17 from "../img/brandLogos/17.png";
import logo18 from "../img/brandLogos/18.png";
import logo19 from "../img/brandLogos/19.png";
import logo20 from "../img/brandLogos/20.png";
import logo21 from "../img/brandLogos/21.png";
import logo22 from "../img/brandLogos/22.png";
import logo23 from "../img/brandLogos/23.png";
import logo24 from "../img/brandLogos/24.png";
import logo25 from "../img/brandLogos/25.png";

const HomePage = () => {
  const logos = [
    { src: logo1, alt: "oznurkablo" },
    { src: logo2, alt: "bosch" },
    { src: logo3, alt: "astra" },
    { src: logo4, alt: "blackdecker" },
    { src: logo5, alt: "boardex" },
    { src: logo6, alt: "dekor" },
    { src: logo7, alt: "dewalt" },
    { src: logo8, alt: "drager" },
    { src: logo9, alt: "eca" },
    { src: logo10, alt: "egesan" },
    { src: logo11, alt: "einhell" },
    { src: logo12, alt: "filli boya" },
    { src: logo13, alt: "izeltas" },
    { src: logo14, alt: "jotun" },
    { src: logo15, alt: "kalde" },
    { src: logo16, alt: "karbosan" },
    { src: logo17, alt: "magmaweld" },
    { src: logo18, alt: "makita" },
    { src: logo19, alt: "marshall" },
    { src: logo20, alt: "permolit" },
    { src: logo21, alt: "siemens" },
    { src: logo22, alt: "sika" },
    { src: logo23, alt: "sista" },
    { src: logo24, alt: "tomax" },
    { src: logo25, alt: "weber" },
  ];
  return (
    <>
      <Navbar />
      <div className="hero">
        <video className="hero-video" autoPlay loop muted>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0, transition: { duration: 0.7 } }}
          className="hero-text"
        >
          <h1 className="hero-text-title">
            Sanayinin Gücünü Destekleyen Teknik Tedarik
          </h1>
          <h3 className="hero-text-subtitle">
            Endüstriyel ürünlerde doğru seçimi, doğru hizmetle buluşturuyoruz.
          </h3>
          <Link className="hero-cta-btn" to="/services">
            Neler Yapıyoruz?
          </Link>
        </motion.div>
      </div>
      <BrandSlider logos={logos} speed={40} gap={56} height={200} />
    </>
  );
};

export default HomePage;
