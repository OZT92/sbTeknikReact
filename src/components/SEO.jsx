export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  noindex = false,
  jsonLd,
}) {
  const robots = noindex ? "noindex,nofollow" : "index,follow";

  return (
    <>
      {/* Document */}
      <html lang="tr" />
      <title>{title}</title>

      {/* Basic SEO */}
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      {/* Twitter */}
      <meta
        name="twitter:card"
        content={ogImage ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}

      {/* JSON-LD */}
      {jsonLd ? (
        <script
          type="application/ld+json"
          // React 19 + CSP/JSON-LD için standart yaklaşım
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </>
  );
}
