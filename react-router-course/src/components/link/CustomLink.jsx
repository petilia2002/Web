import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router";
import classes from "./CustomLink.module.css";

export default function CustomLink({ children, to, exact = false, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: exact });

  return (
    <Link
      to={to}
      {...props}
      className={match ? `${classes.link} ${classes.active}` : classes.link}
    >
      {children}
    </Link>
  );
}
