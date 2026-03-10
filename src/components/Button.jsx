/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import "./Button.css";

const Button = ({ to, text, Icon, delay = 0, size = "default" }) => {
  const sizeClass =
    size === "sm" ? "btn--sm" : size === "lg" ? "btn--lg" : "btn--md";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.7, delay },
      }}
    >
      <Link className={`btn ${sizeClass}`} to={to}>
        {text}
        {Icon && <Icon />}
      </Link>
    </motion.div>
  );
};

export default Button;
