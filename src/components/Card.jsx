/* eslint-disable no-unused-vars */
import { motion } from "motion/react";

const Card = ({ title, imgSrc }) => {
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1, transition: { duration: 0.5 } }}
      className="services-card"
    >
      <h3>{title}</h3>
      <img className="services-card__img" src={imgSrc} alt={title} />
    </motion.div>
  );
};

export default Card;
