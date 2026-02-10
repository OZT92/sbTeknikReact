import Navbar from "../components/Navbar";
import serviceImg1 from "../img/services/elektrikliElAletleri.png";
import serviceImg2 from "../img/services/isGuvenligi.png";
import serviceImg3 from "../img/services/nalburiye.png";
import serviceImg4 from "../img/services/tesisatMalzemeleri.png";
import serviceImg5 from "../img/services/yapiKimyasallari.png";
import serviceImg6 from "../img/services/yapiMalzemeleri.png";

import { motion } from "motion/react";

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
    </>
  );
};

export default ServicesPage;
