import { Link } from "react-router";
import Navbar from "../components/Navbar";
import serviceImg1 from "../img/services/elektrikliElAletleri.png";
import serviceImg2 from "../img/services/isGuvenligi.png";
import serviceImg3 from "../img/services/nalburiye.png";
import serviceImg4 from "../img/services/tesisatMalzemeleri.png";
import serviceImg5 from "../img/services/yapiKimyasallari.png";
import serviceImg6 from "../img/services/yapiMalzemeleri.png";

import { motion } from "motion/react";
import { MapPinLineIcon } from "@phosphor-icons/react";

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <div className="services-container">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          className="services-card"
        >
          <h3>Yapı Malzemeleri</h3>
          <img src={serviceImg6} alt="Yapi Malzemeleri" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          className="services-card"
        >
          <h3>Yapı Kimyasalları</h3>
          <img src={serviceImg5} alt="Yapi Kimyasalları" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          className="services-card"
        >
          <h3>Tesisat Malzemeleri</h3>
          <img src={serviceImg4} alt="Yapi Malzemeleri" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          className="services-card"
        >
          <h3>Nalburiye</h3>
          <img src={serviceImg3} alt="Yapi Malzemeleri" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          className="services-card"
        >
          <h3>İş Güvenliği</h3>
          <img src={serviceImg2} alt="Yapi Malzemeleri" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          className="services-card"
        >
          <h3>Elektrikli El Aletleri</h3>
          <img src={serviceImg1} alt="Yapi Malzemeleri" />
        </motion.div>
      </div>
      <div className="services-cta-section">
        <motion.p
          initial={{ y: 200, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.7, delay: 0.1 },
          }}
        >
          Fiyat teklifi ve daha fazla bilgi almak için bize ulaşın.
        </motion.p>
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.7, delay: 0.3 },
          }}
        >
          <Link className="services-cta-btn" to="/contact">
            İletişim
            <MapPinLineIcon size={22} />
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default ServicesPage;
