import React from "react";
import classes from "./MyInput.module.css";

export default function MyInput({ className, ...props }) {
  return (
    <input className={`${classes.myInput} ${className || ""}`} {...props} />
  );
}
