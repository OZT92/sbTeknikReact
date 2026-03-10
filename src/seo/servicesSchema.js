import { SITE } from "./site";

export function servicesSchema(services) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hizmetlerimiz",
    url: `${SITE.baseUrl}/services`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.desc,
          url: `${SITE.baseUrl}/services/${service.slug}`,
          serviceType: service.title,
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
        },
      })),
    },
  };
}
