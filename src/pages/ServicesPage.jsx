import { motion } from "motion/react";
import { EnvelopeIcon } from "@phosphor-icons/react";
import "./ServicesPage.css";

import usePageSeo from "../hooks/usePageSeo";
import JsonLd from "../components/JsonLd";
import { SITE } from "../seo/site";
import { servicesSchema } from "../seo/servicesSchema";
import { services } from "../data/servicesData";

import Card from "../components/Card";
import Button from "../components/Button";

export default function ServicesPage() {
  const canonical = `${SITE.baseUrl}/services`;

  usePageSeo({
    title: "Hizmetlerimiz | SB Teknik",
    description:
      "Endüstriyel ürün tedariki, teknik ürün danışmanlığı ve hızlı temin süreçleriyle işletmenize uygun çözümler sunuyoruz.",
    canonical,
    image: SITE.ogImage,
  });

  return (
    <>
      <JsonLd data={servicesSchema(services)} />

      <div className="services-main-container">
        <div className="services-container">
          <div className="services-grid">
            {services.map((s) => (
              <Card
                key={s.id}
                title={s.title}
                desc={s.desc}
                imgSrc={s.imgSrc}
                to={`/services/${s.slug}`}
              />
            ))}
          </div>
        </div>

        <div className="services-cta-section">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.7, delay: 0.2 },
            }}
          >
            Fiyat teklifi ve daha fazla bilgi almak için bize ulaşın.
          </motion.p>

          <Button
            to="/contact"
            text="İletişim"
            Icon={EnvelopeIcon}
            delay={0.2}
            size="lg"
          />
        </div>
      </div>    </>
  );
}


