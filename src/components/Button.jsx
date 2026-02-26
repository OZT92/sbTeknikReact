/* eslint-disable no-unused-vars */
import { Link } from "react-router";
import { motion } from "motion/react";

const Button = ({ text, to, Icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.7, delay },
      }}
    >
      <Link className="hero-cta-btn" to={to}>
        {text}
        {Icon && <Icon size={22} />}
      </Link>
    </motion.div>
  );
};

export default Button;
