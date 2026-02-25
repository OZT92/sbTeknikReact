import SEO from "../components/SEO";
import { SITE } from "../seo/site";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

import serviceImg1 from "../img/services/elektrikliElAletleri.png";
import serviceImg2 from "../img/services/isGuvenligi.png";
import serviceImg3 from "../img/services/nalburiye.png";
import serviceImg4 from "../img/services/tesisatMalzemeleri.png";
import serviceImg5 from "../img/services/yapiKimyasallari.png";
import serviceImg6 from "../img/services/yapiMalzemeleri.png";

import { Envelope } from "@phosphor-icons/react";
import Card from "../components/Card";

const ServicesPage = () => {
  const canonical = `${SITE.baseUrl}/about`;

  const services = [
    {
      id: 1,
      title: "Yapı Malzemeleri",

      imgSrc: serviceImg6,
    },
    {
      id: 2,
      title: "Yapı Kimyasalları",

      imgSrc: serviceImg5,
    },
    {
      id: 3,
      title: "Tesisat Malzemeleri",

      imgSrc: serviceImg4,
    },
    {
      id: 4,
      title: "Nalburiye",

      imgSrc: serviceImg3,
    },
    {
      id: 5,
      title: "İş Güvenliği",

      imgSrc: serviceImg2,
    },
    {
      id: 6,
      title: "Elektrikli El Aletleri",

      imgSrc: serviceImg1,
    },
  ];
  return (
    <>
      <SEO
        title="Hizmetlerimiz | SB Teknik"
        description="Endüstriyel ürün tedariki, teknik ürün danışmanlığı ve hızlı temin süreçleriyle işletmenize uygun çözümler sunuyoruz."
        canonical={canonical}
        ogImage={SITE.ogImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Endüstriyel Teknik Tedarik Hizmetleri",
          provider: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.baseUrl,
          },
          areaServed: "TR",
          serviceType: [
            "Teknik Tedarik",
            "Endüstriyel Ürün Temini",
            "Ürün Danışmanlığı",
          ],
          url: canonical,
        }}
      />

      <div className="services-container">
        <div className="card-container">
          {services.map((service) => (
            <Card
              key={service.id}
              title={service.title}
              imgSrc={service.imgSrc}
            />
          ))}
        </div>
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
            <Envelope size={22} />
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default ServicesPage;
