import SEO from "../components/SEO";
import { SITE } from "../seo/site.js";
import {
  EnvelopeIcon,
  NavigationArrowIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import sbLogo from "../img/sbLogo.png";
const canonical = `${SITE.baseUrl}/contact`;

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const list = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay: 0.3, staggerChildren: 0.12 } },
};

const item = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const ContactPage = () => {
  return (
    <>
      <SEO
        title="İletişim | SB Teknik"
        description="SB Teknik ile iletişime geçin. Teklif, ürün temini ve teknik tedarik ihtiyaçlarınız için hızlı dönüş sağlarız."
        canonical={canonical}
        ogImage={SITE.ogImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE.name,
          url: SITE.baseUrl,
          telephone: SITE.phone,
          email: SITE.email,
          address: { "@type": "PostalAddress", ...SITE.address },
        }}
      />
      <div className="contact-section">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="map-container"
        >
          <iframe
            className="map"
            title="SB Teknik konum haritası"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4981.390454954396!2d28.967621577233334!3d41.02529261837527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e5e227e5ed%3A0xf3cc07f525fc71d7!2sSb%20Teknik%20Malzeme%20End%C3%BCstriyel%20%C3%9Cr%C3%BCnler!5e1!3m2!1str!2str!4v1772120657096!5m2!1str!2str"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>

        <motion.div
          variants={list}
          initial="hidden"
          animate="show"
          className="contact-container"
        >
          <motion.img
            variants={fadeIn}
            src={sbLogo}
            alt="SB Teknik logosu"
            className="contact-logo"
            loading="lazy"
            decoding="async"
          />

          <motion.div variants={item} className="contact-item">
            <a
              href="https://www.google.com/maps?query=SB%20Teknik%20Malzeme%20End%C3%BCstriyel%20%C3%9Cr%C3%BCnler"
              target="_blank"
              rel="noreferrer"
            >
              <NavigationArrowIcon size={22} className="contact-icon" />
              Emekyemez Mah. Buğulu Sk. 14/A Beyoğlu/İstanbul
            </a>
          </motion.div>

          <motion.div variants={item} className="contact-item">
            <a href="mailto:sbteknik@hotmail.com">
              <EnvelopeIcon size={22} className="contact-icon" />
              sbteknik@hotmail.com
            </a>
          </motion.div>

          <motion.div variants={item} className="contact-item">
            <a href="tel:+902122566646">
              <PhoneIcon size={22} className="contact-icon" />
              +90 (212) 256 66 46
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;
