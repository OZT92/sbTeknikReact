import { SITE } from "./site";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.baseUrl}#organization`,
  name: SITE.name,
  url: SITE.baseUrl,
  logo: SITE.logo,
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: SITE.sameAs,
  address: {
    "@type": "PostalAddress",
    ...SITE.address,
  },
};
