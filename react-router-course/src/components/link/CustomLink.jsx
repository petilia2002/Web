import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router";
import classes from "./CustomLink.module.css";

/* В React Router компонент (любой) всегда перерендеривается
(при переходе по маршрутам), если внутри себя вызывает хук
из React Router, даже если результат, возвращаемый этим хуком,
не изменился с момента последнего рендера. Если внутри
компонента не вызываются Router-хуки, то он не будет
перерендериваться в случае перехода пользователя по маршрутам. */

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
