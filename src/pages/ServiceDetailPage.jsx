import { useParams, Navigate, Link } from "react-router-dom";
import { EnvelopeIcon, ArrowRightIcon } from "@phosphor-icons/react";
import "./ServiceDetailPage.css";

import usePageSeo from "../hooks/usePageSeo";
import JsonLd from "../components/JsonLd";
import { SITE } from "../seo/site";
import { services } from "../data/servicesData";
import { serviceDetailSchema } from "../seo/serviceDetailSchema";
import { breadcrumbSchema } from "../seo/breadcrumbSchema";

import Button from "../components/Button";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  const canonical = service
    ? `${SITE.baseUrl}/services/${service.slug}`
    : `${SITE.baseUrl}/services`;

  usePageSeo({
    title: service
      ? `${service.title} | SB Teknik`
      : "Hizmetlerimiz | SB Teknik",
    description: service
      ? service.longDesc || service.desc
      : "SB Teknik hizmet detay sayfası.",
    canonical,
    image: service?.schemaImage || SITE.ogImage,
  });

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const otherServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={serviceDetailSchema(service)} />
      <JsonLd data={breadcrumbSchema(service)} />

      <section className="service-detail-page">
        <div className="service-detail-shell">
          <nav className="service-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Ana Sayfa</Link>
            <span>/</span>
            <Link to="/services">Hizmetlerimiz</Link>
            <span>/</span>
            <span aria-current="page">{service.title}</span>
          </nav>

          <div className="service-detail-container">
            <div className="service-detail-image-wrapper">
              <img
                src={service.imgSrc}
                alt={service.title}
                className="service-detail-image"
              />
            </div>

            <div className="service-detail-content">
              <span className="service-detail-eyebrow">Hizmet Kategorisi</span>

              <h1>{service.title}</h1>

              <p>{service.longDesc || service.desc}</p>

              <h2>Bu kategoride sunduklarımız</h2>

              <ul>
                {service.items?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <Button
                to="/contact"
                text="Teklif Al"
                Icon={EnvelopeIcon}
                size="sm"
              />
            </div>
          </div>

          <section
            className="other-services-section"
            aria-labelledby="other-services-title"
          >
            <div className="other-services-header">
              <span className="service-detail-eyebrow">Diğer Hizmetler</span>
              <h2 id="other-services-title">İlgili kategorilere de göz atın</h2>
              <p>
                İhtiyacınıza en uygun ürün ve tedarik çözümleri için diğer
                hizmet kategorilerimizi inceleyebilirsiniz.
              </p>
            </div>

            <div className="other-services-grid">
              {otherServices.map((item) => (
                <Link
                  key={item.id}
                  to={`/services/${item.slug}`}
                  className="other-service-card"
                  aria-label={`${item.title} detay sayfasına git`}
                >
                  <div className="other-service-image-wrap">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="other-service-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="other-service-body">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>

                    <span className="other-service-link">
                      Detayları İncele
                      <ArrowRightIcon size={18} weight="bold" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>    </>
  );
}


