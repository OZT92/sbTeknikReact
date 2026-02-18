import SEO from "../components/SEO";
import { SITE } from "../seo/site";
import { Envelope, NavigationArrow, Phone } from "@phosphor-icons/react";
import { motion } from "motion/react";

import sbLogo from "../img/sbLogo.png";

const ContactPage = () => {
  const canonical = `${SITE.baseUrl}/contact`;
  return (
    <>
      <SEO
        title="İletişim | SB Teknik"
        description="SB Teknik ile iletişime geçin. Teklif, ürün temini ve teknik tedarik ihtiyaçlarınız için hızlı dönüş sağlarız."
        canonical={canonical}
        ogImage={SITE.ogImage}
      />
      <div className="contact-section">
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.7, delay: 0.5 },
          }}
          className="map-container"
        >
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5165.596398990584!2d28.967621577463504!3d41.025288571348085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e5e227e5ed%3A0xf3cc07f525fc71d7!2sSb%20Teknik%20Malzeme%20End%C3%BCstriyel%20%C3%9Cr%C3%BCnler!5e1!3m2!1str!2str!4v1769196748365!5m2!1str!2str"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, delay: 0.8 },
          }}
          className="contact-container"
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1, delay: 0.7 },
            }}
            src={sbLogo}
            alt="Sb teknik logosu"
            className="contact-logo"
          />
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.7, delay: 0.5 },
            }}
            className="contact-item"
          >
            <a>
              <NavigationArrow size={22} color="#194d88" />
              Emekyemez Mah. Buğulu Sk. 14/A Beyoğlu/İstanbul
            </a>
          </motion.div>
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.7, delay: 0.6 },
            }}
            className="contact-item"
          >
            <a href="mailto:sbteknik@hotmail.com">
              <Envelope size={22} color="#194d88" />
              sbteknik@hotmail.com
            </a>
          </motion.div>
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.7, delay: 0.7 },
            }}
            className="contact-item"
          >
            <a href="tel:+902122566646">
              <Phone size={22} color="#194d88" />
              +90 (212) 256 66 46
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;
