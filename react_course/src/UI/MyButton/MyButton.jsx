import React from "react";
import classes from "./MyButton.module.css";

export default function MyButton({ children, className, ...props }) {
  return (
    <button className={`${classes.myBtn} ${className || ""}`} {...props}>
      {children}
    </button>
  );
}
