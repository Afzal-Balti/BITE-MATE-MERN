import React from "react";

const Button = ({ children, variant = "primary" }) => {
  return <button className={`button ${variant}`}>{children}</button>;
};

export default Button;
