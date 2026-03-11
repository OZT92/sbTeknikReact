import {
  EnvelopeIcon,
  NavigationArrowIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import "./ContactPage.css";

import JsonLd from "../components/JsonLd.jsx";
import usePageSeo from "../hooks/usePageSeo";
import { SITE } from "../seo/site";
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

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "İletişim",
  url: canonical,
  mainEntity: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.baseUrl,
    logo: SITE.logo,
    email: "sbteknik@hotmail.com",
    telephone: "+902122566646",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Emekyemez Mah. Buğulu Sk. 14/A",
      addressLocality: "Beyoğlu",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
  },
};

const ContactPage = () => {
  usePageSeo({
    title: "İletişim | SB Teknik",
    description:
      "SB Teknik iletişim bilgileri, telefon, e-posta, adres ve harita konumu.",
    canonical,
    image: SITE.ogImage,
  });

  return (
    <>
      <JsonLd data={contactSchema} />
      <div className="contact-main-container">
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
                href="mailto:sbteknik@hotmail.com"
                aria-label="SB Teknik e-posta adresi"
              >
                <EnvelopeIcon size={22} className="contact-icon" />
                <span>sbteknik@hotmail.com</span>
              </a>
            </motion.div>

            <motion.div variants={item} className="contact-item">
              <a
                href="tel:+902122566646"
                aria-label="SB Teknik telefon numarası"
              >
                <PhoneIcon size={22} className="contact-icon" />
                <span>+90 (212) 256 66 46</span>
              </a>
            </motion.div>

            <motion.div variants={item} className="contact-item">
              <a
                href="https://www.google.com/maps/place/Sb+Teknik+Malzeme+End%C3%BCstriyel+%C3%9Cr%C3%BCnler/@41.0252926,28.9676216,1144m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cab9e5e227e5ed:0xf3cc07f525fc71d7!8m2!3d41.0252886!4d28.9701965!16s%2Fg%2F11dxnrvtms?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SB Teknik adresini Google Maps üzerinde aç"
              >
                <NavigationArrowIcon size={22} className="contact-icon" />
                <span>Emekyemez Mah. Buğulu Sk. 14/A Beyoğlu/İstanbul</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>{" "}
    </>
  );
};

export default ContactPage;
