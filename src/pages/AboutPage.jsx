import SEO from "../components/SEO";
import { SITE } from "../seo/site";
import { motion, useReducedMotion } from "motion/react";
import { PackageIcon } from "@phosphor-icons/react";

import Button from "../components/Button";
import sbLogo from "../img/sbLogo.png";
import aboutVideo from "../video/sbAboutVideo1-opt.mp4";

import certificate1 from "../img/certificatesLogos/1.png";
import certificate2 from "../img/certificatesLogos/2.png";
import certificate3 from "../img/certificatesLogos/3.png";
import certificate4 from "../img/certificatesLogos/4.png";

const canonical = `${SITE.baseUrl}/about`;

const certificates = [
  { src: certificate1, alt: "TSE" },
  { src: certificate2, alt: "ISO 10002" },
  { src: certificate3, alt: "ISO 9001" },
  { src: certificate4, alt: "CE" },
];

const aboutText = `2015 yılında İstanbul Karaköy’de kurulan SB Teknik, endüstriyel teknik tedarik alanında 10 yılı aşkın deneyime sahiptir. Hırdavat, inşaat malzemeleri, endüstriyel ürünler ve makine yedek parçaları başta olmak üzere geniş bir ürün yelpazesinde hizmet sunmaktayız.

Önceliğimiz; doğru ürünü, doğru zamanda ve rekabetçi fiyatlarla müşterilerimize ulaştırmaktır. Hızlı ve güvenilir tedarik anlayışımızla, satış öncesi ve sonrası süreçlerde çözüm odaklı yaklaşım benimseyerek iş ortaklarımıza değer katıyoruz.`;

const panel = {
  hidden: { y: -80, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const certsAnim = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
};

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <SEO
        title="Hakkımızda | SB Teknik"
        description="SB Teknik; sanayi ve endüstriyel tedarikte ürün seçimi, temin ve satış sonrası süreçlerde güvenilir çözüm ortağıdır."
        canonical={canonical}
        ogImage={SITE.ogImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          url: SITE.baseUrl,
          email: SITE.email,
          telephone: SITE.phone,
          address: { "@type": "PostalAddress", ...SITE.address },
        }}
      />

      <div className="about-section">
        {!reduceMotion && (
          <video
            className="about-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/poster-about.webp"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
            tabIndex={-1}
            aria-hidden="true"
          >
            <source src={aboutVideo} type="video/mp4" />
          </video>
        )}

        <motion.div
          variants={panel}
          initial="hidden"
          animate="show"
          className="about-content"
        >
          <div className="about-text-content">
            <img
              src={sbLogo}
              alt="SB Teknik logosu"
              className="about-logo"
              loading="lazy"
              decoding="async"
            />

            <p className="about-text">
              <span className="about-header">SB Teknik</span>
              <br />
              {aboutText}
            </p>
          </div>

          <Button
            to="/services"
            text="Hizmetler"
            Icon={PackageIcon}
            delay={0.1}
          />
        </motion.div>
      </div>

      <motion.div
        variants={certsAnim}
        initial="hidden"
        animate="show"
        className="certificates-section"
        aria-label="Sertifikalar"
      >
        {certificates.map((c) => (
          <img
            key={c.alt}
            src={c.src}
            alt={c.alt}
            loading="lazy"
            decoding="async"
          />
        ))}
      </motion.div>
    </>
  );
}
