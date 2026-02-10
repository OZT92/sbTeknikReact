export default function BrandSlider({
  logos = [],
  speed = 25, // saniye (küçük = daha hızlı)
  gap = 48, // px
  height = 48, // px
}) {
  const trackStyle = {
    "--duration": `${speed}s`,
    "--gap": `${gap}px`,
    "--logoH": `${height}px`,
  };

  return (
    <div className="logoSlider" style={trackStyle} aria-label="Brand logos">
      <div className="logoTrack">
        {/* 1. set */}
        {logos.map((l, i) => (
          <LogoItem key={`a-${i}`} {...l} />
        ))}
        {/* 2. set (clone) */}
        {logos.map((l, i) => (
          <LogoItem key={`b-${i}`} {...l} />
        ))}
      </div>
    </div>
  );
}

function LogoItem({ src, alt, href }) {
  const img = <img src={src} alt={alt || "brand"} loading="lazy" />;

  return (
    <div className="logoItem">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={alt || "brand"}
        >
          {img}
        </a>
      ) : (
        img
      )}
    </div>
  );
}
