import React from "react";
import { FaTwitter, FaHeart, FaRegCopyright } from "react-icons/fa";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.content}>
        <FaTwitter className={classes.logo} />
        <div className={classes.links}>
          <a href="/about">О нас</a>
          <a href="/terms">Условия</a>
          <a href="/privacy">Конфиденциальность</a>
        </div>
        <div className={classes.copyright}>
          <FaRegCopyright className={classes.icon} />
          <span>{new Date().getFullYear()} Twitter Clone</span>
        </div>
        <div className={classes.heart}>
          Сделано с <FaHeart className={classes.heartIcon} /> для вас
        </div>
      </div>
    </footer>
  );
}
