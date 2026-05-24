/* eslint-disable no-unused-vars */
import Button from "../components/Button.jsx";
import { InfoIcon, PackageIcon, MapPinLineIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { SITE } from "../seo/site.js";
import heroVideo from "../video/sb-hero-video-1-opt.mp4";
import BrandSlider from "../components/BrandSlider";

const canonical = `${SITE.baseUrl}/`;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

const logoAlts = [
  "oznurkablo",
  "bosch",
  "astra",
  "blackdecker",
  "boardex",
  "dekor",
  "dewalt",
  "drager",
  "eca",
  "egesan",
  "einhell",
  "filli boya",
  "izeltas",
  "jotun",
  "kalde",
  "karbosan",
  "magmaweld",
  "makita",
  "marshall",
  "permolit",
  "siemens",
  "sika",
  "sista",
  "tomax",
  "weber",
];
const logos = logoAlts.map((alt, i) => ({ src: `/${i + 1}.webp`, alt }));

const HomePage = () => {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPlayVideo(true), 800);
    return () => clearTimeout(t);
  }, []);

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
        {!playVideo ? (
          <img
            className="hero-poster"
            src="/poster-hero.webp"
            alt=""
            aria-hidden="true"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
        ) : (
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/poster-hero.webp"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="hero-text"
        >
          <motion.h1 variants={itemVariants} className="hero-text-title">
            Sanayinin Gücünü Destekleyen Teknik Tedarik
          </motion.h1>
          <motion.h3 variants={itemVariants} className="hero-text-subtitle">
            Endüstriyel ürünlerde doğru seçimi, doğru hizmetle buluşturuyoruz.
          </motion.h3>
          <motion.div variants={itemVariants} className="hero-stats">
            <span className="hero-stats-number">10+</span>
            <span className="hero-stats-text">Yıl Sektör<br/>Tecrübesi</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="page-links">
        <Button to="/about" text="Hakkımızda" Icon={InfoIcon} delay={0.6} />
        <Button to="/services" text="Hizmetler" Icon={PackageIcon} delay={0.7} />
        <Button to="/contact" text="İletişim" Icon={MapPinLineIcon} delay={0.8} />
      </div>
      <BrandSlider logos={logos} speed={40} gap={56} height={150} />
    </>
  );
};

export default HomePage;
