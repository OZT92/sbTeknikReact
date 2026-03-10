import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./HomePage.css";

import usePageSeo from "../hooks/usePageSeo";
import JsonLd from "../components/JsonLd";
import { organizationSchema } from "../seo/organizationSchema";
import { SITE } from "../seo/site";

import Button from "../components/Button.jsx";
import { InfoIcon, PackageIcon, MapPinLineIcon } from "@phosphor-icons/react";

import heroVideo from "../video/sb-hero-video-1-opt.mp4";
import BrandSlider from "../components/BrandSlider";

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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();

  usePageSeo({
    title: "SB Teknik Malzeme",
    description:
      "Endüstriyel ürün tedariği, teknik danışmanlık ve profesyonel malzeme çözümleri.",
    canonical: SITE.baseUrl,
    image: SITE.ogImage,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (reduceMotion || isMobile) {
      setShouldLoadVideo(false);
      return;
    }

    const timeout = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, [reduceMotion, isMobile]);

  return (
    <>
      <JsonLd data={organizationSchema} />

      <main>
        <section className="hero-main-container">
          <div className="hero">
            {!shouldLoadVideo ? (
              <img
                className="hero-poster"
                src="/poster-hero.webp"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
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
              initial={reduceMotion ? false : { y: -200 }}
              animate={
                reduceMotion
                  ? undefined
                  : { y: 0, transition: { duration: 0.7 } }
              }
              className="hero-text"
            >
              <h1 className="hero-text-title">
                Sanayinin Gücünü Destekleyen Teknik Tedarik
              </h1>
              <p className="hero-text-subtitle">
                Endüstriyel ürünlerde doğru seçimi, doğru hizmetle
                buluşturuyoruz.
              </p>
            </motion.div>
          </div>

          <div className="page-links">
            <Button to="/about" text="Hakkımızda" Icon={InfoIcon} size="lg" />
            <Button
              to="/services"
              text="Hizmetler"
              Icon={PackageIcon}
              size="lg"
            />
            <Button
              to="/contact"
              text="İletişim"
              Icon={MapPinLineIcon}
              size="lg"
            />
          </div>

          <BrandSlider logos={logos} speed={40} gap={56} height={150} />
        </section>
      </main>    </>
  );
};

export default HomePage;


