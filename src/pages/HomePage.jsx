import { Link } from "react-router";
import { InfoIcon, PackageIcon, MapPinLineIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

import SEO from "../components/SEO";
import { SITE } from "../seo/site.js";

import heroVideo from "../video/sb-hero-video-1-opt.mp4";
import BrandSlider from "../components/BrandSlider";

import logo1 from "../img/brandLogos/1.webp";
import logo2 from "../img/brandLogos/2.webp";
import logo3 from "../img/brandLogos/3.webp";
import logo4 from "../img/brandLogos/4.webp";
import logo5 from "../img/brandLogos/5.webp";
import logo6 from "../img/brandLogos/6.webp";
import logo7 from "../img/brandLogos/7.webp";
import logo8 from "../img/brandLogos/8.webp";
import logo9 from "../img/brandLogos/9.webp";
import logo10 from "../img/brandLogos/10.webp";
import logo11 from "../img/brandLogos/11.webp";
import logo12 from "../img/brandLogos/12.webp";
import logo13 from "../img/brandLogos/13.webp";
import logo14 from "../img/brandLogos/14.webp";
import logo15 from "../img/brandLogos/15.webp";
import logo16 from "../img/brandLogos/16.webp";
import logo17 from "../img/brandLogos/17.webp";
import logo18 from "../img/brandLogos/18.webp";
import logo19 from "../img/brandLogos/19.webp";
import logo20 from "../img/brandLogos/20.webp";
import logo21 from "../img/brandLogos/21.webp";
import logo22 from "../img/brandLogos/22.webp";
import logo23 from "../img/brandLogos/23.webp";
import logo24 from "../img/brandLogos/24.webp";
import logo25 from "../img/brandLogos/25.webp";

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

  const canonical = `${SITE.baseUrl}/`;
  return (
    <>
      <SEO
        title="Endüstriyel Teknik Tedarik | SB Teknik"
        description="SB Teknik; endüstriyel ürünler, hırdavat ve sanayi ekipmanlarında hızlı tedarik ve çözüm odaklı hizmet sunar."
        canonical={canonical}
        ogImage={SITE.ogImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          url: SITE.baseUrl,
          email: SITE.email,
          telephone: SITE.phone,
          address: {
            "@type": "PostalAddress",
            ...SITE.address,
          },
        }}
      />

      <div className="hero">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          preload="metadata"
          poster="/public/poster-hero.webp"
          tabIndex={-1}
          aria-hidden="true"
        >
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
        </motion.div>
      </div>

      <div className="page-links">
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: { duration: 0.7, delay: 0.1 },
          }}
        >
          <Link className="hero-cta-btn" to="/about">
            Hakkımızda
            <InfoIcon size={22} />
          </Link>
        </motion.div>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: { duration: 0.7, delay: 0.2 },
          }}
        >
          <Link className="hero-cta-btn" to="/services">
            Hizmetlerimiz
            <PackageIcon size={22} />
          </Link>
        </motion.div>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: { duration: 0.7, delay: 0.3 },
          }}
        >
          <Link className="hero-cta-btn" to="/contact">
            İletişim
            <MapPinLineIcon size={22} />
          </Link>
        </motion.div>
      </div>
      <BrandSlider logos={logos} speed={40} gap={56} height={150} />
    </>
  );
};

export default HomePage;
