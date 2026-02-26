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
        <Button to="/about" text="Hakkımızda" Icon={InfoIcon} />
        <Button to="/services" text="Hizmetler" Icon={PackageIcon} />
        <Button to="/contact" text="İletişim" Icon={MapPinLineIcon} />
      </div>
      <BrandSlider logos={logos} speed={40} gap={56} height={150} />
    </>
  );
};

export default HomePage;
