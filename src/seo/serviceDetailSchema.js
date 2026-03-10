import { SITE } from "./site";

export function serviceDetailSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDesc || service.desc,
    serviceType: service.title,
    url: `${SITE.baseUrl}/services/${service.slug}`,
    image: service.schemaImage || SITE.ogImage,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.baseUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
  };
}
