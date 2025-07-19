import React from "react";
import classes from "./Navbar.module.css";
import CustomLink from "../link/CustomLink";

/* Для NavLink: */
const setActive = ({ isActive }) =>
  isActive ? `${classes.link} ${classes.active}` : classes.link;

export default function Navbar() {
  return (
    <div className={classes.navbar}>
      <div className={classes.links_container}>
        <CustomLink to="/" exact>
          Главная
        </CustomLink>
        <CustomLink to="/about">О нас</CustomLink>
        <CustomLink to="/posts">Посты</CustomLink>
      </div>
    </div>
  );
  {
    /*<div className={classes.navbar}>
      <div className={classes.links_container}>
        <NavLink to="/" className={setActive}>
          Главная
        </NavLink>
        <NavLink to="/about" className={setActive}>
          О нас
        </NavLink>
        <NavLink to="/posts" className={setActive}>
          Посты
        </NavLink>
      </div>
    </div>*/
  }
}
