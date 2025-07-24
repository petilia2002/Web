import React from "react";
import classes from "./PageButton.module.css";

export default function PageButton({ children, active, ...props }) {
  const cls = active
    ? [classes.pageBtn, classes.active].join(" ")
    : classes.pageBtn;
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
