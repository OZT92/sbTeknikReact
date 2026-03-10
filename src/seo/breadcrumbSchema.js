import { SITE } from "./site";

export function breadcrumbSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: SITE.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hizmetler",
        item: `${SITE.baseUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${SITE.baseUrl}/services/${service.slug}`,
      },
    ],
  };
}
