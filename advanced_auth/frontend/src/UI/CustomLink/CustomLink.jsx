import React from "react";
import { Link, useMatch } from "react-router";
import classes from "./CustomLink.module.css";

export default function CustomLink({ to, exact = false, children }) {
  const match = useMatch({ path: to, end: exact });
  const cls = match ? [classes.link, classes.active].join(" ") : classes.link;
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}
