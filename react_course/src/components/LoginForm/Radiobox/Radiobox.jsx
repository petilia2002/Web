import React from "react";
import classes from "./Radiobox.module.css";

export default function Radiobox({ className, ...props }) {
  return (
    <input
      type="radio"
      className={`${classes.myRadio} ${className}`}
      {...props}
    />
  );
}
