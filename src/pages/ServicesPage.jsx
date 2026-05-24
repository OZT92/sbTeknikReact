import SEO from "../components/SEO";
import { SITE } from "../seo/site";
import { motion } from "motion/react";

import { EnvelopeIcon } from "@phosphor-icons/react";
import Card from "../components/Card";
import Button from "../components/Button";

const serviceImg1 = "/img/services/elektrikli-el-aletleri.webp";
const serviceImg2 = "/img/services/is-guvenligi.webp";
const serviceImg3 = "/img/services/nalburiye.webp";
const serviceImg4 = "/img/services/tesisat-malzemeleri.webp";
const serviceImg5 = "/img/services/yapi-kimyasallari.webp";
const serviceImg6 = "/img/services/yapi-malzemeleri.webp";

const canonical = `${SITE.baseUrl}/services`;

const services = [
  {
    id: 1,
    title: "Yapı Malzemeleri",
    desc: "Alçı, levha, yalıtım ve tamamlayıcı yapı ürünleri.",
    imgSrc: serviceImg6,
  },
  {
    id: 2,
    title: "Yapı Kimyasalları",
    desc: "Su yalıtımı, yapıştırıcı, derz ve tamir/onarım çözümleri.",
    imgSrc: serviceImg5,
  },
  {
    id: 3,
    title: "Tesisat Malzemeleri",
    desc: "Temiz su, atık su, armatür ve bağlantı ekipmanları.",
    imgSrc: serviceImg4,
  },
  {
    id: 4,
    title: "Nalburiye",
    desc: "El aletleri, bağlantı elemanları ve günlük sarf malzemeler.",
    imgSrc: serviceImg3,
  },
  {
    id: 5,
    title: "İş Güvenliği",
    desc: "Kişisel koruyucu donanım ve saha güvenlik ekipmanları.",
    imgSrc: serviceImg2,
  },
  {
    id: 6,
    title: "Elektrikli El Aletleri",
    desc: "Profesyonel makineler, aksesuarlar ve sarf ürünleri.",
    imgSrc: serviceImg1,
  },
];

export default function ServicesPage() {
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
          {services.map((s) => (
            <Card
              key={s.id}
              title={s.title}
              desc={s.desc}
              imgSrc={s.imgSrc}
              to="/contact"
            />
          ))}
        </div>
      </div>

      <div className="services-cta-section">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.2 } }}
        >
          Fiyat teklifi ve daha fazla bilgi almak için bize ulaşın.
        </motion.p>
        <Button to="/contact" text="İletişim" Icon={EnvelopeIcon} delay={0.2} />
      </div>
    </>
  );
}
