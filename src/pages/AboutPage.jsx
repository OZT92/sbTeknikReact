import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import sbLogo from "../img/sbLogo.png";

import certificate1 from "../img/certificatesLogos/1.png";
import certificate2 from "../img/certificatesLogos/2.png";
import certificate3 from "../img/certificatesLogos/3.png";
import certificate4 from "../img/certificatesLogos/4.png";
import { Link } from "react-router";
import { PackageIcon } from "@phosphor-icons/react";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="about-section">
        <video
          className="about-video"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
        >
          <source src="/sbAboutVideo1.mp4" type="video/mp4" />
        </video>
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0, transition: { duration: 0.5 } }}
          className="about-content"
        >
          <div className="about-text-content">
            <img src={sbLogo} alt="Sb teknik logosu" className="about-logo" />
            <p className="about-text">
              <span className="about-header">SB Teknik</span> <br />
              2015 Yılında İstanbul, Karaköy'de kurulan firmamız 10 yılı aşkın
              süredir hırdavat, inşaat malzemeleri, endüsriyel ürünler, makina
              yedek parçaları başta olmak üzere pek çok sektörde tedarikçi
              olarak hizmet vermektedir. Kuruluşundan bu yana pazardaki payını
              genişletmek için rekabetçi fiyat politikası, hızlı ve doğru
              tedarik prensipleri ile çalışmalarını sürdürmeye devam etmektedir.
            </p>
          </div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.5, delay: 0.5 },
            }}
          >
            <Link className="hero-cta-btn about-cta-btn" to="/services">
              Hizmetlerimiz
              <PackageIcon size={22} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0, transition: { duration: 0.5 } }}
        className="certificates-section"
      >
        <img src={certificate1} alt="tse" />
        <img src={certificate2} alt="iso1002" />
        <img src={certificate3} alt="iso9001" />
        <img src={certificate4} alt="ce" />
      </motion.div>
    </>
  );
};

export default AboutPage;
