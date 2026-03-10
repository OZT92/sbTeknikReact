import { useEffect } from "react";

export default function usePageSeo({
  title,
  description,
  canonical,
  image,
  robots = "index,follow",
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMetaTag = ({ name, property, content }) => {
      if (!content) return;

      const selector = name
        ? `meta[name="${name}"]`
        : `meta[property="${property}"]`;

      let tag = document.head.querySelector(selector);

      if (!tag) {
        tag = document.createElement("meta");

        if (name) {
          tag.setAttribute("name", name);
        }

        if (property) {
          tag.setAttribute("property", property);
        }

        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    };

    const setLinkTag = ({ rel, href }) => {
      if (!href) return;

      let tag = document.head.querySelector(`link[rel="${rel}"]`);

      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
      }

      tag.setAttribute("href", href);
    };

    // Standard SEO
    setMetaTag({ name: "description", content: description });
    setMetaTag({ name: "robots", content: robots });

    // Open Graph
    setMetaTag({ property: "og:type", content: "website" });
    setMetaTag({ property: "og:title", content: title });
    setMetaTag({ property: "og:description", content: description });
    setMetaTag({ property: "og:url", content: canonical });
    setMetaTag({ property: "og:image", content: image });

    // Twitter
    setMetaTag({ name: "twitter:card", content: "summary_large_image" });
    setMetaTag({ name: "twitter:title", content: title });
    setMetaTag({ name: "twitter:description", content: description });
    setMetaTag({ name: "twitter:image", content: image });

    // Canonical
    setLinkTag({ rel: "canonical", href: canonical });
  }, [title, description, canonical, image, robots]);
}
