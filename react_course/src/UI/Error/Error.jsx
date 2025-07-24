import React from "react";
import classes from "./Error.module.css";

export default function Error({ text }) {
  return <p className={classes.error_msg}>{text}</p>;
}
