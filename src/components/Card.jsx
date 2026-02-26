import { motion } from "motion/react";
import { Link } from "react-router";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Card({ title, desc, imgSrc, to }) {
  const content = (
    <>
      <div className="services-card__image-wrapper">
        <img
          className="services-card__img"
          src={imgSrc}
          alt={title}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="services-card__body">
        <h3 className="services-card__title">{title}</h3>
        {desc && <p className="services-card__desc">{desc}</p>}
      </div>
    </>
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="services-card"
    >
      {to ? (
        <Link
          to={to}
          className="services-card__link"
          aria-label={`${title} - iletişim`}
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </motion.div>
  );
}
