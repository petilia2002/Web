import React from "react";
import classes from "./MessageError.module.css";

export default function MessageError({ text }) {
  return <p className={classes.error_msg}>{text}</p>;
}
